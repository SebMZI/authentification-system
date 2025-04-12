const submitBtn: HTMLButtonElement | null = document.querySelector<HTMLButtonElement>(".submit-btn");
const firstNameInput = document.getElementById("firstname") as HTMLInputElement | null;
const lastNameInput  = document.getElementById("lastname") as HTMLInputElement | null;
const emailInput     = document.getElementById("email") as HTMLInputElement | null;
const usernameInput  = document.getElementById("username") as HTMLInputElement | null;
const passwordInput  = document.getElementById("password") as HTMLInputElement | null;
const notification: HTMLElement | null = document.querySelector(".notification");

interface User {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}

interface CustomNotification {
  text: string; 
  bgColor: string;
  borderColor: string;
}

window.addEventListener('load', () => {
  submitBtn?.addEventListener("click", async (e) => {
    e.preventDefault();
    if (submitBtn.dataset.page === "signin") {
      if(!usernameInput || !passwordInput){
        throw new Error("Fields not found")
      }

      if (!verify(usernameInput.value) || !verify(passwordInput.value)) {
        notify({text: "Please fill all the fields", bgColor: "rgba(128, 0, 0, 0.2)", borderColor: "red"});
        return;
      }

      await signin({username: usernameInput.value, password: passwordInput.value});
    } else if (submitBtn.dataset.page === "signup") {
      if(!firstNameInput || !lastNameInput || !emailInput || !usernameInput || !passwordInput){
        throw new Error("Fields not found")
      }

      if (
        !verify(firstNameInput.value) ||
        !verify(lastNameInput.value) ||
        !verify(emailInput.value) ||
        !verify(usernameInput.value) ||
        !verify(passwordInput.value)
      ) {
        notify({text: "Please fill all the fields", bgColor: "rgba(128, 0, 0, 0.2)", borderColor: "red"});
        return;
      }

      await signup({
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        email: emailInput.value,
        username : usernameInput.value,
        password: passwordInput.value
      }
      );
    }
  });
})


async function signup(userObj : User) {
  try {
    const response = await fetch("http://localhost:5800/auth/signup", {
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

    const data = await response.json();

    if (!response.ok) {
      notify({
        text: "An error occured, please try again",
        bgColor: "rgba(128, 0, 0, 0.2)",
        borderColor: "red"}
      );
      throw new Error(data.message);
    }

    if (!data.success) {
      notify({text: data.message, bgColor: "rgba(128, 0, 0, 0.2)", borderColor: "red"});
      return;
    }
    console.log("Sign Up Data", data);
    notify({text: data.message, bgColor: "rgba(0, 128, 0, 0.2)", borderColor: "green"});
    setTimeout(() => {
      window.location.href = "/frontend/pages/success.html";
    }, 3000);
  } catch (error: any) {
    throw new Error(error);
  }
}

async function signin(userObj: Omit<User, "firstName" | "lastName" | "email">) {
  try {
    const response = await fetch("http://localhost:5800/auth/signin", {
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
    
    const data = await response.json();

    if (!response.ok) {
      notify({
        text: "An error occured, please try again",
        bgColor:"rgba(128, 0, 0, 0.2)",
        borderColor: "red"}
      );
      throw new Error(data.message);
    }


    if (!data.success) {
      notify({text: data.message, bgColor: "rgba(128, 0, 0, 0.2)", borderColor: "red"});
      return;
    }

    console.log("Sign In Data", data);
    notify({text: data.message, bgColor: "rgba(0, 128, 0, 0.2)", borderColor: "green"});
    // setTimeout(() => {
    //   // window.location.href = "/frontend/pages/success.html";
    // }, 3000);
  } catch (error: any) {
    throw new Error(error);
  }
}

function notify(notificationObj: CustomNotification): void {
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

function verify(value: string): boolean {
  return value.length > 0;
}
