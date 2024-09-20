import {db, app, doc, setDoc} from './firebase_connect.js'
import { crm_auth, find_teacher } from './crm_api.js';

document.getElementById("reg").addEventListener('click', e => {
    const number = document.getElementById("phone").value;
    const br = document.getElementById("brunchs").value;
    find_teacher(number, br).then((data) => {
        // get crm responce with items
        console.log(data)
        if (data.total > 0) {
            console.log('found teacher')
            addUser(data.items[0].name, data.items[0].dob, number, br)
            sessionStorage.setItem('currUserId', data.items[0].name);
            window.location.href = './profile.html';
        }
    })
})


async function addUser(full_name, birth_day, phone_number, city){

    await setDoc(doc(db, "users", full_name), {
        name: full_name,
        number: phone_number,
        brunch: city,
        dob: birth_day
      });
}