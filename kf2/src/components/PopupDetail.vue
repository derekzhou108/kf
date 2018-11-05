<template>

  <div v-transfer-dom>
    <popup v-model="show" height="90%" ref="popup" :value="value">
      <div class="itemDetail">
        <div class="itemDetail-title flex flex-ver-center u-bor-b" ref="popupTitle" @click="show = false">
          <div class="itemDetail-title_text flex-item u-ell" :style="{color: '#' + item.color}">{{ item.title }}</div>
          <div class="itemDetail-title_icon"></div>
        </div>
        <scroller
          lock-x
          :height="popupScrollerHeight"
          ref="popupScroller"
        >
          <div>
            <div class="itemDetail-content" v-html="item.desc">

            </div>
            <div class="help flex flex-center" v-if="help">
              <div class="help-yes" :class="{active : item.comment === 1}" @click="postComment(1)">有帮助</div>
              <div class="help-rate flex flex-ver">
                <div class="help-rate_title">已有{{ item.total }}位玩家参与</div>
                <div class="help-bar flex-item-center">
                  <div class="help-bar_inner" :style="{width: item.total ? (item.useful / item.total * 100 ).toFixed(2) + '%' : 0 }"></div>
                </div>
                <div class="help-rate_num">{{ item.useful }}:{{ item.useless }}</div>
              </div>
              <div class="help-no" :class="{active : item.comment === -1}" @click="postComment(-1)">没帮助</div>
            </div>
          </div>

        </scroller>
      </div>
    </popup>
  </div>

</template>

<script>
    import { mapState } from 'vuex'
    import { Scroller, Popup, TransferDom } from 'vux'
    import * as util from '@/util'
    export default {
      props: {
        item: {
          type: Object,
          default: {}
        },
        value: {
          type: Boolean,
          default: false
        },
        help: {
          type: Boolean,
          default: true
        }
      },
      directives: {
        TransferDom
      },
      components: {
        Scroller,
        Popup
      },
      data(){
        return {
          popupScrollerHeight: '0px',
          show: this.value
        }
      },
      computed: {
        ...mapState([
          'orientation'
        ]),
      },
      watch: {
        orientation(val){
          this.setScrollHeight(val)
        },
        value(val){
          this.show = val
        },
        show(val){
          this.$emit('input', val)
          this.$nextTick(() => {
            this.setScrollHeight(this.orientation)
          })
        }
      },
      methods: {
        postComment(score){
          if(parseInt(this.item.comment, 10) !== 0) return false
          let { serverId, roleId }  = util.getLocalData('user'), { pId } = util.getLocalData('app')
          this.$store.dispatch('POST_COMMENT', { pId, score, serverId, roleId, qId: this.item.id })
            .then((data) => {
              this.item.total ++
              if(score === 1){
                util.toastText('多谢鼓励，我们会再接再励<br>O(∩_∩)O~', '5rem')
                this.item.comment = 1
                this.item.useful ++
              }else{
                this.item.comment = -1
                util.toastText('非常抱歉，期待不断成长的我们下次能够帮到您<br>/(ㄒoㄒ)/~~', '5rem')
                this.item.useless ++
              }
            }, (data) => {
              util.toastText(data.msg)
            })
        },
        setScrollHeight(val){
          let popupH = this.$refs.popup.$el.offsetHeight
          let popupTitleH = this.$refs.popupTitle.offsetHeight
          this.popupScrollerHeight = popupH - popupTitleH + 'px'
          this.$nextTick(() => {
            this.$refs.popupScroller.reset({top: 0})
          })
        }
      }
    }
</script>

<style lang="less">
  .itemDetail{
    background-color: #fff;
    height: 100%;
    &-title{
      height: .9rem;
      padding-left: .3rem;
      color:#1b1b20;
      font-weight: bold;
      &_text{
        font-size: .32rem;
      }
      &_icon{
        width: .9rem;
        height: .9rem;
        background: url(../assets/img/itemDetail-title_icon.png) no-repeat center center;
        background-size: .31rem .16rem;
      }
    }
    &-content{
      padding: .3rem;
      img{
        max-width: 100%;
      }
    }
  }
  .help{
    padding:.5rem 0;
    &-yes{
      background-image: url(../assets/img/help-yes.png);
      &.active{
        background-image: url(../assets/img/help-yes-active.png);
      }
    }
    &-no{
      background-image: url(../assets/img/help-no.png);
      &.active{
        background-image: url(../assets/img/help-no-active.png);
      }
    }
    &-yes, &-no{
      padding-top: .8rem;
      box-sizing: border-box;
      background-repeat: no-repeat;
      background-position: center top;
      background-size: .76rem .76rem;
      width: .8rem;
      height: 1.25rem;
      font-size: .26rem;
      color:#666;
      white-space: nowrap;
    }
    &-rate{
      font-size: .28rem;
      color:#1b1b20;
      width: 4.1rem;
      &_title{
        text-align: center;
      }
      &_num{
        text-align: center;
        color:#717171;
      }
    }
    &-bar{
      margin:.05rem 0;
      width: 2.65rem;
      height: .2rem;
      box-sizing: border-box;
      border:1px solid #FFBB2C;
      border-radius: .2rem;
      &_inner{
        background-color: #FFBB2C;
        height:100%;
      }
    }
  }
</style>
