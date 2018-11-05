
import * as types from '../types'
import api from '@/api'

const state = {

}

const getters = {

}

const actions = {
   [types.POST_LOGIN]({ state, commit, dispatch ,rootState }, payload){
    return new Promise((resolve, reject) => {
      commit('updateLoadingStatus', true)
      api.login(payload, (err, data) => {
        commit('updateLoadingStatus', false)
        if(err){
          console.error(err.message)
          reject(err)
        }else{
          if(data.code === 10000){
            let check = {
              //loginAppId: rootState.route.query.appid,
              sdkUserId: data.data.user_id,
              token: data.data.token
            }
           dispatch('POST_CHECK', check)
             .then((res) => {
                resolve(data)
             }, (res) => {
                reject(res)
             })
          }else{
            reject(data)
          }
        }
      })
    })
  },
  [types.FETCH_CODE]({ state, commit, rootState }, payload){
    return new Promise((resolve, reject) => {
      commit('updateLoadingStatus', true)
      api.loginSendCode(payload, (err, data) => {
        commit('updateLoadingStatus', false)
        if(err){
          console.error(err.message)
          reject(err)
        }else{
          if(data.code === 10000){
            resolve(data)
          }else{
            reject(data)
          }
        }
      })
    })
  },
  [types.POST_FIND_PASSWORD]({ state, commit, rootState }, payload){
    return new Promise((resolve, reject) => {
      commit('updateLoadingStatus', true)
      api.findPwd(payload, (err, data) => {
        commit('updateLoadingStatus', false)
        if(err){
          console.error(err.message)
          reject(err)
        }else{
          if(data.code === 10000){
            resolve(data)
          }else{
            reject(data)
          }
        }
      })
    })
  },
  [types.POST_CHECK]({ state, commit, rootState }, payload){
    return new Promise((resolve, reject) => {
      api.check(payload)
        .then(res => {
          if(res.data.code === 10000){
            resolve(res.data)
          }else{
            reject(res.data);
          }
        })
    })
  },
}

const mutations ={

}

export default {
  state,
  getters,
  actions,
  mutations
}
