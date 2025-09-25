function convertUnixToLocal(unixTime: number, timezoneOffset: number) {
  // Create a Date object in UTC
  const utcDate = new Date(unixTime * 1000);
  // Add timezone offset (in seconds)
  const localTime = new Date(utcDate.getTime() + timezoneOffset * 1000);
  return localTime;
}
export { convertUnixToLocal };

