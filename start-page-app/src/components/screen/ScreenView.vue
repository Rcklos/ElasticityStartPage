<template>
  <div class="screen-container">
    <div class="screen-box" ref="screenBox" :class="showClassName">
      <div class="screen-box-header">
        <h3>{{ titles[screenIndex] }}</h3>
        <div class="screen-box-header-buttons">
          <div>
            <el-button type="primary" circle >
              <ep-edit style="width: 1rem;" />
            </el-button>
          </div>
          <div>
            <el-button type="primary" circle >
              <ep-search style="width: 1rem;" />
            </el-button>
          </div>
          <div>
            <el-button type="primary" circle >
              <ep-checked style="width: 1rem;" />
            </el-button>
          </div>
        </div>
      </div>
      <div class="child-box">
        <WeekScreen />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, defineExpose } from 'vue'
import WeekScreen from './components/WeekScreen.vue'

const showClassName = ref('hide')
/*const screenBox = ref(0)*/
const titles = reactive(['本周日程'])

const toggle = () => {
  if( showClassName.value === 'hide' ){
    const screenBox = document.getElementsByClassName('screen-box')[0]
    screenBox.style.setProperty('display', 'block', 'important')
    setTimeout(() => {
      showClassName.value = 'show'
    }, 100);
  }
  else
    showClassName.value = 'hide'
}

const addTransitionEndEvent = () => {
  const screenBox = document.getElementsByClassName('screen-box')[0]
  screenBox.addEventListener('transitionend', () => {
    if(showClassName.value === 'hide')
      screenBox.style.setProperty('display', 'none', 'important')
  }, false)
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
