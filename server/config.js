const CONF = {
  // --------------------这一段是用来本地搭建后台的代码，直接微信文档搜索：如何本地搭建后台-----------------------
  // 步骤参考：https://cloud.tencent.com/developer/ask/25171
    serverHost: 'localhost',
    tunnelServerUrl: '',
    tunnelSignatureKey: '27fb7d1c161b7ca52d73cce0f1d833f9f5b5ec89',
    // 腾讯云相关配置可以查看云 API 秘钥控制台：https://console.cloud.tencent.com/capi
    qcloudAppId: '1258859516', // 这个是腾讯云-->账号中心-->账号信息-->APPID
    qcloudSecretId: 'AKIDmMisoY4WNyUkCOGkx0ETKADLNEzVp9FJ', // 这个是腾讯云-->账号中心-->访问管理-->云API秘钥-->API秘钥管理 -->密钥 -->SecretId
    qcloudSecretKey: '2oV2KM4XlmbCaicOwFNHwMWQO8dssc8P', // 这个是腾讯云-->账号中心-->访问管理-->云API秘钥-->API秘钥管理 -->密钥 -->SecretKey
    wxMessageToken: 'weixinmsgtoken',
    networkTimeout: 30000,
    port: '5757',
    rootPathname: '',
    // 这里配置完之后，记得在本地搭建数据库，具体配置项是在下面的mysql对象里面
    // 数据库搭建完之后，记得在命令行工具里面进入到这个server文件夹 npm run dev这个后端就完成了
  // -------------------------------------------------------------------------------------------------------

    // 微信小程序 App ID
    appId: '',

    // 微信小程序 App Secret
    appSecret: '',

    // 是否使用腾讯云代理登录小程序
    useQcloudLogin: true,

    /**
     * MySQL 配置，用来存储 session 和用户信息
     * 若使用了腾讯云微信小程序解决方案
     * 开发环境下，MySQL 的初始密码为您的微信小程序 appid
     */
    mysql: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        db: 'cAuth',
        pass: '123456',
        char: 'utf8mb4'
    },

    cos: {
        /**
         * 地区简称
         * @查看 https://cloud.tencent.com/document/product/436/6224
         */
        region: 'ap-guangzhou',
        // Bucket 名称
        fileBucket: 'qcloudtest',
        // 文件夹
        uploadFolder: ''
    },

    // 微信登录态有效期
    wxLoginExpires: 7200,
    wxMessageToken: 'abcdefgh'
}

module.exports = CONF
