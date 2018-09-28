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
      type: Number
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
    onLike: function (event) {
      console.log(event)
      let like = !this.data.like;
      let changeNum = 1;
      if (!like) {
        changeNum = -1
      }
      let count = this.data.count + changeNum
      let countStr = count.toString();
      let countLen = countStr.length;
      if (count >= 1000) {
        countStr = countStr.substr(0, countLen - 3) + 'k'
      }

      this.setData({
        like: like,
        count: count,
        countStr: countStr
      })
    }
  },
  ready: function () {
    this.setData({
      countStr: this.properties.count
    })
  }
})