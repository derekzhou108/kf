
//actions
export const FETCH_APP_LIST = 'FETCH_APP_LIST' //游戏服务器列表
export const FETCH_HOT = 'FETCH_HOT'  //热门问题列表
export const FETCH_ANNOUNCEMENT = 'FETCH_ANNOUNCEMENT'  //公告栏
export const FETCH_CATEGORY = 'FETCH_CATEGORY'  //问题类型
export const FETCH_SEARCH_LIST = 'FETCH_SEARCH_LIST'  //列表
export const POST_COMMENT = 'POST_COMMENT' //提交问题评论
export const FETCH_CATEGORY_LIST = 'FETCH_CATEGORY_LIST'  //问题类型列表
export const FETCH_MYORDER = 'FETCH_MYORDER'  //我的订单
export const POST_UPLOAD = 'POST_UPLOAD'  //上传图片
export const FETCH_SERVER_LIST = 'FETCH_SERVER_LIST'  //服务器列表
export const FETCH_GAME_LIST = 'FETCH_GAME_LIST'  //游戏列表
export const POST_ISSUE0 = 'POST_ISSUE0'  //提交问题
export const POST_ISSUE1 = 'POST_ISSUE1'  //提交问题
export const POST_ISSUE2 = 'POST_ISSUE2'  //提交问题
export const POST_ISSUE3 = 'POST_ISSUE3'  //提交问题
export const POST_ISSUE4 = 'POST_ISSUE4'  //提交问题
export const FETCH_ORDER_DETAIL = 'FETCH_ORDER_DETAIL'  //订单详情
export const FETCH_EVALUATION_SETTINGS = 'FETCH_EVALUATION_SETTINGS'  //评价配置信息
export const POST_EVALUATION = 'POST_EVALUATION'  //提交评价
export const FETCH_ROLES_LIST = 'FETCH_ROLES_LIST'  //用户绑定的角色
export const POST_CODE = 'POST_CODE'  //发送验证码
export const POST_ROLE_BIND = 'POST_ROLE_BIND'  //角色绑定
export const POST_ROLE_UNBIND = 'POST_ROLE_UNBIND'  //角色解绑
export const FETCH_GUIDE = 'FETCH_GUIDE'  //选择平台引导文字
export const POST_LOGIN = 'POST_LOGIN'  //登录
export const FETCH_CODE = 'FETCH_CODE'  //获取验证码
export const POST_FIND_PASSWORD = 'POST_FIND_PASSWORD'  //找回密码
export const POST_SEND_VERIFICATION = 'POST_SEND_VERIFICATION'  //发送角色验证码
export const POST_CHECK = 'POST_CHECK'  //用户登录信息校验
export const FETCH_GAME_ROLES = 'FETCH_GAME_ROLES'  //SDK用户 角色列表
export const POST_SDK_BIND_ROLE = 'POST_SDK_BIND_ROLE'  //sdk角色绑定

//mutations
export const TOGGLE_RESET_LIST = 'TOGGLE_RESET_LIST'  //列表重置
export const TOGGLE_INIT_CATEGORY_LIST = 'TOGGLE_INIT_CATEGORY_LIST'  //初始化问题类型列表
export const TOGGLE_RESET_MYORDER = 'TOGGLE_RESET_MYORDER'  //我的订单重置
export const TOGGLE_UPLOAD_RESET = 'TOGGLE_UPLOAD_RESET'  //上传图片清空
export const TOGGLE_UPLOAD_DELETE = 'TOGGLE_UPLOAD_DELETE'  //上传图片删除
export const TOGGLE_ROLES_LIST_RESET = 'TOGGLE_ROLES_LIST_RESET'  //用户绑定的角色重置
export const TOGGLE_ORDER_SCROLL = 'TOGGLE_ORDER_SCROLL'  //我的订单滚动高度
export const TOGGLE_RESET_INDEX = 'TOGGLE_RESET_INDEX'  //清空首页数据
export const TOGGLE_RESET_CATEGORY = 'TOGGLE_RESET_CATEGORY'  //清空问题类型
export const TOGGLE_SOURCE = 'TOGGLE_SOURCE' //终端类型

//getters
export const DONE_APP_LIST = 'DONE_APP_LIST' //游戏服务器列表
export const DONE_HOT = 'DONE_HOT'  //热门问题列表
export const DONE_ANNOUNCEMENT = 'DONE_ANNOUNCEMENT'  //公告栏
export const DONE_ANNOUNCEMENT_INTERVAL = 'DONE_ANNOUNCEMENT_INTERVAL'  //公告栏间隔时间
export const DONE_CATEGORY = 'DONE_CATEGORY'  //问题类型
export const DONE_SEARCH_LIST = 'DONE_SEARCH_LIST' //列表
export const DONE_CATEGORY_LIST = 'DONE_CATEGORY_LIST'  //问题类型列表
export const DONE_MYORDER = 'DONE_MYORDER'  //我的订单
export const DONE_UPLOAD = 'DONE_UPLOAD'  //上传图片
export const DONE_SERVER_LIST = 'DONE_SERVER_LIST'  //服务器列表
export const DONE_GAME_LIST = 'DONE_GAME_LIST'  //游戏列表
export const DONE_ORDER_DETAIL = 'DONE_ORDER_DETAIL'  //订单详情
export const DONE_EVALUATION_SETTINGS = 'DONE_EVALUATION_SETTINGS'  //评价配置信息
export const DONE_ROLES_LIST = 'DONE_ROLES_LIST'  //用户绑定的角色
export const DONE_GUIDE = 'DONE_GUIDE'  //选择平台引导文字
export const DONE_GAME_ROLES = 'DONE_GAME_ROLES'  //SDK用户 角色列表
export const DONE_ORDER_SCROLL = 'DONE_ORDER_SCROLL'  //我的订单滚动高度
export const DONE_EXISTDATA = 'DONE_EXISTDATA'  //是否存在数据
export const DONE_SOURCE = 'DONE_SOURCE'  //终端类型

