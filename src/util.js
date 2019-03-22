// 工具函数库

import config from './config'

export function get (url, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.host + url,
      success: function (res) {
        if (res.data.code === 0) {
          resolve(res.data.data)
        } else {
          reject(res.data)
        }
      }
    })
  })
}

export function showSuccess (text) { // 登录成功提示文字
  wx.showToast({
    title: text,
    icon: 'success',
    duration: 2000
  })
}

export function showLoginInfo (text) { // 登录状态提示文字
  wx.showToast({
    title: text,
    icon: 'success',
    duration: 2000
  })
}
