export function getDayByDate(day) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const date = new Date(day);
  return days[date.getDay()];
}

export function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

export function getItem(key, defaultValue) {
  const item = JSON.parse(localStorage.getItem(key));
  if (item === null) {
    return defaultValue;
  }
  return item;
}

export function setItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}


export function getCurrentPosition(options = {}) {
  return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}