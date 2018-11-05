
import Vue from 'vue'
import Vuex from 'vuex'

import common from './modules/common.js'
import index from './modules/index.js'
import issue from './modules/issue.js'
import list from './modules/list.js'
import myOrder from './modules/myOrder.js'
import orderDetail from './modules/orderDetail.js'
import rater from './modules/rater.js'
import bindRole from './modules/bindRole.js'
import selectGame from './modules/selectGame.js'
import login from './modules/login.js'
import validateRole from './modules/validateRole.js'
import selectSDKRole from './modules/selectSDKRole.js'

Vue.use(Vuex)

const state = {
  isLoading: false,
  orientation: 0  //横屏为1 竖屏为0
}

export default new Vuex.Store({
  modules: {
    common,
    index,
    issue,
    list,
    myOrder,
    orderDetail,
    rater,
    bindRole,
    selectGame,
    login,
    validateRole,
    selectSDKRole
  },
  state,
  mutations: {
    updateLoadingStatus (state, payload) {
      state.isLoading = payload
    },
    updateOrientation(state, payload){
      state.orientation = payload
    }
  }
})
