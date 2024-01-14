let entUsr = document.getElementById("username");
let pass1 = document.getElementById("password");
let pass2 = document.getElementById("confirmPassword");


function CheckPassword() {
    if (localStorage.getItem(entUsr.value)==true||entUsr.value=="") {
        alert("The user already exists. Enter a new username");
    }
    else {
        if (pass1.value != pass2.value|| pass1.value=="") {
            alert("Passwords do not match");
        }
        else {
            alert("Signup successful!")
            localStorage.setItem(entUsr.value, pass1.value);
            window.location.href = "CineInsight.html";
        }
    }
}

let submit = document.getElementById("signup");
submit.addEventListener("submit", function (event) {
    event.preventDefault();
    CheckPassword();
})



