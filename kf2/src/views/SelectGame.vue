<template>
  <div class="selectGame u-scrolling">
      <div class="selectGame-title u-bor-b">请选择游戏</div>

      <div class="selectGame-list">
          <div class="selectGame-item" :class="{ active: selectGame === key }" v-for="(item, key) in DONE_GAME_LIST" :key="key" @click="selectGame = key">
              <div class="selectGame-icon"></div>
              <div class="selectGame-name">{{ item.app.appname }}</div>
          </div>
      </div>

    <div v-show="selectGame > -1">

      <div class="selectGame-title selectGame-title_spacing u-bor-b">请选择操作系统</div>
      <div class="selectGame-system">
        <div class="selectGame-btn" :class="{ active: system === 1 }" @click="system = 1">IOS</div>
        <div class="selectGame-btn" :class="{ active: system === 2 }" @click="system = 2">安卓</div>
      </div>

    </div>

    <div class="selectGame-title_spacing" v-show="selectGame > -1"></div>

    <div v-show="system > 1">

      <div class="selectGame-title u-bor-b">请选择您游戏帐号所属平台</div>
      <div class="selectGame-platform">
        <div class="flex flex-center">
          <div class="selectGame-platformItem flex flex-center" :class="{ active: platform === 1 }" @click="platform = 1"><span class="selectGame-platformIcon_ks"></span> 凯撒官方</div>
          <div class="selectGame-platformItem flex flex-center" :class="{ active: platform === 3 }" @click="platform = 3">其他</div>
        </div>
        <div class="selectGame-platformText">如何查看游戏账号所属的平台请<a class="selectGame-platformLink" @click="popupDetailState = true">点击此处</a></div>
      </div>

    </div>

    <button class="primary-btn" v-show="selectGame > -1" :disabled="system !== 1 && platform === -1" @click="next">下一步</button>

    <popup-detail v-model="popupDetailState" :item="popupDetail" :help="false"></popup-detail>

  </div>
</template>

<script>
  import PopupDetail from '@/components/PopupDetail.vue'
  import { mapGetters } from 'vuex'
  import * as util from '@/util'
  export default {
    components: {
      PopupDetail
    },
    data(){
      return {
        selectGame: -1,
        system: -1,
        platform: -1,
        popupDetailState: false,
        popupDetail: {}
      }
    },
    computed: {
      ...mapGetters([
        'DONE_GAME_LIST'
      ])
    },
    async created(){
      if(util.isEmpty(this.DONE_GAME_LIST)){
        this.$store.dispatch('FETCH_GAME_LIST')
      }
      if(util.isEmpty(this.DONE_GUIDE)){
        let guide = await this.$store.dispatch('FETCH_GUIDE')
        this.popupDetail = { title: '游戏帐号所属平台问题', desc: guide.value }
      }
    },
    methods: {
      next(){
        let appId = this.DONE_GAME_LIST[this.selectGame].app.appid
        if(this.system === 2 && this.platform !== 1){
          //this.$router.push({ name: 'validateRole', query: { appid, system: this.system } })
          this.$router.push({ name: 'validateRole'})
        }else{
          this.$router.push({ name: 'login', query: { appId, system: this.system } })
          //this.$router.push({ name: 'login' })
        }
      }
    }
  }
</script>

<style lang="less">
  .selectGame{
    background-color: #fff;
    &-title{
      height: .9rem;
      line-height: .9rem;
      font-size: .26rem;
      color: #999;
      text-indent: .3rem;
      &_spacing{
        border-top: .2rem solid #F3F4F5;
      }
    }
    &-list{
      font-size: 0;
      padding-bottom: .65rem;
    }
    &-item{
      display: inline-block;
      width: 33.33%;
      text-align: center;
      padding: .6rem 0 .1rem 0;
      position: relative;
      z-index: 2;
      &.active{
        background: url(../assets/img/selectGame.png) no-repeat center bottom;
        background-size: 1.9rem 1.9rem;
      }
    }
    &-icon{
      height: 1.2rem;
      background: url(../assets/img/bindicon.png) no-repeat center center;
      background-size: 1.2rem 1.2rem;
    }
    &-name{
      font-size: .22rem;
      color:#666;
    }
    &-system{
      text-align: center;
      padding: .65rem 0;
    }
    &-btn{
      width: 38%;
      height: .7rem;
      line-height: .7rem;
      background-color: #F3F4F5;
      color:#999;
      border-radius: .05rem;
      margin:0 2.7%;
      display: inline-block;
      &.active{
        background-color: #FF8B30;
        color:#fff;
      }
    }
    &-platform{
      margin-top: .65rem;
    }
    &-platformItem{
      width: 24%;
      height: .9rem;
      border:1px solid #D9DADA;
      border-radius: .1rem;
      color:#666;
      font-size: .26rem;
      margin:0 2.7%;
      &.active{
        border-color: #FF8B30;
      }
    }
    &-platformIcon_ks{
      width: .24rem;
      height: .43rem;
      background: url(../assets/img/platformIcon_ks.png) no-repeat;
      background-size: 100% 100%;
      margin-right: .1rem;
    }
    &-platformIcon_yyb{
      width: .37rem;
      height: .37rem;
      background: url(../assets/img/platformIcon_yyb.png) no-repeat;
      background-size: 100% 100%;
      margin-right: .1rem;
    }
    &-platformText{
      color:#666;
      font-size: .26rem;
      text-align: center;
      margin-top: .4rem;
    }
    &-platformLink{
      color: #FF8B30;
    }
    &-next{

    }
  }
  .modal-open{
    position: static !important;
  }
</style>
