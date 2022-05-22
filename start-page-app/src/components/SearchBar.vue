<template>
  <div class="search-bar">
    <div class="search-input">
      <input type="text" placeholder="Search...">
    </div>
  </div>
</template>

<script></script>

<style lang="scss" scoped>
.search-bar {
  padding-bottom: 67px;
  .search-input {
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
