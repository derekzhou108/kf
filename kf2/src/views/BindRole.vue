<template>
  <div>
    <div class="bindSuccess" v-if="!isbindRole">
      <div class="bindSuccess-header flex flex-center flex-ver">
        <div class="bindSuccess-icon"></div>
        <div class="bindSuccess-text">绑定成功！</div>
      </div>
    </div>
    <div class="BindRole-header flex flex-ver flex-center" v-if="isbindRole">
      <router-link tag="div" class="BindRole-icon" :to="{ name: 'bindSelectGame' }"></router-link>
      <div class="BindRole-title">绑定新角色</div>
    </div>
    <div class="BindRole-tips" v-if="!DONE_ROLES_LIST.length">您当前未绑定游戏角色</div>
    <div v-if="DONE_ROLES_LIST.length">
      <div class="BindRole-subtitle">已绑定角色</div>
      <bind-item :item="item" v-for="(item, key) in DONE_ROLES_LIST" :key="item._id" @on-unbind="unbind" @on-goIssue="goIssue"></bind-item>
    </div>
  </div>
</template>

<script>
  import {
    mapState,
    mapGetters
  } from 'vuex'
  import * as util from '@/util'
  import BindItem from '@/components/BindItem.vue'
  export default {
    components: {
      BindItem
    },
    data() {
      return {
      }
    },
    computed: {
      ...mapGetters([
        'DONE_ROLES_LIST',
        'DONE_APP_LIST'
      ]),
      isbindRole() {
        return this.$route.name === 'bindRole'
      }
    },
    watch: {
    },
    async created() {
      if (util.isEmpty(this.DONE_ROLES_LIST)) {
        await this.$store.dispatch('FETCH_ROLES_LIST', {})
      }
    },
    methods: {
      unbind(item) {
        util.confirm('解除绑定', '您真的要解除该游戏角色的绑定吗？', async() => {
          let data = {
            appId: item.appId,
            serverId: item.serverId,
            id: item._id
          }
          let res = await this.$store.dispatch('POST_ROLE_UNBIND', data)
          util.toastText(res.msg)
        })
      },
      goIssue(item) {
        this.DONE_APP_LIST.forEach(v => {
          if ((item.appId === v.app_list.android) || (item.appId === v.app_list.android)) {
            util.setLocalData('app', v)
          }
        })
        util.setLocalData('role', item)
        util.setSessionData('selected', 1)
        this.$router.push({
          name: 'index',
          query: {
            from: 'bindRole'
          }
        })
      }
    }
  }
</script>

<style lang="less">
  .BindRole {
    &-header {
      background-color: #fff;
      height: 3.04rem;
    }
    &-icon {
      width: 1.3rem;
      height: 1.3rem;
      background: url(../assets/img/bindRole.png) no-repeat;
      background-size: 100% 100%;
    }
    &-title {
      color: #666;
      padding-top: .1rem;
    }
    &-tips {
      font-size: .26rem;
      color: #ff7d2b;
      padding: .7rem 0;
      text-align: center;
    }
    &-subtitle {
      height: .6rem;
      line-height: .6rem;
      color: #999;
      font-size: .26rem;
      text-indent: .3rem;
    }
  }
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
