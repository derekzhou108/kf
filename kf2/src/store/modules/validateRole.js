
import * as types from '../types'
import api from '@/api'

const state = {

}

const getters = {

}

const actions = {
  [types.POST_SEND_VERIFICATION] ({ commit, state}, playload){
    return new Promise((resolve, reject) => {
      api.sendVerification(playload)
        .then(res => {
          if(res.data.code === 10000){
            resolve(res.data)
          }else{
            reject(res.data);
          }
        })
    })
  },
  [types.POST_ROLE_BIND] ({ commit, state}, playload){
    return new Promise((resolve, reject) => {
      api.roleBind(playload)
        .then(res => {
          if(res.data.code === 10000){
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
