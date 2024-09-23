import { getLocationName, getUser, updateUserTg } from "./db_query.js";

const Brunchs = { 1: "Минск", 2: 'Барановичи', 3: 'Борисов' };


window.addEventListener("load", (e) => {
    console.log("load")
    const name = sessionStorage.getItem("currUserId");
    document.getElementById("fullname").innerText = name;

    getUser(name).then((userData) => {
      document.getElementById("dob").innerText = userData.dob;
      document.getElementById("brunch").innerText = Brunchs[userData.brunch];
      document.getElementById("phone").innerText = userData.number;
      document.getElementById("tg").value = userData.telegram;
      for (let i = 0; i < userData.locations.length; i++) {
        console.log(userData.locations[i])
        getLocationName(userData.locations[i].toString()).then((name) => {
          console.log(name)
          document.getElementById("locs").innerHTML += "<span>" + name + "</span>";
        })
      }
    })
});


document.getElementById("update tg").addEventListener("click", (e) => {
    updateUserTg(sessionStorage.getItem("currUserId"), document.getElementById("tg").value)
})