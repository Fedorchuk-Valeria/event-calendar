import { getLocationName, getUser, updateUserTg } from "./db_query.js";

const Brunchs = { 1: "Минск", 2: 'Барановичи', 3: 'Борисов' };


window.addEventListener("load", (e) => {
    var IS_IPHONE = navigator.userAgent.match(/iPhone/i) != null;
    console.log(IS_IPHONE)
    if (IS_IPHONE) {
        var link=document.createElement("link");
        link.type="text/css";
        link.rel="stylesheet";
        link.href="profile_style_iphone.css";
        document.getElementsByTagName("head")[0].appendChild(link);
        link = document.createElement("link");
        link.type="text/css";
        link.rel="stylesheet";
        link.href="footer_iphone.css";
        document.getElementsByTagName("head")[0].appendChild(link);
    }
    const name = sessionStorage.getItem("currUserId");
    document.getElementById("fullname").innerText = name;

    getUser(name).then((userData) => {
      document.getElementById("dob").innerText = userData.dob;
      document.getElementById("brunch").innerText = Brunchs[userData.brunch];
      document.getElementById("phone").innerText = userData.number;
      document.getElementById("tg").value = userData.telegram;
      if(userData.role == "admin") {
        document.getElementById("locs p").innerText = ""
      } else {
        for (let i = 0; i < userData.locations.length; i++) {
          getLocationName(userData.locations[i].toString()).then((name) => {
            document.getElementById("locs").innerHTML += "<span>" + name + "</span>";
          })
        }
      }
      const loader = document.querySelector(".loader");
      loader.classList.add('hidden');
    })
});


document.getElementById("updateTg").addEventListener("click", (e) => {
    updateUserTg(sessionStorage.getItem("currUserId"), document.getElementById("tg").value)
})

document.getElementById("calendarButton").addEventListener("click", (e) => {
  window.location.href = './calendar.html';
})