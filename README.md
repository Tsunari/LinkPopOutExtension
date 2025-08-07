
# LinkPopOutExtension

![Edge Extension](https://img.shields.io/badge/Edge-Extension-blue?logo=microsoftedge)
![Status](https://img.shields.io/badge/status-active-success)
![License](https://img.shields.io/github/license/Tsunari/LinkPopOutExtension)

## 🚀 Features

- **Popout Links:** Open any link in a modal popout (iframe) with Shift+Click.
- **Blacklist Domains:** Manage a blacklist so links on those sites open in a new window instead of a modal.
- **Modern UI:** Beautiful dark mode popup for managing your blacklist.
- **Keyboard Shortcuts:** Close popouts with Escape or Ctrl+W.
- **Edge/Chrome Compatible:** Works on most websites, with graceful error handling for restricted pages.

## 🖥️ Installation

1. Clone or download this repository.
2. Go to `edge://extensions` or `chrome://extensions` in your browser.
3. Enable **Developer mode**.
4. Click **Load unpacked** and select the project folder.
5. The extension will appear in your browser bar.

## 🛠️ Usage

- **Shift+Click** any link to open it in a popout modal (unless blacklisted).
- Click the extension icon to manage your blacklist for the current site.
- Blacklisted sites will open links in a new window instead of a modal.
- Close popouts with **Escape** or **Ctrl+W**.

## 📁 Project Structure

```
src/
  content.js        # Main content script
  popup.html        # Extension popup UI
  popup.js          # Popup logic
  manifest.json     # Extension manifest
icons/
  16x16.png
  48x48.png
  128x128.png
README.md
LICENSE
```

## 📝 License

This project is licensed under the MIT License.