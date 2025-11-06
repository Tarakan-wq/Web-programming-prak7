const form = document.getElementById("subscribe-form");
const emailInput = document.getElementById("email");
const errorMessage = document.getElementById("error-message");
const dialog = document.getElementById("success-dialog");
const userEmail = document.getElementById("user-email");
const closeDialog = document.getElementById("close-dialog");

const emailRegex = /^[\w.-]+@([\w-]+\.)+[\w-]{2,}$/;

// Перевірка формату та існування поштового домену
async function isValidEmail(email) {
  if (!emailRegex.test(email)) return false;

  const domain = email.split("@")[1];
  try {
    // Використаємо стороннє безкоштовне API для перевірки MX-запису
    const response = await fetch(`https://dns.google/resolve?name=${domain}&type=MX`);
    const data = await response.json();
    return data.Answer && data.Answer.length > 0;
  } catch {
    return false;
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const emailValue = emailInput.value.trim();

  errorMessage.textContent = "Checking email...";
  emailInput.classList.remove("invalid");

  const valid = await isValidEmail(emailValue);

  if (!valid) {
    errorMessage.textContent = "Please enter a real valid email";
    emailInput.classList.add("invalid");
  } else {
    errorMessage.textContent = "";
    document.getElementById("subscribe-section").classList.add("fade-out");

    setTimeout(() => {
      document.getElementById("subscribe-section").style.display = "none";
      userEmail.textContent = emailValue;
      dialog.showModal();
    }, 400);
  }
});

closeDialog.addEventListener("click", () => {
  dialog.close();
});
