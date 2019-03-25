<template>
  <div>
    <!-- 一年进度 -->
    <progress percent='20' activeColor='#ffc72a'></progress>
    <p>{{year}}已经过去了{{days}}天，{{percent}}%</p>
  </div>
</template>

<script>
export default {
  methods: {
    isLeapYear () {
      const year = new Date().getFullYear()
      if (year % 400 === 0) {
        return true
      } else if (year % 4 === 0 && year % 100 !== 0) {
        return true
      }
      return false
    },
    getDayOfYear () {
      return this.isLeapYear() ? 366 : 365
    }
  },
  computed: {
    year () {
      return new Date().getFullYear()
    },
    days () {
      let start = new Date()
      start.setMonth(0)
      start.setDate(1)
      // start是今年的第一天d
      // 今天的时间戳减去今年第一天的时间戳？
      let offset = new Date().getTime() - start.getTime()
      return (offset / 1000 / 60 / 60 / 24) + 1
    },
    percent () {
      return (this.days / this.getDayOfYear()).toFixed(1) * 100
    }
  }
}
</script>

<style scoped>
  progress {
    width: 100%;
    margin-top: 20rpx;
  }
  p {
    margin-top: 10rpx;
  }
</style>
