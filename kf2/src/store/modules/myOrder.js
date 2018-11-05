
import * as types from '../types'
import api from '@/api'

const state = {
  existData: true,
  myOrder: {
    pageIdx: 0,
    list: [],
    noMore: false
  },
  scroll: {
    top: 0
  }
}

const getters = {
  [types.DONE_EXISTDATA]: state => state.existData,
  [types.DONE_MYORDER]: ({ myOrder }) => myOrder,
  [types.DONE_ORDER_SCROLL]: ({ scroll }) => scroll
}

const actions = {
  [types.FETCH_MYORDER] ({ commit, state}, { appId, roleId, pId }){
    return new Promise((resolve, reject) => {
      api.myOrder({ appId, roleId, pId, pageIdx: state.myOrder.pageIdx })
        .then(res => {
          if(res.data.code === 10000){
            if(state.myOrder.list.length < res.data.total){
              state.existData = true
              state.myOrder.list = state.myOrder.list.concat(res.data.data)
              state.myOrder.pageIdx ++
              if(state.myOrder.list.length >= res.data.total){
                state.myOrder.noMore = true
              }
              resolve(res.data.data)
            }else{
              if (!res.data.total) {
                state.existData = false
              }
              state.myOrder.noMore = true
              //reject(res.data)
            }
          }else{
            reject(res.data);
          }
        })
    })
  }
}

const mutations ={
  [types.TOGGLE_RESET_MYORDER] (state){
    state.existData = true
    state.myOrder = {
      pageIdx: 0,
      list: [],
      noMore: false
    }
    state.scroll = {
      top: 0
    }
  },
  [types.TOGGLE_ORDER_SCROLL](state, { top }){
    state.scroll.top = top
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
