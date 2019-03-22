<template>
  <div class="mainContent">
    <div class="HeadImg">
      <img :src="FuckInfo.avatarUrl" alt="">
    </div>
    <p>{{FuckInfo.nickName}}</p>
    <button v-if='FuckInfo.openId' @click="scanBook">添加图书</button>
    <button v-else open-type="getUserInfo" @getuserinfo="doLogin">点击登录</button>
    <yearProgress></yearProgress>
  </div>
</template>

<script>
import { showSuccess, showLoginInfo } from '@/util'
import qcloud from 'wafer2-client-sdk'
import config from '@/config'
import yearProgress from '@/components/YearProgress'

export default {
  components: {
    yearProgress
  },
  data () {
    return {
      FuckInfo: {
        avatarUrl: '/static/images/unlogin.png',
        nickName: '未登录'
      }
    }
  },
  mounted () {
    const current = wx.getStorageSync('userInfo')
    if (current) {
      this.FuckInfo = current
    }
  },
  methods: {
    scanBook () {
      wx.scanCode({
        success (res) {
          console.log(res)
        }
      })
    },
    doLogin () {
      let user = wx.getStorageSync('userInfo')
      if (!user) {
        qcloud.setLoginUrl(config.loginUrl)
        wx.showLoading()
        qcloud.login({
          success: (userInfo) => {
            console.log('----3===', userInfo)
            qcloud.request({
              url: config.userUrl,
              login: true,
              success: (res) => {
                console.log(res)
                showSuccess('登录成功')
                wx.setStorageSync('userInfo', res.data.data)
                this.FuckInfo = res.data.data
              }
            })
            // wx.setStorageSync('userInfo', userInfo)
            // this.FuckInfo = userInfo
          },
          fail: (err) => {
            console.log('登录失败', err)
          }
        })
      } else {
        showLoginInfo('您已登陆')
      }
    }
  }
}
</script>

<style lang='scss'>
  .mainContent {
    // width: 100%;
    // height: 100%;
    padding: 30rpx;
    // background-color: #ce7b7b;
    .HeadImg {
      width: 200rpx;
      height: 200rpx;
      border: 1px solid #ADACAC;
      box-sizing: border-box;
      // background-color: #4e8c9c;
      margin: 0 auto 30rpx;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    p {
      text-align: center;
    }
  }
</style>

