<template>
  <div>
    图书列表页面
    <!-- <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="doLogin">获取用户信息</button> -->
  </div>
</template>

<script>
// import { showSuccess, showLoginInfo } from '@/util'
// import qcloud from 'wafer2-client-sdk'
// import config from '@/config'

export default {
  methods: {
    // doLogin () {
    //   let user = wx.getStorageSync('userInfo')
    //   if (!user) {
    //     qcloud.setLoginUrl(config.loginUrl)
    //     qcloud.login({
    //       success: function (userInfo) {
    //         console.log('登录成功', userInfo)
    //         showSuccess('登录成功')
    //         wx.setStorageSync('userInfo', userInfo)
    //       },
    //       fail: function (err) {
    //         console.log('登录失败', err)
    //       }
    //     })
    //   } else {
    //     showLoginInfo('您已登陆')
    //   }
    // }
  }
}
</script>

<style>

</style>
