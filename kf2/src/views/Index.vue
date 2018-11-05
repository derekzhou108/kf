<template>
  <div style="height: 100%">
    <!--竖屏-->
    <div class="vertical" v-show="orientation === 0" ref="vertical">
      <div class="vertical-wrap" ref="verticalWrap">
        <div class="vertical0">
          <search ref="verSearch"></search>
          <marquee ref="verMarquee" v-if="orientation === 0"></marquee>
          <div class="issues">
            <div class="issues-title u-bor-b" ref="verIssuesTitle">热门问题</div>
            <scroller ref="verScroller" lock-x :height="verScrollerHeight">
              <div>
                <div class="issues-item u-bor-b flex" v-for="item in DONE_HOT" :key="item.id" @click="openPopupDetail(item)">
                  <div class="issues-item_text flex-item u-ell">{{ item.title }}</div>
                  <div class="issues-item_arrow"></div>
                </div>
              </div>
            </scroller>
          </div>
          <div class="type" ref="verType">
            <div class="type-title u-bor-b">问题类型</div>
            <div class="type-box">
              <swiper :options="swiperOption">
                <swiper-slide v-for="(item, key) in Math.ceil(DONE_CATEGORY.length / 6)" :key="key">
                  <router-link class="type-item" tag="div" :to="{ name: 'list', query: { cId: cItem.cId } }" v-for="(cItem, cKey) in DONE_CATEGORY.slice(key * 6, (key + 1) * 6)" :key="cItem.cId">
                    <div class="type-item_icon"><img  :src="`${httpType}${cItem.icon}`" alt=""></div>
                    <div class="type-item_text">{{ cItem.name }}</div>
                  </router-link>  
                </swiper-slide>
                <div class="swiper-button-prev" slot="button-prev"></div>
                <div class="swiper-button-next" slot="button-next"></div>
              </swiper>
            </div>
          </div>
          <div class="nav flex" ref="verNav">
            <div class="nav-btn flex-item flex flex-center" @click="toggleSwipe">联系客服
              <div class="nav-icon" ref="arrow"></div>
            </div>
            <router-link class="nav-btn flex-item flex flex-center" tag="div" :to="{ name: 'myOrder' }">我的提单</router-link>
          </div>
        </div>
        <div class="vertical1">
          <div class="problem">
            <div class="problem-item flex" @click="goProblem({ name: 'issue', query: { type: 0} })">
              <div class="problem-item_icon"></div>
              <div class="problem-item_text flex-item flex flex-ver-center u-bor-b">充值问题</div>
            </div>
            <div class="problem-item flex" @click="goProblem({ name: 'issue', query: { type: 3} })">
              <div class="problem-item_icon"></div>
              <div class="problem-item_text flex-item flex flex-ver-center u-bor-b">登录问题</div>
            </div>
            <div class="problem-item flex" @click="goProblem({ name: 'issue', query: { type: 1} })">
              <div class="problem-item_icon"></div>
              <div class="problem-item_text flex-item flex flex-ver-center u-bor-b">游戏问题</div>
            </div>
            <div class="problem-item flex" @click="goProblem({ name: 'issue', query: { type: 4} })">
              <div class="problem-item_icon"></div>
              <div class="problem-item_text flex-item flex flex-ver-center u-bor-b">举报申诉</div>
            </div>
            <div class="problem-item flex" @click="goProblem({ name: 'issue', query: { type: 2} })">
              <div class="problem-item_icon"></div>
              <div class="problem-item_text flex-item flex flex-ver-center u-bor-b">意见反馈</div>
            </div>
          </div>
        </div>
      </div>
      <div class="vertical-goTop" :class="{ 'active': swipeState === 'down' }" v-transfer-dom v-show="orientation === 0" @click="toggleSwipe"></div>
    </div>
    <!--横屏-->
    <div class="horizontal" v-show="orientation === 1" ref="horizontal">
      <div>
        <search ref="horSearch"></search>
        <marquee ref="horMarquee" v-if="orientation === 1"></marquee>
        <div class="issues">
          <div class="issues-title u-bor-b" ref="horIssuesTitle">热门问题</div>
          <scroller ref="horScroller" lock-x :height="horScrollerHeight">
            <div>
              <div class="issues-item u-bor-b flex" v-for="item in DONE_HOT" :key="item.id" @click="openPopupDetail(item)">
                <div class="issues-item_text flex-item u-ell">{{ item.title }}</div>
                <div class="issues-item_arrow"></div>
              </div>
            </div>
          </scroller>
        </div>
        <div class="type">
          <div class="type-title u-bor-b">问题类型</div>
          <div class="type-box type-cross">
            <router-link class="type-item" tag="div" :to="{ name: 'list', query: { cId: item.cId } }" v-for="item in DONE_CATEGORY" :key="item.cId">
              <div class="type-item_icon"><img :src="`${httpType}${item.icon}`" alt=""></div>
              <div class="type-item_text">{{ item.name }}</div>
            </router-link>
          </div>
        </div>
        <div class="nav flex">
          <div class="nav-btn flex-item flex flex-center">联系客服
            <div class="nav-icon nav-icon_down"></div>
          </div>
          <router-link class="nav-btn flex-item flex flex-center" tag="div" :to="{ name: 'myOrder' }">我的提单</router-link>
        </div>
        <div class="problem">
          <div class="problem-item flex" @click="goProblem({ name: 'issue', query: { type: 0} })">
            <div class="problem-item_icon"></div>
            <div class="problem-item_text flex-item flex flex-ver-center u-bor-b">充值问题</div>
          </div>
          <div class="problem-item flex" @click="goProblem({ name: 'issue', query: { type: 3} })">
            <div class="problem-item_icon"></div>
            <div class="problem-item_text flex-item flex flex-ver-center u-bor-b">登录问题</div>
          </div>
          <div class="problem-item flex" @click="goProblem({ name: 'issue', query: { type: 1} })">
            <div class="problem-item_icon"></div>
            <div class="problem-item_text flex-item flex flex-ver-center u-bor-b">游戏问题</div>
          </div>
          <div class="problem-item flex" @click="goProblem({ name: 'issue', query: { type: 4} })">
            <div class="problem-item_icon"></div>
            <div class="problem-item_text flex-item flex flex-ver-center u-bor-b">举报申诉</div>
          </div>
          <div class="problem-item flex" @click="goProblem({ name: 'issue', query: { type: 2} })">
            <div class="problem-item_icon"></div>
            <div class="problem-item_text flex-item flex flex-ver-center u-bor-b">意见反馈</div>
          </div>
        </div>
      </div>
      <div class="horizontal-goTop" :class="{ scrolling: horizontalScrollState === 'scrolling', down: horizontalScrollState === 'down' }" v-transfer-dom v-show="orientation === 1" @click="horizontalGoTop"></div>
    </div>
    <popup-detail v-model="popupDetailState" :item="popupDetail"></popup-detail>
  </div>
