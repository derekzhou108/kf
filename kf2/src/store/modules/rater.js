
import * as types from '../types'
import api from '@/api'

const state = {
  evaluationSettings: []
}

const getters = {
  [types.DONE_EVALUATION_SETTINGS]: ({ evaluationSettings }) => evaluationSettings,
}

const actions = {
  [types.FETCH_EVALUATION_SETTINGS] ({ commit, state}, payload){
    return new Promise((resolve, reject) => {
      api.evaluationSettings(payload)
        .then(res => {
          if(res.data.code === 10000){
            state.evaluationSettings = res.data.data.evaluation_descs ? res.data.data.evaluation_descs : []
            resolve(res.data)
          }else{
            reject(res.data);
          }
        })
    })
  },
  [types.POST_EVALUATION] ({ commit, state, getters}, payload){
    return new Promise((resolve, reject) => {
      api.submitEvaluation(payload)
        .then(res => {
          if(res.data.code === 10000){
            let myOrder = getters.DONE_MYORDER.list
            if(myOrder.length){
              myOrder.forEach( v => {
                if(v.id === payload.id){
                  v.evaluation = 1
                }
              })
            }
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
