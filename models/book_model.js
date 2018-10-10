import Base from '../assets/utils/base.js'
import Config from '../assets/config.js';

class BookModel extends Base {
  constructor() {
    super();
    this.baseUrl = Config.baseUrl;
    this.tokenName = Config.request.tokenName;
    this.tokenValue = Config[Config.request.tokenName];
    this.msgName = Config.response.msgName;
    this.statusName = Config.response.statusName;
  }
  getHotList() {
    return this.req({
      url: 'book/hot_list'
    })
  }
  search(start, q) {
    return this.req({
      url: 'book/search?summary=1',
      data: {
        q: q,
        start: start
      },
      loading: false
    })
  }
  getMyBookCount() {
    return this.req({
      url: 'book/favor/count'
    })
  }
  getDetail(bid) {
    return this.req({
      url: `book/${bid}/detail`
    })
  }
  getLikeStatus(bid) {
    return this.req({
      url: `/book/${bid}/favor`
    })
  }
  getComments(bid) {
    return this.req({
      url: `book/${bid}/short_comment`
    })
  }
  postComment(bid, comment) {
    return this.req({
      url: 'book/add/short_comment',
      method: 'POST',
      data: {
        book_id: bid,
        content: comment
      },
      loading: false
    })
  }

}

export default BookModel