"use strict";
// Load users from localStorage
const users = JSON.parse(localStorage.getItem("users") || "[]");
// DOM elements
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const form = document.querySelector("form");
// Optional message container (inserted after the form)
const messageBox = document.createElement("div");
messageBox.className = "text-center text-sm mt-4";
form.after(messageBox);
// Handle form submit
form.addEventListener("submit", (e) => {
    e.preventDefault();
    messageBox.innerHTML = "";
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    // Validate empty inputs
    if (!email || !password) {
        showMessage("Please enter both email and password", "red");
        return;
    }
    // Find user
    const matchedUser = users.find((u) => u.email === email && u.password === password);
    if (matchedUser) {
        // Save login state
        localStorage.setItem("userName", matchedUser.username);
        sessionStorage.setItem("isLoggedIn", "true");
        // Redirect to exam page
        window.location.replace("exam.html");
    }
    else {
        showMessage("Invalid email or password", "red");
    }
});
// Reusable message display
function showMessage(text, color) {
    messageBox.innerHTML = `<p class="text-${color}-400">${text}</p>`;
}
