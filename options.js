// Options page script for Boycotted Sites Alert Extension

// Import translations
import {
  LANGUAGES,
  getTranslation,
  setLanguage,
  getCurrentLanguage,
  loadLanguagePreference,
} from "./translations.js";

// DOM elements
const alertsEnabledCheckbox = document.getElementById("alerts-enabled");
const siteListElement = document.getElementById("site-list");
const newDomainInput = document.getElementById("new-domain");
const newReasonInput = document.getElementById("new-reason");
const addSiteButton = document.getElementById("add-site-button");
const saveMessage = document.getElementById("save-message");
const exportButton = document.getElementById("export-button");
const importButton = document.getElementById("import-button");
const importFileInput = document.getElementById("import-file");
const languageRadios = document.querySelectorAll('input[name="language"]');

// Load saved settings and boycotted sites
async function loadOptions() {
  const data = await chrome.storage.sync.get([
    "boycottedSites",
    "alertsEnabled",
    "language",
  ]);
  const boycottedSites = data.boycottedSites || [];
  const alertsEnabled =
    data.alertsEnabled !== undefined ? data.alertsEnabled : true;

  // Load language preference
  await loadLanguagePreference();

  // Set the language radio button
  const currentLang = getCurrentLanguage();
  document.querySelector(
    `input[name="language"][value="${currentLang}"]`
  ).checked = true;

  // Apply translations to UI
  applyTranslations();

  // Set the alerts enabled checkbox
  alertsEnabledCheckbox.checked = alertsEnabled;

  // Display the list of boycotted sites
  displaySiteList(boycottedSites);
}

// Apply translations to all UI elements
function applyTranslations() {
  // Page title
  document.title = getTranslation("optionsPageTitle");
  document.querySelector("h1").textContent = getTranslation("optionsPageTitle");

  // Alert settings section
  document.querySelector(".section-title").textContent =
    getTranslation("alertSettings");

  // Manage sites section
  document.querySelectorAll(".section-title")[1].textContent =
    getTranslation("manageSites");

  // Add new site form
  document.querySelectorAll(".section-title")[2].textContent =
    getTranslation("addNewSite");
  document.querySelector('label[for="new-domain"]').textContent =
    getTranslation("domain");
  newDomainInput.placeholder = getTranslation("domainPlaceholder");
  document.querySelector('label[for="new-reason"]').textContent =
    getTranslation("reasonForBoycott");
  newReasonInput.placeholder = getTranslation("reasonPlaceholder");
  addSiteButton.textContent = getTranslation("addToList");

  // Save message
  saveMessage.textContent = getTranslation("changesSaved");

  // Language section
  document.getElementById("language-section-title").textContent =
    getTranslation("language");
  document.querySelectorAll(".language-option span")[0].textContent =
    getTranslation("english");
  document.querySelectorAll(".language-option span")[1].textContent =
    getTranslation("turkish");

  // Import/Export section
  document.getElementById("import-export-title").textContent =
    getTranslation("importExport");
  exportButton.textContent = getTranslation("exportList");
  importButton.textContent = getTranslation("importList");
}

// Display the list of boycotted sites with edit and delete options
function displaySiteList(sites) {
  // Clear the current list
  siteListElement.innerHTML = "";

  if (sites.length === 0) {
    const emptyMessage = document.createElement("div");
    emptyMessage.className = "empty-list";
    emptyMessage.textContent = getTranslation("noSites");
    siteListElement.appendChild(emptyMessage);
    return;
  }

  // Create and append site items with edit and delete buttons
  sites.forEach((site, index) => {
    const siteItem = document.createElement("div");
    siteItem.className = "site-item";

    const siteInfo = document.createElement("div");
    siteInfo.className = "site-info";

    const siteDomain = document.createElement("div");
    siteDomain.className = "site-domain";
    siteDomain.textContent = site.domain;

    const siteReason = document.createElement("div");
    siteReason.className = "site-reason";
    siteReason.textContent = site.reason;

    siteInfo.appendChild(siteDomain);
    siteInfo.appendChild(siteReason);

    const siteActions = document.createElement("div");
    siteActions.className = "site-actions";

    const editButton = document.createElement("button");
    editButton.className = "secondary-button";
    editButton.textContent = getTranslation("edit");
    editButton.addEventListener("click", () => {
      // Populate form with site data for editing
      newDomainInput.value = site.domain;
      newReasonInput.value = site.reason;
      // Remove the site from the list (will be re-added on save)
      removeSite(index);
      // Scroll to the form
      document
        .querySelector(".add-site-form")
        .scrollIntoView({ behavior: "smooth" });
    });

    const deleteButton = document.createElement("button");
    deleteButton.className = "danger-button";
    deleteButton.textContent = getTranslation("delete");
    deleteButton.addEventListener("click", () => {
      if (confirm(getTranslation("confirmDelete", { domain: site.domain }))) {
        removeSite(index);
      }
    });

    siteActions.appendChild(editButton);
    siteActions.appendChild(deleteButton);

    siteItem.appendChild(siteInfo);
    siteItem.appendChild(siteActions);

    siteListElement.appendChild(siteItem);
  });
}

