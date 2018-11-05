import Axios from 'axios'
import Jsonp from 'jsonp'
import store from '../store'
import qs from 'qs'
import * as util from '@/util'

require('es6-promise').polyfill()

Axios.defaults.headers = {
  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  'X-Requested-With': 'XMLHttpRequest'
}
Axios.defaults.transformRequest =  [function (data) {
  //添加请求标识
  let { openid, roleId, appId } = util.getLocalData('user') || {}
  if(data){
    if(util.isWeiXin()){
      data.source = 'wechat'
      data.openid = openid
    }else{
      data.source = 'wap'
      // data.roleId = roleId
    }
  }
  return qs.stringify(data)
}]
Axios.defaults.timeout = 20000

// 添加请求拦截器
Axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    store.commit('updateLoadingStatus', true)
    document.documentElement.classList.add('loading')
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
Axios.interceptors.response.use(function (response) {
  store.commit('updateLoadingStatus', false)
  document.documentElement.classList.remove('loading')
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  if(error.toString().indexOf('timeout') !== -1){
    util.toastText('连接超时，请稍后重试' )
  }else{
    util.toastText('服务器异常，请稍后重试')
  }
  store.commit('updateLoadingStatus', {isLoading: false})
  return Promise.reject(error);
});

// const url = 'http://10.10.40.33:8111'      //内网开发环境
// const url = 'http://115.159.189.146:8001'  //沙箱环境
const url = 'http://kssdk.ksgame.com'        //正式环境

export default {
  //游戏服务器列表
  appList: data => Axios.post('/kf/get-app-list', data),
  //热门问题
  hot: data => Axios.post('/kf/hot', data),
  //获取公告栏列表
  announcement: data => Axios.post('/kf/announcement', data),
  //获取问题分类
  category: data => Axios.post('/kf/category', data),
  //搜索热门问题
  search: data => Axios.post('/kf/search', data),
  //提交问题评论
  comment: data => Axios.post('/kf/comment', data),
  //我的提单列表
  myOrder: data => Axios.post('/kf/my-list', data),
  //渠道、游戏区
  serverList: data => Axios.post('/kf/get-server-list', data),
  //上传图片
  upload: data => Axios.post('/kf/upload', data),
  //充值问题
  postRecharge: data => Axios.post('/kf/submit-recharge', data),
  //游戏问题&BUG
  postBug: data => Axios.post('/kf/submit-bug', data),
  //意见反馈
  postSuggest: data => Axios.post('/kf/submit-suggest', data),
  //网络问题
  postNetwork: data => Axios.post('/kf/submit-network', data),
  //举报&申诉
  postReport: data => Axios.post('/kf/submit-report', data),
  //客服订单详情
  questionDetail: data => Axios.post('/kf/question-detail', data),
  //评价配置信息
  evaluationSettings: data => Axios.post('/evaluation/settings', data),
  //提交评价
  submitEvaluation: data => Axios.post('/evaluation/submit-evaluation', data),
  //获取用户绑定的角色
  rolesList: data => Axios.post('/wechat/roles', data),
  //发送角色验证码
  sendVerification: data => Axios.post('/wechat/send-verification', data),
  //绑定角色
  roleBind: data => Axios.post('/wechat/role-bind', data),
  //解绑角色
  roleUnbind: data => Axios.post('/wechat/role-un-bind', data),
  //选择平台引导文字
  guide: data => Axios.post('/kf/guide', data),
  //登录
  login: (data, cb) => Jsonp(url + '/sdk-user/login?' + qs.stringify(data), null, cb),
  //登录发送验证码
  loginSendCode: (data, cb) => Jsonp(url + '/sdk-user/send-sms-code?' + qs.stringify(data), null, cb),
  //找回密码
  findPwd: (data, cb) => Jsonp(url + '/sdk-user/find-pwd?' + qs.stringify(data), null, cb),
  //SDK用户 信息校验
  check: data => Axios.post('/sdk-user/check', data),
  //SDK用户 获取角色列表
  sdkGameRoles: data => Axios.post('/sdk-user/get-game-roles', data),
  //SDK用户 角色绑定
  sdkBindRole: data => Axios.post('/sdk-user/bind-role', data),
}

