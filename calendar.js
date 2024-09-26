import {getCurrMonth, getCurrYear, getCurrWeekDay, 
    getCurrDayDate, getNumberOfMonthDays, getWeekDay} from "./calendar_api.js"
import { getEventsDates, getEventByDate } from "./db_query.js";

window.addEventListener("load", (e) => {
    const currMonth = getCurrMonth()[1];
    sessionStorage.setItem('currMonth', getCurrMonth()[0]);
    const currYear = getCurrYear();
    const weekDay = getCurrWeekDay()[1];

    document.getElementById("headerDay").innerText = weekDay + ' ' + getCurrDayDate();
    

    const currDay = Number(getCurrDayDate().slice(0, 2))
    fillCalendarCard(currYear, getCurrMonth()[0], getCurrMonth()[1], currDay, document)
    fillEventInfo(getCurrMonth()[0], currDay)
})


document.getElementById('calendarDays').addEventListener('click', function(e) {
    if (e.target.tagName === 'LI'){
        const day = e.target.innerText;
        fillEventInfo(sessionStorage.getItem("currMonth"), day)
    }
});


document.getElementById("profileButton").addEventListener("click", (e) => {
    window.location.href = './profile.html';
  })


function fillCalendarCard(year, month, monthName, currDay, doc){
    doc.getElementById("headerDate").innerText = monthName + ' ' + year;


    const days = doc.getElementById("calendarDays");
    let firstWeekDay = getWeekDay(new Date(year, month, 1))[0]
    if(firstWeekDay == 0){
        firstWeekDay = 7
    }
    for (let emptyDay = 0; emptyDay < firstWeekDay-1; emptyDay++) {
        days.innerHTML += "<li></li>"
    }
    getEventsDates(month).then((dates) => {
        const numOfDays = getNumberOfMonthDays(year, month)
        console.log(dates)
        for (let day = 1; day < numOfDays + 1; day++) {
            console.log(dates.indexOf(day))
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
    let date = day + '.' + (Number(month) + 1)
    if(date.length == 4){
        date = date.slice(0, 3) + '0' + date.slice(3)
    }
    document.getElementById("eventInfo").innerHTML = 
    "<h3 style='color: #7D8994; text-align: center'>Запланированные мероприятия <br> на "
    + date + "</h3>"
        getEventByDate(month, day).then((events) => {
            for (let i = 0; i < events.length; i++) {
                let eventDate = new Date(events[i].date * 1000);
                let hours = eventDate.getHours().toString();
                let minutes = eventDate.getMinutes().toString();
                if(minutes.length == 1){
                    minutes = '0' + minutes.toString()
                }
                let res = "<b>" + hours + ':' + minutes + "</b>"
                res += "<span>" + events[i].name + "</span>"
                res += "<i>" + events[i].description + "</i>"
                document.getElementById("eventInfo").innerHTML += res;
            }
        })
}