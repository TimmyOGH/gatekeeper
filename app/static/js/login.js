// --- Login Form Validations --- //
// Elements
const loginForm = document.getElementById("lgn-form");
const loginEmailInput = document.getElementById("lgn-email-input");
const loginPwInput = document.getElementById("lgn-pw-input");
const emailErrorMsg = document.getElementById("lgn-email-error-msg");
const invalidPwErrorMsg = document.getElementById("lgn-invalid-pw-error-msg");

// Regexes
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const pwRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/;

// --- Email Checking --- //
// Listen Email Input
loginEmailInput.addEventListener("input", () => {
  const email = loginEmailInput.value;

  // Red Border Until Valid Email
  if (emailRegex.test(email)) {
    loginEmailInput.style.borderColor = "#E5E7EB";

    // Hide Error Message If Visible
    if (!emailErrorMsg.classList.contains("hidden")) {
      emailErrorMsg.classList.add("hidden");
    }
  } else {
    loginEmailInput.style.borderColor = "#e74c3c";
  }

  // Back to Default Style
  if (email === "") {
    loginEmailInput.style.borderColor = "#E5E7EB";
  }
});

// --- Password Checking --- //
// Listen Password Input
loginPwInput.addEventListener("input", () => {
  const pw = loginPwInput.value;

  // Red Border Until Strong Password
  if (pwRegex.test(pw)) {
    loginPwInput.style.borderColor = "#E5E7EB";

    // Hide Error Message If Visible
    if (!invalidPwErrorMsg.classList.contains("hidden")) {
      invalidPwErrorMsg.classList.add("hidden");
    }
  } else {
    loginPwInput.style.borderColor = "#e74c3c";
  }

  // Back to Default Style
  if (pw === "") {
    loginPwInput.style.borderColor = "#E5E7EB";
  }
});

// --- Login Form Submit Checkings --- //
// Listen Form Submission
loginForm.addEventListener("submit", (e) => {
  const email = loginEmailInput.value;
  const pw = loginPwInput.value;

  let isValid = true;

  // Validate Email
  if (!emailRegex.test(email)) {
    emailErrorMsg.classList.remove("hidden");
    isValid = false;
  }

  // Validate Password
  if (!pwRegex.test(pw)) {
    invalidPwErrorMsg.classList.remove("hidden");
    isValid = false;
  }

  // Prevent Submission If Validation Failed
  if (!isValid) {
    e.preventDefault();
  }
});