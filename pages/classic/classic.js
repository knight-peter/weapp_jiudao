import wxAPI from '../../assets/utils/wxAPI';
import Base from '../../assets/utils/base'
import ClassicModel from '../../models/classic_model'
const WX = new wxAPI();
const bs = new Base();
const classic = new ClassicModel();
// pages/classic/classic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /* WX.request({
        url: '/classic/latest',
      })
      .then(res => {
        console.log(res)
      }) */
    /* bs.req({
        url: '/classic/latest',
        // loading: false
      })
      .then(res => {
        console.log(res)
      }) */
    // bs.loginIn()
    // WX.login().then(res => console.log(res))
    classic.getLatest().then(res => console.log(res))
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})