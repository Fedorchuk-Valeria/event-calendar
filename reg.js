import { find_teacher, getTeacherLessons } from './crm_api.js';
import { addUser, getUser, checkAdmin } from './db_query.js';


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
                window.location.href = './profile.html';
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
                                    window.location.href = './profile.html';
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
