<template>
  <div class="home">
    <div class="home-background"></div>
    <TimerBar />
    <HelloWorld :msg="hitokoto"/>
    <ScreenView />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import ScreenView from '@/components/ScreenView.vue'
import TimerBar from '@/components/TimerBar.vue'
import api from '@/api'

export default {
  name: 'HomeView',
  data(){
    return {
      hitokoto: '',
    }
  },
  components: {
    HelloWorld,
    ScreenView,
    TimerBar
  },
  mounted(){
    const that = this
    api.hitokoto.get()
      .then(res => {
        that.hitokoto = res.data.hitokoto
        console.log(res.data)
      })
      .catch(err => console.error(err))
  }
}
</script>

<style lang="scss" scoped>
.home {
  &-background {
    background-image: url(https://cn.bing.com/th?id=OHR.GlassBridge_ZH-CN4258621683_1920x1080.jpg&rf=LaDigue_1920x1080.jpg);
    filter: brightness(70%);
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    z-index: -1;
  }
}
</style>
