const dayjs = require('dayjs');

function formatEventsToText(events) {
  return events.map((e, i) => {
    const timeStr = e.date && e.time
      ? `${dayjs(`${e.date}T${e.time}`).format('ddd, MMM D [at] h:mm A')}`
      : e.date || 'Date TBD';

    return `${i + 1}. ${e.name}\n📍 ${e.venue}${e.location ? ', ' + e.location : ''}\n📅 ${timeStr}\n🔗 ${e.url || 'No link available'}`;
  }).join('\n\n');
}

function splitEventsForPagination(events, size = 5) {
  const chunks = [];
  for (let i = 0; i < events.length; i += size) {
    chunks.push(events.slice(i, i + size));
  }
  return chunks;
}

module.exports = { formatEventsToText, splitEventsForPagination };
