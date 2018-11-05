<template>
  <div>
    <search ref="search"></search>

    <div class="marquee-wrap">
      <marquee ref="marquee"></marquee>
    </div>

      <scroller
        ref="scroller"
        lock-x
        :scroll-bottom-offst="100"
        @on-scroll-bottom="loadMore"
        :height="scrollerHeight"
      >
        <div class="u-oh">

          <div v-if="isSearch">
            <div class="item" :class="{horizontal: orientation}" v-for="item in DONE_SEARCH_LIST.list" :key="item.id" @click="openPopupDetail(item)">
              <div class="item-title flex flex-ver-center">
                <div class="item-title_icon"></div>
                <div class="item-title_text flex-item u-ell">{{ item.title }}</div>
                <div class="item-title_btn"></div>
              </div>
              <div class="item-content u-ell2" v-html="item.intro"></div>
            </div>
          </div>

          <div v-if="!isSearch">
            <div class="item" :class="{horizontal: orientation}" v-for="item in DONE_CATEGORY_LIST.list" :key="item.id" @click="openPopupDetail(item)">
              <div class="item-title flex flex-ver-center">
                <div class="item-title_icon"></div>
                <div class="item-title_text flex-item u-ell">{{ item.title }}</div>
                <div class="item-title_btn"></div>
              </div>
              <div class="item-content u-ell2" v-html="item.intro"></div>
            </div>
          </div>

        </div>
      </scroller>

      <div class="back_wrap flex flex-center" :class="{horizontal: orientation}" ref="back">
        <div class="back_btn flex flex-center" @click="back">返回</div>
      </div>

    <popup-detail v-model="popupDetailState" :item="popupDetail"></popup-detail>

  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import { Scroller } from 'vux'
  import Search from '@/components/Search.vue'
  import Marquee from '@/components/Marquee.vue'
  import PopupDetail from '@/components/PopupDetail.vue'
  import * as util from '@/util'
  export default {
    components: {
      Search,
      Marquee,
      Scroller,
      PopupDetail
    },
    data(){
      return {
        scrollerHeight: '0px',
        loading: false,
        popupDetailState: false,
        popupDetail: {}
      }
    },
    mounted(){
      if(this.$route.query.type !== 'search'){
          if( util.isEmpty(this.DONE_CATEGORY_LIST) ){
            this.loadMore()
          }else{
            this.setScrollHeight()
          }
      }else{
        this.loadMore()
      }
    },
    destroyed(){
      this.reset()
    },
    beforeRouteUpdate (to, from, next){
        next()
        this.reset()
        this.loadMore()
    },
    computed: {
    ...mapState([
        'orientation',
      ]),
     ...mapGetters([
       'DONE_SEARCH_LIST',
       'DONE_CATEGORY_LIST'
     ]),
      isSearch(){
        return this.$route.query.type === 'search'
      }
    },
    watch: {
      orientation(val){
        this.setScrollHeight(val)
      }
    },
    methods: {
      loadMore(){
          if(this.loading) return false
          this.loading = true
          let queryType = this.$route.query.type
          if(queryType === 'search'){
              this.searchLoadMore()
          }else{
            this.categoryLoadMore()
          }

      },
      async searchLoadMore(){
        let {  serverId, roleId } = util.getLocalData('user'), { pId } = util.getLocalData('app')
        if(this.DONE_SEARCH_LIST.noMore) return false
        let content = this.$route.query.content
        await this.$store.dispatch('FETCH_SEARCH_LIST', { pId, content, serverId, roleId })
        this.loading = false
        this.setScrollHeight()
      },
      async categoryLoadMore(){
        let { serverId, roleId } = util.getLocalData('user'), cId = this.$route.query.cId, { pId } = util.getLocalData('app')
        if(this.DONE_CATEGORY_LIST && this.DONE_CATEGORY_LIST.noMore){
          this.setScrollHeight()
          return false
        }
        await this.$store.dispatch('FETCH_CATEGORY_LIST', { pId, cId, serverId, roleId })
        this.loading = false
        this.setScrollHeight()
      },
      openPopupDetail(item){
        this.popupDetailState = true
        this.popupDetail = item
      },
      setScrollHeight(){
        this.$nextTick(() => {
          let searchH = this.$refs.search.$el.offsetHeight
          let marqueeH = this.$refs.marquee.$el.offsetHeight
          let backH = this.$refs.back.offsetHeight
          this.scrollerHeight = window.innerHeight - searchH - marqueeH - backH - (util.getFontSize() * 0.2) + 'px'
          this.$nextTick(() => {
            this.$refs.scroller.reset()
          })
        })
      },
      back(){
        this.$router.push({name: 'index'})
      },
      reset(){
        this.loading = false
        this.$store.commit('TOGGLE_RESET_LIST')
      }
    }
  }
</script>

<style lang="less">
  .marquee-wrap{
    padding-bottom: .2rem;
  }
  .item{
    margin-bottom: .2rem;
    padding:.3rem;
    background-color: #fff;
    &.horizontal{
      padding: .15rem .3rem;
      .item-content{
        margin-top: 0;
      }
    }
    &-title{
      color:#1b1b20;
      &_icon{
        width: .31rem;
        height: .27rem;
        background:url(../assets/img/item-title_icon.png) no-repeat;
        background-size: 100% 100%;
        margin-right: .15rem;
      }
      &_btn{
        width: 1rem;
        height: .41rem;
        background:url(../assets/img/item-title_btn.png) no-repeat;
        background-size: 100% 100%;
        margin-left: .15rem;
      }
    }
    &-content{
      margin-top: .2rem;
      font-size: .28rem;
      color:#999;
      line-height: .5rem;
      min-height: .5rem;
      max-height: 1rem;
    }
  }
  .back_wrap{
    padding:.6rem 0;
    &.horizontal{
      padding: .15rem 0;
    }
  }
  .back_btn{
    height: .8rem;
    width: 70%;
    background-color: #999;
    color:#fff;
    border-radius: .5rem;
    font-size: .34rem;
  }

</style>
