<template>
  <div class="search-bar">
    <div class="search-input" ref="searchInput" :class="{ active: isFocused }">
      <input ref="mInput" type="text" placeholder="搜索"
        autofocus="autofocus"
        v-model="textInput" @focus="onInputFocus" @blur="onInputBlur">
      <a ref="hrefLink" :href="hreflink" target="_blank"
         :class="{ show: isFocused }" @click="clickedSearch">
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
const textInput = ref('')

let isFocused = ref(false)


const clickedSearch = () => {
  textInput.value = ''
}

const onInputFocus = () => {
  isFocused.value = true
}

const onInputBlur = () => {
  // 解决a标签点击无法跳转
  setTimeout(() => {
    isFocused.value = false
  }, 100)
}

onMounted(() => {
  mInput.value.addEventListener('keydown', (event) => {
    if(event.keyCode === 13)
      hrefLink.value.click()
  })
})

const hreflink = computed(() => {
  return 'http://cn.bing.com/search?q=' + textInput.value
})

/*console.log(hreflink.value)*/
</script>

<style lang="scss" scoped>
.search-bar {
  padding-bottom: 67px;

  @keyframes activeAnimation {
    from{ opacity: 0.87; }
    to{ opacity: 1; }
  }

  @keyframes showAnimation {
    from{ opacity: 0; }
    to{ opacity: 1; }
  }

  @keyframes hideAnimation {
    from{ opacity: 0.87; }
    to{ opacity: 0; }
  }

  .active {
    opacity: 1 !important;
    display: block;
    animation: activeAnimation .6s;
  }

  .show {
    opacity: 1 !important;
    visibility: visible !important;
    animation: showAnimation .6s;
  }

  .search-input {
    width: 160px;
    position: relative;
    display: inline-block;
    transition: all .2s ease-in-out;
    opacity: 0.87;

    a {
      border-radius: 30px;
      position: absolute;
      right: 17px;
      top: 12px;
      color: white;
      cursor: pointer;
      text-decoration: none;
      opacity: 0;
      visibility: hidden;
    }

    input {
      width: 100%;
      box-sizing: border-box;
      border: none !important;
      outline: none !important;
      background-color: #3C3C3C;
      display: inline-block !important;
      height: 43px;
      border-radius: 30px;
      padding: 2px 30px;
      padding-right: 47px;
      font-size: 1rem;
      color: #ffffff !important;
      text-align: center;
    }
  }


  @media only screen and (min-width: 641px){
    input:focus {
      background-color: #282828;
    }

    .active, .search-input:hover {
      width: 470px;
      input {
        text-align: center;
      }
    }
  }

  @media only screen and (max-width: 640px){
    input:focus {
      background-color: #282828;
    }

    .active, .search-input:hover {
      width: 270px;
      input {
        text-align: center;
      }
    }
  }
  
}
</style>
