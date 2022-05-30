export default function getWeeksDifference(startDate, endDate) {
  const ms = 1000 * 60 * 60 * 24 * 7
  return Math.round(Math.abs(endDate - startDate) / ms)
}
