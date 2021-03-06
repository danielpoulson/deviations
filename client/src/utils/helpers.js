const moment = require('moment');

// export const serverURL = 'http://localhost:6060';
// export const serverURL = 'http://192.168.1.13:6060';
// export const serverURL = 'http://au01a112:6060';
export const serverURL = 'http://au01a112:3030';

export function calculateDay(date, closed) {
  let _dayDiff = '-';
  if (date) {
    if (closed === 0) {
      const currentTime = new Date().getTime();
      const logTime = new Date(date).getTime();
      const timeDiff = Math.abs(currentTime - logTime);
      _dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    }
  }

  return _dayDiff;
}

export function dayDiff(date) {
  let _dayDiff = 0;
  if (date) {
    const currentTime = Math.ceil(new Date() / (1000 * 3600 * 24));
    const logTime = Math.ceil(new Date(date) / (1000 * 3600 * 24));
    _dayDiff = currentTime - logTime;
  }

  return _dayDiff;
}

export function dpFormatDate(date) {
  return moment(date).format('DD/MM/YYYY');
}

export const fileRegex = /DV\d{6}\s[-]\s/;
