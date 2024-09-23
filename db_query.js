import {db, app, doc, setDoc, getDoc, updateDoc} from './firebase_connect.js'

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

export { addUser, getUser, getLocationName, updateUserTg }