<template>
  <div class="timer-bar-container">
    <p class="timer-bar">{{ time }}</p>
  </div>
</template>

<script>
export default {
  data(){
    return {
      time: '',
      timer: undefined
    }
  },
  methods: {
    updateTime() {
      this.time = new Date().pattern('H:m:s')
    }
  },
  mounted() {
    this.timer = setInterval(() => this.updateTime(), 500);
  },
  unmounted() {
    clearInterval(this.timer)
  }
}
</script>


<style lang="scss" scoped>
.timer-bar-container {
  padding-top: 127px;
  padding-bottom: 37px;
  p {
    font-size: 3rem;
    color: white;
  }
}
</style>
