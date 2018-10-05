import Base from '../assets/utils/base.js'
import Config from '../assets/config.js';
class ClassicModel extends Base {
  constructor() {
    super();
    this.baseUrl = Config.baseUrl;
    this.tokenName = Config.request.tokenName;
    this.tokenValue = Config[Config.request.tokenName];
    this.msgName = Config.response.msgName;
    this.statusName = Config.response.statusName;
    this.classicContent = {}
  }
  /* 获取最新一期 */
  getLatest() {
    return this.req({
        url: '/classic/latest',
      })
      .then(res => {
        // 在storage中写入最新一期index
        this._setLatestIndex(res.index)
        let classicContent = this.classicContent
        classicContent[this._getKey(res.index)] = res
        wx.setStorageSync('classicContent', classicContent)
        return res
      })
  }
  /* 获取期刊数据,返回缓存数据，没有则从服务器获取 */
  getClassic(index, nextOrPrevious) {
    let key = nextOrPrevious == 'next' ? this._getKey(index + 1) : this._getKey(index - 1)
    let classicObj = wx.getStorageSync('classicContent')
    let classic = classicObj[key]
    if (!classic) {
      return this.req({
          url: `classic/${index}/${nextOrPrevious}`
        })
        .then(res => {
          let classicContent = this.classicContent
          classicContent[this._getKey(res.index)] = res
          wx.setStorageSync('classicContent', classicContent)
          return res
        })
    } else {
      return new Promise((resolve, reject) => {
        resolve(classic)
      })
    }

  }
  /* 判断当前期刊是否是最旧一期 */
  isFirst(index) {
    return index === 1 ? true : false
  }
  /* 判断当前期刊是否是最新一期 */
  isLatest(index) {
    const latestIndex = this._getLatestIndex()
    return latestIndex == index ? true : false
  }
  /* 在storage中写入最新一期index */
  _setLatestIndex(index) {
    wx.setStorageSync('latest', index)
  }
  /* 在storage中读取最新一期index */
  _getLatestIndex() {
    const index = wx.getStorageSync('latest')
    return index
  }
  /* 生成缓存的key值 */
  _getKey(index) {
    let key = 'classic-' + index
    return key
  }
}
export default ClassicModel;