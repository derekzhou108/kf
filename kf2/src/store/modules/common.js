
import * as types from '../types'
import api from '@/api'

const state = {
  announcement: [],
  announcementInterval: 0,
  imgs: []
}

const getters = {
  [types.DONE_ANNOUNCEMENT]: ({ announcement }) => announcement,
  [types.DONE_ANNOUNCEMENT_INTERVAL]: ({ announcementInterval }) => announcementInterval,
  [types.DONE_UPLOAD]: ({ imgs }) => imgs,
}

const actions = {
  [types.FETCH_ANNOUNCEMENT] ({ commit, state}, payload){
    return new Promise((resolve, reject) => {
      api.announcement(payload)
        .then(res => {
          if(res.data.code === 10000){
            state.announcement = res.data.data
            state.announcementInterval = res.data.data[0] && res.data.data[0].frequency
            resolve(res.data.data)
          }else{
            //reject(res.data);
          }
        })
    })
  },
  [types.POST_COMMENT]({ commit, state }, payload){
    return new Promise((resolve, reject) => {
      api.comment(payload)
        .then(res => {
          if(res.data.code === 10000){
            resolve(res.data)
          }else{
            reject(res.data);
          }
        })
    })
  },
  [types.POST_UPLOAD]({ commit, state}, payload){
    return new Promise((resolve, reject) => {
      api.upload(payload).then(res => {
        let imgObj = {
          imageUrl: res.data.imageUrl,
          height: res.data.height,
          width: res.data.width,
          base64: payload.image
        }
        state.imgs.push(imgObj)
        resolve(res.data)
      })
    })
  }
}

const mutations = {
  [types.TOGGLE_UPLOAD_RESET](state){
    state.imgs = []
  },
  [types.TOGGLE_UPLOAD_DELETE](state, payload){
    state.imgs.forEach((v, k, arr) => {
      if(v === payload){
        arr.splice(k, 1)
      }
    })
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
