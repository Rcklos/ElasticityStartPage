export function getDateStringOfDay(targetDay = 0, format = 'Y-MM-dd') {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()
  const date = now.getDate()
  const day = now.getDay()
  const diffDay = parseInt(targetDay, 10) - parseInt(day, 10)
  const today = new Date(year, month, date)
  const targetDate = new Date(today.getTime() 
    + (diffDay * 24 * 60 * 60 * 1000))
  return new Date(targetDate).pattern(format)
}

export function getZeroDateOfDay(targetDay = 0) {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()
  const date = now.getDate()
  const day = now.getDay()
  const diffDay = parseInt(targetDay, 10) - parseInt(day, 10)
  const nowZeroDate = new Date(year, month, date)
  const targetDate = new Date(nowZeroDate.getTime() +
    diffDay * 24 * 60 * 60 *1000)
  return targetDate
}

// 2022-5-22
//console.log(getDateString(0))
// 2022-5-23
//console.log(getDateString(1))
// 2022-5-21
//console.log(getDateString(-1))
// 20:25:27
//console.log(new Date().pattern('H:m:s'))
// 0:0:0
//console.log(getTimeFormate(0, 0, 0))
// 20:25:27
//console.log(getTimeFormate(20, 25, 27))

//export { getTimeFormate, getTimeFormate }

//export default {
  //getDateString,
  //getTimeFormate
//}
