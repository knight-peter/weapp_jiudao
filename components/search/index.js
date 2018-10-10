// components/search/index.js
import KeywordModel from '../../models/keyword_model'
import BookModel from '../../models/book_model'
import paginationBev from '../behaviors/pagination'

const keywordModel = new KeywordModel()
const bookModel = new BookModel()

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [paginationBev],
  properties: {
    more: {
      type: String,
      observer: 'loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    searching: false,
    q: '',
    loading: false,
    loadingCenter: false,
  },
  attached() {
    this.setData({
      historyWords: keywordModel.getHistory(),

    })

    keywordModel.getHot().then(res => {
      this.setData({
        hotWords: res.hot
      })
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    /* 滚动加载 */
    loadMore() {
      if (!this.data.q) {
        return
      }
      if (this.isLocked()) {
        return
      }

      if (this.hasMore()) {
        this.locked()
        bookModel.search(this.getCurrentStart(), this.data.q)
          .then(res => {
            const tempArray = this.data.dataArray.concat(res.books)
            this.setMoreData(res.books)
            this.unLocked()
          })
          .catch(() => {
            this.unLocked()
          })
      }
    },
    onCancel(event) {
      this.initialize() // 清空之前的搜索数据
      this.triggerEvent('cancel', {}, {})
    },

    onDelete(event) {
      this.initialize() // 清空之前的搜索数据
      this._closeResult()
    },

    onConfirm(event) {
      this._showResult()
      this._showLoadingCenter()
      this.initialize() // 清空之前的搜索数据
      const q = event.detail.value || event.detail.text
      this.setData({
        q
      })
      bookModel.search(0, q)
        .then(res => {
          this.setMoreData(res.books)
          this.setTotal(res.total)
          keywordModel.addToHistory(q)
          this._hideLoadingCenter()
        })
    },
    /* 显示loading */
    _showLoadingCenter() {
      this.setData({
        loadingCenter: true
      })
    },
    /* 结束loading */
    _hideLoadingCenter() {
      this.setData({
        loadingCenter: false
      })
    },
    /* 进入搜索状态 */
    _showResult() {
      this.setData({
        searching: true
      })
    },
    /* 结束搜索状态 */
    _closeResult() {
      this.setData({
        searching: false,
        q: ''
      })
    }
  }
})