<template>
 <router-view/>
</template>

<script>
export default {
  mounted(){
    document.oncontextmenu = () => {
      return false
    }
  }
}
</script>

<style lang="scss">
*, html, body {
  margin: 0;
  padding: 0;
}
#app {
  height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
