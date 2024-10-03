function getCurrMonth(){
    const d = new Date();
    const month = ["Январь","Февраль","Март","Апрель","Май",
                    "Июнь","Июль","Август","Сентябрь","Октябрь",
                    "Ноябрь","Декабрь"];
    return [d.getMonth(), month[d.getMonth()]];
}

function getCurrYear(){
    const d = new Date();
    return d.getFullYear();
}


function getCurrWeekDay(){
    const date = new Date();

    return getWeekDay(date);
}

function getWeekDay(date){
    const daysOfWeek = ['Воскресенье', 'Понедельник', 'Вторник',
        'Среда', 'Четверг', 'Пятница', 'Суббота'];

    return [date.getDay(), daysOfWeek[date.getDay()]];
}


function getCurrDayDate(){
    const date = new Date();
    return date.toLocaleString().replace('/', '.').slice(0, 5)
}

function getNumberOfMonthDays(year, month){
    return new Date(year, Number(month) + 1, 0).getDate();
}

export {getCurrMonth, getCurrYear, getCurrWeekDay, getCurrDayDate, getNumberOfMonthDays, getWeekDay}