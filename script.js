/* HOME PAGE */
window.addEventListener("load", function () {
    if (document.body.contains(document.querySelector(".hero"))) {
        history.replaceState(null, null, " ");
        window.scrollTo(0, 0);
    }
});


/*LOGIN PAGE SCRIPT */
document.addEventListener("DOMContentLoaded", function () {

    let imageStack = document.getElementById("imageStack");

    if (imageStack) {
        let images = [
            "stack1.jpg",
            "stack2.jpg",
            "stack3.jpg"
        ];

        images.forEach((src, index) => {
            let img = document.createElement("img");
            img.src = src;
            img.style.zIndex = images.length - index;
            img.style.top = index * 75 + "px";
            img.style.left = index * 75 + "px";
            imageStack.appendChild(img);
        });
    }
    
});


function validate(event) {
    event.preventDefault();

    let fname = document.getElementById("fname");
    let lname = document.getElementById("lname");
    let email = document.getElementById("email");
    let username = document.getElementById("username");
    let password = document.getElementById("password");
    let role = document.getElementById("role");

    if (!fname) return;   

    if (fname.value.trim() === "") { alert("First Name not filled"); fname.focus(); return; }
    if (lname.value.trim() === "") { alert("Last Name not filled"); lname.focus(); return; }
    if (email.value.trim() === "") { alert("Email not filled"); email.focus(); return; }
    if (role.value === "") { alert("Please select your role"); role.focus(); return; }
    if (username.value.trim() === "") { alert("Username not filled"); username.focus(); return; }
    if (password.value.trim() === "") { alert("Password not filled"); password.focus(); return; }

    let pwd = password.value;

    function shakePassword(message) {
        password.classList.add("shake");
        alert(message);
        password.focus();
        setTimeout(() => {
            password.classList.remove("shake");
        }, 400);
    }

    if (!/[a-z]/.test(pwd)) { shakePassword("Password should contain at least 1 lowercase letter"); return; }
    if (!/[A-Z]/.test(pwd)) { shakePassword("Password should contain at least 1 uppercase letter"); return; }
    if (!/[0-9]/.test(pwd)) { shakePassword("Password should contain at least 1 number"); return; }
    if (!/[@$!%*?&]/.test(pwd)) { shakePassword("Password should contain at least 1 special character"); return; }
    if (pwd.length < 7) { shakePassword("Password should be at least 7 characters long"); return; }

    alert("Login Successful!");

    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("fname", fname.value);
    localStorage.setItem("lname", lname.value);
    localStorage.setItem("email", email.value);
    localStorage.setItem("mobile", document.getElementById("mobile").value);
    localStorage.setItem("username", username.value);
    localStorage.setItem("role", role.value);

    window.open("Dashboard.html", "_blank");
}


function clearForm() {
    const form = document.querySelector("form");
    if (!form) return;

    form.reset();

    const fname = document.getElementById("fname");
    const password = document.getElementById("password");

    if (password) password.classList.remove("shake");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    setTimeout(() => {
        if (fname) fname.focus();
    }, 400);
}


/*DASHBOARD PAGE */
document.addEventListener("DOMContentLoaded", function () {

    if (localStorage.getItem("loggedIn") !== "true") {
        if (window.location.pathname.includes("Dashboard")) {
            window.location.href = "Login.html";
        }
    }

    if (document.getElementById("welcomeText")) {

        document.getElementById("welcomeText").innerHTML =
            "Welcome <br>" +
            localStorage.getItem("fname") + " " +
            localStorage.getItem("lname") + "!";

        document.getElementById("fullname").innerHTML =
            localStorage.getItem("fname") + " " +
            localStorage.getItem("lname");

        document.getElementById("email").innerHTML =
            localStorage.getItem("email");

        let mobile = localStorage.getItem("mobile");
        if (mobile && mobile.length === 10) {
            mobile = "+91 " + mobile.slice(0, 5) + " " + mobile.slice(5);
        }
        document.getElementById("mobile").innerHTML = mobile;

        document.getElementById("username").innerHTML =
            localStorage.getItem("username");

        document.getElementById("roleCard").innerHTML =
            localStorage.getItem("role");

        document.getElementById("role").innerHTML =
            localStorage.getItem("role");

        document.getElementById("time").innerHTML =
            new Date().toLocaleString();
    }

});


function logout() {
    localStorage.clear();
    window.location.href = "Login.html";
}

function goHome() {
    localStorage.clear();  // clears everything
    window.location.href = "Home_Page.html";
} 