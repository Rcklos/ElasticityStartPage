<template>
  <div class="search-bar">
    <div class="search-input" ref="searchInput">
      <input ref="mInput" type="text" placeholder="搜索"
        v-model="textInput" @focus="onInputFocus" @blur="onInputBlur">
      <a ref="hrefLink" :href="hreflink">
        <ep-search style="font-size: 1rem; line-height: 1.7rem; color: #FFFFFF;"/>
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const mInput = ref(null)
const hrefLink = ref(null)
const searchInput = ref(null)

let isFocused = false

const onInputFocus = () => {
  isFocused = true
  hrefLink.value.style.opacity = '1'
  hrefLink.value.style.pointerEvents = 'auto'
  searchInput.value.style.opacity = '1'
}

const onInputBlur = () => {
  isFocused = false
  hrefLink.value.style.opacity = '0'
  hrefLink.value.style.pointerEvents = 'none'
  searchInput.value.style.opacity = '0.87'
}

onMounted(() => {
  mInput.value.addEventListener('keydown', (event) => {
    if(event.keyCode === 13)
      hrefLink.value.click()
  })
})

const textInput = ref('')
const hreflink = computed(() => {
  return 'http://cn.bing.com/search?q=' + textInput.value
})

/*console.log(hreflink.value)*/
</script>

<style lang="scss" scoped>
.search-bar {
  padding-bottom: 67px;

  .search-input {
    position: relative;
    display: inline-block;
    opacity: 0.87;

    a {
      position: absolute;
      right: 17px;
      top: 14px;
      color: white;
      cursor: pointer;
      text-decoration: none;
      transition: all .2s ease-in-out;
      opacity: 0;
    }

    input {
      border: none !important;
      outline: none !important;
      background-color: #3C3C3C;
      display: inline-block !important;
      width: 127px;
      height: 43px;
      border-radius: 30px;
      padding: 2px 30px;
      padding-right: 47px;
      font-size: 1rem;
      color: #ffffff !important;
      hint-color: #ffffff;
      text-align: center;
      transition: all .2s ease-in-out;
    }
  }

  input:focus {
    width: 470px;
    background-color: #282828;
  }

  .search-input:hover {
    input {
      width: 470px;
      text-align: center;
    }
  }
}
</style>
