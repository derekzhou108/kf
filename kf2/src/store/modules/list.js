
import * as types from '../types'
import api from '@/api'

const state = {
  search: {
    pageIdx: 0,
    list: [],
    noMore: false
  },
  category: {}
}

const getters = {
  [types.DONE_SEARCH_LIST]: ({ search }) => search,
  [types.DONE_CATEGORY_LIST]: ({ category }, getter, rootState) => {
    let cId = rootState.route.query.cId
    return category[cId] ? category[cId] : {}
  }
}

const actions = {
  [types.FETCH_SEARCH_LIST] ({ commit, state}, { pId, serverId, roleId, content }){
    return new Promise((resolve, reject) => {
      api.search({ pId, serverId, roleId, content, pageIdx: state.search.pageIdx })
        .then(res => {
          if(res.data.code === 10000){
            if(state.search.list.length < res.data.total){
              state.search.list = state.search.list.concat(res.data.data)
              state.search.pageIdx ++
              if(state.search.list.length >= res.data.total){
                state.search.noMore = true
              }
              resolve(res.data.data)
            }else{
              state.search.noMore = true
              //reject(res.data)
            }
          }else{
            reject(res.data);
          }
        })
    })
  },
  [types.FETCH_CATEGORY_LIST] ( { commit, state},  { pId, serverId, roleId, cId }){
    return new Promise((resolve, reject) => {
      commit('TOGGLE_INIT_CATEGORY_LIST', cId)
      api.hot({ pId, serverId, roleId, cId, pageIdx: state.category[cId].pageIdx })
        .then(res => {
          if(res.data.code === 10000){
            if(state.category[cId].list.length < res.data.total){
              state.category[cId].list = state.category[cId].list.concat(res.data.data)
              state.category[cId].pageIdx ++
              if(state.category[cId].list.length >= res.data.total ){
                state.category[cId].noMore = true
              }
              resolve(res.data.data)
            }else{
              state.category[cId].noMore = true
              //reject(res.data)
            }
          }else{
            reject(res.data);
          }
        })
    })
  }
}

const mutations = {
  [types.TOGGLE_RESET_LIST](state){
    state.search.pageIdx = 0
    state.search.list = []
    state.search.noMore = false
  },
  [types.TOGGLE_RESET_CATEGORY](state){
      state.category = {}
  },
  [types.TOGGLE_INIT_CATEGORY_LIST](state, cId){
    if(state.category[cId]) return false
    let item = new Object()
    item.pageIdx = 0
    item.list = []
    item.noMore = false
    state.category = { ...state.category,  [cId]: item }
  }

}

export default {
  state,
  getters,
  actions,
  mutations
}
