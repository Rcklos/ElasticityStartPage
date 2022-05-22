<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld :msg="hitokoto"/>
    <ScreenView />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import ScreenView from '@/components/ScreenView.vue'
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
    ScreenView
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
