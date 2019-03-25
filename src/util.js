// 工具函数库

import config from './config'

// http get工具函数 获取数据
export function get (url, data) {
  return request(url, 'GET', data)
}

export function post (url, data) {
  return request(url, 'POST', data)
}

function request (url, method, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      data,
      method,
      url: config.host + url,
      success: function (res) {
        if (res.data.code === 0) {
          resolve(res.data.data)
        } else {
          showModal('失败', '由于豆瓣API开源接口有问题，所以添加图书都测试不了')
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
    image: '/static/images/info.png',
    duration: 2000
  })
}

export function errorInfo (text) { // 错误信息提醒
  wx.showToast({
    title: text,
    image: '/static/images/error.png',
    duration: 2000
  })
}

export function showModal (title, content) { // 改用modal函数替换toast试一下
  wx.showModal({
    title: title,
    content: content,
    showCancel: false
  })
}
