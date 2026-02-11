// --- Sidebar -- //
// Elements
const dashboardTab = document.getElementById("dash-tab");
const securityTab = document.getElementById("secu-tab");
const mainContentTitle = document.getElementById("main-content-title");
const mainContentContentDashboard = document.getElementById(
  "main-content-content-dashboard"
);
const mainContentContentSecurity = document.getElementById(
  "main-content-content-security"
);

// Tab Functionality
function setActiveTab(activeTab) {
  // Remove Active Styles From All Tabs
  const allTabs = document.querySelectorAll(".tab-button");
  allTabs.forEach((tab) => {
    tab.classList.remove(
      "bg-blue-100",
      "text-blue-700",
      "border-l-4",
      "border-blue-500"
    );
    tab.classList.add("text-gray-600", "hover:bg-gray-100");
  });

  // Add Active Styles To Clicked Tab
  activeTab.classList.remove("text-gray-600", "hover:bg-gray-100");
  activeTab.classList.add(
    "bg-blue-100",
    "text-blue-700",
    "border-l-4",
    "border-blue-500"
  );
}

// Listen Dashboard Tab
dashboardTab.addEventListener("click", () => {
  setActiveTab(dashboardTab);
  mainContentTitle.innerHTML = "Dashboard";
  mainContentContentDashboard.classList.remove("hidden");
  mainContentContentSecurity.classList.add("hidden");
});

// Listen Security Tab
securityTab.addEventListener("click", () => {
  setActiveTab(securityTab);
  mainContentTitle.innerHTML = "Security";
  mainContentContentDashboard.classList.add("hidden");
  mainContentContentSecurity.classList.remove("hidden");
});
