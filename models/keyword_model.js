import Base from '../assets/utils/base.js'
import Config from '../assets/config.js';
class KeywordModel extends Base {
  key = 'q'
  maxLength = 10
  getHistory() {
    const words = wx.getStorageSync(this.key)
    if (!words) {
      return []
    }
    return words
  }
  getHot() {
    return this.req({
      url: '/book/hot_keyword',
      loading: false
    })
  }

  addToHistory(keyword) {
    let words = this.getHistory()
    const has = words.includes(keyword)
    // 队列 栈
    if (!has) {
      // 数组末尾 删除 ， keyword 数组第一位
      const length = words.length
      if (length >= this.maxLength) {
        words.pop()
      }
      words.unshift(keyword)
      wx.setStorageSync(this.key, words)
    }
  }
}

export default KeywordModel