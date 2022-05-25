import randomColor from 'randomcolor'
//import { weekJson as templateWeekJson } from '@/res'
import local from '@/utils/local.js'
import { getDateStringOfDay } from '@/utils/date.js'
import { getRandomCode } from '@/utils/common.js'

let weekJson = local.get('weekJson') || {}
//let weekJson = templateWeekJson

export function queryItemList(dayString) {
  return weekJson[dayString]
}

export function notifyUpdateItemList() {
  weekJson = local.get('weekJson') || {}
}

const compareFun = (a, b) => {
  if(a.start === undefined && b.start === undefined)
    return 0
  if(a.start === undefined)
    return -1
  if(b.start === undefined)
    return 1
  return a.start - b.start
}

function generateRandomColor() {
  const backgroundColor = randomColor()
  // 计算背景颜色
  const red = parseInt(backgroundColor.slice(1, 3), 16)
  const green = parseInt(backgroundColor.slice(3, 5), 16)
  const blue = parseInt(backgroundColor.slice(6, 8), 16)
  const average = (red + green + blue) / 3
  let color = 'white'
  if(average > 110){
    color = 'black'
  }
  return {
    fontColor: color,
    backgroundColor: backgroundColor
  }
}

function generateBlank(
  title = '',       // 标题
  startTime = '',   // 起始时间HH:mm:ss
  duration = 0,     // 持续时间min
  position = 0,     // 渲染位置(Y轴 0 ~ 1)
  height = 0,       // 渲染高度(0 ~ 1)
  color = 'black',  // 字体颜色
  backgroundColor = 'white', // 背景颜色
  index = 0,        // 待办索引, 用于检索
  uniqueKey = getRandomCode()
) {
    return {
      title,
      startTime,
      duration,
      position,
      height,
      color,
      backgroundColor,
      index,
      uniqueKey
    }
}

const SIZE_OF_WHOLE_DAY = 24 * 60 * 60 * 1000.0
const FMT_START_TIME = 'HH:mm'
export function parseItemList(dayItems, zeroDate) {
  // 如果当天日程为空则返回
  if(dayItems === undefined || dayItems.length === 0) {
    return [generateBlank( '', '', 0, 0, 1, 'black', 'white')]
  }

  // 按时间顺序排序
  dayItems.sort(compareFun)
  const dayItemList = []
  // 插入第一天白板
  const zeroHeight = (dayItems[0].start - zeroDate.getTime()) 
    / SIZE_OF_WHOLE_DAY
  //console.log(zeroDate.getTime())
  //console.log(dayItems[0])
  dayItemList.push(generateBlank('', '', 0, 0, zeroHeight))

  // 插入待办
  for(let i = 0; i < dayItems.length; i++) {
    const item = dayItems[i]
    const colors = generateRandomColor()
    dayItemList.push(generateBlank(
      item.title,
      new Date(item.start).pattern(FMT_START_TIME),
      item.duration / 60 / 1000,
      (item.start - zeroDate.getTime()) / SIZE_OF_WHOLE_DAY,
      item.duration / SIZE_OF_WHOLE_DAY,
      colors.fontColor,
      colors.backgroundColor
    ))
    
    // 插入白板
    if(i === dayItems.length - 1) {
      // 计算间隔时间
      const leftTime = zeroDate.getTime() + SIZE_OF_WHOLE_DAY 
        - (item.start + item.duration)
      dayItemList.push(generateBlank(
        '', '', 0,
        (item.start + item.duration - zeroDate.getTime()) / SIZE_OF_WHOLE_DAY,
        leftTime / SIZE_OF_WHOLE_DAY
      ))
    }
    else {
      // 计算间隔时间
      const next = dayItems[i + 1]
      const diffTime = next.start - (item.start + item.duration)
      dayItemList.push(generateBlank(
        '', '', 0,
        (item.start + item.duration - zeroDate.getTime()) / SIZE_OF_WHOLE_DAY,
        diffTime / SIZE_OF_WHOLE_DAY
      ))
    }
  }

  return dayItemList
}

export function removeItemOfDay(index, day) {
  const dateString = getDateStringOfDay(day)
  const items = weekJson[dateString]
  items.splice(index, 1)
  local.set('weekJson', weekJson)
}
