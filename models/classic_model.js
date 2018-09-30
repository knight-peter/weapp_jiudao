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
  }
  getLatest() {
    return this.req({
      url: '/classic/latest',
    })
  }

}
export default ClassicModel;