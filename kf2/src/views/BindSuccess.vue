<template>
  <div class="bindSuccess">
    <div class="bindSuccess-header flex flex-center flex-ver">
      <div class="bindSuccess-icon"></div>
      <div class="bindSuccess-text">绑定成功！</div>
    </div>
    <div class="bindSuccess-subtitle">绑定的角色</div>
    <bind-item></bind-item>
    <bind-item></bind-item>
  </div>
</template>

<script>
  import BindItem from '@/components/BindItem.vue'
  export default {
    components: {
      BindItem
    }
  }
</script>

<style lang="less">
  .bindSuccess {
    &-header {
      padding: .6rem 0 .5rem 0;
      background-color: #fff;
    }
    &-icon {
      width: 1.29rem;
      height: 1.29rem;
      background: url(../assets/img/success.png) no-repeat;
      background-size: 100% 100%;
    }
    &-text {
      color: #666;
      padding-top: .1rem;
    }
    &-subtitle {
      height: .6rem;
      line-height: .6rem;
      color: #999;
      font-size: .26rem;
      text-indent: .3rem;
    }
  }
</style>
