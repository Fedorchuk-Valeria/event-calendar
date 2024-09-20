window.addEventListener("load", (event) => {
    document.getElementById("fullname").innerText = sessionStorage.getItem("currUserId")
  });