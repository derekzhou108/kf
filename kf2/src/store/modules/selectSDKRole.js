
import * as types from '../types'
import api from '@/api'

const state = {
  list: [],
}

const getters = {
  [types.DONE_GAME_ROLES]: ( { list } ) => list,
}

const actions = {
  [types.FETCH_GAME_ROLES] ({ commit, state}, playload){
    return new Promise((resolve, reject) => {
      api.sdkGameRoles(playload)
        .then(res => {
          if(res.data.code === 10000){
            state.list = res.data.data
          }else{
            reject(res.data);
          }
        })
    })
  },
  [types.FETCH_GAME_ROLES] ({ commit, state}, playload){
    return new Promise((resolve, reject) => {
      api.sdkGameRoles(playload)
        .then(res => {
          if(res.data.code === 10000){
            state.list = res.data.data
          }else{
            reject(res.data);
          }
        })
    })
  },
  [types.POST_SDK_BIND_ROLE] ({ commit, state}, playload){
    return new Promise((resolve, reject) => {
      api.sdkBindRole(playload)
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
