<template>
  <div class="home" @contextmenu="menuClick">
    <div class="home-background"
      :style="{ backgroundImage: 'url(' + backgroundUrl + ')' }"></div>
    <TimerBar />
    <SearchBar />
    <HitokotoBar />
    <ScreenView ref="screen"/>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ScreenView from '@/components/screen/ScreenView.vue'
import TimerBar from '@/components/TimerBar.vue'
import SearchBar from '@/components/SearchBar.vue'
import HitokotoBar from '@/components/HitokotoBar.vue'
import api from '@/api'

const showScreenView = ref(false)
const screen = ref(null)
/*const backgroundUrl = ref('https://cn.bing.com/th?id=OHR.Alhambra_ZH-CN9040625762_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp')*/
const backgroundUrl = ref('')

const menuClick = () => {
  showScreenView.value = !showScreenView.value
  screen.value.toggle()
}

const loadBackGround = () => {
  /*console.log(process.env)*/
  api.cors.getBackGround()
    .then(res => {
      /*console.log(res.data)*/
      const url = 'https://cn.bing.com' + res.data.images[0].url
      backgroundUrl.value = url
    })
    .catch(err => console.error(err))
}

onMounted(() => {
  loadBackGround()
})

</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  &-background {
    filter: brightness(70%);
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    z-index: -1;
    background-color: #323232;
    background-size: cover;
  }
}
</style>
