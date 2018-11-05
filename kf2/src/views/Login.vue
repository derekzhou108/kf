<template>
  <div>
      <div class="login-logo"></div>
      <div class="login-form">
          <div class="login-arrow" v-if="accountList.length" @click="accountPopup = true"></div>
          <input class="login-input login-input_username" type="text" placeholder="请输入用户名" v-model.trim="login.username">
          <input class="login-input login-input_password" type="password" placeholder="请输入密码(6-16位字符)" v-model.trim="login.password">
      </div>
      <div class="flex flex-main-end"><a class="login-link" @click="findDialog = true">忘记密码</a></div>
      <button class="primary-btn login-btn" :disabled="!login.username.length || !login.password.length" @click="loginSubmit">下一步</button>

      <div v-transfer-dom>
          <x-dialog v-model="findDialog" :dialog-style="{'background-color': 'transparent', 'padding': '.2rem'}">
            <div class="loginDialog-close" @click="findDialog = false"></div>
            <div class="loginDialog">
                <div class="loginDialog-header flex flex-center">忘记密码</div>
                <div class="login-form">
                  <div class="loginDialog-validate flex">
                    <input class="login-input login-input_validate flex-item" type="number" maxlength="11" placeholder="请输入手机号" v-model.trim="find.phone">
                    <button class="loginDialog-code" :disabled="!find.phone.length" @click="fetchCode('find_pwd', $event)">获取验证码</button>
                  </div>
                  <input class="login-input login-input_dialog" type="text" placeholder="请输入验证码" v-model.trim="find.sms_code">
                  <input class="login-input login-input_dialog" type="password" placeholder="请输入新密码(6-16为字符)" v-model.trim="find.password">
                </div>
                <button class="primary-btn" :disabled="!find.phone.length || !find.sms_code.length || !find.password.length" @click="forgetSubmit">确定</button>
              </div>
          </x-dialog>
      </div>

    <div v-transfer-dom>
      <popup v-model="accountPopup" :popup-style="{maxHeight: '30%', backgroundColor: '#fff'}">
          <div class="accountPopup">
              <group title="选择帐号">
                <cell :title="item.username" v-for="(item, key ) in accountList" :key="key" @click.native="accountSelect(item)">
                  <div class="account-del" slot="child" @click.stop="accountDel(item)"></div>
                </cell>
              </group>
          </div>
      </popup>
    </div>

  </div>
</template>

<script>
  import { XDialog, Popup, TransferDom, Group, Cell } from 'vux'
  import * as util from '@/util'
  export default {
    directives: {
      TransferDom
    },
    components: {
      XDialog,
      Popup,
      Group,
      Cell
    },
    data(){
      let accountList = util.getLocalData('accountList') || []
      return {
        login: {
          username: '',
          password: ''
        },
        find: {
          phone: '',
          sms_code: '',
          password: ''
        },
        findDialog: false,
        accountPopup: false,
        accountList
      }
    },
    beforeRouteEnter(to, from, next){
      next( vm => {
        if(util.isEmpty(vm.$route.query)){
          vm.$router.push({name: 'bindSelectGame'})
        }
      })
    },
    created(){
      let accountList = util.getLocalData('accountList')
      if(accountList && accountList.length){
        this.login.username = accountList[0] && accountList[0].username
        this.login.password = accountList[0] && accountList[0].password
      }
    },
    methods: {
       loginSubmit(){
        let data = {
          username: this.login.username,
          password: this.login.password,
        }
       this.$store.dispatch('POST_LOGIN', data)
          .then( async (res) => {
            this.accountAdd(data)
            let { appId, system } = this.$route.query, { user_id } = res.data
            this.$router.push({name: 'selectSDKRole', query: { appId, system, sdkUserId: user_id }})
          }, (res) => {
            alert(res.msg)
          });
      },
      fetchCode(type, e){
        if(! util.isPhone(this.find.phone)){
          alert('请输入正确手机号码');
          return;
        }
        let data = {
          phone: this.find.phone,
          type
        }
        this.$store.dispatch('FETCH_CODE', data)
          .then((res) => {
            this.countDown(e.target)
          }, (res) => {
              alert(res.msg)
          })
      },
      forgetSubmit(){
        if(! util.isPhone(this.find.phone)){
          alert('请输入正确手机号码');
          return;
        }
        let data = {
          phone: this.find.phone,
          sms_code: this.find.sms_code,
          password: this.find.password,
        }
        this.$store.dispatch('POST_FIND_PASSWORD', data)
          .then((res) => {
            alert(res.msg)
            this.findDialog = false
          }, (res) => {
            alert(res.msg)
          })
      },
      countDown(node){
        let time = 10;
        node.innerHTML = time + 's';
        node.disabled = true;
        let timer = setInterval(() => {
          if(time == 0){
            clearInterval(timer);
            node.innerHTML = '获取验证码';
            node.disabled = false;
          }else{
            time--;
            node.innerHTML = time + 's';
          }
        },1000)
      },
      accountAdd(obj){
        let accountArr = this.accountDel(obj)
          accountArr.unshift(obj)
          this.accountList = accountArr
          util.setLocalData('accountList', accountArr)

      },
      accountDel(obj){
        let accountArr = util.getLocalData('accountList') || []
          accountArr.forEach((v, k, arr) => {
            if(v.username === obj.username){
              arr.splice(k, 1)
            }
          })
          this.accountList = accountArr
          util.setLocalData('accountList', accountArr)
          if(!accountArr.length) this.accountPopup = false
          return accountArr
      },
      accountSelect({ username, password }){
        this.login.username = username
        this.login.password = password
        this.accountPopup = false
      }
    }
  }
