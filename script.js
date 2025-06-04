// API Configuration used to con. to the backend
const API_BASE_URL = "http://localhost:699";

// Authentication state
let authToken = localStorage.getItem("authToken");
let currentUser = null;

const authPage = document.getElementById("auth-page");
const dashboardPage = document.getElementById("dashboard-page");
const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");
const prayerForm = document.getElementById("prayer-form");

// Initialize the application
document.addEventListener("DOMContentLoaded", function () {
  if (authToken) {
    checkAuthAndLoadDashboard();
  } else {
    showAuthPage();
  }

  // Setup form event listeners
  setupEventListeners();
});

function setupEventListeners() {
  // Login form
  loginForm.addEventListener("submit", handleLogin);

  // Signup form
  signupForm.addEventListener("submit", handleSignup);

  // Prayer form
  prayerForm.addEventListener("submit", handleAddPrayer);
}

// Authentication Functions
async function handleLogin(e) {
  e.preventDefault();

  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;
  const errorDiv = document.getElementById("login-error");

  try {
    const response = await fetch(`${API_BASE_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok && data.accessToken) {
      authToken = data.accessToken;
      localStorage.setItem("authToken", authToken);
      errorDiv.textContent = "";
      await loadUserInfo();
      showDashboard();
      loadPrayers();
    } else {
      errorDiv.textContent = data.message || "Login failed";
    }
  } catch (error) {
    console.error("Login error:", error);
    errorDiv.textContent = "Network error. Please try again.";
  }
}

async function handleSignup(e) {
  e.preventDefault();

  const username = document.getElementById("signup-username").value;
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;
  const errorDiv = document.getElementById("signup-error");

  try {
    const response = await fetch(`${API_BASE_URL}/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      errorDiv.textContent = "";
      errorDiv.className = "success-message";
      errorDiv.textContent = "Account created successfully! Please login.";

      // Switch to login form after successful signup
      setTimeout(() => {
        showLogin();
        errorDiv.textContent = "";
        errorDiv.className = "error-message";
      }, 2000);
    } else {
      errorDiv.textContent = data.message || "Signup failed";
    }
  } catch (error) {
    console.error("Signup error:", error);
    errorDiv.textContent = "Network error. Please try again.";
  }
}

async function loadUserInfo() {
  try {
    const response = await fetch(`${API_BASE_URL}/user/get_login_info`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (response.ok) {
      currentUser = await response.json();
      document.getElementById(
        "user-name"
      ).textContent = `Welcome, ${currentUser.name}`;
    }
  } catch (error) {
    console.error("Error loading user info:", error);
  }
}

async function checkAuthAndLoadDashboard() {
  try {
    await loadUserInfo();
    showDashboard();
    loadPrayers();
  } catch (error) {
    // Token might be expired, show auth page
    logout();
  }
}

function logout() {
  authToken = null;
  currentUser = null;
  localStorage.removeItem("authToken");
  showAuthPage();
}

// Prayer Management Functions
async function handleAddPrayer(e) {
  e.preventDefault();

  const name = document.getElementById("prayer-name").value;
  const time = document.getElementById("prayer-time").value;
  const errorDiv = document.getElementById("prayer-error");
  const successDiv = document.getElementById("prayer-success");

  try {
    const response = await fetch(`${API_BASE_URL}/user/insert_prayer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, time }),
    });

    if (response.ok) {
      errorDiv.textContent = "";
      successDiv.textContent = "Prayer added successfully!";
      prayerForm.reset();
      loadPrayers(); // Refresh the prayers list

      // Clear success message after 3 seconds
      setTimeout(() => {
        successDiv.textContent = "";
      }, 3000);
    } else {
      const errorText = await response.text();
      successDiv.textContent = "";
      errorDiv.textContent = errorText || "Failed to add prayer";
    }
  } catch (error) {
    console.error("Error adding prayer:", error);
    successDiv.textContent = "";
    errorDiv.textContent = "Network error. Please try again.";
  }
}

async function loadPrayers() {
  const prayersList = document.getElementById("prayers-list");
  prayersList.innerHTML = '<div class="loading">Loading prayers...</div>';

  try {
    const response = await fetch(`${API_BASE_URL}/user/get_prayer`);

    if (response.ok) {
      const prayers = await response.json();
      displayPrayers(prayers);
    } else {
      prayersList.innerHTML =
        '<div class="error-message">Failed to load prayers</div>';
    }
  } catch (error) {
    console.error("Error loading prayers:", error);
    prayersList.innerHTML =
      '<div class="error-message">Network error loading prayers</div>';
  }
}

function displayPrayers(prayers) {
  const prayersList = document.getElementById("prayers-list");

  if (prayers.length === 0) {
    prayersList.innerHTML = `
            <div class="no-prayers">
                <h3>No prayers added yet</h3>
                <p>Add your first prayer using the form above</p>
            </div>
        `;
    return;
  }

  // Sort prayers by time
  prayers.sort((a, b) => a.time.localeCompare(b.time));

  prayersList.innerHTML = prayers
    .map(
      (prayer) => `
        <div class="prayer-item">
            <div class="prayer-info">
                <h3>${escapeHtml(prayer.name)}</h3>
                <p>Daily prayer time</p>
            </div>
            <div class="prayer-time">${formatTime(prayer.time)}</div>
        </div>
    `
    )
    .join("");
}

// UI Helper Functions
function showAuthPage() {
  authPage.classList.add("active");
  dashboardPage.classList.remove("active");
}

function showDashboard() {
  authPage.classList.remove("active");
  dashboardPage.classList.add("active");
}

function showLogin() {
  document.querySelector(".tab-btn.active").classList.remove("active");
  document.querySelectorAll(".tab-btn")[0].classList.add("active");

  document.querySelector(".auth-form.active").classList.remove("active");
  loginForm.classList.add("active");

  // Clear any error messages
  document.getElementById("login-error").textContent = "";
  document.getElementById("signup-error").textContent = "";
}

function showSignup() {
  document.querySelector(".tab-btn.active").classList.remove("active");
  document.querySelectorAll(".tab-btn")[1].classList.add("active");

  document.querySelector(".auth-form.active").classList.remove("active");
  signupForm.classList.add("active");

  // Clear any error messages
  document.getElementById("login-error").textContent = "";
  document.getElementById("signup-error").textContent = "";
}

// Utility Functions
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function formatTime(timeString) {
  // Convert 24-hour format to 12-hour format with AM/PM
  const [hours, minutes] = timeString.split(":");
  const hour12 = hours % 12 || 12;
  const ampm = hours >= 12 ? "PM" : "AM";
  return `${hour12}:${minutes} ${ampm}`;
}

// Make functions available globally for onclick handlers
window.showLogin = showLogin;
window.showSignup = showSignup;
window.logout = logout;
window.loadPrayers = loadPrayers;
