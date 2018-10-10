// pages/book/book.js
import wxAPI from '../../assets/utils/wxAPI';
import Base from '../../assets/utils/base'
import BookModel from '../../models/book_model'
import {
  random
} from '../../assets/utils/common'
const WX = new wxAPI();
const bs = new Base();
const bookModel = new BookModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    books: [],
    searching: false,
    more: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    bookModel.getHotList()
      .then(
        res => {
          this.setData({
            books: res
          })
        }
      )
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      // 用随机字符串来触发search里的_load_more
      more: random(16)
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onSearching(event) {
    this.setData({
      searching: true
    })
  },
  onCancel(event) {
    this.setData({
      searching: false
    })
  }
})