import {getCurrMonth, getCurrYear, getCurrWeekDay, 
    getCurrDayDate, getNumberOfMonthDays, getWeekDay} from "./calendar_api.js"
import { getEventsDates, getEventByDate, getUser, addEvent } from "./db_query.js";

window.addEventListener("load", (e) => {
    getCurrentDayCalendarCard()
})

document.getElementById('headerDay').addEventListener('click', function(e) {
    getCurrentDayCalendarCard()
});

document.getElementById('calendarDays').addEventListener('click', function(e) {
    if (e.target.tagName === 'LI'){
        const day = e.target.innerText;
        sessionStorage.setItem("currDay", day)
        fillEventInfo(sessionStorage.getItem("currMonth"), day)
    }
});


document.getElementById("profileButton").addEventListener("click", (e) => {
    window.location.href = './profile.html';
})


document.getElementById("rightArrow").addEventListener("click", (e) => {
    let currMonth = Number(sessionStorage.getItem("currMonth"))
    let currYear = Number(sessionStorage.getItem("currYear"))
    let currDay = -1;
    if(currMonth == 11) {
        currYear += 1
        sessionStorage.setItem('currYear', currYear);
        currMonth = -1
    }

    sessionStorage.setItem('currMonth', currMonth + 1);
    const month = ["Январь","Февраль","Март","Апрель","Май",
                   "Июнь","Июль","Август","Сентябрь","Октябрь",
                   "Ноябрь","Декабрь"];
    currMonth = sessionStorage.getItem("currMonth")
    if(Number(currMonth) == getCurrMonth()[0]) {
        currDay = Number(getCurrDayDate().slice(0, 2))
    }
    fillCalendarCard(currYear, currMonth, month[currMonth], currDay, document)
    fillEventInfo(sessionStorage.getItem("currMonth"), 1)
})

document.getElementById("leftArrow").addEventListener("click", (e) => {
    let currMonth = Number(sessionStorage.getItem("currMonth"))
    let currYear = Number(sessionStorage.getItem("currYear"))
    let currDay = -1;
    if(currMonth == 0) {
        currYear -= 1;
        sessionStorage.setItem('currYear', currYear);
        currMonth = 12
    } 

    sessionStorage.setItem('currMonth', currMonth - 1);
    const month = ["Январь","Февраль","Март","Апрель","Май",
                   "Июнь","Июль","Август","Сентябрь","Октябрь",
                   "Ноябрь","Декабрь"];
    currMonth = sessionStorage.getItem("currMonth")
    if(Number(currMonth) == getCurrMonth()[0]) {
        currDay = Number(getCurrDayDate().slice(0, 2))
    }
    fillCalendarCard(currYear, currMonth, month[currMonth], currDay, document)
    fillEventInfo(currMonth, 1)
})


document.getElementById("addEventButton").addEventListener("click", (e) => {
    const name = document.getElementById("eventName").value;
    const description = document.getElementById("eventDescription").value;
    const date = document.getElementById("eventDate").value + ' ' + document.getElementById("eventTime").value;
    const image = document.getElementById("eventImage").files[0];
    getAsByteArray(image).then((byteFile) => {
        const month = ["Январь","Февраль","Март","Апрель","Май",
            "Июнь","Июль","Август","Сентябрь","Октябрь",
            "Ноябрь","Декабрь"];
        addEvent(name, description, date, Array.from(byteFile)).then((data) => {
            const currYear = sessionStorage.getItem("currYear")
            const currMonth = sessionStorage.getItem("currMonth")
            const currDay = sessionStorage.getItem("currDay")
            // fillCalendarCard(currYear, currMonth, month[currMonth], Number(getCurrDayDate().slice(0, 2)), document)
            // fillEventInfo(currMonth, currDay)
        })
    })
})


function fillCalendarCard(year, month, monthName, currDay, doc){
    doc.getElementById("headerDate").innerText = monthName + ' ' + year;


    const days = doc.getElementById("calendarDays");
    days.innerHTML = ""
    let firstWeekDay = getWeekDay(new Date(year, month, 1))[0]
    if(firstWeekDay == 0){
        firstWeekDay = 7
    }
    for (let emptyDay = 0; emptyDay < firstWeekDay-1; emptyDay++) {
        days.innerHTML += "<li></li>"
    }
    getEventsDates(month, year).then((dates) => {
        const numOfDays = getNumberOfMonthDays(year, month)
        for (let day = 1; day < numOfDays + 1; day++) {
            if (day == currDay && dates.indexOf(day) > -1) {
                days.innerHTML += '<li class="activeDay" class="eventDay">' + day + "</li>"
            } else if (day == currDay){
                days.innerHTML += '<li class="activeDay">' + day + "</li>"
            } else if (dates.indexOf(day) > -1){
                days.innerHTML += '<li class="eventDay">' + day + "</li>"
            }else {
                days.innerHTML += "<li>" + day + "</li>"
            }
        }
    })
}

function fillEventInfo(month, day){
    if(day.toString().length < 2){
        day = '0' + day;
    }
    month = Number(month) + 1;
    if(month.toString().length < 2){
        month = '0' + month;
    }
    let date = day + '.' + month;
    document.getElementById("eventDate").value = sessionStorage.getItem("currYear") + '-' + month + '-' + day;
    document.getElementById("eventInfo").innerHTML = 
    "<h3 style='color: #7D8994; text-align: center'>Запланированные мероприятия <br> на "
    + date + "</h3>"
    getEventByDate(Number(month) - 1, Number(day)).then((events) => {
        for (let i = 0; i < events.length; i++) {
            let eventDate = new Date(events[i].date);
            let hours = eventDate.getHours().toString();
            let minutes = eventDate.getMinutes().toString();
            if(minutes.length == 1){
                minutes = '0' + minutes.toString()
            }
            const content = new Uint8Array(events[i].image)
            
            let res = "<b>" + hours + ':' + minutes + "</b>"
            res += '<img id="evImage" width="100" height="90"></img>';
            res += "<span>" + events[i].name + "</span>"
            res += "<i>" + events[i].description + "</i>"
            document.getElementById("eventInfo").innerHTML += res;
            document.getElementById('evImage').src = URL.createObjectURL(
                new Blob([content.buffer], { type: 'image/png' })
              );
        }
    })
    getUser(sessionStorage.getItem("currUserId")).then((currUser) => {
        if(currUser.role == "admin"){
            document.getElementById("eventInfo").innerHTML += "<a id='addEventButton' href='#addEventPage'>Добавить</a>"
        }
    })
}


function getCurrentDayCalendarCard(){
    const currMonth = getCurrMonth()[1];
    sessionStorage.setItem('currMonth', getCurrMonth()[0]);
    const currYear = getCurrYear();
    sessionStorage.setItem('currYear', currYear);
    const weekDay = getCurrWeekDay()[1];

    document.getElementById("headerDay").innerText = weekDay + ' ' + getCurrDayDate();
    

    const currDay = Number(getCurrDayDate().slice(0, 2))
    fillCalendarCard(currYear, getCurrMonth()[0], getCurrMonth()[1], currDay, document)
    fillEventInfo(getCurrMonth()[0], currDay)
}


function readFile(file) {
    return new Promise((resolve, reject) => {
      // Create file reader
      let reader = new FileReader()
  
      // Register event listeners
      reader.addEventListener("loadend", e => resolve(e.target.result))
      reader.addEventListener("error", reject)
  
      // Read file
      reader.readAsArrayBuffer(file)
    })
}

async function getAsByteArray(file) {
    return new Uint8Array(await readFile(file))
}