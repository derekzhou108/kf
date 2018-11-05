<template>
    <div class="order-wrap" >
        <div class="empty" v-if="!DONE_EXISTDATA">
          暂无提单记录
        </div>
        <scroller
          lock-x
          ref="scroller"
          use-pulldown
          @on-pulldown-loading="refresh"
          :pulldown-config="pulldownConfig"
          :scroll-bottom-offst="50"
          @on-scroll-bottom="loadMore"
          :height="scrollerHeight"
          @on-scroll="scroll"
        >
            <div class="order" :class="{horizontal: orientation}">

                <router-link class="order-item" :class="{ yes: item.lastReplyTime}" tag="div" :to="{ name: 'orderDetail', query: { id: item.id } }" v-for="item in DONE_MYORDER.list" :key="item.id">
                    <div class="flex flex-ver-center">
                      <div class="order-item_name order-item_dot flex-item">游戏：{{ item.app_name }}</div>
                      <router-link class="order-item_btn" v-if="item.lastReplyTime && !item.evaluation" :to="{ name: 'rater', query: { id: item.id } }"></router-link>
                    </div>
                    <div class="flex flex-ver-center">
                        <div class="order-item_num order-item_dot flex-item">单号：{{ item.id }}</div>
                    </div>
                    <div class="order-content">
                      <div class="order-item_detail">
                        <div class="order-item_dot">问题详情：</div>
                        <div class="order-item_desc u-ell2">{{ item.desc }}</div>
                      </div>
                      <div class="order-item_state flex">
                        <div class="order-item_icon flex-item"></div>
                        <div class="order-item_time flex flex-cross-end" v-if="item.lastReplyTime">{{ item.lastReplyTime | date2 }}</div>
                        <div class="order-item_time flex flex-cross-end" v-if="!item.lastReplyTime">{{ item.time | date2 }}</div>
                      </div>
                    </div>

                </router-link>

            </div>
        </scroller>

    </div>
</template>

<script>
    import { mapState, mapGetters } from 'vuex'
    import { Scroller } from 'vux'
    import * as util from '@/util'
    export default {
      components: {
        Scroller
      },
      data(){
        return {
          scrollerHeight: '0px',
          loading: false,
          pulldownConfig:{
            content:'下拉刷新',
            downContent:'下拉刷新',
            upContent:'释放刷新',
            loadingContent:'加载中...'
          },
        }
      },
      computed: {
        ...mapState([
          'orientation'
        ]),
        ...mapGetters([
          'DONE_EXISTDATA',
          'DONE_MYORDER',
          'DONE_ORDER_SCROLL',
          'DONE_GAME_LIST'
        ]),
       
      },
      watch: {
        orientation(val){
          this.setScrollHeight(val)
        }
      },
      async created(){
        if(util.isEmpty(this.DONE_MYORDER.list)){
          await this.loadMore()
        }else{
          this.setScrollHeight()
        }
      },
      mounted(){
        this.$nextTick(() => {
          this.$refs.scroller.reset({top: this.DONE_ORDER_SCROLL.top})
        })       
      },
      methods: {
        async loadMore(){
          if(this.loading || this.DONE_MYORDER.noMore ) return false
          this.loading = true
          let { appId, roleId }  = util.getLocalData('user')
          let { pId }  = util.getLocalData('app')
          await this.$store.dispatch('FETCH_MYORDER', { appId, roleId, pId })
          this.loading = false
          this.$refs.scroller.donePulldown()
          this.setScrollHeight()
        },
        refresh(){
          this.$store.commit('TOGGLE_RESET_MYORDER')
          this.loading = false
          this.loadMore()
        },
        scroll(pos){
          if(pos.top > 0){
            this.$store.commit('TOGGLE_ORDER_SCROLL', pos)
          }
        },
        setScrollHeight(){
          this.scrollerHeight = window.innerHeight + 'px'
          this.$nextTick(() => {
            this.$refs.scroller.reset()
          })
        }
      }
    }
</script>

<style lang="less">
  .order-wrap{
    background-color: #F3F4F5;
  }

  .empty{
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    transform: translate(-50%,-50%);
    text-align: center;
    font-size: .36rem;
  }
  .order{
    padding:.25rem;
    height: 100%;
    &-item{
      padding:.2rem .25rem .2rem .5rem;
      border-radius: .1rem;
      background-color: #fff;
      margin-bottom: .15rem;
      box-shadow: 0 0 .1rem rgba(102,102,102,.1);
      &_name{
        color:#1b1b20;
      }
      &_btn{
        width: 1rem;
        height: .41rem;
        background: url(../assets/img/order-item_btn.png) no-repeat;
        background-size: 100% 100%;
      }
      &_num{
        color:#717171;
      }
      &_detail{
        color:#717171;
        font-size: .28rem;
        margin: 0 0 .1rem 0;
      }
      &_desc{
        line-height: .5rem;
        max-height: 1rem;
      }
      &_dot{
        position: relative;
        font-size: .3rem;
        &:after{
          content: '';
          position: absolute;
          left:-.3rem;
          top:.2rem;
          border-radius: 50%;
          height:.14rem;
          width:.14rem;
          background-color: #999;
        }
      }
      &_icon{
        height:1.53rem ;
        background: url(../assets/img/reply-no.png) no-repeat left center;
        background-size: 2.15rem 1.53rem;
      }
      &_time{
        height:1.53rem ;
        font-size: .26rem;
        color: #717171;
      }
      &.yes{
        .order-item_dot:after{
          background-color: #FC9054;
        }
        .order-item_icon{
          background-image: url(../assets/img/reply.png);
        }
      }
     }
    &.horizontal{
      .order-content{
        display: flex;
      }
      .order-item_detail{
        flex: 1;
        width: 0%;
      }
      .order-item_state{
        width: 3.4rem;
        flex-direction: column;
        margin-left: .2rem;
      }
      .order-item_icon{
        width: 100%;
      }
      .order-item_time{
        height: .6rem;
        justify-content: flex-end;
      }
    }
  }
</style>
