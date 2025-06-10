# 🛵 Scoot – WhatsApp Event Recommendation Bot

Scoot is a WhatsApp-native bot that helps users discover local events—concerts, open mics, tech meetups, and more—based on their location and interests.

> “What’s up this weekend in Boston?”  
> ➜ 🎯 *Page 1 of 3*

1. Hills
📍 Bijou, Boston
📅 Fri, Jun 6 at 10:00 PM
🔗 https://www.ticketweb.com/event/hills-bijou-tickets/14457593?REFERRAL_ID=tmfeed

2. Wilkinson
📍 Royale Boston, Boston
📅 Fri, Jun 6 at 10:00 PM
🔗 https://www.ticketweb.com/event/wilkinson-royale-boston-tickets/14282933?REFERRAL_ID=tmfeed


---

## 🧠 Problem

People often miss out on great local events because discovery requires jumping between apps like Ticketmaster, Google, or Eventbrite. 
---

## 💡 Solution

Scoot delivers personalized event recommendations directly within WhatsApp using a conversational interface powered by:
- Natural Language Processing (GPT‑4o)
- Real-time geolocation
- External event APIs (Ticketmaster, with Eventbrite and Meetup upcoming)

No downloads. No forms. Just instant, shareable event options—right where you chat.

---

## 🔧 Features

- 🗺️ Location-based recommendations (via WhatsApp or ZIP fallback)
- 🧠 GPT‑4o NLP for natural language queries
- 🎟️ Real-time event data from Ticketmaster API
- 💬 Quick-reply buttons: "Show More", "Share"
- 👥 Group-friendly formatting for WhatsApp
- 🔌 Extensible architecture for future API integrations

---

## ⚙️ Tech Stack

| Layer       | Tools Used                              |
|-------------|------------------------------------------|
| Backend     | Node.js, Express                         |
| Messaging   | Twilio WhatsApp Business API             |
| NLP         | OpenAI GPT‑4o                            |
| Event Data  | Ticketmaster Discovery API               |
| Location    | Google Maps API, WhatsApp metadata       |
| Database    | Firebase                                 |
| Hosting     | Render / Vercel / AWS Lambda (TBD)       |

---

## 🧱 Architecture

User → WhatsApp → Twilio Webhook (Node.js) → Parse user message intent (GPT-4o) → Match query with Ticketmaster API data →

Format results → WhatsApp response template

---

## 🚀 Getting Started

### 🔐 Prerequisites

- Node.js (v16+)
- WhatsApp Business Account (via Twilio)
- API keys for:
  - Ticketmaster
  - OpenAI (GPT-4)
  - Google Maps (for location fallback)

### ⚙️ Setup

```bash
git clone https://github.com/sumantns96/scoot-whatsapp-bot.git
cd scoot-whatsapp-bot
npm install
```


### 🔐 Env Variables

```env
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
OPENAI_API_KEY=
TICKETMASTER_API_KEY=
GOOGLE_MAPS_API_KEY=
```
### Local Run
```bash
npm run dev
```
You'll need to use Ngrok or a similar tunneling service to expose your local server to Twilio for webhook testing.





