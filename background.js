// Background Service Worker for Boycotted Sites Alert Extension

// Default list of boycotted sites
const defaultBoycottedSites = [
  { domain: "example.com", reason: "Example boycott reason" },
  { domain: "example.org", reason: "Another example boycott reason" }
];

// Initialize the extension data
chrome.runtime.onInstalled.addListener(async () => {
  // Check if we already have stored boycotted sites
  const data = await chrome.storage.sync.get(['boycottedSites', 'alertsEnabled']);
  
  if (!data.boycottedSites) {
    // If not, set the default list
    await chrome.storage.sync.set({ boycottedSites: defaultBoycottedSites });
  }
  
  // Set alerts enabled by default if not already set
  if (data.alertsEnabled === undefined) {
    await chrome.storage.sync.set({ alertsEnabled: true });
  }
  
  console.log('Boycotted Sites Alert extension initialized');
});

// Function to normalize URLs for consistent matching
function normalizeUrl(url) {
  try {
    const urlObj = new URL(url);
    // Remove 'www.' prefix if present
    let hostname = urlObj.hostname;
    if (hostname.startsWith('www.')) {
      hostname = hostname.substring(4);
    }
    return hostname;
  } catch (e) {
    console.error('Error normalizing URL:', e);
    return url; // Return original URL if parsing fails
  }
}

// Check if a URL matches any boycotted site
async function checkIfBoycotted(url) {
  const normalizedUrl = normalizeUrl(url);
  const data = await chrome.storage.sync.get(['boycottedSites', 'alertsEnabled']);
  
  // If alerts are disabled, don't check
  if (!data.alertsEnabled) {
    return { isBoycotted: false };
  }
  
  // Check if the normalized URL matches any boycotted domain
  const match = data.boycottedSites.find(site => {
    return normalizedUrl.includes(site.domain);
  });
  
  return {
    isBoycotted: !!match,
    siteInfo: match
  };
}

// Listen for navigation events
chrome.webNavigation.onCommitted.addListener(async (details) => {
  // Only check main frame navigations (not iframes, etc.)
  if (details.frameId === 0) {
    const result = await checkIfBoycotted(details.url);
    
    if (result.isBoycotted) {
      // Send message to content script to show alert
      // Wait a moment to ensure content script is loaded
      setTimeout(() => {
        chrome.tabs.sendMessage(details.tabId, {
          action: 'showBoycottAlert',
          siteInfo: result.siteInfo
        }).catch(error => {
          console.error('Error sending message to content script:', error);
          // Try to inject the content script if it failed
          chrome.scripting.executeScript({
            target: { tabId: details.tabId },
            files: ['content.js']
          }).then(() => {
            // Try sending the message again after injecting
            chrome.tabs.sendMessage(details.tabId, {
              action: 'showBoycottAlert',
              siteInfo: result.siteInfo
            }).catch(err => console.error('Failed to send message after script injection:', err));
          }).catch(err => console.error('Failed to inject content script:', err));
        });
      }, 500); // 500ms delay
      
      // Optional: Log the boycotted site visit for metrics
      console.log(`Boycotted site visited: ${details.url}`);
    }
  }
});

// Listen for messages from popup, options page, or content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'getBoycottedSites') {
    // Return the list of boycotted sites
    chrome.storage.sync.get(['boycottedSites'], (data) => {
      sendResponse({ boycottedSites: data.boycottedSites || [] });
    });
    return true; // Required for async sendResponse
  }
  
  if (message.action === 'getTranslations') {
    // Import the translations module
    importScripts('translations.js');
    
    // Create a simplified version of translation functions for content script
    const translationFunctions = {
      getTranslation: function(key, replacements) {
        // Basic implementation that works without ES modules
        let text = key;
        // In a real implementation, you would access the translations object
        // and return the appropriate translation
        return text;
      }
    };
    
    sendResponse({ translationFunctions });
    return true;
  }
});