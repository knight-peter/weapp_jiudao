// pages/my/my.js
import wxAPI from '../../assets/utils/wxAPI'
import Base from '../../assets/utils/base'
import ClassicModel from '../../models/classic_model'
import BookModel from '../../models/book_model'
const WX = new wxAPI()
const bs = new Base()
const classicModel = new ClassicModel()
const bookModel = new BookModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorized: false,
    userInfo: null,
    bookCount: 0,
    classics: null
  },

  onShow(options) {
    this.userAuthorized()
    this.getMyBookCount()
    this.getMyFavor()
  },
  /* 获取我喜欢的 */
  getMyFavor() {
    classicModel.getMyFavor()
      .then(res => {
        this.setData({
          classics: res
        })
      })
  },
  /* 获取我收藏的书的数量 */
  getMyBookCount() {
    bookModel.getMyBookCount()
      .then(res => {
        this.setData({
          bookCount: res.count
        })
      })
  },
  /* 自动获取用户信息 */
  userAuthorized() {
    WX.getSetting()
      .then(data => {
        if (data.authSetting['scope.userInfo']) {
          return WX.getUserInfo({})
        }
        return false
      })
      .then(data => {
        if (!data) return
        this.setData({
          authorized: true,
          userInfo: data.userInfo
        })
      })
  },
  /* 获取用户信息 */
  onGetUserInfo(event) {
    const userInfo = event.detail.userInfo
    if (userInfo) {
      this.setData({
        userInfo,
        authorized: true
      })
    }
  },
  /* 跳转到关于我们 */
  onJumpToAbout(event) {
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },
  /* 跳转到学习页面 */
  onStudy(event) {
    wx.navigateTo({
      url: '/pages/course/course',
    })
  },
  /* 从我的喜欢中跳转 */
  onJumpToDetail(event) {
    const cid = event.detail.cid
    const type = event.detail.type
    // wx.navigateTo
    wx.navigateTo({
      url: `/pages/classic-detail/classic-detail?cid=${cid}&type=${type}`
    })
  }
})