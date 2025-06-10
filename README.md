
---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- WhatsApp Business Account (via Twilio)
- API keys for:
  - Ticketmaster
  - OpenAI (GPT-4)
  - Google Maps (for location fallback)

### Setup

```bash
git clone https://github.com/yourusername/scoot-whatsapp-bot.git
cd scoot-whatsapp-bot
npm install

**Add your environment variables to .env:**
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
OPENAI_API_KEY=
TICKETMASTER_API_KEY=
GOOGLE_MAPS_API_KEY=

**Run Locally**
npm run dev
Ngrok (or similar) is required to expose localhost for WhatsApp webhook testing.

🤝 Contributing

Pull requests are welcome. If you’re interested in improving event ranking logic, adding new APIs, or working on UX flows inside WhatsApp, feel free to open an issue.

✨ Author

Sumanth Saligram
Built as a product portfolio project to explore messaging-first UX, event discovery, and conversational AI integration.

---

Let me know if you'd like me to generate:
- A matching `package.json`
- Example `.env` file
- Sample event card WhatsApp message format  
- Or convert this to Markdown for a portfolio website.
