<template>
  <div class="screen-container">
    <div class="screen-box" ref="screenBox" :class="showClassName">
      <div class="screen-box-header">
        <h3>{{ titles[screenIndex] }}</h3>
        <div class="screen-box-header-buttons">
          <div>
            <el-button @click="tempClick"
              type="primary" circle >
              <ep-edit style="width: 1rem;" />
            </el-button>
          </div>
          <div>
            <el-button @click="tempClick"
              type="primary" circle >
              <ep-checked style="width: 1rem;" />
            </el-button>
          </div>
        </div>
      </div>
      <div class="child-box">
        <WeekScreen ref="weekScreen" @notifyAddItem="notifyAddItem"/>
      </div>
    </div>

  </div>
  <el-drawer
    ref="drawerRef"
    v-model="drawer"
    :title="drawerView"
    direction="rtl" >
    <el-form :model="drawerView.form">
      <el-form-item label="标题">
        <el-input v-model="itemTitle"
          placeholder="简短易懂的标题更佳喔!"
          autocomplete="off" />
      </el-form-item>
      <el-form-item label="设置方式">
        <el-select
          v-model="timerPickerStyleIndex"
          placeholder="选择">
            <el-option
              v-for="item in timerPickerStyles"
              :key="item.value"
              :label="item.label"
              :value="item.value" />
          </el-select>
      </el-form-item>
      <el-form-item v-if="timerPickerStyleIndex === 0" label="选择时间">
        <el-time-select
          v-model="itemSelectStartTime"
          start="00:00"
          step="00:15"
          end="23:45"
          placeholder="选择时间"/>
      </el-form-item>
      <el-form-item v-if="timerPickerStyleIndex === 0" label="持续时间">
        <el-time-select
          v-model="itemSelectDurationTime"
          placeholder="持续时间"
          start="00:15"
          step="00:15"
          end="06:30" />
      </el-form-item>
      <el-form-item v-if="timerPickerStyleIndex === 1" label="选择时间">
        <el-time-picker
          v-model="itemTimeRange"
          is-range
          range-seperator="~"
          start-placeholder="开始时间"
          end-placeholder="结束时间" />
      </el-form-item>
    </el-form>
    <div>
      <el-button type="primary" @click="handleAddItem">确定</el-button>
      <el-button type="info" @click="drawer = false">取消</el-button>
    </div>
  </el-drawer>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { getDateStringOfDay, getZeroDateOfDay } from '@/utils/date.js'
import WeekScreen from './components/WeekScreen.vue'
import local from '@/utils/local.js'

const screenIndex = ref(0)
const showClassName = ref('hide')
const screenBox = ref(null)
const weekScreen = ref(null)
const titles = reactive(['本周日程'])

// drawer
const drawer = ref(false)
const drawerViewIndex = 0
const drawerViews = ['编辑待办']
const drawerView = computed(() => {
  return drawerViews[drawerViewIndex]
})

// 标题
const itemTitle = ref('')

// 时间选择方式
const timerPickerStyleIndex = ref(0)
const timerPickerStyles = reactive([
  {
    label: '待办时长',
    value: 0
  },
  {
    label: '时间范围',
    value: 1
  }
])
// 时间范围选择
const now = new Date()
const itemSelectStartTime = 
  ref(new Date(now.getTime() + 30 * 60 * 1000).pattern('HH:mm'))
const itemSelectDurationTime = ref('00:30')
const itemTimeRange = ref([now,
  new Date(now.getTime() + 30 * 60 * 1000)])

const toggle = () => {
  if( showClassName.value === 'hide' ){
    screenBox.value
      .style.setProperty('display', 'block', 'important')
    setTimeout(() => {
      showClassName.value = 'show'
    }, 100);
  }
  else
    showClassName.value = 'hide'
}

const addTransitionEndEvent = () => {
  screenBox.value.addEventListener('transitionend', () => {
    if(showClassName.value === 'hide')
      screenBox.value
        .style.setProperty('display', 'none', 'important')
  }, false)
}

// 记录插入待办的星期
let targetDay = 0
const notifyAddItem = (i) => {
  targetDay = i
  drawer.value = true
}

const handleAddItem = () => {
  if( itemTitle.value === '' )
    return
  // 获取当天日期
  const dateString = getDateStringOfDay(targetDay)
  // 获取当天零点
  const targetZeroDate = getZeroDateOfDay(targetDay)
  /*console.log(dateString)*/
  /*console.log(targetZeroDate)*/
  // 获取起始时间
  let itemStartLongTime = 0
  let itemDurationLongTime = 0
  if (timerPickerStyleIndex.value === 0) {
    // 待办时长选择方式
    let split_tmp = itemSelectStartTime.value.split(':')
    let hours = parseInt(split_tmp[0], 10)
    let minutes = parseInt(split_tmp[1], 10)
    const startTimeOffset = hours * 60 * 60 * 1000 + 
      minutes * 60 * 1000
    split_tmp = itemSelectDurationTime.value.split(':')
    hours = parseInt(split_tmp[0], 10)
    minutes = parseInt(split_tmp[1], 10)
    itemStartLongTime = targetZeroDate.getTime() + startTimeOffset
    itemDurationLongTime = hours * 60 * 60 * 1000 + 
      minutes * 60 * 1000
  }
  else {
    // 范围选择
    const startDate = itemTimeRange.value[0]
    const endDate = itemTimeRange.value[1]
    /*console.log(startDate)*/
    /*console.log(endDate)*/
    // 起始时间需要矫正一下
    const todayZeroDate = getZeroDateOfDay(now.getDay())
    itemStartLongTime = startDate.getTime() - 
      todayZeroDate.getTime() + targetZeroDate.getTime()
    itemDurationLongTime = endDate.getTime() - startDate.getTime()
  }
  const itemObject = {
    title: itemTitle.value,
    start: itemStartLongTime,
    duration: itemDurationLongTime
  }
  /*console.log(itemObject)*/

  // 获取数据
  const cacheWeekJson = local.get('weekJson') || {}
  if(cacheWeekJson[dateString] === undefined) 
    cacheWeekJson[dateString] = []
  cacheWeekJson[dateString].push(itemObject)
  // 缓存数据
  local.set('weekJson', cacheWeekJson)
  weekScreen.value.refreshItems()
  drawer.value = false
}

// 功能还没做好
const tempClick = () => {
  ElMessage('功能还没做好!!!')
}

onMounted(() => {
  addTransitionEndEvent()
})

defineExpose({
  toggle
})
</script>

<style lang="scss">
.show {
  transform: rotate(0);
  pointer-events: fill;
}
.hide {
  transform: rotateY(90deg);
}
.screen-container {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  .screen-box {
    width: 1200px;
    height: 80%;
    background-color: #EFEFEF;
    border-radius: 27px 27px 10px 10px;
    overflow: hidden;
    /* 效果 */
    transition: all .3s ease-in-out;

    &-header{
      position: relative;
      margin: 0;
      padding: 17px 0;
      background-color: #DFDFDF;
      border-bottom: 1px solid #CFCFCF;

      h3 {
        font-weight: normal;
        line-height: 1.4rem;
      }

      &-buttons {
        position: absolute;
        right: 10px;
        top: 0;
        height: 100%;
        display: flex;
        align-items: center;

        div {
          margin-right: 7px;
        }
      }
    }
    
    .child-box {
      height: calc(100% - 1.4rem - 35px);
    }
  }
}
</style>
