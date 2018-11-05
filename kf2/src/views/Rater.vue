<template>
    <div class="rater u-scrolling">
      <div class="rater-title">请问您的问题是否得到了解决？</div>
      <div class="rater-btns flex">
        <button class="rater-btn flex-item" :class="{ active: yes}" @click="yes = 1">已解决</button>
        <button class="rater-btn flex-item" :class="{ active: !yes}" @click="yes = 0">未解决</button>
      </div>
      <div class="rater-score_title">请对本次客服服务进行评分</div>
      <div class="star" :class="{ gray:  score < 3 && score > 0, yellow: score === 3, orange: score > 3  }">
        <rater v-model="score" slot="value" star="" :margin="18" ></rater>
      </div>
      <div class="rater-score_text" v-show="score === 1">非常不满意，各方面都很差</div>
      <div class="rater-score_text" v-show="score === 2">不满意，比较差</div>
      <div class="rater-score_text" v-show="score === 3">一般，还需要改善</div>
      <div class="rater-score_text" v-show="score === 4">比较满意，仍可改善</div>
      <div class="rater-score_text" v-show="score === 5">非常满意，无可挑剔</div>
      <div class="rater-improve" v-show="score !== 5">
        <div class="rater-improve_title">指出不足</div>
        <div class="rater-improve_select">
          <div class="rater-improve_label" :class="{active: item.selected }" @click="item.selected = !item.selected" v-for="(item, key) in labelList " :key="key">{{ item.label }}</div>
        </div>
        <textarea class="rater-improve_textarea"  placeholder="欢迎给我们服务提建议~" v-model.trim="desc"></textarea>
      </div>
      <button class="rater-submit" @click="submit">提交评价</button>
    </div>
</template>

<script>
    import { Rater } from 'vux'
    import { mapState, mapGetters } from 'vuex'
    import * as util from '@/util'
    export default {
      components: {
        Rater
      },
      data(){
        return {
          yes: 1,
          score: 5,
          labelList: [],
          desc: '',
          done: false
        }
      },
      computed: {
        ...mapGetters([
          'DONE_EVALUATION_SETTINGS'
        ])
      },
      beforeRouteLeave(to, from ,next){
        if(this.done){
          next()
        }else{
          this.$vux.confirm.show({
            title: '提示',
            content: '确定要离开此页面吗？',
            onConfirm () {
              next()
            }
          })
        }
      },
      async created(){
          if( util.isEmpty(this.DONE_EVALUATION_SETTINGS) ){
            let { appId } = util.getLocalData('user')
            await this.$store.dispatch('FETCH_EVALUATION_SETTINGS', { appId })
        }
        this.fillLabelList()
      },
      methods: {
        async submit(){
          let { appId, channelId, roleId } = util.getLocalData('user')
          let data = {
            id: this.$route.query.id,
            appId,
            channelId,
            roleId,
            solved_state: this.yes,
            satisfied_state: this.score,
            evaluation_desc: [],
            description: this.desc
          }
            this.labelList.forEach( v => {
            if(v.selected){
              data.evaluation_desc.push(v.label)
            }
          })
          await this.$store.dispatch('POST_EVALUATION', data)
            .then((data) => {
              util.toastText(data.msg)
            },(data) => {
              util.toastText(data.msg)
            })
          this.done = true
          this.$router.replace({ name: 'orderDetail', query: { id: this.$route.query.id  } })
        },
        fillLabelList(){
          let labels = []
          this.DONE_EVALUATION_SETTINGS.forEach( v => {
            let item = {
              label: v,
              selected: false
            }
            labels.push(item)
          })
          this.labelList = labels
        }
      }
    }
</script>

<style lang="less">
  .rater{
    background-color: #fff;
    height: 100%;
    &-title{
      color: #666;
      text-align: center;
      padding-top: .8rem;
     }
    &-btns{
      padding-top: .5rem;
      width: 75%;
      margin:0 auto;
    }
    &-btn{
      border:none;
      height: .7rem;
      border-radius: .05rem;
      background-color: #F3F4F5;
      color:#999;
      margin-left: .3rem;
      outline: none;
      &.active{
        background-color: #FF8B30;
        color:#fff;
      }
    }
    &-score{
      &_title{
        color:#666;
        padding-top: .8rem;
        text-align: center;
      }
      &_text{
        padding-top: .4rem;
        font-size: .26rem;
        color:#ff7d2b;
        text-align: center;
      }
    }
    &-improve{
      &_title{
        color:#666;
        text-align: center;
        padding-top: .6rem;
      }
      &_select{
        width: 75%;
        font-size: 0;
        margin:.2rem auto 0 auto;
      }
      &_label{
        width: 48%;
        height: .6rem;
        line-height: .6rem;
        font-size: .26rem;
        color:#999;
        display: inline-block;
        box-sizing: border-box;
        border:1px solid #ddd;
        text-align: center;
        border-radius: .05rem;
        margin-top: 4%;
        &:nth-child(2n){
          margin-left: 4%;
        }
        &.active{
          border-color: #FF8B30;
          color:#FF8B30;
          border-radius: .05rem;
        }
      }
      &_textarea{
        border:1px solid #ddd;
        resize: none;
        width: 75%;
        height: 1.22rem;
        outline: none;
        margin: 4% 12.5% 0 12.5%;
        box-sizing: border-box;
        padding: .1rem;
        border-radius: .05rem;
        -webkit-appearance: none;
        &::-webkit-input-placeholder{
          color:#c2c2c2;
        }
      }
    }
    &-submit{
      margin: .4rem 12.5%;
      border:none;
      height: .78rem;
      width: 75%;
      color: #fff;
      background-color: #FE772B;
      background: -webkit-linear-gradient(left, #FF8B30, #FE6325);
      border-radius: .5rem;
      outline: none;
    }
    .star{
      padding-top: .4rem;
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
  }
</style>
