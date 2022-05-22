<template>
  <div class="week-screen">
    <div class="week-day-box">
      <template v-for="(day,index) in weekday" :key="day">
        <div class="week-day" 
          :class="dayOffset == index ? 'week-today': ''">
          <h4>{{ day }}</h4>
        </div>
      </template>
    </div>
    <div class="unit-day-box">
      <template v-for="day in weekItems" :key="day.key">
        <div class="unit-day">
          <template v-for="item in day.items" :key="item.position">
            <div class="day-item" 
              :style="{ top: 'calc(' + item.position * 100 + '%)', 
                height: 'calc(' + item.weight * 100 + '%)',
                backgroundColor: item.backgroundColor, color: item.color }">
              <h4>
                <span>{{ item.start }} </span>
                {{ item.title }}
                <span v-if="item.duration">
                  {{ '(' + item.duration + 'min)' }}
                </span>
              </h4>
            </div>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import { getDateString, getZeroDateByOffset, 
   getTimeFormate } from '@/utils/date.js'
import resJson from '@/res'
import randomColor from 'randomcolor'

const weekJson = resJson.weekJson

export default{
  data(){
    return {
      weekday: [
        '周日', '周一', '周二', '周三', '周四', '周五', '周六'
      ],
      dayOffset: 0,
      weekItems: []
    }
  },
  computed: {
    nowDate() {
      return new Date()
    }
  },
  methods: {
    getItemsByDayIndex(index) {
      // 获取当天的所有日程
      const items = weekJson[getDateString(index)]
      console.log(items)
    },
  },
  mounted() {
    const that = this
    // 获取当天在本周内的偏差
    const dayOffset = that.nowDate.getDay()
    that.dayOffset = dayOffset
    console.log(dayOffset)
    console.log(getTimeFormate)
    console.log(weekJson)
    for(let i = 0; i < 7; i++){
      const dayeString = getDateString(i - dayOffset)
      console.log(dayeString)
      // 获取当天全部日程
      const dayItems = weekJson[dayeString]
      console.log(dayItems)
      if(dayItems === undefined || dayItems.length === 0) {
        that.weekItems.push({
          key: i,
          items: [{
            title: '好闲的一天',
            start: '',
            duration: 0,
            position: 0,
            weight: 1,
            color: 'black',
            backgroundColor: 'white'
          }]
        })
        continue
      }
      // 排序一下
      dayItems.sort((a, b) => {
        if(a.start === undefined && b.start === undefined)
          return 0
        if(a.start === undefined)
          return -1
        if(b.start === undefined)
          return 1
        return a.start - b.start
      })
      console.log(dayItems)
      // 按顺序计算
      const dayListItems = []
      // 凌晨0点到第一个代办的时间差
      const zeroDate = getZeroDateByOffset(i)
      const SizeOfWholeDay = 24 * 60 * 60 * 1000.0
      console.log(zeroDate.pattern('Y-M-d HH:mm'))
      const zeroSize = dayItems[0].start - zeroDate.getTime()
      console.log('zeroSize: ' + zeroSize)
      const zeroHeightWeight = zeroSize / SizeOfWholeDay
      console.log('zeroHeightWeight: ' + zeroHeightWeight)
      dayListItems.push({
        title: '',
        start: '',
        duration: 0,
        position: 0,
        weight: zeroHeightWeight,
        color: 'black',
        backgroundColor: 'white'
      }) 
      for(let itemIndex = 0; itemIndex < dayItems.length; itemIndex++){
        const dayItem = dayItems[itemIndex]
        const backgroundColor = randomColor()
        // 计算背景颜色
        console.log('backgroundColor: ' + backgroundColor)
        console.log(backgroundColor.slice(1, 3))
        const red = parseInt(backgroundColor.slice(1, 3), 16)
        console.log('red: ' + red)
        const green = parseInt(backgroundColor.slice(3, 5), 16)
        console.log('green: ' + green)
        const blue = parseInt(backgroundColor.slice(6, 8), 16)
        console.log('blue: ' + blue)
        let color = 'white'
        console.log('rgb/3 ---> ' + (red + green + blue) / 3)
        if((red + green + blue) / 3 > 110){
          color = 'black'
        }
        const tmp = {
          title: dayItem.title,
          position: (dayItem.start - zeroDate.getTime()) / SizeOfWholeDay,
          start: new Date(dayItem.start).pattern('HH:mm'),
          duration: dayItem.duration / 60 / 1000,
          weight: dayItem.duration / SizeOfWholeDay,
          backgroundColor: backgroundColor,
          color: color
        }
        console.log(tmp)
        dayListItems.push(tmp)
        // 插入白板
        if(itemIndex == dayItems.length - 1) {
          // 计算剩余的时间
          const leftTime = SizeOfWholeDay - dayItem.start 
            - dayItem.duration + zeroDate.getTime()
          dayListItems.push({
            title: '没事情做要赶紧休息哦!',
            position: (dayItem.start + dayItem.duration - zeroDate.getTime()) 
              / SizeOfWholeDay,
            start: '',
            duration: 0,
            weight: leftTime / SizeOfWholeDay,
            backgroundColor: 'white',
            color: 'black'
          })
        }
        else {
          // 计算与下一个待办的时间差
          const nextItem = dayItems[itemIndex + 1]
          console.log('now: ' + itemIndex + ' length: ' + dayItems.length)
          console.log(nextItem)
          const timeDiff = nextItem.start - (dayItem.start + dayItem.duration)
          // 插入daylist
          dayListItems.push({
            title: '',
            position: (dayItem.start + dayItem.duration - zeroDate.getTime()) / 
              SizeOfWholeDay ,
            start: '',
            duration: 0,
            weight: timeDiff / SizeOfWholeDay,
            backgroundColor: 'white',
            color: 'black'
          })
        }
      }
      that.weekItems.push({
        key: i,
        items: dayListItems
      })
    }
    console.log(this.weekItems)
  }
}
</script>
<style lang="scss" scoped>
.week-screen {
  width: 100%;
  height: 100%;

  .week-day-box {
    width: 100%;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #CFCFCF;

    .week-day:nth-child(1){
      border-left: none;
    }

    .week-day {
      border-left: 1px solid #CFCFCF;
      height: 100%;
      background-color: #DFDFDF;
      width: calc(100% / 7);
    }

    .week-today {
      border-left: 1px solid #AFEEEE !important;
      background-color: #00FA9A;
    }
  }

  .unit-day-box {
    width: 100%;
    height: calc(100% - 25px);
    display: flex;

    .unit-day {
      width: calc(100% / 7);
      height: 100%;
      position: relative;
      border-left: 1px solid #CFCFCF;

      .day-item {
        position: absolute;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        h4 {
          font-weight: normal;
          font-size: 0.25rem;
        }
      }
    }
    .unit-day:nth-child(1) {
      border-left: none;
    }
  }
}
</style>
