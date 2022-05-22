<template>
  <div class="home" @contextmenu="menuClick">
    <div class="home-background"></div>
    <TimerBar />
    <SearchBar />
    <HitokotoBar />
    <ScreenView ref="screen"/>
  </div>
</template>

<script>
// @ is an alias to /src
import ScreenView from '@/components/ScreenView.vue'
import TimerBar from '@/components/TimerBar.vue'
import SearchBar from '@/components/SearchBar.vue'
import HitokotoBar from '@/components/HitokotoBar.vue'

export default {
  name: 'HomeView',
  data(){
    return {
      showScreenView: false
    }
  },
  methods:{
    menuClick(){
      const that = this
      this.showScreenView = !this.showScreenView
      that.$refs.screen.toggle()
    }
  },
  components: {
    ScreenView,
    TimerBar,
    SearchBar,
    HitokotoBar
  }
}
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
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