// Add a new site to the boycotted sites list
async function addSite() {
  const domain = newDomainInput.value.trim().toLowerCase();
  const reason = newReasonInput.value.trim();

  // Validate inputs
  if (!domain) {
    alert(getTranslation("enterDomain"));
    return;
  }

  if (!reason) {
    alert(getTranslation("enterReason"));
    return;
  }

  // Normalize domain (remove www. if present)
  let normalizedDomain = domain;
  if (normalizedDomain.startsWith("www.")) {
    normalizedDomain = normalizedDomain.substring(4);
  }

  // Get current list and add new site
  const data = await chrome.storage.sync.get(["boycottedSites"]);
  const boycottedSites = data.boycottedSites || [];

  // Check if domain already exists
  const existingIndex = boycottedSites.findIndex(
    (site) => site.domain === normalizedDomain
  );
  if (existingIndex >= 0) {
    if (confirm(getTranslation("siteExists", { domain: normalizedDomain }))) {
      boycottedSites[existingIndex].reason = reason;
    } else {
      return;
    }
  } else {
    // Add new site
    boycottedSites.push({
      domain: normalizedDomain,
      reason: reason,
    });
  }

  // Save updated list
  await chrome.storage.sync.set({ boycottedSites });

  // Clear form
  newDomainInput.value = "";
  newReasonInput.value = "";

  // Update display
  displaySiteList(boycottedSites);

  // Show save message
  showSaveMessage();
}

// Remove a site from the boycotted sites list
async function removeSite(index) {
  const data = await chrome.storage.sync.get(["boycottedSites"]);
  const boycottedSites = data.boycottedSites || [];

  // Remove the site at the specified index
  boycottedSites.splice(index, 1);

  // Save updated list
  await chrome.storage.sync.set({ boycottedSites });

  // Update display
  displaySiteList(boycottedSites);

  // Show save message
  showSaveMessage();
}

// Update alerts enabled setting
async function updateAlertsEnabled() {
  const enabled = alertsEnabledCheckbox.checked;
  await chrome.storage.sync.set({ alertsEnabled: enabled });
  showSaveMessage();
}

// Show save message and hide after a delay
function showSaveMessage() {
  saveMessage.style.display = "block";
  setTimeout(() => {
    saveMessage.style.display = "none";
  }, 3000);
}

// Export boycotted sites list as JSON file
async function exportSitesList() {
  const data = await chrome.storage.sync.get(["boycottedSites"]);
  const boycottedSites = data.boycottedSites || [];

  const blob = new Blob([JSON.stringify(boycottedSites, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "boycotted-sites.json";
  a.click();

  URL.revokeObjectURL(url);
}

// Import boycotted sites list from JSON file
function importSitesList() {
  importFileInput.click();
}

// Handle file selection for import
async function handleFileSelect(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async (e) => {
    try {
      const sites = JSON.parse(e.target.result);

      // Validate imported data
      if (!Array.isArray(sites)) {
        throw new Error(getTranslation("invalidFormat"));
      }

      for (const site of sites) {
        if (!site.domain || !site.reason) {
          throw new Error(getTranslation("invalidSiteFormat"));
        }
      }

      // Confirm import
      if (confirm(getTranslation("confirmImport", { count: sites.length }))) {
        await chrome.storage.sync.set({ boycottedSites: sites });
        displaySiteList(sites);
        showSaveMessage();
      }
    } catch (error) {
      alert(getTranslation("importError", { error: error.message }));
    }

    // Reset file input
    importFileInput.value = "";
  };

  reader.readAsText(file);
}

// Handle language change
function handleLanguageChange(event) {
  const newLanguage = event.target.value;
  setLanguage(newLanguage);
  applyTranslations();

  // Refresh the site list with new translations
  chrome.storage.sync.get(["boycottedSites"], (data) => {
    displaySiteList(data.boycottedSites || []);
  });

  // Show save message
  showSaveMessage();
}

// Event listeners
document.addEventListener("DOMContentLoaded", loadOptions);
alertsEnabledCheckbox.addEventListener("change", updateAlertsEnabled);
addSiteButton.addEventListener("click", addSite);
exportButton.addEventListener("click", exportSitesList);
importButton.addEventListener("click", importSitesList);
importFileInput.addEventListener("change", handleFileSelect);

// Add event listeners for language radio buttons
languageRadios.forEach((radio) => {
  radio.addEventListener("change", handleLanguageChange);
});

// Listen for storage changes to update UI
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === "sync" && changes.boycottedSites) {
    displaySiteList(changes.boycottedSites.newValue);
  }
});
