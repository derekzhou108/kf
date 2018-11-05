
import * as types from '../types'
import api from '@/api'

const state = {
  bindRole: []
}

const getters = {
  [types.DONE_ROLES_LIST]: ( { bindRole } ) => bindRole
}

const actions = {
  [types.FETCH_ROLES_LIST] ({ commit, state}, payload){
    return new Promise((resolve, reject) => {
      api.rolesList(payload)
        .then(res => {
          if(res.data.code === 10000){
              state.bindRole = res.data.data
              resolve(res.data)
          }else{
            reject(res.data);
          }
        })
    })
  },
  [types.POST_ROLE_UNBIND]({ commit, state }, payload){
    return new Promise((resolve, reject) => {
      api.roleUnbind(payload)
        .then(res => {
          if(res.data.code === 10000){
            state.bindRole.forEach( (v, k, arr) => {
              if(v._id === payload.id){
                arr.splice(k, 1)
              }
            })
          }
          resolve(res.data)
        })
    })
  }
}

const mutations = {
  [types.TOGGLE_ROLES_LIST_RESET]( state, payload){
    state.bindRole = []
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
