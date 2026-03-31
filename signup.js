document.getElementById("signupForm").addEventListener("submit", function(e) {
  e.preventDefault(); // stop page reload

  // Get values
  let username = document.getElementById("username").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let message = document.getElementById("message");

  // Simple validation
  if (username === "" || email === "" || password === "") {
    message.textContent = "All fields are required!";
    message.style.color = "red";
    return;
  }

  if (password.length < 6) {
    message.textContent = "Password must be at least 6 characters!";
    message.style.color = "red";
    return;
  }

  // Success
  message.textContent = "Signup successful!";
  message.style.color = "green";

  console.log("User Data:", {
    username,
    email,
    password
  });
});
document.getElementById("signupForm").addEventListener("submit", function(e) {
  e.preventDefault(); // stop page reload

  // Get values
  let username = document.getElementById("username").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let message = document.getElementById("message");

  // Simple validation
  if (username === "" || email === "" || password === "") {
    message.textContent = "All fields are required!";
    message.style.color = "red";
    return;
  }

  if (password.length < 6) {
    message.textContent = "Password must be at least 6 characters!";
    message.style.color = "red";
    return;
  }

  // Success
  message.textContent = "Signup successful!";
  message.style.color = "green";

  console.log("User Data:", {
    username,
    email,
    password
  });
});