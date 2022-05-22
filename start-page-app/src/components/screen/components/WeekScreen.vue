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
      <template v-for="day in weekItemList" :key="day.key">
        <div class="unit-day">
          <template v-for="item in day.dayItemList" :key="item.height">
            <div class="day-item" 
              :style="{ top: 'calc(' + item.position * 100 + '%)', 
                height: 'calc(' + item.height * 100 + '%)',
                backgroundColor: item.backgroundColor, color: item.color }">
              <h4>
                <span>{{ item.startTime }} </span>
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
import { getDateString, getZeroDateByOffset } from '@/utils/date.js'

import { queryItemList, parseItemList } from '../utils/week.js'
import resJson from '@/res'

const weekJson = resJson.weekJson

export default{
  data(){
    return {
      weekday: [
        '周日', '周一', '周二', '周三', '周四', '周五', '周六'
      ],
      dayOffset: 0,
      weekItemList: []
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
    refreshItems() {
      const that = this
      // 获取今天星期几, 即相对周日的偏差
      const dayOffset = that.nowDate.getDay()
      that.dayOffset = dayOffset
      // 遍历本周读取指定一天的所有日程 
      for(let i = 0; i < 7; i++){
        // 获取当天全部日程
        const dayString = getDateString(i - dayOffset)
        // 当天零点
        const zeroDate = getZeroDateByOffset(i - dayOffset)
        const dayItems = queryItemList(dayString)
        // 将日程转换成渲染数据列表
        const dayItemList = parseItemList(dayItems, zeroDate)
        // 缓存日程, 用于渲染
        that.weekItemList.push({
          key: i,
          dayItemList: dayItemList
        })
      }
      console.log(that.weekItemList)
    },
  },
  mounted() {
    this.refreshItems()
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
