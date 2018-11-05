<template>
    <div>
      <scroller
        lock-x
        ref="scroller"
        :height="scrollerHeight"
      >
          <div class="orderDetail">

             <div class="orderDetail-item">
                <div class="orderDetail-title flex">
                    <div>我</div>
                    <div class="orderDetail-time flex flex-item flex-main-end">{{ DONE_ORDER_DETAIL.submit_time | date }}</div>
                </div>
                <div class="orderDetail-problem">
                 <div>单号：{{ DONE_ORDER_DETAIL.id }}</div>
                 <div v-if="DONE_ORDER_DETAIL.server_name">服务器：{{ DONE_ORDER_DETAIL.server_name }}</div>
                 <div v-if="DONE_ORDER_DETAIL.role_name">角色名：{{ DONE_ORDER_DETAIL.role_name }}</div>
                 <div v-if="DONE_ORDER_DETAIL.role_id">角色ID：{{ DONE_ORDER_DETAIL.role_id }}</div>

                 <div v-for="(item, key) in DONE_ORDER_DETAIL.q_attributes" :key="key">
                     <div v-if="item.rechargeMoney">充值数量：{{ item.rechargeMoney }}</div>
                     <div v-if="item.rechargeTime">充值时间：{{ item.rechargeTime | date}}</div>
                     <div v-if="item.problemType">问题类型：{{ item.problemType }}</div>
                     <div v-if="item.reportType">举报类型：{{ item.reportType }}</div>
                     <div v-if="item.complainType">申诉类型：{{ item.complainType }}</div>
                     <div v-if="item.systemType">手机系统：{{ item.systemType }}</div>
                     <div v-if="item.netOperator">网络运营商：{{ item.netOperator }}</div>
                     <div v-if="item.netType">网络类型：{{ item.netType }}</div>
                     <div v-if="item.time">时间：{{ item.time | date}}</div>
                     <div v-if="item.briefDesc">系统提示：{{ item.briefDesc }}</div>
                     <div v-if="item.phoneType">手机型号：{{ item.phoneType }}</div>
                     <div v-if="item.systemVersion">系统版本号：{{ item.systemVersion }}</div>
                     <div v-if="item.city">所在城市：{{ item.city }}</div>
                     <div v-if="item.reportedRoleName">被举报角色名：{{ item.reportedRoleName }}</div>
                     <div v-if="item.reportedRoleId">被举报角色ID：{{ item.reportedRoleId }}</div>
                 </div>

                  <div v-if="DONE_ORDER_DETAIL.phone">联系方式：{{ DONE_ORDER_DETAIL.phone}}</div>
                  <div v-if="DONE_ORDER_DETAIL.q_desc">详细描述：<pre>{{ DONE_ORDER_DETAIL.q_desc}}</pre></div>
                </div>

               <div class="uploadImg uploadImg_orderDetail">
                 <div class="uploadImg-item" @click="showImg(key)" v-for="(item, key) in imgList" :key="key" :style="{backgroundImage: 'url('+ item.src +')'}"></div>
               </div>

             </div>

             <div class="orderDetail-item orderDetail_service" v-for="item in DONE_ORDER_DETAIL.replys" :key="item.id">
               <div class="orderDetail-title flex">
                 <div>{{ item.reply_user }}</div>
                 <div class="orderDetail-time flex flex-item flex-main-end">{{ item.reply_time | date}}</div>
               </div>
               <div class="orderDetail-problem">
                <pre> {{ item.reply_content }}</pre>
               </div>
             </div>

            <div class="orderDetail-bottom">

                <router-link class="orderDetail-rater_btn flex flex-center" tag="div" :to="{ name: 'rater', query: { id: DONE_ORDER_DETAIL.id } }" v-if="!isEvaluation && DONE_ORDER_DETAIL.replys && DONE_ORDER_DETAIL.replys.length">前往评价</router-link>

                <div v-if="isEvaluation">
                  <divider>服务评价</divider>

                  <div class="star" :class="{ gray: score <= 2, yellow: score === 3, orange: score > 3 }">
                    <rater v-model="score" :max="score" slot="value" star="" :margin="18" disabled></rater>
                  </div>
                </div>

            </div>


          </div>
      </scroller>

      <div v-transfer-dom>
        <previewer :list="imgList" ref="previewer" :options="options"></previewer>
      </div>

    </div>
