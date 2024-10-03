import {db, app, doc, setDoc, getDoc, updateDoc, getDocs, collection, query, where, 
    addDoc
} from './firebase_connect.js'

async function addUser(id, fullName, birthDay, phoneNumber, city, locs, tg){
    await setDoc(doc(db, "users", fullName), {
        crmId: id,
        name: fullName,
        number: phoneNumber,
        brunch: city,
        dob: birthDay,
        locations: locs,
        telegram: tg,
        role: "tutor"
      });
}

async function getUser(name) {
    const docRef = doc(db, "users", name);
    const docSnap = await getDoc(docRef);
    return docSnap.data()
}

async function getUserByPhone(phone) {
    const docRef = collection(db, "users");
    const q = query(docRef, where("number", "==", phone));
    const queryRes = await getDocs(q);
    let data = {}
    queryRes.forEach((user) => {
        data = user.data()
    });
    return data
}


async function getLocationName(id){
    const docRef = doc(db, "rooms", id);
    const docSnap = await getDoc(docRef);
    return docSnap.data().name
}

async function updateUserTg(name, tg){
    const docRef = doc(db, "users", name);

    await updateDoc(docRef, {
        telegram: tg
    });
}


async function addEvent(eventName, eventDesc, eventDate, imageBytes){
    const docRef = await addDoc(collection(db, "events"), {
        name: eventName,
        description: eventDesc,
        date: eventDate,
        image: imageBytes
    });
}

async function getEventsDates(month, year){
    const events = await getDocs(collection(db, "events"));
    const dates = []
    events.forEach((event) => {
        let eventDate = new Date(event.data().date);
        let eventDay = eventDate.getDate()
        let eventMonth = eventDate.getMonth()
        let eventYear = eventDate.getFullYear()
        // let hours = date.getHours().toString();
        // let minutes = date.getMinutes().toString();
        // if(minutes.length == 1){
        //     minutes = '0' + minutes.toString()
        // }
        if(Number(eventMonth) == Number(month) && Number(eventYear) == Number(year))
        {
            dates.push(eventDay)
        }
    });

    return dates
}

async function getEventByDate(month, day){
    const events = await getDocs(collection(db, "events"));
    const resEvents = []
    events.forEach((event) => {
        let eventDate = new Date(event.data().date);
        let eventDay = eventDate.getDate();
        let eventMonth = eventDate.getMonth();
        if(eventDay == day && eventMonth == month){
            resEvents.push(event.data());
        }
    })
    
    return resEvents;
}

async function checkAdmin(number){
    return getUserByPhone(number).then((user) => {
        if(user.role == "admin") {
            return user
        }
        return undefined
    })
}

export { addUser, getUser, getLocationName, updateUserTg,  getEventsDates, getEventByDate, checkAdmin, addEvent}