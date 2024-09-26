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
})


document.getElementById('calendarDays').addEventListener('click', function(e) {
    if (e.target.tagName === 'LI'){
        const day = e.target.innerText;
        document.getElementById("eventInfo").innerHTML = ""
        getEventByDate(sessionStorage.getItem("currMonth"), day).then((events) => {
            for (let i = 0; i < events.length; i++) {
                let res = "<p>" + events[i].name + "</p>"
                res += "<p>" + events[i].description + "</p>"
                document.getElementById("eventInfo").innerHTML += res;
            }
        })
    }
});


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