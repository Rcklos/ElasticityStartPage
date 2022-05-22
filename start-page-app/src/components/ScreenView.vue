<template>
  <div class="screen-container" @click="toggle">
    <div class="screen-box" :class="showClassName">
    </div>
  </div>
</template>

<script>
export default {
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
    },

    addTrasitionEndEvent() {
      const that = this
      const screenBox = document.getElementsByClassName('screen-box')[0]

      screenBox.addEventListener('transitionend', () => {
        console.log('transitionend')
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
  .screen-box {
    width: 75%;
    height: 80%;
    background-color: #B5B5B5;
    border-radius: 10px;
    /* 效果 */
    transition: all .6s ease-in-out;
  }
}
</style>
