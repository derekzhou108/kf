<template>
  <swipeout class="bindItem">
    <swipeout-item>
      <div slot="content" class="bindItem-content flex flex-ver-center">
        <div class="bindItem-icon" :style="{ backgroundImage: 'url(' + item.icon + ')' }"></div>
        <div class="bindItem-info flex-item">
          <div class="bindItem-name">{{ item.roleName }}</div>
          <div class="bindItem-server">{{ item.serverName }}</div>
        </div>
        <div class="bindItem-btn flex flex-center" @click="goIssue(item)">我要提问</div>
      </div>
      <div slot="right-menu">
          <swipeout-button background-color="#fe6325" class="bindItem-unbind" @click.native="unbind(item)">解除绑定</swipeout-button>
      </div>
    </swipeout-item>
  </swipeout>
</template>

<script>
  import { Swipeout, SwipeoutItem, SwipeoutButton } from 'vux'
  import * as util from '@/util'
  export default {
    props: {
      item: {
        type: Object,
        default: {}
      }
    },
    components: {
      Swipeout,
      SwipeoutItem,
      SwipeoutButton
    },
    methods: {
      unbind(item){
        this.$emit('on-unbind', item)
      },
      goIssue(item){
        this.$emit('on-goIssue', item)
      }
    }
  }
</script>

<style lang="less">
  .bindItem{
      height: 1.41rem;
      background-color: #fff;
      margin-bottom: .2rem;
      &-content{
        height: 1.4rem;
      }
      &-icon{
        width: 1rem;
        height: 1rem;
        background: no-repeat;
        background-size: 100% 100%;
        margin:0 .55rem;
      }
      &-name{
        color: #666;
      }
      &-server{
        font-size: .26rem;
        color: #999;
      }
      &-btn{
        font-size: .26rem;
        color: #fff;
        background-color: #FFBB2C;
        width: 1.8rem;
        height: .7rem;
        border-radius: .05rem;
        margin-right: .5rem;
      }
      &-unbind{
        font-size: .26rem !important;
      }
  }
  .vux-swipeout-button{
    padding:0;
    outline: none;
  }
  .weui-dialog__btn_primary{
    color:#000 !important;
  }
</style>
