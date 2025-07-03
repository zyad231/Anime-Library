"use strict";
// Get input fields
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");
const form = document.querySelector("form");
// Add a place for showing messages
const messageBox = document.createElement("div");
messageBox.className = "text-center text-sm mt-4";
form.after(messageBox);
// Load existing users from localStorage
let users = JSON.parse(localStorage.getItem("users") || "[]");
// Validate password match in real-time
confirmPasswordInput.addEventListener("input", () => {
    confirmPasswordInput.style.borderColor =
        confirmPasswordInput.value === passwordInput.value ? "green" : "red";
});
// Form submit handler
form.addEventListener("submit", (e) => {
    e.preventDefault();
    messageBox.innerHTML = "";
    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    // Basic validation
    if (!username || !email || !password || !confirmPassword) {
        showMessage("All fields are required.", "red");
        return;
    }
    // Email format check
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        showMessage("Invalid email format.", "red");
        return;
    }
    // Password match
    if (password !== confirmPassword) {
        showMessage("Passwords do not match.", "red");
        return;
    }
    // Check if email is already registered
    const emailExists = users.some((u) => u.email === email);
    if (emailExists) {
        showMessage("User with this email already exists.", "red");
        return;
    }
    // Add user and save
    const newUser = { username, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    showMessage("Account created successfully! Redirecting...", "green");
    setTimeout(() => {
        window.location.href = "login.html";
    }, 1500);
});
// Helper to show feedback
function showMessage(text, color) {
    messageBox.innerHTML = `<p class="text-${color}-400">${text}</p>`;
}
