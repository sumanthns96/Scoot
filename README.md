project:
  name: Scoot – WhatsApp Event Recommendation Bot
  tagline: >
    Scoot is a WhatsApp-native bot that helps users discover local events—concerts, open mics, tech meetups, and more—based on their location and interests.

  problem: >
    People often miss out on great local events because discovery requires jumping between apps like Ticketmaster, Google, or Eventbrite.

  solution: >
    Scoot delivers personalized event recommendations directly within WhatsApp using a conversational interface powered by natural language processing, geolocation, and external event APIs. No downloads. No forms. Just instant, shareable event options—right where you chat.

  features:
    - Location-based recommendations (via WhatsApp or ZIP fallback)
    - GPT-4o NLP for natural language queries
    - Real-time event data from Ticketmaster API
    - Quick-reply buttons for "Show More" & "Share"
    - Group-friendly formatting in WhatsApp
    - Extensible for future APIs (Eventbrite, Meetup)

  tech_stack:
    backend: Node.js, Express
    messaging: Twilio WhatsApp Business API
    NLP: OpenAI GPT-4o
    event_data: Ticketmaster Discovery API
    location: Google Maps API, WhatsApp metadata
    database: Firebase
    hosting: Render, Vercel, AWS Lambda

  architecture_diagram: |
    User → WhatsApp → Twilio Webhook (Node.js)
                          ↓
             Parse user message intent (GPT-4o)
                          ↓
         Match query with Ticketmaster API data
                          ↓
      Format results → WhatsApp response template

  setup:
    prerequisites:
      - Node.js (v16+)
      - WhatsApp Business Account (via Twilio)
      - API keys:
          - Ticketmaster
          - OpenAI (GPT-4o)
          - Google Maps
    install:
      - git clone https://github.com/yourusername/scoot-whatsapp-bot.git
      - cd scoot-whatsapp-bot
      - npm install
    env_variables: |
      TWILIO_ACCOUNT_SID=
      TWILIO_AUTH_TOKEN=
      OPENAI_API_KEY=
      TICKETMASTER_API_KEY=
      GOOGLE_MAPS_API_KEY=
    run_locally: npm run dev
    note: Ngrok or similar required to expose localhost for webhook testing.

  roadmap:
    - Add Eventbrite and Meetup API integrations
    - User preference memory (save categories)
    - RSVP and Calendar sync features
    - Group voting on events
    - Geo-expansion beyond Durham
    - Admin dashboard for metrics + event control

  contributing: >
    Pull requests are welcome. If you’re interested in improving event ranking logic, adding new APIs, or working on UX flows inside WhatsApp, feel free to open an issue.

  license: MIT

  author:
    name: Sumanth Saligram
    note: >
      Built as a product portfolio project to explore messaging-first UX, event discovery, and conversational AI integration.
