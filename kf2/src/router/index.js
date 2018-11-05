import * as util from '@/util'
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Index = () => import('@/views/Index.vue')
const Issue = () => import('@/views/Issue.vue')
const List = () => import('@/views/List.vue')
const MyOrder = () => import('@/views/MyOrder.vue')
const OrderDetail = () => import('@/views/OrderDetail.vue')
const Rater = () => import('@/views/Rater.vue')
const BindRole = () => import('@/views/BindRole.vue')
const BindSelectGame = () => import('@/views/BindSelectGame.vue')
const Login = () => import('@/views/Login.vue')
const ValidateRole = () => import('@/views/ValidateRole.vue')
const SelectSDKRole = () => import('@/views/SelectSDKRole.vue')
const SelectBindRole = () => import('@/views/SelectBindRole.vue')
const MainSelectGame = () => import('@/views/MainSelectGame.vue')


const routes = [
  {
    path: '/mainSelectGame',
    name: 'mainSelectGame',
    component: MainSelectGame,
    meta: {
      title: '选择游戏',
    }
  },
  {
    path: '/index',
    name: 'index',
    component: Index,
    meta: {
      title: '首页',
    }
  },
  {
    path: '/issue',
    name: 'issue',
    component: Issue,
    meta: [{title: '充值问题'}, {title: '游戏问题'}, {title: '意见反馈'}, {title: '登录问题'}, {title: '举报申诉'}]
  },
  {
    path: '/list',
    name: 'list',
    component: List,
    meta: {
      title: '列表',
    }
  },
  {
    path: '/myOrder',
    name: 'myOrder',
    component: MyOrder,
    meta: {
      title: '我的提单',
    }
  },
  {
    path: '/orderDetail',
    name: 'orderDetail',
    component: OrderDetail,
    meta: {
      title: '订单详情',
    }
  },
  {
    path: '/rater',
    name: 'rater',
    component: Rater,
    meta: {
      title: '评分',
    }
  },
  {
    path: '/bindRole',
    name: 'bindRole',
    component: BindRole,
    meta: {
      title: '绑定角色',
    }
  },
  {
    path: '/bindSelectGame',
    name: 'bindSelectGame',
    component: BindSelectGame,
    meta: {
      title: '绑定角色',
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      title: '绑定角色',
    }
  },
  {
    path: '/validateRole',
    name: 'validateRole',
    component: ValidateRole,
    meta: {
      title: '绑定角色',
    }
  },
  {
    path: '/selectSDKRole',
    name: 'selectSDKRole',
    component: SelectSDKRole,
    meta: {
      title: '绑定角色',
    }
  },
  {
    path: '/selectBindRole',
    name: 'selectBindRole',
    component: SelectBindRole,
    meta: {
      title: '选择角色',
    }
  },
  {
    path: '/bindSuccess',
    name: 'bindSuccess',
    component: BindRole,
    meta: {
      title: '绑定角色',
    }
  },
  {
    path: '*',
    redirect(){
      if(util.isWeiXin()){
        return '/mainSelectGame'
      }else{
        return '/index'
      }
    }
  }
]

export default new Router({
  // mode: 'history',
  routes
})
