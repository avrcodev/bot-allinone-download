# 🤖 bot-allinone-download

**Download as much as you want** 🥵❤️  
A Telegram bot to automatically download content from various sources like books, videos, and more. (Tiktok, Youtube, Books)

---

## 🚀 Features

- 📚 Download books from Lectulandia
- 📹 Validate and process YouTube and TikTok links
- 📄 Download PDF files and send them directly via Telegram
- 🧠 Uses Puppeteer for automated navigation and downloads
- 📬 Send documents directly to Telegram chats

---

## 🤖 Live Bot

Try the bot here on Telegram:  
👉 [@FileDownloadAllBot](https://t.me/FileDownloadAllBot)

---

## 🔧 Local Installation

### 1. **Clone the repository**

```bash
git clone https://github.com/avrcodev/bot-allinone-download.git
cd bot-allinone-download
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up the environment variable

Create a `.env` file in the root directory and add your Telegram bot token:

```
TELEGRAM_BOT_TOKEN=your_token_here
```

> ⚠️ You can get the token from [@BotFather](https://t.me/BotFather) on Telegram.

### 4. Start the bot

```bash
node index.js
```

---

## 📁 Project Structure

```
bot-allinone-download/
├── functions/        # Specific functions (books, TikTok, etc.)
├── helpers/          # Utility functions and validators
├── index.js          # Bot entry point
├── .env              # Environment variables (do not commit)
├── package.json      # Dependencies and scripts
└── README.md         # This file
```

---

## 🛟 Requirements

- Node.js 18+
- npm
- Telegram account

---

## 📬 Contributions

Contributions are welcome! Feel free to open an issue or submit a pull request 🚀

