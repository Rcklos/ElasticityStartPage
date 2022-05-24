<template>
  <div class="search-bar">
    <div class="search-input">
      <input ref="mInput" type="text" placeholder="Search..." v-model="textInput">
      <a :href="hreflink">
        <ep-search style="font-size: 1.7rem; color: #FFFFFF;"/>
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const mInput = ref(null)

onMounted(() => {
  console.log(mInput)
})

const textInput = ref('')
const hreflink = computed(() => {
  return 'http://cn.bing.com/search?q=' + textInput.value
})

console.log(hreflink.value)
</script>

<style lang="scss" scoped>
.search-bar {
  padding-bottom: 67px;

  .search-input {
    position: relative;
    display: inline-block;

    a {
      position: absolute;
      right: 12px;
      top: 7px;
      color: white;
      cursor: pointer;
      text-decoration: none;
    }
    input:hover, input:focus {
      width: 470px;
    }
    input {
      border: none !important;
      outline: none !important;
      background-color: #C0C0C0 !important;
      display: inline-block !important;
      width: 127px;
      height: 47px;
      border-radius: 30px;
      padding: 2px 30px;
      padding-right: 47px;
      font-size: 1.2rem;
      color: #ffffff !important;
      transition: all .2s ease-in-out;
    }
  }
}
</style>
