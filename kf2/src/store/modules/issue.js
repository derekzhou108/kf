
import * as types from '../types'
import api from '@/api'

const state = {
  serverList: {}
}

const getters = {
  [types.DONE_SERVER_LIST]: ({ serverList }) => serverList
}

const actions = {
  [types.FETCH_SERVER_LIST] ({ commit, state}, payload){
    return new Promise((resolve, reject) => {
      api.serverList(payload)
        .then(res => {
          if(res.data.code === 10000){
            state.serverList = res.data.data
            resolve(res.data.data)
          }else{
            reject(res.data);
          }
        })
    })
  },
  [types.POST_ISSUE0]({ commit, state}, payload){
    return new Promise((resolve, reject) => {
      api.postRecharge(payload).then(res => {
        if(res.data.code === 10000){
          // let obj = {
          //   desc: res.data.data.qDesc,
          //   id: res.data.data.id,
          //   status: 0,
          //   time: res.data.data.time,
          //   firstReplyTime: 0
          // }
          // commit(types.TOGGLE_ORDER_LIST_ADD, obj)
          resolve(res.data)
        }else{
          reject(res.data.msg)
        }
      })
    })
  },
  [types.POST_ISSUE1]({ commit, state}, payload){
    return new Promise((resolve, reject) => {
      api.postBug(payload).then(res => {
        if(res.data.code === 10000){
          // let obj = {
          //   desc: res.data.data.qDesc,
          //   id: res.data.data.id,
          //   status: 0,
          //   time: res.data.data.time,
          //   firstReplyTime: 0
          // }
          // commit(types.TOGGLE_ORDER_LIST_ADD, obj)
          resolve(res.data)
        }else{
          reject(res.data.msg)
        }
      })
    })
  },
  [types.POST_ISSUE2]({ commit, state}, payload){
    return new Promise((resolve, reject) => {
      api.postSuggest(payload).then(res => {
        if(res.data.code === 10000){
          // let obj = {
          //   desc: res.data.data.qDesc,
          //   id: res.data.data.id,
          //   status: 0,
          //   time: res.data.data.time,
          //   firstReplyTime: 0
          // }
          // commit(types.TOGGLE_ORDER_LIST_ADD, obj)
          resolve(res.data)
        }else{
          reject(res.data.msg)
        }
      })
    })
  },
  [types.POST_ISSUE3]({ commit, state}, payload){
    return new Promise((resolve, reject) => {
      api.postNetwork(payload).then(res => {
        if(res.data.code === 10000){
          // let obj = {
          //   desc: res.data.data.qDesc,
          //   id: res.data.data.id,
          //   status: 0,
          //   time: res.data.data.time,
          //   firstReplyTime: 0
          // }
          // commit(types.TOGGLE_ORDER_LIST_ADD, obj)
          resolve(res.data)
        }else{
          reject(res.data.msg)
        }
      })
    })
  },
  [types.POST_ISSUE4]({ commit, state}, payload){
    return new Promise((resolve, reject) => {
      api.postReport(payload).then(res => {
        if(res.data.code === 10000){
          // let obj = {
          //   desc: res.data.data.qDesc,
          //   id: res.data.data.id,
          //   status: 0,
          //   time: res.data.data.time,
          //   firstReplyTime: 0
          // }
          // commit(types.TOGGLE_ORDER_LIST_ADD, obj)
          resolve(res.data)
        }else{
          reject(res.data.msg)
        }
      })
    })
  }
}

const mutations ={


}

export default {
  state,
  getters,
  actions,
  mutations
}
