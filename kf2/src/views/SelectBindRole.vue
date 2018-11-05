<template>
  <div class="selectRole">
    <div class="selectRole-wrap">
      <div class="selectRole-title u-bor-b">请选择绑定角色</div>
      <div class="bindItem u-bor-b" :class="{ active: item.selected }" v-for="(item, key) in list" :key="key" @click="selected(item, key)">
        <div class="bindItem-content flex flex-ver-center">
          <div class="bindItem-icon" :style="{ backgroundImage: 'url(' + item.icon + ')' }"></div>
          <div class="bindItem-info flex-item">
            <div class="bindItem-name">{{ item.roleName }}</div>
            <div class="bindItem-server">{{ item.channelName }} {{ item.serverName }}</div>
          </div>
          <div class="bindItem-radio flex flex-center"></div>
        </div>
      </div>

    </div>
    <button class="primary-btn" :disabled="disabled" @click="goIssue">下一步</button>
    <button class="primary-btn disabled" @click="goBindRole">其他角色</button>
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import * as util from '@/util'
  export default {
    data(){
      return {
        list: [],
        currentItem: null,
        appIcon: ''
      }
    },
    computed: {
      ...mapGetters([
        'DONE_ROLES_LIST'
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
    mounted(){
     document.documentElement.scrollTop = 0
     document.body.scrollTop = 0
    },
    async created(){
      if(util.isEmpty(this.DONE_ROLES_LIST)){
        let { serverId, roleId, userId }  = util.getLocalData('user'), { pId } = util.getLocalData('app')
        if(util.isWeiXin()){
          await this.$store.dispatch('FETCH_ROLES_LIST', { pId })
        }else{
          await this.$store.dispatch('FETCH_ROLES_LIST', { userId, pId })
        }
      }
      this.list = this.initList(this.DONE_ROLES_LIST.slice())
    },
    methods: {
      selected(item, key){
        if(item.binded) return false
        this.list = this.list.map( (v, k) => {
             if(k === key){
               v.selected = 1
               return v
             }else{
               v.selected = 0
               return v
             }
        })
        this.currentItem = item
      },
      initList(list){
        return list.map( v => {
            v.selected = 0
            return v
        })
      },
      goIssue(){
        util.setLocalData('role', this.currentItem)
        let { name, type } = this.$route.query
        this.$router.push({ name, query: { type } })
      },
      goBindRole(){
        this.$router.push({ name: 'bindRole' })
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
    .primary-btn.disabled{
      position: relative;
      top: -.9rem;
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
      background: no-repeat;
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
