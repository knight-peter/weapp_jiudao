// 配置参数
class Config {
  constructor() {}
}
Config.baseUrl = ''

Config.tableName = 'weTable' //本地存储表名
Config.interceptor = true //是否开启未登入拦截
Config.request = { // token字段名
  tokenName: 'token'
}
Config[Config.request.tokenName] = 123456 //token值
Config.response = {
  statusName: 'code', //数据状态的字段名称
  statusCode: {
    ok: 200, //数据状态一切正常的状态码（已修改源码view.js，填写响应正常状态码的首个数字）
    logout: 401, //登录状态失效的状态码
  },
  msgName: 'msg', //状态信息的字段名称
  dataName: 'data' //数据详情的字段名称
}
Config.logoutUrl = '' //退出登录网址

export default Config