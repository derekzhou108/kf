
import * as types from '../types'
import api from '@/api'

const state = {
  list: [],
  guide: {},
  appList: []
}

const getters = {
  [types.DONE_GAME_LIST]: ( { list } ) => list,
  [types.DONE_GUIDE]: ( { guide } ) => guide,
  [types.DONE_APP_LIST]: ( { appList }) => appList
}

const actions = {
  [types.FETCH_APP_LIST] ({ commit, state}, payload){
      return new Promise((resolve, reject) => {
        api.appList(payload)
          .then(res => {
            if(res.data.code === 10000){
              state.appList = res.data.data
              resolve(res.data.data)
            }
          })
      })
  },
  [types.FETCH_GAME_LIST] ({ commit, state}, playload){
    return new Promise((resolve, reject) => {
      api.serverList(playload)
        .then(res => {
          if(res.data.code === 10000){
            state.list = res.data.data
            resolve(res.data.data)
          }else{
            reject(res.data);
          }
        })
    })
  },
  [types.FETCH_GUIDE] ({ commit, state}, playload){
    return new Promise((resolve, reject) => {
      api.guide(playload)
        .then(res => {
          if(res.data.code === 10000){
            state.guide = res.data.data
            resolve(res.data.data)
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
