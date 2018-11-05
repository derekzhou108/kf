import Vue from 'vue'
//import FastClick from 'fastclick'
import { sync } from 'vuex-router-sync'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'

import '@/directive'
import '@/filter'

import { AlertPlugin, ConfirmPlugin, ToastPlugin, WechatPlugin } from 'vux'

import * as util from '@/util'


Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(ToastPlugin)

Vue.use(WechatPlugin)

sync(store, router)

//FastClick.attach(document.body)

Vue.config.productionTip = false

let u = navigator.userAgent;
let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
let source = '';
if (isAndroid) {
    source = 'android'
} else if (isiOS) {
    source = 'ios'
}
store.commit('TOGGLE_SOURCE', source)

//微信传openid， sdk 传roleId
if (util.isWeiXin()) {
    let { appId, openid } = util.getQueryString()
    util.setLocalData('user', '{"appId":"' + appId + '","openid":"' + openid + '","sdkUserId":"","channelId":"","roleName":"","roleId":"","serverId":"","serverName":""}')
}
//自定义本地测试数据-roleId:745193055671-如果在手游进入，sdk会调用js来localStorage存储user
if (process.env.NODE_ENV !== 'production') {
    util.setLocalData('user', '{"appId":"100000026", "openid": "od55V0YqDyFFb_BRuoSkKVGtrRdk","sdkUserId": "152212943421514350", "channelId":"100000","roleName":"%e5%91%a8%e8%89%ba%e5%86%a0","roleId":"zhou","serverId":"12345","serverName":"%e5%91%a8%e8%89%ba%e5%86%a0"}')
}



router.beforeEach((to, from, next) => {
    // 中文转码
    if (util.getLocalData('user')) {
        let user = util.getLocalData('user')
        for (var i in user) {
            try {
                user[i] = decodeURI(user[i])

            } catch (error) {
                console.error(user[i] + ':' + error)
            }
        }
        util.setLocalData('user', user)

    }
    if (to.name === 'issue') {
        document.title = to.meta[to.query.type].title
    } else {
        document.title = to.meta.title
    }
    //是微信并且没有选择过游戏
    if (util.isWeiXin() && !util.getSessionData('selected')) {
        if (to.name === 'index' || to.name === 'list' || to.name === 'issue') { //依赖pId 需先选择游戏
            router.push({ name: 'mainSelectGame' })
        }
    }

    store.commit('updateLoadingStatus', true)
    next()
})

router.afterEach(route => {
    store.commit('updateLoadingStatus', false)
})

async function init() {
    //先拿到appLis 再初始化
    await store.dispatch('FETCH_APP_LIST')
    new Vue({
        store,
        router,
        render: h => h(App)
    }).$mount('#app')
}

init()




////////////////////////////


