// pages/book-detail/book-detail.js
import wxAPI from '../../assets/utils/wxAPI';
import Base from '../../assets/utils/base'
import BookModel from '../../models/book_model'
import LikeModel from '../../models/like_model'
const WX = new wxAPI();
const bs = new Base();
const bookModel = new BookModel();
const likeModel = new LikeModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments: [],
    book: null,
    likeStatus: false,
    likeCount: 0,
    posting: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const bid = options.bid
    const detail = bookModel.getDetail(bid)
    const comments = bookModel.getComments(bid)
    const likeStatus = bookModel.getLikeStatus(bid)

    Promise.all([detail, comments, likeStatus])
      .then(res => {
        this.setData({
          book: res[0],
          comments: res[1].comments,
          likeStatus: res[2].like_status,
          likeCount: res[2].fav_nums
        })
      })
  },

  onLike(event) {
    const like_or_cancel = event.detail.behavior
    likeModel.like(like_or_cancel, this.data.book.id, 400)
  },
  onFakePost(event) {
    this.setData({
      posting: true
    })
  },
  onCancel(event) {
    this.setData({
      posting: false
    })
  },
  /* 添加新短评 */
  onPost(event) {
    // event.detail.text 点击的值；event.detail.value 输入的值
    const comment = event.detail.text || event.detail.value

    if (!comment) {
      return
    }
    if (comment.length > 12) {
      WX.showToast({
        title: '短评最多12个字',
        icon: 'none'
      })
      return
    }

    bookModel.postComment(this.data.book.id, comment)
      .then(res => {
        WX.showToast({
          title: `${comment} +1`,
          icon: 'none'
        })

        this.data.comments.unshift({
          content: comment,
          nums: 1
        })
        this.setData({
          comments: this.data.comments,
          posting: false
        })
      })
  }
})