</script>

<style lang="less">
  .login{
      &-logo{
        width: 2.49rem;
        height: .93rem;
        background: url(../assets/img/logo.png) no-repeat;
        background-size: 100% 100%;
        margin: .6rem auto .5rem auto;
      }
      &-form{
        margin:0 5%;
        position: relative;
      }
      &-arrow{
        position: absolute;
        right:0;
        top:0;
        width: 1rem;
        height: .8rem;
        background: url(../assets/img/arrow-down.png) no-repeat center;
        background-size: .3rem .3rem;
      }
      &-input{
        box-sizing: border-box;
        width: 100%;
        margin-bottom: .2rem;
        height: .8rem;
        border:none;
        border-radius: .5rem;
        padding:0 1rem;
        outline: none;
        background:#fff no-repeat .4rem center;
        background-size: .3rem .3rem;
        &::-webkit-input-placeholder{
          color:#bbb;
        }
        &_username{
          background-image: url(../assets/img/username.png);
        }
        &_password{
          background-image: url(../assets/img/password.png);
        }
        &_dialog{
          background-color: #F6F6F6;
          padding:0 .5rem;
          margin: .2rem 0 0 0;
        }
        &_validate{
          background-color: #F6F6F6;
          margin:0;
          padding:0 .5rem;
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
        }
      }
      &-link{
        color: #ff7d2b;
        font-size: .26rem;
        margin-right: 5%;
      }
        &_dialog{
          margin-top: .5rem;
        }

  }
  .loginDialog{
      overflow: hidden;
      border-radius: .3rem;
      background-color: #fff;
      position: relative;
      &-header{
        height: .9rem;
        background-color: #1B1B20;
        color:#fff;
        font-size: .34rem;
      }
      &-validate{
        margin-top: .55rem;
      }
      &-code{
        background-color: #FF8212;
        border:none;
        height: .8rem;
        color:#fff;
        border-top-right-radius: .5rem;
        border-bottom-right-radius: .5rem;
        font-size: .26rem;
        width: 1.9rem;
        outline: none;
        &[disabled]{
          opacity: .6;
        }
      }
      &-close{
        z-index: 1;
        position: absolute;
        right:0;
        top:0;
        width: .6rem;
        height: .6rem;
        background: url(../assets/img/login-close.png) no-repeat;
        background-size: 100% 100%;
      }
  }
  .account{
    &-del{
      position: absolute;
      top:0;
      bottom:0;
      right: 0;
      width: 1rem;
      background: url(../assets/img/close.png) no-repeat center;
      background-size: .3rem .3rem;
    }
  }
</style>
