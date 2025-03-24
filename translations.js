// Translations for Boycotted Sites Alert Extension

// Available languages
const LANGUAGES = {
  EN: "en",
  TR: "tr",
};

// Translations object containing all text strings in different languages
const translations = {
  // Extension name and titles
  extensionName: {
    [LANGUAGES.EN]: "Boycotted Sites Alert",
    [LANGUAGES.TR]: "Boykot Edilen Siteler Uyarısı",
  },
  optionsPageTitle: {
    [LANGUAGES.EN]: "Boycotted Sites Alert - Options",
    [LANGUAGES.TR]: "Boykot Edilen Siteler Uyarısı - Ayarlar",
  },

  // Options page
  alertSettings: {
    [LANGUAGES.EN]: "Alert Settings",
    [LANGUAGES.TR]: "Uyarı Ayarları",
  },
  enableAlerts: {
    [LANGUAGES.EN]: "Enable boycott alerts",
    [LANGUAGES.TR]: "Boykot uyarılarını etkinleştir",
  },
  manageSites: {
    [LANGUAGES.EN]: "Manage Boycotted Sites",
    [LANGUAGES.TR]: "Boykot Edilen Siteleri Yönet",
  },
  loadingSites: {
    [LANGUAGES.EN]: "Loading boycotted sites...",
    [LANGUAGES.TR]: "Boykot edilen siteler yükleniyor...",
  },
  noSites: {
    [LANGUAGES.EN]: "No boycotted sites in your list. Add some below.",
    [LANGUAGES.TR]: "Listenizde boykot edilen site yok. Aşağıdan ekleyin.",
  },
  addNewSite: {
    [LANGUAGES.EN]: "Add New Site",
    [LANGUAGES.TR]: "Yeni Site Ekle",
  },
  domain: {
    [LANGUAGES.EN]: "Domain:",
    [LANGUAGES.TR]: "Alan Adı:",
  },
  domainPlaceholder: {
    [LANGUAGES.EN]: "example.com (without www)",
    [LANGUAGES.TR]: "ornek.com (www olmadan)",
  },
  reasonForBoycott: {
    [LANGUAGES.EN]: "Reason for Boycott:",
    [LANGUAGES.TR]: "Boykot Nedeni:",
  },
  reasonPlaceholder: {
    [LANGUAGES.EN]: "Explain why this site is being boycotted",
    [LANGUAGES.TR]: "Bu sitenin neden boykot edildiğini açıklayın",
  },
  addToList: {
    [LANGUAGES.EN]: "Add to List",
    [LANGUAGES.TR]: "Listeye Ekle",
  },
  changesSaved: {
    [LANGUAGES.EN]: "Changes saved successfully!",
    [LANGUAGES.TR]: "Değişiklikler başarıyla kaydedildi!",
  },
  importExport: {
    [LANGUAGES.EN]: "Import/Export",
    [LANGUAGES.TR]: "İçe/Dışa Aktar",
  },
  exportList: {
    [LANGUAGES.EN]: "Export List",
    [LANGUAGES.TR]: "Listeyi Dışa Aktar",
  },
  importList: {
    [LANGUAGES.EN]: "Import List",
    [LANGUAGES.TR]: "Listeyi İçe Aktar",
  },
  edit: {
    [LANGUAGES.EN]: "Edit",
    [LANGUAGES.TR]: "Düzenle",
  },
  delete: {
    [LANGUAGES.EN]: "Delete",
    [LANGUAGES.TR]: "Sil",
  },

  // Popup
  boycottedSites: {
    [LANGUAGES.EN]: "Boycotted Sites",
    [LANGUAGES.TR]: "Boykot Edilen Siteler",
  },
  alertsEnabled: {
    [LANGUAGES.EN]: "Alerts are enabled",
    [LANGUAGES.TR]: "Uyarılar etkinleştirildi",
  },
  alertsDisabled: {
    [LANGUAGES.EN]: "Alerts are disabled",
    [LANGUAGES.TR]: "Uyarılar devre dışı",
  },
  options: {
    [LANGUAGES.EN]: "Options",
    [LANGUAGES.TR]: "Ayarlar",
  },
  disableAlerts: {
    [LANGUAGES.EN]: "Disable Alerts",
    [LANGUAGES.TR]: "Uyarıları Devre Dışı Bırak",
  },
  enableAlertsButton: {
    [LANGUAGES.EN]: "Enable Alerts",
    [LANGUAGES.TR]: "Uyarıları Etkinleştir",
  },
  noSitesInList: {
    [LANGUAGES.EN]: "No boycotted sites in your list.",
    [LANGUAGES.TR]: "Listenizde boykot edilen site yok.",
  },

  // Alert modal
  boycottAlert: {
    [LANGUAGES.EN]: "Boycott Alert",
    [LANGUAGES.TR]: "Boykot Uyarısı",
  },
  siteOnBoycottList: {
    [LANGUAGES.EN]:
      "This website <strong>{domain}</strong> is on your boycott list.",
    [LANGUAGES.TR]:
      "Bu web sitesi <strong>{domain}</strong> boykot listenizde bulunuyor.",
  },
  reason: {
    [LANGUAGES.EN]: "Reason:",
    [LANGUAGES.TR]: "Neden:",
  },
  proceedAnyway: {
    [LANGUAGES.EN]: "Proceed Anyway",
    [LANGUAGES.TR]: "Yine de Devam Et",
  },
  goBack: {
    [LANGUAGES.EN]: "Go Back",
    [LANGUAGES.TR]: "Geri Dön",
  },

  // Alerts and confirmations
  enterDomain: {
    [LANGUAGES.EN]: "Please enter a domain name.",
    [LANGUAGES.TR]: "Lütfen bir alan adı girin.",
  },
  enterReason: {
    [LANGUAGES.EN]: "Please enter a reason for boycotting this site.",
    [LANGUAGES.TR]: "Lütfen bu siteyi boykot etme nedeninizi girin.",
  },
  confirmDelete: {
    [LANGUAGES.EN]:
      "Are you sure you want to remove {domain} from your boycott list?",
    [LANGUAGES.TR]:
      "{domain} sitesini boykot listenizden kaldırmak istediğinizden emin misiniz?",
  },
  siteExists: {
    [LANGUAGES.EN]:
      "{domain} is already in your list. Do you want to update the reason?",
    [LANGUAGES.TR]:
      "{domain} zaten listenizde mevcut. Nedeni güncellemek istiyor musunuz?",
  },
  confirmImport: {
    [LANGUAGES.EN]:
      "Import {count} boycotted sites? This will replace your current list.",
    [LANGUAGES.TR]:
      "{count} boykot edilen siteyi içe aktarmak istiyor musunuz? Bu işlem mevcut listenizi değiştirecektir.",
  },
  importError: {
    [LANGUAGES.EN]: "Error importing file: {error}",
    [LANGUAGES.TR]: "Dosya içe aktarılırken hata oluştu: {error}",
  },
  invalidFormat: {
    [LANGUAGES.EN]: "Invalid format: Expected an array of sites",
    [LANGUAGES.TR]: "Geçersiz format: Site dizisi bekleniyor",
  },
  invalidSiteFormat: {
    [LANGUAGES.EN]: "Invalid format: Each site must have a domain and reason",
    [LANGUAGES.TR]:
      "Geçersiz format: Her sitenin bir alan adı ve nedeni olmalıdır",
  },

  // Language settings
  language: {
    [LANGUAGES.EN]: "Language",
    [LANGUAGES.TR]: "Dil",
  },
  english: {
    [LANGUAGES.EN]: "English",
    [LANGUAGES.TR]: "İngilizce",
  },
  turkish: {
    [LANGUAGES.EN]: "Turkish",
    [LANGUAGES.TR]: "Türkçe",
  },
};

// Default language
let currentLanguage = LANGUAGES.EN;

// Function to get translation
function getTranslation(key, replacements = {}) {
  // Get the translation for the key in the current language
  let text = translations[key]?.[currentLanguage] || key;

  // Replace any placeholders with actual values
  for (const [placeholder, value] of Object.entries(replacements)) {
    text = text.replace(`{${placeholder}}`, value);
  }

  return text;
}

// Function to set the current language
function setLanguage(language) {
  if (Object.values(LANGUAGES).includes(language)) {
    currentLanguage = language;
    // Save the language preference
    chrome.storage.sync.set({ language });
    return true;
  }
  return false;
}

// Function to get the current language
function getCurrentLanguage() {
  return currentLanguage;
}

// Function to load the saved language preference
async function loadLanguagePreference() {
  const data = await chrome.storage.sync.get(["language"]);
  if (data.language) {
    setLanguage(data.language);
  }
  return currentLanguage;
}

// Export the functions and constants
export {
  LANGUAGES,
  getTranslation,
  setLanguage,
  getCurrentLanguage,
  loadLanguagePreference,
};
