export function getDateString(targetDay = 0, format = 'Y-M-d') {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()
  const day = now.getDate()
  const today = new Date(year, month, day)
  const targetDate = new Date(today.getTime() 
    + (targetDay * 24 * 60 * 60 * 1000))
  return new Date(targetDate).pattern(format)
}

export function getZeroDateByOffset(offset) {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()
  const day = now.getDate()
  const nowZeroDate = new Date(year, month, day)
  const targetDate = new Date(nowZeroDate.getTime() +
    offset * 24 * 60 * 60 *1000)
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
