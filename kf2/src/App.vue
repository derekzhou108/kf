<template>
  <div>
    <!--<view-box class="main" >-->
    <router-view class="router-view"></router-view>
    <!--</view-box>-->
    <masker v-transferDom v-show="isLoading" :fullscreen="true" :opacity="0" class="mask"></masker>
    <!--<div v-transferDom class="loading" v-show="isLoading">-->
    <!--<spinner type="bubbles" class="spinner"></spinner>-->
    <!--</div>-->
  </div>
</template>

<script>
  import {
    mapState,
    mapGetters
  } from 'vuex'
  import {
    ViewBox,
    Masker,
    Spinner,
    TransferDom
  } from 'vux'
  import NProgress from 'nprogress' //顶部进度条
  import 'nprogress/nprogress.css'
  import * as util from '@/util'
  export default {
    name: 'app',
    directives: {
      TransferDom
    },
    components: {
      ViewBox,
      Masker,
    },
    data() {
      return {
      }
    },
    computed: {
      ...mapState([
        'isLoading',
      ]),
      ...mapGetters([
        'DONE_APP_LIST'
      ])
    },
    watch: {
      isLoading(val) {
        if (val) {
          NProgress.start()
        } else {
          NProgress.done()
        }
      }
    },
    async created() {
      this.setOrientation()
      window.addEventListener(util.getRotateEvent(), util.throttle(this.setOrientation), false)
    },
    methods: {
      setOrientation() {
        util.orientation(() => { //横屏
          this.$store.commit('updateOrientation', 1)
        }, () => { //竖屏
          this.$store.commit('updateOrientation', 0)
        })
      }
    }
  }
</script>

<style lang="less">
  @import './assets/css/reset.css';
  @import './assets/css/flex.css';
  @import './assets/css/index.less';
  @media (min-width: 320px) {
    html {
      font-size: 42.6666px;
    }
  }
  @media (min-width: 360px) {
    html {
      font-size: 48px;
    }
  }
  @media (min-width: 375px) {
    html {
      font-size: 50px;
    }
  }
  /*@media (min-width: 384px){ html{ font-size: 51.2px; } }*/
  /*@media (min-width: 400px){ html{ font-size: 53.33px; } }*/
  /*@media (min-width: 412px){ html{ font-size: 54.93px; } }*/
  /*@media (min-width: 414px){ html{ font-size: 55.2px; } }*/
  #vux_view_box_body {
    /*-webkit-overflow-scrolling: auto !important;*/
  }
  html.loading {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .main .weui-tab__panel {
    padding-bottom: 0;
  }
  /*.router-view{*/
  /*height: 100%;*/
  /*}*/
  /*.loading{*/
  /*position: absolute;*/
  /*z-index: 99999;*/
  /*top:50%;*/
  /*left:50%;*/
  /*margin-top: -.5rem;*/
  /*margin-left: -.5rem;*/
  /*.spinner, .spinner svg{*/
  /*fill:#FD6001;*/
  /*stroke: #FD6001;*/
  /*width: 1rem;*/
  /*height:1rem;*/
  /*}*/
  /*}*/
  .mask .vux-masker-fullscreen {
    z-index: 99998;
  }
  #nprogress .bar {
    background: #ff5f01 !important;
  }
  #nprogress .spinner-icon {
    border-top-color: #ff5f01 !important;
    border-left-color: #ff5f01 !important;
  }
  #nprogress .peg {
    box-shadow: 0 0 10px #ff5f01, 0 0 5px #ff5f01 !important;
  }
  .dp-header .dp-item.dp-left {
    color: #666 !important;
  }
  .dp-header .dp-item.dp-left {
    color: #666 !important;
  }
  .dp-header .dp-item.dp-right,
  .vux-popup-picker-header,
  .vux-popup-header-right {
    color: #000 !important;
  }
  .weui-cells {
    font-size: .3rem !important;
  }
  .weui-cell {
    z-index: 2;
    padding: 15px !important;
  }
  .weui-cell:before {
    left: 0!important;
  }
  .vux-datetime-value {
    color: #333!important;
  }
  .weui-dialog__btn_primary {
    color: #333 !important;
  }
  .weui-cell.textarea {
    flex-direction: column;
    .weui-cell__bd {
      width: 100%;
      margin-top: .1rem;
    }
  }
  .place-color .vux-datetime-value {
    color: #c2c2c2 !important;
  }
  .place-popup:after {
    content: '请选择';
    position: absolute;
    color: #c2c2c2;
    right: 27px;
    top: 50%;
    margin-top: -10px;
    z-index: 1;
  }
  .vux-cell-value {
    color: inherit !important;
  }
  .vux-popup-picker-select span {
    padding-right: 0!important;
  }
  .vux-cell-box:before {
    left: 0 !important;
  }
</style>
