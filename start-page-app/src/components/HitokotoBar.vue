<template>
  <div class="hitokoto">
    <div class="hitokoto-container">
      <p class="hitokoto-text"> {{ hitokoto.hitokoto }} </p>
      <p class="hitokoto-from"> {{ hitokoto.from }} </p>
    </div>
  </div>
</template>

<script>
import api from '@/api'

export default {
  data(){
    return {
      hitokoto: '',
    }
  },
  mounted(){
    const that = this
    api.hitokoto.get()
      .then(res => {
        that.hitokoto = res.data
        console.log(res.data)
      })
      .catch(err => console.error(err))
  }
}
</script>

<style lang="scss" scoped>
.hitokoto {
  position: absolute;
  left: 0;
  bottom: 67px;
  height: 0;
  width: 100%;
  height: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &-container {
  }
  p {
    color: white;
  }
  &-text {
    text-align: center;
  }
  &-from:before {
    content: "——"
  }
  &-from {
    text-align: right;
  }
}
</style>
