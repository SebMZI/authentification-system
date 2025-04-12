"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const submitBtn = document.querySelector(".submit-btn");
const firstNameInput = document.getElementById("firstname");
const lastNameInput = document.getElementById("lastname");
const emailInput = document.getElementById("email");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const notification = document.querySelector(".notification");
window.addEventListener('load', () => {
    submitBtn === null || submitBtn === void 0 ? void 0 : submitBtn.addEventListener("click", (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        if (submitBtn.dataset.page === "signin") {
            if (!usernameInput || !passwordInput) {
                throw new Error("Fields not found");
            }
            if (!verify(usernameInput.value) || !verify(passwordInput.value)) {
                notify({ text: "Please fill all the fields", bgColor: "rgba(128, 0, 0, 0.2)", borderColor: "red" });
                return;
            }
            yield signin({ username: usernameInput.value, password: passwordInput.value });
        }
        else if (submitBtn.dataset.page === "signup") {
            if (!firstNameInput || !lastNameInput || !emailInput || !usernameInput || !passwordInput) {
                throw new Error("Fields not found");
            }
            if (!verify(firstNameInput.value) ||
                !verify(lastNameInput.value) ||
                !verify(emailInput.value) ||
                !verify(usernameInput.value) ||
                !verify(passwordInput.value)) {
                notify({ text: "Please fill all the fields", bgColor: "rgba(128, 0, 0, 0.2)", borderColor: "red" });
                return;
            }
            yield signup({
                firstName: firstNameInput.value,
                lastName: lastNameInput.value,
                email: emailInput.value,
                username: usernameInput.value,
                password: passwordInput.value
            });
        }
    }));
});
function signup(userObj) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("http://localhost:5800/auth/signup", {
                method: "POST",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstName: userObj.firstName,
                    lastName: userObj.lastName,
                    email: userObj.email,
                    username: userObj.username,
                    password: userObj.password,
                }),
            });
            const data = yield response.json();
            if (!response.ok) {
                notify({
                    text: "An error occured, please try again",
                    bgColor: "rgba(128, 0, 0, 0.2)",
                    borderColor: "red"
                });
                throw new Error(data.message);
            }
            if (!data.success) {
                notify({ text: data.message, bgColor: "rgba(128, 0, 0, 0.2)", borderColor: "red" });
                return;
            }
            console.log("Sign Up Data", data);
            notify({ text: data.message, bgColor: "rgba(0, 128, 0, 0.2)", borderColor: "green" });
            setTimeout(() => {
                window.location.href = "/frontend/pages/success.html";
            }, 3000);
        }
        catch (error) {
            throw new Error(error);
        }
    });
}
function signin(userObj) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("http://localhost:5800/auth/signin", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: userObj.username,
                    password: userObj.password,
                }),
            });
            const data = yield response.json();
            if (!response.ok) {
                notify({
                    text: "An error occured, please try again",
                    bgColor: "rgba(128, 0, 0, 0.2)",
                    borderColor: "red"
                });
                throw new Error(data.message);
            }
            if (!data.success) {
                notify({ text: data.message, bgColor: "rgba(128, 0, 0, 0.2)", borderColor: "red" });
                return;
            }
            console.log("Sign In Data", data);
            notify({ text: data.message, bgColor: "rgba(0, 128, 0, 0.2)", borderColor: "green" });
            // setTimeout(() => {
            //   // window.location.href = "/frontend/pages/success.html";
            // }, 3000);
        }
        catch (error) {
            throw new Error(error);
        }
    });
}
function notify(notificationObj) {
    if (!notification) {
        throw new Error("Notification element not found");
    }
    notification.textContent = notificationObj.text;
    notification.style.backgroundColor = notificationObj.bgColor;
    notification.style.borderColor = notificationObj.borderColor;
    notification.style.color = notificationObj.borderColor;
    notification.style.top = "5px";
    setTimeout(() => {
        notification.style.top = "-100%";
    }, 3000);
}
function verify(value) {
    return value.length > 0;
}
