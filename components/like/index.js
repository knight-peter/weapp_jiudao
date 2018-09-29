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
      // value: 999
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    countStr: 999,
    yesSrc: './images/like.png',
    noSrc: './images/like@dis.png',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike(event) {
      let like = this.properties.like
      let count = this.properties.count
      count = like ? count - 1 : count + 1
      let countStr = this._numChange(count)

      this.setData({
        like: !like,
        count: count,
        countStr: countStr
      })
    },
    /* 当喜欢数到1000时，显示文字为1k */
    _numChange(count) {
      let countStr = count.toString();
      let countLen = countStr.length;
      if (count >= 1000) {
        countStr = countStr.substr(0, countLen - 3) + 'k'
      }
      return countStr;
    }
  },
  ready: function () {
    let that = this;
    let countStr = this._numChange(that.properties.count)
    this.setData({
      like: that.properties.liek,
      count: that.properties.count,
      countStr: countStr
    })
  }
})