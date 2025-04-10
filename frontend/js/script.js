const submitBtn = document.querySelector(".submit-btn");
const firstNameInput = document.getElementById("firstname");
const lastNameInput = document.getElementById("lastname");
const emailInput = document.getElementById("email");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const notification = document.querySelector(".notification");

submitBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  if (submitBtn.dataset.page === "signin") {
    await signin(usernameInput.value, passwordInput.value);
  } else if (submitBtn.dataset.page === "signup") {
    console.log(
      firstNameInput.value,
      lastNameInput.value,
      emailInput.value,
      usernameInput.value,
      passwordInput.value
    );
    signup(
      firstNameInput.value,
      lastNameInput.value,
      emailInput.value,
      usernameInput.value,
      passwordInput.value
    );
  }
});

async function signup(firstName, lastName, email, username, password) {
  try {
    const response = await fetch("http://localhost:5500/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        username,
        password,
      }),
    });

    if (!response.ok) {
      notify(
        "An error occured, please try again",
        "rgba(128, 0, 0, 0.2)",
        "red"
      );
      throw new Error(response.message);
    }

    const data = await response.json();
    if (!data.success) {
      notify(data.message, "rgba(128, 0, 0, 0.2)", "red");
    }
    console.log("Sign Up Data", data);
    notify(data.message, "rgba(0, 128, 0, 0.2)", "green");
  } catch (error) {
    throw new Error(error);
  }
}

async function signin(username, password) {
  try {
    const response = await fetch("http://localhost:5500/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (!response.ok) {
      notify(
        "An error occured, please try again",
        "rgba(128, 0, 0, 0.2)",
        "red"
      );
      throw new Error(response.message);
    }

    const data = await response.json();
    if (!data.success) {
      notify(data.message, "rgba(128, 0, 0, 0.2)", "red");
    }

    console.log("Sign In Data", data);
    notify(data.message, "rgba(0, 128, 0, 0.2)", "green");
  } catch (error) {
    throw new Error(error);
  }
}

function notify(text, bgColor, borderColor) {
  notification.textContent = text;
  notification.style.backgroundColor = bgColor;
  notification.style.borderColor = borderColor;
  notification.style.color = borderColor;
  notification.style.top = "5px";

  setTimeout(() => {
    notification.style.top = "-100%";
  }, 3000);
}
