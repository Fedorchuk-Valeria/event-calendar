import {db, app, doc, setDoc, getDoc, updateDoc, getDocs, collection} from './firebase_connect.js'

async function addUser(id, fullName, birthDay, phoneNumber, city, locs, tg){
    await setDoc(doc(db, "users", fullName), {
        crmId: id,
        name: fullName,
        number: phoneNumber,
        brunch: city,
        dob: birthDay,
        locations: locs,
        telegram: tg
      });
}

async function getUser(name) {
    const docRef = doc(db, "users", name);
    const docSnap = await getDoc(docRef);
    return docSnap.data()
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

async function getEventsDates(month){
    const events = await getDocs(collection(db, "events"));
    const dates = []
    events.forEach((event) => {
        let eventDate = new Date(event.data().date * 1000);
        let eventDay = eventDate.getDate()
        let eventMonth = eventDate.getMonth()
        // let hours = date.getHours().toString();
        // let minutes = date.getMinutes().toString();
        // if(minutes.length == 1){
        //     minutes = '0' + minutes.toString()
        // }
        if(eventMonth == month)
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
        let eventDate = new Date(event.data().date * 1000);
        let eventDay = eventDate.getDate();
        let eventMonth = eventDate.getMonth();
        if(eventDay == day && eventMonth == month){
            resEvents.push(event.data());
        }
    })
    
    return resEvents;
}

export { addUser, getUser, getLocationName, updateUserTg,  getEventsDates, getEventByDate}