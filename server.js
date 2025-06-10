const express = require('express');
const cors = require('cors');
const { sendWhatsAppMessage } = require('./src/services/twilioService');
const { formatEventsToText, splitEventsForPagination } = require('./src/services/formatter');
const { parseUserMessage } = require('./src/services/llmParser');
const { getEventsByCityCategoryTime } = require('./src/services/ticketmasterService');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const paginationStore = {};

function splitMessageByLength(text, maxLength = 1500) {
  const chunks = [];
  while (text.length > 0) {
    let chunk = text.slice(0, maxLength);
    const lastBreak = Math.max(chunk.lastIndexOf('\n\n'), chunk.lastIndexOf('\n'));
    if (lastBreak > 100) {
      chunk = chunk.slice(0, lastBreak);
    }
    chunks.push(chunk.trim());
    text = text.slice(chunk.length).trim();
  }
  return chunks;
}

app.get('/', (req, res) => {
  res.send('🎉 WhatsApp Event Bot is running!');
});

app.post('/webhook', async (req, res) => {
  const message = req.body.Body.trim().toLowerCase();
  const sender = req.body.From.replace('whatsapp:', '');

  console.log(`📨 ${sender}: ${message}`);

  try {
    if (message === 'show more') {
      const pages = paginationStore[sender];
      if (pages && pages.length > 0) {
        const nextChunk = pages.shift();
        const totalPages = pages.length + 1;
        const currentPage = totalPages - pages.length;

        const replyBody = `🎯 *Page ${currentPage} of ${totalPages}*\n\n` + formatEventsToText(nextChunk);
        const messageChunks = splitMessageByLength(replyBody, 1500);

        const remainingCount = pages.reduce((sum, arr) => sum + arr.length, 0);

        for (let i = 0; i < messageChunks.length; i++) {
          const suffix = i === messageChunks.length - 1 && remainingCount > 0
            ? `\n\n🧾 *${remainingCount} more event${remainingCount > 1 ? 's' : ''} remaining.*\nReply with *Show More* to see the next set of events.`
            : '';
          await sendWhatsAppMessage(sender, messageChunks[i] + suffix);
        }

        paginationStore[sender] = pages;
      } else {
        await sendWhatsAppMessage(sender, '📭 No more events to show.');
      }
    } else {
      const { city, category, startDate, endDate } = await parseUserMessage(message);
      const events = await getEventsByCityCategoryTime(city, category, startDate, endDate);

      if (!events || events.length === 0) {
        await sendWhatsAppMessage(sender, `😕 Sorry, I couldn't find any ${category} events in ${city} for that time.`);
      } else {
        const chunks = splitEventsForPagination(events, 5);
        const firstChunk = chunks.shift();
        paginationStore[sender] = chunks;

        const totalPages = chunks.length + 1;
        const currentPage = 1;
        const remainingCount = chunks.reduce((sum, arr) => sum + arr.length, 0);

        const replyBody = `🎯 *Page ${currentPage} of ${totalPages}*\n\n` + formatEventsToText(firstChunk);
        const messageChunks = splitMessageByLength(replyBody, 1500);

        for (let i = 0; i < messageChunks.length; i++) {
          const suffix = i === messageChunks.length - 1 && remainingCount > 0
            ? `\n\n🧾 *${remainingCount} more event${remainingCount > 1 ? 's' : ''} remaining.*\nReply with *Show More* to see the next set of events.`
            : '';
          await sendWhatsAppMessage(sender, messageChunks[i] + suffix);
        }
      }
    }
  } catch (error) {
    console.error('❌ Error handling message:', error);
    await sendWhatsAppMessage(sender, '⚠️ Sorry, something went wrong while processing your request.');
  }

  res.set('Content-Type', 'text/xml');
  res.send('<Response></Response>');
});

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
