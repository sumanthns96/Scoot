// src/services/llmParser.js
const { OpenAI } = require('openai');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function parseUserMessage(messageText) {
  console.log(`🤖 Parsing message with GPT: ${messageText}`);

  const systemPrompt = `
You are an event query parser. Given a user message asking about events, extract the city, category, and time window. Always return a JSON object like this:

{
  "city": "New York",
  "category": "music",
  "time": "this weekend"
}

Supported categories include: music, comedy, sports, or events.
If the user says "this weekend", "today", "next week", "this month", etc., extract those for time. Always provide clean city names like "Austin", not "Austin next week".
`;

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: messageText }
    ],
    temperature: 0.3
  });

  const rawText = response.choices[0].message.content.trim();

  try {
    const parsed = JSON.parse(rawText);
    const now = new Date();
    let startDate = now;
    let endDate = new Date();

    switch (parsed.time.toLowerCase()) {
      case 'today':
        endDate = new Date(startDate);
        break;
      case 'tomorrow':
        startDate.setDate(now.getDate() + 1);
        endDate = new Date(startDate);
        break;
      case 'this weekend': {
        const day = now.getDay();
        const saturday = new Date(now);
        saturday.setDate(now.getDate() + (6 - day));
        const sunday = new Date(saturday);
        sunday.setDate(saturday.getDate() + 1);
        startDate = saturday;
        endDate = sunday;
        break;
      }
      case 'next week': {
        const monday = new Date(now);
        monday.setDate(now.getDate() + ((8 - now.getDay()) % 7));
        const sunday = new Date(monday);
        sunday.setDate(monday.getDate() + 6);
        startDate = monday;
        endDate = sunday;
        break;
      }
      case 'this month': {
        const year = now.getFullYear();
        const month = now.getMonth();
        startDate = new Date(year, month, 1);
        endDate = new Date(year, month + 1, 0);
        break;
      }
      default:
        endDate.setDate(now.getDate() + 14);
        break;
    }

    const result = {
      city: capitalizeWords(parsed.city || 'New York'),
      category: parsed.category?.toLowerCase() || 'events',
      time: parsed.time || 'upcoming',
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0]
    };

    console.log('🎯 LLM Parsed:', result);
    return result;
  } catch (err) {
    console.error('❌ GPT parsing error:', err, '\nResponse was:', rawText);
    return {
      city: 'New York',
      category: 'events',
      time: 'upcoming',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14).toISOString().split('T')[0]
    };
  }
}

function capitalizeWords(str) {
  return str.replace(/\b\w/g, c => c.toUpperCase());
}

module.exports = { parseUserMessage };
