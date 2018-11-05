
import * as types from '../types'
import api from '@/api'

const state = {
  detail: {}
}

const getters = {
  [types.DONE_ORDER_DETAIL]: ({ detail }) => detail,
}

const actions = {
  [types.FETCH_ORDER_DETAIL] ({ commit, state}, payload){
    return new Promise((resolve, reject) => {
      api.questionDetail(payload)
        .then(res => {
          if(res.data.code === 10000){
            state.detail = res.data.data
            resolve(res.data)
          }else{
            reject(res.data);
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
