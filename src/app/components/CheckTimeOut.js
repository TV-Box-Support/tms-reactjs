export function CheckTimeOut(dateTimeString) {
  const timestamp = new Date(dateTimeString).getTime();
  const currentTime = new Date().getTime();
  const timeDifferenceInMinutes = Math.floor((currentTime - timestamp) / (1000 * 60));

  return timeDifferenceInMinutes > 60;
}
