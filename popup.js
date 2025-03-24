// Popup script for Boycotted Sites Alert Extension

// Import translations
import { getTranslation, loadLanguagePreference } from './translations.js';

// DOM elements
const siteListElement = document.getElementById('site-list');
const statusIndicator = document.getElementById('status-indicator');
const statusText = document.getElementById('status-text');
const optionsButton = document.getElementById('options-button');
const toggleAlertsButton = document.getElementById('toggle-alerts');
const popupTitle = document.getElementById('popup-title');
const boycottedSitesHeading = document.getElementById('boycotted-sites-heading');
const loadingMessage = document.getElementById('loading-message');

// Apply translations to static HTML elements
function applyTranslations() {
  // Update page title
  document.title = getTranslation('extensionName');
  
  // Update popup title
  popupTitle.textContent = getTranslation('extensionName');
  
  // Update boycotted sites heading
  boycottedSitesHeading.textContent = getTranslation('boycottedSites');
  
  // Update loading message
  loadingMessage.textContent = getTranslation('loadingSites');
  
  // Update buttons
  optionsButton.textContent = getTranslation('options');
}

// Load boycotted sites and extension status
async function loadData() {
  // Load language preference
  await loadLanguagePreference();
  
  // Apply translations to static HTML elements
  applyTranslations();
  
  // Get boycotted sites and alerts status from storage
  const data = await chrome.storage.sync.get(['boycottedSites', 'alertsEnabled']);
  const boycottedSites = data.boycottedSites || [];
  const alertsEnabled = data.alertsEnabled !== undefined ? data.alertsEnabled : true;
  
  // Update UI based on alerts status
  updateStatusUI(alertsEnabled);
  
  // Display boycotted sites
  displaySites(boycottedSites);
}

// Display the list of boycotted sites
function displaySites(sites) {
  // Clear the site list
  siteListElement.innerHTML = '';
  
  if (sites.length === 0) {
    // Show message if no sites are in the list
    const emptyMessage = document.createElement('div');
    emptyMessage.className = 'empty-list';
    emptyMessage.textContent = getTranslation('noSitesInList');
    siteListElement.appendChild(emptyMessage);
    return;
  }
  
  // Create and append site items
  sites.forEach(site => {
    const siteItem = document.createElement('div');
    siteItem.className = 'site-item';
    
    const siteDomain = document.createElement('div');
    siteDomain.className = 'site-domain';
    siteDomain.textContent = site.domain;
    
    const siteReason = document.createElement('div');
    siteReason.className = 'site-reason';
    siteReason.textContent = site.reason;
    
    siteItem.appendChild(siteDomain);
    siteItem.appendChild(siteReason);
    siteListElement.appendChild(siteItem);
  });
}

// Update the status indicator and text
function updateStatusUI(enabled) {
  if (enabled) {
    statusIndicator.className = 'status-indicator status-active';
    statusText.textContent = getTranslation('alertsEnabled');
    toggleAlertsButton.textContent = getTranslation('disableAlerts');
  } else {
    statusIndicator.className = 'status-indicator status-inactive';
    statusText.textContent = getTranslation('alertsDisabled');
    toggleAlertsButton.textContent = getTranslation('enableAlertsButton');
  }
}

// Toggle alerts enabled/disabled
async function toggleAlerts() {
  const data = await chrome.storage.sync.get(['alertsEnabled']);
  const currentStatus = data.alertsEnabled !== undefined ? data.alertsEnabled : true;
  const newStatus = !currentStatus;
  
  // Save new status
  await chrome.storage.sync.set({ alertsEnabled: newStatus });
  
  // Update UI
  updateStatusUI(newStatus);
}

// Open options page
function openOptions() {
  chrome.runtime.openOptionsPage();
}

// Event listeners
document.addEventListener('DOMContentLoaded', loadData);
toggleAlertsButton.addEventListener('click', toggleAlerts);
optionsButton.addEventListener('click', openOptions);

// Listen for storage changes to update UI
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'sync') {
    if (changes.boycottedSites) {
      displaySites(changes.boycottedSites.newValue);
    }
    if (changes.alertsEnabled !== undefined) {
      updateStatusUI(changes.alertsEnabled.newValue);
    }
  }
});