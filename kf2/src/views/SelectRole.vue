<template>
  <div class="selectRole">
      <div class="selectRole-wrap">
        <div class="selectRole-title u-bor-b">请选择绑定角色</div>

        <div class="bindItem u-bor-b" :class="{ active: item.selected }" v-for="(item, key) in list" :key="key" @click="selected(item, key)">
          <div class="bindItem-content flex flex-ver-center">
            <div class="bindItem-icon"></div>
            <div class="bindItem-info flex-item">
              <div class="bindItem-name">{{ item.roleName }}</div>
              <div class="bindItem-server">{{ item.channelName }} {{ item.serverName }}</div>
            </div>
            <div class="bindItem-radio flex flex-center" v-if="!item.binded"></div>
            <div class="bindItem-state flex flex-center" v-if="item.binded">已绑定</div>
          </div>
        </div>

      </div>
      <button class="primary-btn" :disabled="disabled" @click="bindRole">绑定</button>
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import * as util from '@/util'
  export default {
    beforeRouteEnter(to, from, next){
      next( vm => {
        if(util.isEmpty(vm.$route.query)){
          vm.$router.push({name: 'selectGame'})
        }
      })
    },
    data(){
      return {
        list: [],
        currentItem: null
      }
    },
    computed: {
      ...mapGetters([
        'DONE_GAME_ROLES'
      ]),
      disabled(){
        let state = true
        for(let i = 0; i < this.list.length; i ++){
            if(this.list[i].selected){
                state = false
                break
            }
        }
        return state
      }
    },
    watch: {
      DONE_GAME_ROLES(val){
        val.forEach( v => {
          if(!v.selected){
            v.selected = 0
          }
        })
        this.list = val
      }
    },
    created(){
      //if(util.isEmpty(this.DONE_GAME_ROLES)){
        let { appId, system } = this.$route.query
        let { user_id } = util.getLocalData('loginInfo')
        let data = {
          appId,
          sdkUserId: user_id,
          platform: system,

        }
        let queryObject  = Object.assign({},util.getLocalData('user'),data)
        alert(JSON.stringify(queryObject))
        this.$store.dispatch('FETCH_GAME_ROLES', queryObject)
          .then(() => {

          }, res => {
              alert(res.msg)
          })
     // }
    },
    methods: {
      selected(item, key){
        if(item.binded) return false
        let list = []
        this.list.forEach( (v, k, arr) => {
          if(k === key){
            v.selected = 1
          }else{
            v.selected = 0
          }
          list.push(v)
        })
        this.list = list
        this.currentItem = item
      },
      bindRole(){
        let { user_id } = util.getLocalData('loginInfo')
        let { appId, system } = this.$route.query
        let { serverId , roleId, roleType, roleName } = this.currentItem
        let data = {
          appId,
          //channelId
          platform: system,
          serverId,
          roleId,
          roleType,
          roleName,
          sdkUserId: user_id
        }
        this.$store.dispatch('POST_SDK_BIND_ROLE', data)
          .then(() => {
            this.$store.commit('TOGGLE_ROLES_LIST_RESET')
            this.$router.push({ name: 'bindSuccess'})
          }, (res) => {
              alert(res.msg)
          })
      }
    }
  }
</script>

<style lang="less">
  .selectRole{
    height: 100%;
    &-wrap{
      background-color: #fff;
    }
    &-title{
      height: .9rem;
      line-height: .9rem;
      font-size: .26rem;
      color: #999;
      text-indent: .3rem;
      background-color: #fff;
    }
  }

  .bindItem{
    height: 1.4rem;
    background-color: #fff;
    margin-bottom: .2rem;
    &-content{
      height: 1.4rem;
    }
    &-icon{
      width: 1rem;
      height: 1rem;
      background: url(../assets/img/bindicon.png) no-repeat;
      background-size: 100% 100%;
      margin:0 .55rem;
    }
    &-name{
      color: #666;
    }
    &-server{
      font-size: .26rem;
      color: #999;
    }
    &-radio{
      width: .4rem;
      height: .4rem;
      background: url(../assets/img/bindItem-radio.png) no-repeat;
      background-size: 100% 100%;
      margin-right: .35rem;
    }
    &-state{
      font-size: .26rem;
      color:#999;
      margin-right: .35rem;
    }
    &.active{
      .bindItem-radio{
        background-image: url(../assets/img/bindItem-radio-active.png);
      }
    }
  }
</style>
