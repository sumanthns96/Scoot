const axios = require('axios');
require('dotenv').config();

async function getEventsByCityCategoryTime(city, category, startDate, endDate) {
  try {
    const url = 'https://app.ticketmaster.com/discovery/v2/events.json';

    const params = {
      apikey: process.env.TICKETMASTER_API_KEY,
      city,
      classificationName: category !== 'events' ? category : undefined, // skip if generic
      startDateTime: `${startDate}T00:00:00Z`,
      endDateTime: `${endDate}T23:59:59Z`,
      sort: 'date,asc',
      size: 20
    };

    const { data } = await axios.get(url, { params });
    const events = data._embedded?.events || [];

    return events.map(event => ({
      name: event.name,
      url: event.url,
      date: event.dates?.start?.localDate || 'TBD',
      time: event.dates?.start?.localTime || '',
      venue: event._embedded?.venues?.[0]?.name || 'TBD',
      location: event._embedded?.venues?.[0]?.city?.name || ''
    }));
  } catch (error) {
    console.error('❌ Ticketmaster API Error:', error.message);
    return [];
  }
}

module.exports = { getEventsByCityCategoryTime };
