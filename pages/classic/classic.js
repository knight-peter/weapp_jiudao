import wxAPI from '../../assets/utils/wxAPI';
import Base from '../../assets/utils/base'
import ClassicModel from '../../models/classic_model'
import LikeModel from '../../models/like_model'
const WX = new wxAPI();
const bs = new Base();
const classicModel = new ClassicModel();
const likeModel = new LikeModel();
// pages/classic/classic.js
Page({
  properties: {
    cid: Number,
    type: Number
  },
  /**
   * 页面的初始数据
   */
  data: {
    classic: null,
    likeCount: 0,
    likeStatus: false,
    first: false,
    latest: true
  },

  /**
   * 生命周期函数--监听页面加载
   */


  attached(options) {
    const cid = this.properties.cid
    const type = this.properties.type
    if (!cid) {
      classicModel.getLatest().then(res => {
        this.setData({
          classic: res
        })
      })
    } else {
      classicModel.getById(cid, type)
        .then(res => {
          this._getLikeStatus(res.id, res.type)
          this.setData({
            classic: res,
            latest: classicModel.isLatest(res.index),
            first: classicModel.isFirst(res.index)
          })
        })
    }
  },
  /* 收藏功能 */
  onLike(event) {
    // console.log(event)
    let behavior = event.detail.behavior;
    likeModel.like(behavior, this.data.classic.id, this.data.classic.type)
  },
  /* 切换期刊 */
  onNext(event) {
    this._updateClassic('next')
  },
  onPrevious(event) {
    this._updateClassic('previous')
  },
  /* 切换期刊的私有方法 */
  _updateClassic(nextOrPrevious) {
    let index = this.data.classic.index
    classicModel.getClassic(index, nextOrPrevious)
      .then(res => {
        this._getLikeStatus(res.id, res.type)
        this.setData({
          classic: res,
          latest: classicModel.isLatest(res.index),
          first: classicModel.isFirst(res.index)
        })
      })
  },
  _getLikeStatus(artID, category) {
    likeModel.getClassicLikeStatus(artID, category)
      .then(res => {
        // 合并两个对象
        let newVal = Object.assign(this.data.classic, res)
        this.setData({
          classic: newVal
        })
      })
  }
})