</template>

<script>
  require('swiper/dist/css/swiper.css')
  import {
    swiper,
    swiperSlide
  } from 'vue-awesome-swiper'
  import {
    mapState,
    mapGetters
  } from 'vuex'
  import Search from '@/components/Search.vue'
  import Marquee from '@/components/Marquee.vue'
  import PopupDetail from '@/components/PopupDetail.vue'
  import {
    Scroller,
    TransferDom
  } from 'vux'
  import Hammer from 'hammerjs'
  import anime from 'animejs'
  import * as util from '@/util'
  export default {
    directives: {
      TransferDom
    },
    components: {
      Search,
      Marquee,
      Scroller,
      PopupDetail,
      swiper,
      swiperSlide
    },
    data() {
      return {
        verScrollerHeight: '0px',
        horScrollerHeight: '0px',
        hammer: null,
        swipeState: 'up',
        popupDetailState: false,
        popupDetail: {},
        horizontalScrollState: 'top',
        swiperOption: {
          prevButton: '.swiper-button-prev',
          nextButton: '.swiper-button-next',
        }
      }
    },
    computed: {
      ...mapState([
        'orientation'
      ]),
      ...mapGetters([
        'DONE_HOT',
        'DONE_CATEGORY',
        'DONE_ROLES_LIST',
        'DONE_SOURCE'
      ]),
      httpType () {
        if(this.DONE_SOURCE === 'ios'){
          return 'https:'
        }else{
          return ''
        }
      }
    },
    watch: {
      orientation(val) {
        document.body.scrollTop = 0
        this.setScrollHeight(val)
      }
    },
    async created() {
      //进入index页面都要更新匹配appid对应的pid并存入缓存
      let { appId } = util.getLocalData('user')
      this.$store.getters.DONE_APP_LIST.forEach(v => {
          let app_list = v.app_list
          if (app_list.android === appId || app_list.ios === appId) {
              util.setLocalData('app', v)
          }
      })
      let {
        serverId,
        roleId
      } = util.getLocalData('user'), {
        pId
      } = util.getLocalData('app')
      if (util.isEmpty(this.DONE_HOT) || util.isEmpty(this.DONE_CATEGORY)) {
        await Promise.all([this.$store.dispatch('FETCH_HOT', {
          pId,
          serverId,
          roleId
        }), this.$store.dispatch('FETCH_CATEGORY', {
          pId
        })])
        this.setScrollHeight(this.orientation)
      } else {
        this.setScrollHeight(this.orientation)
      }
      if(util.isEmpty(this.DONE_ROLES_LIST)){
        this.$store.dispatch('FETCH_ROLES_LIST', {
          pId
        })
      }

    },
    mounted() {
      document.body.scrollTop = 0
      this.initHammer()
      window.addEventListener('scroll', this.scroll, false)
    },
    destroyed() {
      this.destroyHammer()
      window.removeEventListener('scroll', this.scroll, false)
    },
    methods: {
      initHammer() {
        this.hammer = new Hammer(this.$refs.vertical)
        this.hammer.get('swipe').set({
          direction: Hammer.DIRECTION_VERTICAL
        });
        this.hammer.on('swipeup', this.swipeup)
        this.hammer.on('swipedown', this.swipedown)
      },
      destroyHammer() {
        if (this.hammer) {
          this.hammer.remove('swipe')
          this.hammer.off('swipeup', this.swipeup)
          this.hammer.off('swipedown', this.swipedown)
          this.hammer.stop()
          this.hammer.destroy()
        }
      },
      setScrollHeight(val) {
        this.$nextTick(() => {
          if (val === 0) {
            let searchH = this.$refs.verSearch.$el.offsetHeight
            let marqueeH = this.$refs.verMarquee.$el.offsetHeight
            let issuesTitleH = this.$refs.verIssuesTitle.offsetHeight + parseInt(window.getComputedStyle(this.$refs.verIssuesTitle.parentNode, null).marginTop, 10)
            let typeH = this.$refs.verType.offsetHeight
            let navH = this.$refs.verNav.offsetHeight
            let windowHeight = window.innerHeight
            this.verScrollerHeight = windowHeight - (searchH + marqueeH + issuesTitleH + typeH + navH) + 'px'
            this.$nextTick(() => {
              this.$refs.verScroller.reset()
            })
          } else {
            let searchH = this.$refs.horSearch.$el.offsetHeight
            let marqueeH = this.$refs.horMarquee.$el.offsetHeight
            let issuesTitleH = this.$refs.horIssuesTitle.offsetHeight + parseInt(window.getComputedStyle(this.$refs.horIssuesTitle.parentNode, null).marginTop, 10)
            let windowHeight = window.innerHeight
            this.horScrollerHeight = windowHeight - (searchH + marqueeH + issuesTitleH) + 'px'
            this.$nextTick(() => {
              this.$refs.horScroller.reset()
            })
          }
        })
      },
      swipeup(e) {
        this.swipe(e, true)
      },
      swipedown(e) {
        this.swipe(e, false)
      },
      swipe(e, state) {
        let scroller = this.$refs.verScroller.$el
        let parentNodeList = []
        let node = e.target
        while (node.tagName.toLowerCase() !== 'body') {
          parentNodeList.push(node)
          node = node.parentNode
        }
        if (parentNodeList.indexOf(scroller) === -1) {
          if (state) {
            this.goSwipedown()
          } else {
            this.goSwipedoup()
          }
        }
      },
      goSwipedown() {
        let navH = this.$refs.verNav.offsetHeight
        let scrollH = -(window.innerHeight - navH)
        if (this.swipeState === 'down') return false
        this.anime(scrollH, () => {
          this.swipeState = 'down'
        })
      },
      goSwipedoup() {
        if (this.swipeState === 'up') return false
        this.anime(0, () => {
          this.swipeState = 'up'
        })
      },
      anime: function() {
        let animing = false;
        return function(top, cb) {
          if (animing) return false
          let timeline = anime.timeline({
            begin() {
              animing = true
            },
            complete(anim) {
              animing = false
              cb && cb(anim)
            }
          })
          timeline.add({
              targets: this.$refs.verticalWrap,
              translateX: 0,
              translateY: top,
              translateZ: 0,
              easing: 'easeOutQuad',
              duration: 800,
              offset: 0
            })
            .add({
              targets: this.$refs.arrow,
              rotate: this.swipeState === 'up' ? '-0.5turn' : 0,
              easing: 'easeOutQuad',
              duration: 800,
              offset: 0
            })
          timeline.play()
        }
      }(),
      toggleSwipe() {
        if (this.swipeState === 'up') {
          this.goSwipedown()
        } else {
          this.goSwipedoup()
        }
      },
      openPopupDetail(item) {
        this.popupDetailState = true
        this.popupDetail = item
      },
      scroll() {
        let height = document.body.offsetHeight
        let scrollTop = document.body.scrollTop
        if (scrollTop <= 0) {
          this.horizontalScrollState = 'top'
        } else if (scrollTop > 0 && ((scrollTop + window.innerHeight) < height)) {
          this.horizontalScrollState = 'scrolling'
        } else {
          this.horizontalScrollState = 'down'
        }
      },
      horizontalGoTop() {
        if (this.horizontalScrollState === 'top') {
          document.body.scrollTop = window.innerHeight
        }
        if (this.horizontalScrollState === 'down') {
          document.body.scrollTop = 0
        }
      },
      goProblem(route) {
                                    
        if (util.isWeiXin()) {
          if (this.DONE_ROLES_LIST.length >= 2) { //如果角色多于个就去选择角色界面
            if (this.$route.query.from === 'bindRole') {
            
              this.$router.push({
                name: 'issue',
                query: {
                  type: route.query.type
                }
              }) //如果是从绑定角色页面过来的就直接去提问
            } else {
              this.$router.push({
                name: 'selectBindRole',
                query: {
                  name: route.name,
                  type: route.query.type
                }
              }) //去选择角色，并记录选择哪一个问题
            }
          } else if(this.DONE_ROLES_LIST.length == 1) { //如果角色只有一个直接跳到问题页
            let currentItem = this.DONE_ROLES_LIST[0]
            util.setLocalData('role', currentItem)
            let { name, type } = this.$route.query
            // console.log(route)
            this.$router.push({
              name: 'issue',
              query: {
                type: route.query.type
              }
            })
          } else {
              this.$router.push({
              name: 'bindRole'
            }) //角色列表为空就去绑定角色
          }
        } else {
          //如果是在sdk 本地已经有角色数据 直接去提问
          this.$router.push({
            name: 'issue',
            query: {
              type: route.query.type
            }
          })
        }
      }
    }
  }
