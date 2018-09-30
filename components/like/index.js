// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    like: {
      type: Boolean,
    },
    count: {
      type: Number,
      observer: function (newVal, oldVal, changedPath) {
        this._changeCount(newVal)
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    countStr: '',
    yesSrc: './images/like.png',
    noSrc: './images/like@dis.png',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike(event) {
      // 自定义事件
      let like = this.properties.like
      let count = this.properties.count
      count = like ? count - 1 : count + 1
      let countStr = this._numChange(count)

      this.setData({
        like: !like,
        count: count,
        countStr: countStr
      })
      // 激活自定义事件
      let behavior = this.properties.like ? 'like' : 'cancel'
      this.triggerEvent('like', {
        behavior: behavior
      }, {})
    },
    /* 当喜欢数到1000时，显示文字为1k */
    _numChange(count) {
      let countStr = count.toString();
      let countLen = countStr.length;
      if (count >= 1000) {
        countStr = countStr.substr(0, countLen - 3) + 'k'
      }
      return countStr;
    },
    /* 改变喜欢总数 */
    _changeCount(newVal) {
      this.setData({
        countStr: this._numChange(newVal)
      })
    }

  },
})