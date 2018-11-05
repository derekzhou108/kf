<template>
    <div class="marquee flex flex-ver-center">
      <div class="marquee-icon"></div>
      <div class="marquee-list flex-item">
        <marquee :interval="DONE_ANNOUNCEMENT_INTERVAL" v-if="DONE_ANNOUNCEMENT_INTERVAL">
          <marquee-item v-for="item in DONE_ANNOUNCEMENT" :key="item.id" @click.native="jump(item)">{{item.title}}</marquee-item>
        </marquee>
      </div>

      <popup-detail v-model="popupDetailState" :item="popupDetail" :help="false"></popup-detail>

    </div>
</template>

<script>
  import { mapGetters, mapState } from 'vuex'
  import { Marquee, MarqueeItem } from 'vux'
  import PopupDetail from '@/components/PopupDetail.vue'
  import * as util from '@/util'
  export default {
    components: {
      Marquee,
      MarqueeItem,
      PopupDetail
    },
    data(){
      return {
        popupDetailState: false,
        popupDetail: {},
      }
    },
    computed: {
    ...mapGetters([
        'DONE_ANNOUNCEMENT',
        'DONE_ANNOUNCEMENT_INTERVAL'
      ]),
      ...mapState([
        'orientation'
      ]),
    },
    created(){
      if(util.isEmpty(this.DONE_ANNOUNCEMENT)){
        let { pId }  = util.getLocalData('app')
        this.$store.dispatch('FETCH_ANNOUNCEMENT', { pId })
      }
    },
    methods: {
      jump(item){
        if(item.type === '1'){
            window.location.href = item.link
        }else{
          this.popupDetailState = true
          this.popupDetail = item
        }
      }
    }
  }
</script>

<style lang="less">
  .marquee{
    background-color: #fff;
    width: 100%;
    padding:0 .2rem;
    height: .8rem;
    box-sizing: border-box;
    &-icon{
      width: .33rem;
      height: .28rem;
      background-image: url(../assets/img/marquee-icon.png);
      background-size: 100% 100%;
      margin: 0 .2rem;
    }
    &-list{
        height: .8rem;
        margin-left: .1rem;
    }
    .vux-marquee-box li{
      height: .8rem;
      line-height: .8rem;
      white-space: nowrap;
      font-size: .28rem;
      color: #1b1b20;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
</style>
