const moment = require('moment-timezone');

function getDateRange(time) {
  const now = moment().tz('America/New_York'); // Adjust if needed
  let startDate, endDate;

  switch (time.toLowerCase()) {
    case 'today':
      startDate = now.clone().startOf('day');
      endDate = now.clone().endOf('day');
      break;
    case 'tomorrow':
      startDate = now.clone().add(1, 'day').startOf('day');
      endDate = now.clone().add(1, 'day').endOf('day');
      break;
    case 'this weekend':
      startDate = now.clone().day(5).startOf('day'); // Friday
      endDate = now.clone().day(7).endOf('day'); // Sunday
      break;
    case 'next week':
      startDate = now.clone().add(1, 'week').startOf('week');
      endDate = now.clone().add(1, 'week').endOf('week');
      break;
    default:
      startDate = now.clone();
      endDate = now.clone().add(7, 'days').endOf('day');
      break;
  }

  return {
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString()
  };
}

module.exports = { getDateRange };
