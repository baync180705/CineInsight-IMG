let loginU = document.getElementById("userLogin");
let loginP = document.getElementById("userPassword");
let login = document.getElementById("login");


function checkLogin(){
    const storedPassword = localStorage.getItem(loginU.value);
    if (storedPassword === null || storedPassword !== loginP.value || loginU.value == ""|| loginP.value == "") {
        alert("Incorrect Password");
    }
    else {
        window.location.href = "CineInsight.html";
    }
}login.addEventListener("submit", function(event){
    event.preventDefault();
    checkLogin();
})