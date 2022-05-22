<template>
  <div class="screen-container">
    <div class="screen-box" :class="showClassName">
      <h3>{{ title }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '标题'
    }
  },
  data(){
    return {
      showClassName: 'hide'
    }
  },
  methods: {
    toggle() {
      const that = this
      if(this.showClassName === 'hide') {
        const screenBox = document.getElementsByClassName('screen-box')[0]
        screenBox.style.setProperty('display', 'block', 'important')
        setTimeout(() => {
          that.showClassName = 'show'
        }, 100);
      }
      else
        this.showClassName = 'hide'
      return true
    },

    addTrasitionEndEvent() {
      const that = this
      const screenBox = document.getElementsByClassName('screen-box')[0]

      screenBox.addEventListener('transitionend', () => {
        if(that.showClassName === 'hide')
          screenBox.style.setProperty('display', 'none', 'important')
      }, false)
    }
  },
  mounted() {
    this.addTrasitionEndEvent()
  }
}
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

    h3 {
      margin: 0;
      padding: 17px 0;
      line-height: 1.4rem;
      background-color: #DFDFDF;
      font-weight: normal;
      border-bottom: 1px solid #CFCFCF;
    }
  }
}
</style>
