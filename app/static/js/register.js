// --- Register Form Validations --- //
// Elements
const registerForm = document.getElementById("reg-form");
const nameInput = document.getElementById("name-input");
const registerEmailInput = document.getElementById("reg-email-input");
const registerPwInput = document.getElementById("reg-pw-input");
const strengthFill = document.getElementById("strength-fill");
const nameErrorMsg = document.getElementById("name-error-msg");
const emailErrorMsg = document.getElementById("reg-email-error-msg");
const weakPwErrorMsg = document.getElementById("reg-weak-pw-error-msg");
const repeatPwInput = document.getElementById("rep-pw-input");
const repPwErrorMsg = document.getElementById("rep-pw-error-msg");

// Regexes
const nameRegex = /^(?=.*\s)[a-zA-Z\s]{2,50}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const pwRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/;

// --- Name Checking --- //
nameInput.addEventListener("input", () => {
  const name = nameInput.value;

  if (nameRegex.test(name)) {
    // Hide Error Message If Visible
    if (!nameErrorMsg.classList.contains("hidden")) {
      nameErrorMsg.classList.add("hidden");
    }
  }
});

// --- Email Checking --- //
registerEmailInput.addEventListener("input", () => {
  const email = registerEmailInput.value;

  // Red Border Until Valid Email
  if (emailRegex.test(email)) {
    registerEmailInput.style.borderColor = "#E5E7EB";

    // Hide Error Message If Visible
    if (!emailErrorMsg.classList.contains("hidden")) {
      emailErrorMsg.classList.add("hidden");
    }
  } else {
    registerEmailInput.style.borderColor = "#e74c3c";
  }

  // Back to Default Style
  if (email === "") {
    registerEmailInput.style.borderColor = "#E5E7EB";
  }
});

// --- Password Strength Checking --- //
// Listen Password Input
registerPwInput.addEventListener("input", () => {
  const pw = registerPwInput.value;

  // Red Border Until Strong Password
  if (pwRegex.test(pw)) {
    registerPwInput.style.borderColor = "#E5E7EB";

    // Hide Error Message If Visible
    if (!weakPwErrorMsg.classList.contains("hidden")) {
      weakPwErrorMsg.classList.add("hidden");
    }
  } else {
    registerPwInput.style.borderColor = "#e74c3c";
  }

  // Back to Default Style
  if (pw === "") {
    registerPwInput.style.borderColor = "#E5E7EB";
  }

  let strength = 0;

  // Increment Strength w/ Regexes
  if (pw.length >= 8) strength++;
  if (/[A-Z]/.test(pw)) strength++;
  if (/[a-z]/.test(pw)) strength++;
  if (/[0-9]/.test(pw)) strength++;
  if (/[^A-Za-z0-9]/.test(pw)) strength++;

  // Calculate Strength Percent
  let strengthPercent = (strength / 5) * 100;
  strengthFill.style.width = strengthPercent + "%";

  // Feedback Based on Colors
  if (strength <= 1) {
    strengthFill.style.background = "#e74c3c";
  } else if (strength === 2) {
    strengthFill.style.background = "#e67e22";
  } else if (strength === 3) {
    strengthFill.style.background = "#f1c40f";
  } else if (strength === 4) {
    strengthFill.style.background = "#3498db";
  } else if (strength === 5) {
    strengthFill.style.background = "#2ecc71";
  }
});

// --- Repeat Password Checking --- //
repeatPwInput.addEventListener("input", () => {
  const repPw = repeatPwInput.value;

  if (repPw === registerPwInput.value) {
    // Hide Error Message If Visible
    if (!repPwErrorMsg.classList.contains("hidden")) {
      repPwErrorMsg.classList.add("hidden");
    }
  }
});

// --- Register Form Submit Checkings --- //
// Listen Form Submission
registerForm.addEventListener("submit", (e) => {
  const name = nameInput.value;
  const email = registerEmailInput.value;
  const pw = registerPwInput.value;
  const repPw = repeatPwInput.value;

  let isValid = true;

  // Validate Name
  if (!nameRegex.test(name)) {
    nameErrorMsg.classList.remove("hidden");
    isValid = false;
  }

  // Validate Email
  if (!emailRegex.test(email)) {
    emailErrorMsg.classList.remove("hidden");
    isValid = false;
  }

  // Validate Password
  if (!pwRegex.test(pw)) {
    weakPwErrorMsg.classList.remove("hidden");
    isValid = false;
  }

  // Validate Repeat Password
  if (pw !== repPw) {
    repPwErrorMsg.classList.remove("hidden");
    isValid = false;
  }

  // Prevent Submission If Validation Failed
  if (!isValid) {
    e.preventDefault();
  }
});