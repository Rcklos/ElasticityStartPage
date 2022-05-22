<template>
  <div class="week-screen">
    <div class="week-day-box">
      <div class="week-day" v-for="day in weekday" :key="day">
        <h4>{{ day }}</h4>
      </div>
    </div>
    <div class="unit-day-box">
      <template v-for="day in weekday" :key="day">
        <div class="unit-day"></div>
      </template>
    </div>
  </div>
</template>
<script>
export default{
  data(){
    return {
      weekday: [
        '周一', '周二', '周三', '周四', '周五', '周六', '周日'
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.week-screen {
  width: 100%;
  height: 100%;

  .week-day-box {
    width: 100%;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #CFCFCF;

    .week-day:nth-child(1){
      border-left: none;
    }

    .week-day {
      border-left: 1px solid #CFCFCF;
      height: 100%;
      background-color: #DFDFDF;
      width: calc(100% / 7);
    }
  }

  .unit-day-box {
    width: 100%;
    height: calc(100% - 25px);
    display: flex;

    .unit-day {
      width: calc(100% / 7);
      height: 100%;
      border-left: 1px solid #CFCFCF;
    }
    .unit-day:nth-child(1) {
      border-left: none;
    }
  }
}
</style>
