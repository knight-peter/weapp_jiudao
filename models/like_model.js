import Base from '../assets/utils/base.js'
import Config from '../assets/config.js';
class LikeModel extends Base {
  constructor() {
    super();
    this.baseUrl = Config.baseUrl;
    this.tokenName = Config.request.tokenName;
    this.tokenValue = Config[Config.request.tokenName];
    this.msgName = Config.response.msgName;
    this.statusName = Config.response.statusName;
  }
  like(behavior, artID, category) {
    let url = behavior == 'like' ? 'like' : 'like/cancel'
    return this.req({
        url: url,
        method: 'Post',
        data: {
          art_id: artID,
          type: category
        },
        loading: false
      })
      .then(res => {
        // console.log(res)
        let title = behavior == 'like' ? '收藏成功' : '取消收藏'
        let error_code = res.error_code
        if (error_code === 0) {
          super.showToast({
            title: title,
            icon: 'success',
            duration: 1500
          })
        }

        return res
      })
  }

}
export default LikeModel;