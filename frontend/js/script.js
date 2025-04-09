const submitBtn = document.querySelector(".submit-btn");
const firstNameInput = document.getElementById("firstname");
const lastNameInput = document.getElementById("lastname");
const emailInput = document.getElementById("email");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
});

async function signup(firstName, lastName, email, username, password) {
  try {
    const response = await fetch("http://localhost:5500/aut/signup", {
      method: "POST",
      body: {
        firstName,
        lastName,
        email,
        username,
        password,
      },
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
    const response = await fetch("http://localhost:5500/aut/signin", {
      method: "POST",
      body: {
        username,
        password,
      },
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
