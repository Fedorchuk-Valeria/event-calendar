import { getCurrYear } from './calendar_api.js';
import { find_teacher, getTeacherLessons } from './crm_api.js';
import { addUser, getUser, checkAdmin, addEvent, findBirthEvent } from './db_query.js';

window.addEventListener("load", (e) => {
    var IS_IPHONE = navigator.userAgent.match(/iPhone/i) != null;
    console.log(IS_IPHONE)
    if (IS_IPHONE) {
        var link=document.createElement("link");
        link.type="text/css";
        link.rel="stylesheet";
        link.href="reg_style_iphone.css";
        document.getElementsByTagName("head")[0].appendChild(link);
    }
})

document.getElementById("reg").addEventListener('click', e => {
    const number = document.getElementById("phone").value;
    const br = document.getElementById("brunchs").value;
    if (number.length != 0) {
        console.log("number is not empty")
        const loader = document.querySelector(".loader");
        loader.classList.add('visible');
        checkAdmin(number).then((res) => {
            if(res){
                console.log(res)
                sessionStorage.setItem('currUserId', res.name);
                addBirthdayEvent(res)
            } else {
                find_teacher(number, br).then((data) => {
                    // get crm responce with items
                    if (data.total > 0) {
                        console.log('found teacher')
                        let tg = ""
                        getUser(data.items[0].name).then((u) => {
                            if(u !== undefined){
                                tg = u.telegram
                            } 
                            getUserLocations(data.items[0].id, br).then((locs) => {
                                addUser(data.items[0].id, data.items[0].name, data.items[0].dob, number, br, locs, tg).then((res) => {
                                    sessionStorage.setItem('currUserId', data.items[0].name);
                                    addBirthdayEvent(data.items[0])
                                })
                            })
                        })
                    }
                })
            }
        })
        
    }
})

function getUserLocations(id, brunch){
    return getTeacherLessons(id, brunch).then((data) => {
        let locs = []
        const lessons = data.items
        for (let i = 0; i < lessons.length; i++) {
            if (locs.indexOf(lessons[i].room_id) == -1) {
                locs.push(lessons[i].room_id)
            }
        }
        return locs
    })
}


async function addBirthdayEvent(data){
    console.log(data)
    let dobArr = data.dob.split('.');
    let dob = getCurrYear() + '-' + dobArr[1] + '-' + dobArr[0]
    console.log(dob)
    findBirthEvent(data.name, dob).then(async (res) => {
        if(res) {
            console.log('create ', dob)
            await addEvent('День рождение', "У " + data.name,  dob, [])
        }
        window.location.href = './profile.html';
    })
}
