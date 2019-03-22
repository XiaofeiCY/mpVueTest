<script>
// import config from './config' // 自从写了util.js封装函数工具，就不用这样引入config了
import {get} from './util'

export default {
  async created () {
    const res = await get('/weapp/demo')
    console.log('+++++++++', res)
    // 这是微信自带的，我们可以自己封装一下，为什么要封装，就是为了想要用async+await,避免callback
    // wx.request({
    //   url: config.host + '/weapp/demo',
    //   success: function (res) {
    //     console.log(res)
    //   }
    // })
    console.log('小程序启动了')
  }
}
</script>

<style>

</style>
