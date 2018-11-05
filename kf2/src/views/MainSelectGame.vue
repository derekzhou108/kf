<template>
  <div class="selectGame u-scrolling">
    <div class="selectGame-title u-bor-b">请选择游戏</div>

    <div class="selectGame-list">
      <div class="selectGame-item" v-for="(item, key) in DONE_APP_LIST" :key="key" @click="goGameService(item)">
        <div class="selectGame-icon" :style="{ backgroundImage: 'url(' + item.icon  +')' }"></div>
        <div class="selectGame-name">{{ item.appname }}</div>
      </div>
    </div>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import * as util from '@/util'
  export default {
    components: {

    },
    data(){
      return {

      }
    },
    computed: {
      ...mapGetters([
        'DONE_APP_LIST'
      ])
    },
    async created(){
    },
    methods: {
      goGameService(item){
          this.$store.commit('TOGGLE_RESET_INDEX')
          this.$store.commit('TOGGLE_RESET_CATEGORY')
          util.setLocalData('app', item)
          if(util.isWeiXin()){
            util.setSessionData('selected', 1)
          }
          this.$router.push({ name: 'index' })
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
    }
    &-icon{
      height: 1.2rem;
      background: no-repeat center center;
      background-size: 1.2rem 1.2rem;
    }
    &-name{
      font-size: .22rem;
      color:#666;
    }

  }

</style>