</template>

<script>
    import { Rater, Scroller, Divider, Previewer, TransferDom  } from 'vux'
    import { mapState, mapGetters } from 'vuex'
    import * as util from '@/util'
    export default {
      directives: {
        TransferDom
      },
      components: {
        Scroller,
        Rater,
        Divider,
        Previewer
      },
      data(){
        return {
          scrollerHeight: '0px',
          score:0,
          options: {
            getThumbBoundsFn (index) {
              let thumbnail = document.querySelectorAll('.uploadImg-item')[index]
              let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
              let rect = thumbnail.getBoundingClientRect()
              return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
            }
          }
        }
      },
      computed: {
        ...mapState([
          'orientation'
        ]),
        ...mapGetters([
          'DONE_ORDER_DETAIL'
        ]),
        isEvaluation(){
          let evaluation = this.DONE_ORDER_DETAIL.evaluation ? this.DONE_ORDER_DETAIL.evaluation : {}
          return !util.isEmpty(evaluation)
        },
        imgList(){
          let imgList = []
          if(this.DONE_ORDER_DETAIL.images && this.DONE_ORDER_DETAIL.images.length){
            this.DONE_ORDER_DETAIL.images.forEach( v => {
              imgList.push({ src: v.imageUrl, w: v.width, h: v.height })
            })
          }
          return imgList
        }
      },
      watch: {
        orientation(val){
          this.setScrollHeight(val)
        }
      },
      async created(){
        let { appId } = util.getLocalData('user')
        let res = await this.$store.dispatch('FETCH_ORDER_DETAIL', { appId, id: this.$route.query.id })
        this.score = res.data.evaluation.satisfied_state ? res.data.evaluation.satisfied_state : 1
        this.setScrollHeight()
      },
      methods: {
        showImg (index) {
          this.$refs.previewer.show(index)
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
  .orderDetail{
      padding:.2rem .4rem;
      &-bottom{
        padding-top: .4rem;
      }
      &-item{
        padding:.2rem;
        border-radius: .1rem;
        background-color: #fff;
        margin-bottom: .15rem;
        box-shadow: 0 0 .1rem rgba(102,102,102,.1);
        position: relative;
        color: #666;
        &:before{
          position: absolute;
          content: '';
          top:.15rem;
          left:-.4rem;
          height:0;
          width:0;
          border:.2rem solid transparent;
          border-right-color: #fff;
        }
        &.orderDetail_service{
          &:before{
            left:auto;
            right:-.4rem;
            border-right-color: transparent;
            border-left-color: #fff;
          }
          .orderDetail-problem{
            color:#000;
          }
        }
      }
      &-title{
        color:#000;
      }
      &-time{
       color: #666;
      }
      &-rater_btn{
        height: .78rem;
        width: 100%;
        color: #fff;
        background-color: #FE772B;
        background: -webkit-linear-gradient(left, #FF8B30, #FE6325);
        border-radius: .5rem;
      }
  }
  .uploadImg.uploadImg_orderDetail{
    padding:0;
    .uploadImg-item{
      width:32%;
      margin:2% 2% 0 0;
      padding-top: 32%;
      text-align:right;
      background-position: center center;
      background-size: cover;
      position: relative;
      display: inline-block;
      &:nth-child(3n){
        margin-right: 0;
      }
    }
  }
  .star{
    text-align: center;
    .vux-rater-inner{
      width: .47rem;
      height: .46rem;
      background: url(../assets/img/star-gray-light.png) no-repeat;
      background-size: 100% 100%;
    }
    &.gray{
      .is-active .vux-rater-inner{
        background-image: url(../assets/img/star-gray.png);
      }
    }
    &.yellow{
      .is-active .vux-rater-inner{
        background-image: url(../assets/img/star-yellow.png);
      }
    }
    &.orange{
      .is-active .vux-rater-inner{
        background-image: url(../assets/img/star-orange.png);
      }
    }
  }
</style>
