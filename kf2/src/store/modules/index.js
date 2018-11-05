
import * as types from '../types'
import api from '@/api'
import Vue from 'vue';
import store from '@/store'

const state = {
  hot: [],
  category: [],
  source: ''
}

const getters = {
  [types.DONE_HOT]: ({ hot }) => hot,
  [types.DONE_CATEGORY]: ({ category }) => category,
  [types.DONE_SOURCE]: ({ source }) => source
}

const actions = {
   [types.FETCH_HOT] ({ commit, state}, payload){
    return new Promise((resolve, reject) => {
      api.hot(payload)
        .then(res => {
          if(res.data.code === 10000){
            state.hot = res.data.data
            resolve(res.data.data)
          }else{
            //reject(res.data);
          }
        })
    })
  },
   [types.FETCH_CATEGORY] ({ commit, state}, payload){
    return new Promise((resolve, reject) => {
      api.category(payload)
        .then(res => {
          if(res.data.code === 10000){
            state.category = res.data.data
            resolve(res.data.data)
          }else{
            //reject(res.data);
          }
        })
    })
  }

}

const mutations = {
  [types.TOGGLE_RESET_INDEX]( state){
    store.state.myOrder.myOrder = {pageIdx: 0,list: [],noMore: false}
    store.state.common.announcement = []
    state.hot = []
    state.category = []
  },
  [types.TOGGLE_SOURCE] (state, payload){
      state.source = payload 
  }
}


export default {
  state,
  getters,
  actions,
  mutations
}
