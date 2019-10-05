export function getDayByDate(day) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const date = new Date(day);
  return days[date.getDay()];
}

export function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}