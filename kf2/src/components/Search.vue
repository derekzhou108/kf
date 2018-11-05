<template>
    <div class="search">
      <div class="search-placeholder flex flex-center" @click="showInput" v-if="!inputState">
        <div class="search-icon"></div>搜索
      </div>
      <div class="search-input_wrap flex" v-if="inputState">
        <input type="text" class="search-input flex-item" ref="search" v-model.trim="search" @blur="blurInput" ><span class="search-btn" @click.stop="goSearch">搜索</span>
        <x-icon type="ios-close-outline" size="18" v-if="search" @click="clear"></x-icon>
      </div>
    </div>
</template>

<script>
  export default {
    data(){
      return {
        inputState: false,
        search: ''
      }
    },
    methods: {
      showInput(){
        this.inputState = true
        this.$nextTick(() => {
          this.$refs.search.focus()
        })
      },
      blurInput(){
        if(!this.search){
          this.inputState = false
        }
      },
      clear(){
        this.search = ''
        this.$refs.search.focus()
      },
      goSearch(){
        this.$router.push({name: 'list', query: { type: 'search', content: this.search }})
      }
    }
  }
</script>

<style lang="less">
  .search{
      height:.95rem;
      width: 100%;
      padding: .2rem .2rem;
      background-color: #f3f4f5;
      box-sizing: border-box;
      &-placeholder{
        width: 100%;
        height:100%;
        background-color: #fff;
        font-size: .28rem;
        color:#999;
        border-radius: .1rem;
      }
      &-icon{
        width: .28rem;
        height: .28rem;
        background-image: url(../assets/img/search-icon.png);
        background-size: 100% 100%;
        margin-right: .15rem;
      }
      &-input{
        box-sizing: border-box;
        border:none;
        border-radius: .1rem;
        outline: none;
        padding:0 0.5rem;
        background: #fff url(../assets/img/search-icon.png) no-repeat .1rem center;
        background-size: .28rem .28rem;
      }
      &-btn{
        color:#999;
        font-size: .28rem;
        padding: 0 .2rem;
        border:1px solid #ccc;
        border-radius: .1rem;
        margin-left: .2rem;
      }
      &-input_wrap{
        position: relative;
        width: 100%;
        height:100%;
        .vux-x-icon {
          fill: #999;
          position: absolute;
          right:1.3rem;
          top:50%;
          margin-top: -9px;
        }
      }
  }
</style>
