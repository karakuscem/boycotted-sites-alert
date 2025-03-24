// Content script for Boycotted Sites Alert Extension

// We can't use ES modules in content scripts directly, so we'll define these functions here
// or load them differently
let translationFunctions = {};

// Function to load translations
function initializeTranslations() {
  // Request translations from the background script
  chrome.runtime.sendMessage({ action: 'getTranslations' }, (response) => {
    if (response && response.translationFunctions) {
      translationFunctions = response.translationFunctions;
    }
  });
}

// Initialize when content script loads
initializeTranslations();

// Create and inject the alert modal into the page
function createAlertModal(siteInfo) {
  // Create modal container
  const modal = document.createElement('div');
  modal.id = 'boycott-alert-modal';
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 2147483647;
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  // Create modal content
  const modalContent = document.createElement('div');
  modalContent.style.cssText = `
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    max-width: 500px;
    width: 80%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  `;

  // Create header
  const header = document.createElement('h2');
  header.textContent = translationFunctions.getTranslation ? translationFunctions.getTranslation('boycottAlert') : 'Boycott Alert';
  header.style.cssText = `
    color: #d32f2f;
    margin-top: 0;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
  `;

  // Create message
  const message = document.createElement('p');
  message.innerHTML = `
    ${translationFunctions.getTranslation ? translationFunctions.getTranslation('siteOnBoycottList', { domain: siteInfo.domain }) : `This website <strong>${siteInfo.domain}</strong> is on your boycott list.`}<br>
    <strong>${translationFunctions.getTranslation ? translationFunctions.getTranslation('reason') : 'Reason:'}</strong> ${siteInfo.reason}
  `;
  message.style.cssText = `
    margin: 15px 0;
    line-height: 1.5;
    color: #333333;
    font-weight: 500;
  `;

  // Create buttons container
  const buttonsContainer = document.createElement('div');
  buttonsContainer.style.cssText = `
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  `;

  // Create proceed button
  const proceedButton = document.createElement('button');
  proceedButton.textContent = translationFunctions.getTranslation ? translationFunctions.getTranslation('proceedAnyway') : 'Proceed Anyway';
  proceedButton.style.cssText = `
    padding: 8px 16px;
    background-color: #f44336;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  `;
  proceedButton.addEventListener('click', () => {
    document.body.removeChild(modal);
  });

  // Create go back button
  const goBackButton = document.createElement('button');
  goBackButton.textContent = translationFunctions.getTranslation ? translationFunctions.getTranslation('goBack') : 'Go Back';
  goBackButton.style.cssText = `
    padding: 8px 16px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  `;
  goBackButton.addEventListener('click', () => {
    history.back();
  });

  // Assemble the modal
  buttonsContainer.appendChild(goBackButton);
  buttonsContainer.appendChild(proceedButton);
  
  modalContent.appendChild(header);
  modalContent.appendChild(message);
  modalContent.appendChild(buttonsContainer);
  
  modal.appendChild(modalContent);
  
  // Add to page
  document.body.appendChild(modal);
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'showBoycottAlert' && message.siteInfo) {
    // Make sure the DOM is fully loaded before showing the alert
    if (document.readyState === 'complete') {
      createAlertModal(message.siteInfo);
    } else {
      window.addEventListener('load', () => {
        createAlertModal(message.siteInfo);
      });
    }
  }
  return true;
});