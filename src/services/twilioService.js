// twilioService.js
const twilio = require('twilio');
require('dotenv').config();

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

/**
 * Sends a WhatsApp message via Twilio
 * @param {string} to - Recipient phone number (E.164 format, no 'whatsapp:' prefix needed)
 * @param {string} body - Text message body
 * @param {string|null} mediaUrl - Optional media URL (image, etc.)
 */
function sendWhatsAppMessage(to, body, mediaUrl = null) {
  const message = {
    from: 'whatsapp:+14155238886', // Twilio Sandbox number
    to: `whatsapp:${to}`,
    body
  };

  if (mediaUrl) {
    message.mediaUrl = [mediaUrl];
  }

  return client.messages.create(message);
}

module.exports = { sendWhatsAppMessage };
