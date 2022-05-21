<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld :msg="hitokoto"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import api from '@/api'

export default {
  name: 'HomeView',
  data(){
    return {
      hitokoto: '',
    }
  },
  components: {
    HelloWorld
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
