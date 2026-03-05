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

    const fname = document.getElementById("fname");
    const lname = document.getElementById("lname");
    const email = document.getElementById("email");
    const mobile = document.getElementById("mobile");
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    const role = document.getElementById("role");


    const firstName = fname.value.trim();
    const lastName = lname.value.trim();
    const emailValue = email.value.trim();
    const mobileValue = mobile.value.trim();
    const userValue = username.value.trim();
    const pwd = password.value.trim();

    if (!firstName) return showError(fname, "First Name not filled");
    if (!lastName) return showError(lname, "Last Name not filled");
    if (!emailValue) return showError(email, "Email not filled");
    if (!mobileValue) return showError(mobile, "Mobile Number not filled");
    if (!role.value) return showError(role, "Please select your role");
    if (!userValue) return showError(username, "Username not filled");
    if (!pwd) return showError(password, "Password not filled");

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!emailPattern.test(emailValue)) {
        return showError(email, "Enter a valid email address");
    }

    const mobilePattern = /^[0-9]{10}$/;
    if (!mobilePattern.test(mobileValue)) {
        return showError(mobile, "Mobile number must be 10 digits");
    }

    // Password validation
    if (pwd.length < 8)
        return shakePassword(password, "Password must be at least 8 characters long");

    if (!/[a-z]/.test(pwd))
        return shakePassword(password, "Password must contain at least 1 lowercase letter");

    if (!/[A-Z]/.test(pwd))
        return shakePassword(password, "Password must contain at least 1 uppercase letter");

    if (!/[0-9]/.test(pwd))
        return shakePassword(password, "Password must contain at least 1 number");

    if (!/[@$!%*?&]/.test(pwd))
        return shakePassword(password, "Password must contain at least 1 special character");

    alert("Login Successful!");
    
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("fname", firstName);
    localStorage.setItem("lname", lastName);
    localStorage.setItem("email", emailValue);
    localStorage.setItem("mobile", mobileValue);
    localStorage.setItem("username", userValue);
    localStorage.setItem("role", role.value);

    window.location.href = "Dashboard.html";
}

function showError(element, message) {
    alert(message);
    element.focus();
}

function shakePassword(element, message) {
    element.classList.add("shake");
    alert(message);
    element.focus();
    setTimeout(() => {
        element.classList.remove("shake");
    }, 400);
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
    localStorage.clear();  
    window.location.href = "Home_Page.html";
} 