</script>

<style lang="less">
  .issues {
    margin-top: .2rem;
    background-color: #fff;
    &-title {
      color: #1b1b20;
      padding-left: .3rem;
      height: .8rem;
      line-height: .8rem;
    }
    &-item {
      margin-left: .3rem;
      color: #666;
      height: 1.1rem;
      &:last-child:after {
        border: none;
      }
      &_text {
        height: 1.1rem;
        line-height: 1.1rem;
        font-size: .28rem;
      }
      &_arrow {
        height: 100%;
        width: .8rem;
        background: url(../assets/img/issues-icon.png) no-repeat center center;
        background-size: .16rem .31rem;
      }
    }
  }
  .type {
    padding-top: .2rem;
    &-title {
      background-color: #fff;
      color: #1b1b20;
      padding-left: .3rem;
      height: .8rem;
      line-height: .8rem;
    }
    &-box {
      background-color: #fff;
      /*padding: .3rem 0;*/
      font-size: 0;
      &.type-cross {
        min-height: 1.8rem;
        box-sizing: border-box;
        .type-item {
          width: 16.6666%;
        }
      }
    }
    &-item {
      padding: .3rem 0;
      box-sizing: border-box;
      height: 1.8rem;
      width: 33.3333%;
      display: inline-block;
      text-align: center;
      &_icon {
        width: .56rem;
        height: .56rem;
        background: no-repeat center center;
        display: inline-block;
        background-size: .56rem .56rem;
      }
      &_text {
        margin-top: .25rem;
        font-size: .26rem;
        color: #666;
      }
      /*&:nth-child(1) &_icon{*/
      /*background-image: url(../assets/img/type1.png);*/
      /*background-size: .56rem .56rem;*/
      /*}*/
      /*&:nth-child(2) &_icon{*/
      /*background-image: url(../assets/img/type2.png);*/
      /*background-size: .52rem .52rem;*/
      /*}*/
      /*&:nth-child(3) &_icon{*/
      /*background-image: url(../assets/img/type3.png);*/
      /*background-size: .51rem .51rem;*/
      /*}*/
      /*&:nth-child(4) &_icon{*/
      /*background-image: url(../assets/img/type4.png);*/
      /*background-size: .52rem .52rem;*/
      /*}*/
      /*&:nth-child(5) &_icon{*/
      /*background-image: url(../assets/img/type5.png);*/
      /*background-size: .47rem .47rem;*/
      /*}*/
      /*&:nth-child(6) &_icon{*/
      /*background-image: url(../assets/img/type6.png);*/
      /*background-size: .46rem .45rem;*/
      /*}*/
    }
  }
  .nav {
    background-color: #F3F4F5;
    height: 1rem;
    width: 100%;
    &-btn {
      color: #666;
      &:first-child {
        background: url(../assets/img/nav-line.png) no-repeat right center;
        background-size: 1px .29rem;
      }
    }
    &-icon {
      width: .26rem;
      height: .14rem;
      background-image: url(../assets/img/nav-icon.png);
      background-size: 100% 100%;
      margin-left: .25rem;
      /*transition: transform .8s ease-out;*/
      /*&_down{*/
      /*transform: rotate(-180deg);*/
      /*}*/
    }
  }
  .problem {
    background-color: #fff;
    &-item {
      height: 1.3rem;
      &_text {
        color: #717171;
        height: 100%;
      }
      &_icon {
        width: 1.6rem;
        height: 100%;
        background: no-repeat center center;
        background-size: .8rem .8rem;
      }
      &:nth-child(1) &_icon {
        background-image: url(../assets/img/problem1.png);
      }
      &:nth-child(2) &_icon {
        background-image: url(../assets/img/problem2.png);
      }
      &:nth-child(3) &_icon {
        background-image: url(../assets/img/problem3.png);
      }
      &:nth-child(4) &_icon {
        background-image: url(../assets/img/problem4.png);
      }
      &:nth-child(5) &_icon {
        background-image: url(../assets/img/problem5.png);
      }
    }
  }
  .vertical {
    height: 100%;
    overflow: hidden;
    &-wrap {
      position: relative;
    }
    &-goTop {
      z-index: 1;
      position: absolute;
      right: .5rem;
      bottom: .5rem;
      width: .6rem;
      height: .6rem;
      background: url(../assets/img/down.png) no-repeat;
      background-size: 100% 100%;
      &.active {
        background-image: url(../assets/img/top.png);
      }
    }
  }
  .vertical0 {
    height: 100%;
  }
  .vertical1 {
    height: 100%;
    background-color: #fff;
  }
  .horizontal {
    &-goTop {
      z-index: 1;
      position: fixed;
      right: .5rem;
      bottom: .5rem;
      width: .6rem;
      height: .6rem;
      background: url(../assets/img/down.png) no-repeat;
      background-size: 100% 100%;
      &.scrolling {
        background-image: url(../assets/img/downing.png);
      }
      &.down {
        background-image: url(../assets/img/top.png);
      }
    }
  }
  .swiper-button-prev,
  .swiper-button-next {
    width: .6rem !important;
    height: .43rem !important;
    margin-top: -16px !important;
    background-size: 100% 100% !important;
    /*transition: opacity .3s ease-out;*/
    &.swiper-button-disabled,
    &.swiper-button-prev {
      opacity: 0 !important;
    }
  }
  .swiper-button-next {
    background-image: url(../assets/img/swiper-next.png) !important;
  }
  .swiper-button-prev {
    background-image: url(../assets/img/swiper-prev.png) !important;
  }
</style>
