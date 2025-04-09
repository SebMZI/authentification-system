const submitBtn = document.querySelector(".submit-btn");
const firstNameInput = document.getElementById("firstname");
const lastNameInput = document.getElementById("lastname");
const emailInput = document.getElementById("email");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

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

    if (!response.success) {
      throw new Error(response.message);
    }

    const data = await response.json();
    console.log("Sign Up Data", data);
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

    if (!response.success) {
      throw new Error(response.message);
    }

    const data = await response.json();
    console.log("Sign In Data", data);
  } catch (error) {
    throw new Error(error);
  }
}
