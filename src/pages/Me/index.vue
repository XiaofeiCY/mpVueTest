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
import { showSuccess, showLoginInfo, post } from '@/util'
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
    async addBook (isbn) {
      console.log('aaa')
      const res = await post('/weapp/addbook', {
        isbn,
        openid: this.FuckInfo.openId
      })
      console.log('现在查看这部分信息', res) // 由于豆瓣API开源接口有问题，所以这里都测试不了
      if (res.code === 0 && res.data.title) {
        showSuccess(`${res.data.title}添加成功`)
      } else {
        showSuccess('豆瓣倒闭了，接口用不了了')
      }
    },
    scanBook () {
      wx.scanCode({
        success: (res) => {
          if (res.result) {
            this.addBook(res.result)
          }
          console.log('扫描结果', res)
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
            console.log('---===', userInfo)
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

