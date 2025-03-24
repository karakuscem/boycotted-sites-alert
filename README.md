# Boycotted Sites Alert - Chrome Extension

A Chrome extension that helps users stay informed about websites they choose to boycott by providing alerts when visiting these sites.

## Features

- 🚨 Real-time alerts when visiting boycotted websites
- ⚙️ Customizable boycott list management
- 📝 Add sites with detailed boycott reasons
- 💾 Import/Export functionality for boycott lists
- 🔄 Easy toggle for enabling/disabling alerts

## Installation

1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top-right corner
4. Click "Load unpacked" and select the extension directory

## Usage

### Managing Boycotted Sites
1. Click the extension icon in Chrome toolbar
2. Select "Options" to open the management page
3. Add new sites by entering:
   - Domain name (without www)
   - Reason for boycott
4. Use the toggle switch to enable/disable alerts

### Import/Export
- Export your boycott list to share or backup
- Import lists from other users or restore from backup

## Files Structure

- `manifest.json` - Extension configuration
- `options.html` - Settings page
- `popup.html` - Quick access popup
- `background.js` - Background service worker
- `content.js` - Content script for site detection
- `content.css` - Styles for alerts

## Permissions Used

- `storage` - For saving boycott list and settings
- `tabs` - For detecting current website
- `webNavigation` - For monitoring site navigation
- `scripting` - For injecting alert scripts

## Contributing

Feel free to submit issues and enhancement requests!

## License

[MIT License](LICENSE)