import wxAPI from './wxAPI.js'
import Config from '../config.js';
const baseUrl = Config.baseUrl;
const appkey = Config.appkey;
const msgName = Config.response.msgName;
const statusName = Config.response.statusName;

class Base extends wxAPI {
  constructor() {
    super();
    this.baseUrl = Config.baseUrl;
    this.tokenName = Config.request.tokenName;
    this.tokenValue = Config[Config.request.tokenName];
    this.msgName = Config.response.msgName;
    this.statusName = Config.response.statusName;
  }
  /* 获取数据添加loading弹窗 */
  req({
    url,
    method = 'GET',
    data = {},
    complete = null,
    loading = true
  }) {
    const startDate = new Date()
    const startTime = startDate.getTime()
    if (loading) {
      wx.showLoading({
        title: '加载中'
      })
    }

    const token = wx.getStorageSync(this.tokenName);
    return super.request({
        url,
        method,
        data,
        header: {
          'content-type': 'application/json',
          [this.tokenName]: token,
        },
        complete
      })
      .then(res => {
        const endDate = new Date()
        const endTime = endDate.getTime()
        if (endTime - startTime > 500 && loading === true) {
          wx.hideLoading();
        }
        setTimeout(function () {
          wx.hideLoading();
        }, 500)

        return res
      })
  }
  /* 在缓存中写入token */
  checkToken() {
    const token = wx.getStorageSync(this.tokenName);
    if (token) {
      return super.request({
          url: 'https://xcx.ef-tool.com/api/v1/checkToken',
          method: 'POST',
          header: {
            'content-type': 'application/json',
            [this.tokenName]: token,
          }
        })
        .then(res => {
          if (!res.data.result) {
            return this.loginIn()
          } else {
            return res.data
          }
        })
    } else {
      return this.loginIn()
    }
  }
  /* wx.login()获取code,发送到后台换取 openId, sessionKey, unionId */
  loginIn() {
    wx.setStorageSync(this.tokenName, this.tokenValue);
    console.log({
      [this.tokenName]: this.tokenValue
    })
    return super.login()
      .then(res => {
        return super.request({
          method: 'POST',
          url: 'https://xcx.ef-tool.com/api/v1/user',
          data: {
            code: res.code
          },
        })
      })
      .then(res => {
        wx.setStorageSync('token', res.data.token);
        wx.setStorageSync('userInfo', res.data);
        return res.data
      })
  }
}

export default Base;