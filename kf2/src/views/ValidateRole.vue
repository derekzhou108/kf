<template>
  <div>
    <div v-if="step === 0">
      <group>
        <!--<popup-picker title="请选择渠道" :data="channelList" v-model.trim="channelId" :show-name="true" ></popup-picker>-->
        <popup-picker title="请选择服务器" :data="serverList" v-model.trim="serverId" :show-name="true"></popup-picker>
        <popup-picker title="选择昵称&ID" :data="roleItems" v-model.trim="role" @on-change="resetRoleItem();"></popup-picker>
        <x-input title="请输入角色昵称" v-model.trim="roleName" v-show="role[0] === '角色昵称'" :show-clear="false" text-align="right" ></x-input>
        <x-input title="请输入角色ID" v-model.trim="roleId" v-show="role[0] === '角色ID'" :show-clear="false" text-align="right" type="tel"></x-input>
        <x-input title="请输入手机号码" v-model.trim="mobilePhone" :show-clear="false" text-align="right" :max="11"  type="tel"></x-input>
      </group>
      <button class="primary-btn" @click="goStep1" :disabled=" !serverId[0] || !(roleName || roleId)">下一步</button>
    </div>
    <div  v-if="step === 1">
      <group>
        <cell title="游戏名称" :value="appName"></cell>
        <!--<cell title="渠道" :value="channelName"></cell>-->
        <cell title="服务器" :value="serverName"></cell>
        <cell title="角色昵称" :value="roleName" v-if="roleName.trim()"></cell>
        <cell title="角色ID" :value="roleId" v-if="roleId.trim()"></cell>
        <cell title="手机号码" :value="mobilePhone" v-if="mobilePhone"></cell>
      </group>
      <group>
        <x-input title="验证码" v-model.trim="verificationCode" :show-clear="false" text-align="right"></x-input>
      </group>
      <div class="validateRole-tips">验证码已发送至您游戏内该角色的邮箱中，请登录游戏获取后进行验证！</div>
      <button class="primary-btn" :disabled="!verificationCode" @click="roleBind">绑定角色</button>
      <p class="validateRole-link"><a @click="goStep0">返回绑定其他角色</a></p>
    </div>
  </div>

</template>

<script>

  import { mapGetters } from 'vuex'
  import { Group, PopupPicker, XInput, Cell } from 'vux'
  import * as util from '@/util'

  export default {
    components: {
      Group,
      PopupPicker,
      XInput,
      Cell
    },
    data(){
      return {
        appName: '',
        channelList: [],
        serverList: [],
        channelId: [],
        serverId: [],
        roleName: '',
        roleId: '',
        mobilePhone: '',
        verificationCode: '',
        role: ['角色昵称'],
        roleItems: [['角色昵称','角色ID']],
        step: 0
      }
    },
    computed: {
      channelName(){
        let id = this.channelId[0]
        let name = ''
          if(this.channelList.length){
            this.channelList[0].forEach(v => {
              if(v.value === id){
                name = v.name
              }
            })
          }
        return name
      },

      serverName(){
        let id = this.serverId[0]
        let name = ''
        if(this.serverList.length){
          this.serverList[0].forEach(v => {
            if(v.value === id){
              name = v.name
            }
          })
        }
        return name
      }
    },
    created(){
        let  appId  = this.$route.query.appId
        this.$store.dispatch('FETCH_SERVER_LIST', {appId})
          .then(res => {

              this.appName = res.app.appname

//              if(res.channelList && res.channelList.length){
//                let channelList = res.channelList.map( v => {
//                  return {
//                      name: v.channelName,
//                      value: v.channelNo
//                  }
//                })
//                this.channelList = [channelList]
//              }

              if(res.serverList && res.serverList.length){
                let serverList = res.serverList.map( v => {
                  return {
                    name: v.serverName,
                    value: v.id.toString()
                  }
                })
                this.serverList = [serverList]
              }
          })

    },
    methods: {
      goStep0(){
        this.step = 0
//        this.channelId = []
//        this.serverId = []
//        this.roleName = ''
//        this.roleId = ''
//        this.mobilePhone = ''
//        this.verificationCode = ''
      },
      goStep1(){
        // if(!(util.isPhone(this.mobilePhone))){
        //   alert('请输入正确手机号码')
        //   return
        // }
        let  appId  = this.$route.query.appId
        let data = {
          appId,
         // channelId: this.channelId[0],
          serverId: this.serverId[0],
          roleId: this.roleId,
          roleName: this.roleName,
          mobilePhone: this.mobilePhone
        }
        this.$store.dispatch('POST_SEND_VERIFICATION', data)
          .then(() => {
            this.step = 1
          }, res => {
            alert(res.msg)
          })

      },
      roleBind(){
        let  appId  = this.$route.query.appId
        let data = {
          appId,
          //channelId: this.channelId[0],
          serverId: this.serverId[0],
          roleId: this.roleId,
          roleName: this.roleName,
          mobilePhone: this.mobilePhone,
          verificationCode: this.verificationCode
        }
        this.$store.dispatch('POST_ROLE_BIND', data)
          .then(() => {
              this.$store.commit('TOGGLE_ROLES_LIST_RESET')
              this.$router.push({ name: 'bindSuccess'})
          }, (res) => {
            alert(res.msg)
          })
      },
      resetRoleItem(val){
        this.roleId = ''
        this.roleName = ''
      }
    }
  }

</script>

<style lang="less">
  .validateRole{
    &-tips{
      color: #999;
      padding:.1rem .2rem 0;
      font-size: .26rem;
    }
    &-link{
      font-size: .26rem;
      color:#999;
      text-decoration: underline;
      text-align: right;
      padding-right: .2rem;
    }
  }
  .vux-popup-picker-header{
    color: #333 !important;
  }

</style>
