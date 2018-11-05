import Vue from 'vue'
import { dateFormat } from 'vux'

Vue.filter('date', (v, arg) => {
  v = parseInt(v,10)
  return dateFormat(new Date(v * 1000), arg || 'YYYY-MM-DD HH:mm:ss')
})

Vue.filter('date2', (v, arg) => {
  v = parseInt(v,10)
  return dateFormat(new Date(v * 1000), arg || 'YYYY.MM.DD HH:mm:ss')
})

