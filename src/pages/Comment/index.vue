<template>
  <div class="mainContent">
    评论{{aaa}}
    <p @click="addComm">添加</p>
    <p @click="delComm">删除</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      aaa: 1
    }
  },
  methods: {
    addComm () {
      this.aaa += 1
    },
    delComm () {
      this.aaa -= 1
    }
  }
}
</script>

<style>

</style>
