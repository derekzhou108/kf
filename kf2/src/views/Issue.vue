<template>
  <div class="issue">
    <div>
      <div v-if="type == 0">
        <group>
          <x-input  title="服务器" v-model="issue0.serverName" :show-clear="false" :disabled ="true"></x-input >
          <x-input title="角色名" placeholder="游戏内角色的名称" v-model="issue0.roleName" :show-clear="false" :max="10"></x-input>
          <x-input title="角色ID" placeholder="游戏内点击头像可查看ID" v-model="issue0.roleId" :show-clear="false" :max="20"></x-input>
          <x-input title="充值数量" placeholder="如648元宝/钻石" v-model="issue0.money" :show-clear="false" :max="10"></x-input>
          <datetime title="充值时间" placeholder="请选择" v-model="issue0.time" :class="issue0.time === '' ? 'place-color': '' " format="YYYY-MM-DD HH:mm" confirm-text="确认" cancel-text="取消" year-row="{value}年" month-row="{value}月" day-row="{value}日" hour-row="{value}点" minute-row="{value}分" start-date="2000-01-01" :end-date="now.d"></datetime>
          <x-input title="联系方式" placeholder="您的手机号码" v-model="issue0.phone" :show-clear="false" :max="11"></x-input>
          <x-textarea class="textarea" title="详细信息" placeholder="请详细描述您遇到的问题,不低于15字" v-model="issue0.desc" :show-counter="false" :rows="3" :min='15' :max="issue0.textareaMax + (issue0.desc.split('\n').length-1)"></x-textarea>
          <div class="weui-textarea-counter issue-counter"><span>{{issue0.desc.trim().replace(/[\r\n]/g,"").length}}</span>/{{issue0.textareaMax}}</div>
        </group>
      </div>
      <div v-if="type == 1">
        <group>
          <x-input  title="服务器" v-model="issue1.serverName" :show-clear="false" :disabled ="true"></x-input >
          <x-input title="角色名" placeholder="游戏内角色的名称" v-model="issue1.roleName" :show-clear="false" :max="10"></x-input>
          <x-input title="角色ID" placeholder="游戏内点击头像可查看ID" v-model="issue1.roleId" :show-clear="false" :max="20"></x-input>
          <x-input title="联系方式" placeholder="您的手机号码" v-model="issue1.phone" :show-clear="false" :max="11"></x-input>
          <x-textarea class="textarea" title="详细信息" placeholder="请详细描述BUG相关内容,不低于15字" v-model="issue1.desc" :show-counter="false" :rows="3" :min='15' :max="issue1.textareaMax + (issue1.desc.split('\n').length-1)"></x-textarea>
          <div class="weui-textarea-counter issue-counter"><span>{{issue1.desc.trim().replace(/[\r\n]/g,"").length}}</span>/{{issue1.textareaMax}}</div>
        </group>
      </div>
      <div v-if="type == 2">
        <group>
          <x-input  title="服务器" v-model="issue2.serverName" :show-clear="false" :disabled ="true"></x-input >
          <x-input title="角色名" placeholder="游戏内角色的名称" v-model="issue2.roleName" :show-clear="false" :max="10"></x-input>
          <x-input title="角色ID" placeholder="游戏内点击头像可查看ID" v-model="issue2.roleId" :show-clear="false" :max="20"></x-input>
          <x-input title="联系方式" placeholder="您的手机号码" v-model="issue2.phone" :show-clear="false" :max="11"></x-input>
          <x-textarea class="textarea" title="详细信息" placeholder="请详细说明相关内容,不低于15字" v-model="issue2.desc" :show-counter="false" :rows="3" :min='15' :max="issue2.textareaMax + (issue2.desc.split('\n').length-1)"></x-textarea>
          <div class="weui-textarea-counter issue-counter"><span>{{issue2.desc.trim().replace(/[\r\n]/g,"").length}}</span>/{{issue2.textareaMax}}</div>
        </group>
      </div>
      <div v-if="type == 3">
        <group>
          <popup-picker title="问题类型" v-model="issue3.problemType" :data="select.problemType" :class="!issue3.problemType[0] ? 'place-popup': '' "></popup-picker>
          <popup-picker title="手机系统" v-model="issue3.systemType" :data="select.systemType" :class="!issue3.systemType[0] ? 'place-popup': '' "></popup-picker>
          <popup-picker title="网络运营商" v-model="issue3.netOperator" :data="select.netOperator" :class="!issue3.netOperator[0] ? 'place-popup': '' "></popup-picker>
          <popup-picker title="网络类型" v-model="issue3.netType" :data="select.netType" :class="!issue3.netType[0] ? 'place-popup': '' "></popup-picker>
          <datetime title="问题时间" placeholder="请选择" v-model="issue3.time" :class="issue3.time === '' ? 'place-color': '' " format="YYYY-MM-DD HH:mm" confirm-text="确认" cancel-text="取消" year-row="{value}年" month-row="{value}月" day-row="{value}日" hour-row="{value}点" minute-row="{value}分" start-date="2000-01-01" :end-date="now.d"></datetime>
          <x-input title="系统提示" placeholder="如网络连接错误、更新失败" v-model="issue3.briefDesc" :show-clear="false" :max="10"></x-input>
          <x-input title="手机型号" placeholder="如华为P10、Iphone7" v-model="issue3.phoneType" :show-clear="false" :max="10"></x-input>
          <x-input title="系统版本号" placeholder="如IOS10、安卓6.0" v-model="issue3.systemVersion" :show-clear="false" :max="10"></x-input>
          <x-input title="所在城市" placeholder="如湖南长沙、广东深圳" v-model="issue3.city" :show-clear="false" :max="10"></x-input>
          <x-input  title="服务器" v-model="issue3.serverName" :show-clear="false" :disabled ="true"></x-input >
          <x-input title="角色名" placeholder="游戏内角色的名称" v-model="issue3.roleName" :show-clear="false" :max="10"></x-input>
          <x-input title="角色ID" placeholder="游戏内点击头像可查看ID" v-model="issue3.roleId" :show-clear="false" :max="20"></x-input>
          <x-input title="联系方式" placeholder="您的手机号码" v-model="issue3.phone" :show-clear="false" :max="11"></x-input>
          <x-textarea class="textarea" title="详细信息" placeholder="请详细说明相关内容,不低于15字" v-model="issue3.desc" :show-counter="false" :rows="3" :min='15' :max="issue3.textareaMax + (issue3.desc.split('\n').length-1)"></x-textarea>
          <div class="weui-textarea-counter issue-counter"><span>{{issue3.desc.trim().replace(/[\r\n]/g,"").length}}</span>/{{issue3.textareaMax}}</div>
        </group>
      </div>
      <div v-if="type == 4">
        <group>
          <popup-picker title="问题类型" v-model="issue4.problemType" :data="select.problemType2" @on-change="changeType"></popup-picker>
          <popup-picker title="举报类型" v-model="issue4.reportType" :data="select.reportType" v-show="issue4.problemType[0] !== '申诉问题' " :class="!issue4.reportType[0] ? 'place-popup': '' "></popup-picker>
          <popup-picker title="申诉类型" v-model="issue4.complainType" :data="select.appealType" v-show="issue4.problemType[0] == '申诉问题' " :class="!issue4.complainType[0] ? 'place-popup': '' "></popup-picker>
          <datetime title="选择时间" placeholder="请选择" v-model="issue4.time" :class="issue4.time === '' ? 'place-color': '' " v-show="issue4.problemType[0] !== '申诉问题' " format="YYYY-MM-DD HH:mm" confirm-text="确认" cancel-text="取消" year-row="{value}年" month-row="{value}月" day-row="{value}日" hour-row="{value}点" minute-row="{value}分" start-date="2000-01-01" :end-date="now.d"></datetime>
          <x-input  title="服务器" v-model="issue4.serverName" :show-clear="false" :disabled ="true"></x-input >
          <x-input title="角色名" placeholder="游戏内角色的名称" v-model="issue4.roleName" :show-clear="false" :max="10"></x-input>
          <x-input title="角色ID" placeholder="游戏内点击头像可查看ID" v-model="issue4.roleId" :show-clear="false" :max="20"></x-input>
          <x-input title="被举报角色名" placeholder="被举报玩家的角色名称" v-model="issue4.reportedRoleName" :show-clear="false" v-show="issue4.problemType[0] !== '申诉问题' " :max="10"></x-input>
          <x-input title="被举报角色ID" placeholder="被举报玩家的角色ID" v-model="issue4.reportedRoleId" :show-clear="false" v-show="issue4.problemType[0] !== '申诉问题' " :max="20"></x-input>
          <x-input title="联系方式" placeholder="您的手机号码" v-model="issue4.phone" :show-clear="false" :max="11"></x-input>
          <x-textarea class="textarea" title="详细信息" placeholder="请详细说明相关内容,不低于15字" v-model="issue4.desc" :show-counter="false" :rows="3" :min='15' :max="issue4.textareaMax + (issue4.desc.split('\n').length-1)"></x-textarea>
          <div class="weui-textarea-counter issue-counter"><span>{{issue4.desc.trim().replace(/[\r\n]/g,"").length}}</span>/{{issue4.textareaMax}}</div>
        </group>
      </div>
      <div class="upload">
        <div class="upload-title">相关图片</div>
        <div class="upload-content flex" v-show="DONE_UPLOAD.length < 5">
          <label class="upload-label flex flex-item-center" for="file">
            <input class="upload-input" id="file" type="file" accept="image/gif,image/jpeg,image/jpg,image/png" @change="addImg($event)">
          </label>
          <div class="flex-item flex flex-cross-center" v-if="type == 0">您好，请您务必提供充值记录的截图（包含充值订单号、充值时间、金额、商户名称及商品名称），没有截图将无法进一步核实噢！</div>
          <div class="flex-item flex flex-cross-center" v-if="type == 1">您好，请尽量提供BUG截图，方便我们快速为您处理噢！</div>
          <div class="flex-item flex flex-cross-center" v-if="type == 2 || type == 3 || type == 4">您好，请提供问题截图，方便我们快速为您处理噢！</div>
        </div>
      </div>
      <div class="uploadImg">
        <div class="uploadImg-item" @click="delImg(item)" v-for="(item, key) in DONE_UPLOAD" :key="key" :style="{backgroundImage: 'url('+ item.base64 +')'}">
          <i class="uploadImg-del weui-icon weui_icon_clear weui-icon-clear"></i>
        </div>
      </div>
      <button class="primary-btn" @click="submitData(type)">提交</button>
    </div>
    <div v-transfer-dom>
      <x-dialog v-model="dialog" class="issueDialog">
        <div class="issueDialog-content flex flex-cross-center flex-ver">
          <div class="issueDialog-logo flex"></div>
          <div class="issueDialog-text flex">提交成功，请等候GM消息！</div>
          <button class="issueDialog-btn issue-button" @click="goIndex">确定</button>
        </div>
      </x-dialog>
    </div>
  </div>
</template>

<script>
  //上传插件
  import '@/assets/js/lrz.all.bundle'
  import {
    Datetime,
    XInput,
    XTextarea,
    PopupPicker,
    Group,
    XDialog,
    TransferDomDirective as TransferDom
  } from 'vux'
  import {
    mapGetters
  } from 'vuex'
  import * as util from '@/util'
  export default {
    directives: {
      TransferDom
    },
    components: {
      Datetime,
      Group,
      XInput,
      XTextarea,
      PopupPicker,
      XDialog
    },
    data() {
      let user = util.getLocalData('user')
      let role = util.getLocalData('role')
      // alert(`Issue中：${JSON.stringify(user)}`)
      let serverName = []
      // 03-28 修改组件popup-picker，默认第一项为空数组
      serverName[0] = user.serverName || (role && role.serverName)
      let base = {
        appId: user.appId || role.appId, //游戏ID
        qType: this.$route.query.type + 1, //反馈的问题类型
        channelId: user.channelId || (role && role.channelId), //渠道ID
        roleName: user.roleName || (role && role.roleName), //角色名字
        roleId: user.roleId || (role && role.roleId), //角色ID
        serverName: serverName, //服务器名字
        serverId: user.serverId, //服务器ID
      }
      return {
        type: this.$route.query.type,
        issue0: {
          appId: base.appId,
          textareaMax: 150,
          qType: base.qType,
          channelId: base.channelId,
          serverName: base.serverName,
          serverId: base.serverId,
          roleId: base.roleId,
          roleName: base.roleName,
          submitServerName: base.serverName,
          submitServerId: base.serverId,
          submitRoleName: base.roleName,
          submitRoleId: base.roleId,
          phone: '',
          money: '',
          time: '',
          desc: '',
        },
        issue1: {
          appId: base.appId,
          textareaMax: 150,
          qType: base.qType,
          channelId: base.channelId,
          serverName: base.serverName,
          serverId: base.serverId,
          roleName: base.roleName,
          roleId: base.roleId,
          submitServerName: base.serverName,
          submitServerId: base.serverId,
          submitRoleName: base.roleName,
          submitRoleId: base.roleId,
          phone: '',
          desc: '',
        },
        issue2: {
          appId: base.appId,
          textareaMax: 150,
          qType: base.qType,
          channelId: base.channelId,
          serverName: base.serverName,
          serverId: base.serverId,
          roleName: base.roleName,
          roleId: base.roleId,
          submitServerName: base.serverName,
          submitServerId: base.serverId,
          submitRoleName: base.roleName,
          submitRoleId: base.roleId,
          phone: '',
          desc: '',
        },
        issue3: {
          appId: base.appId,
          textareaMax: 150,
          qType: base.qType,
          channelId: base.channelId,
          problemType: [],
          systemType: [],
          netOperator: [],
          netType: [],
          time: '',
          briefDesc: '',
          phoneType: '',
          systemVersion: '',
          city: '',
          serverName: base.serverName,
          serverId: base.serverId,
          roleName: base.roleName,
          roleId: base.roleId,
          submitServerName: base.serverName,
          submitServerId: base.serverId,
          submitRoleName: base.roleName,
          submitRoleId: base.roleId,
          phone: '',
          desc: '',
        },
        issue4: {
          appId: base.appId,
          textareaMax: 150,
          qType: base.qType,
          channelId: base.channelId,
          problemType: ['举报问题'],
          reportType: [],
          complainType: [],
          time: '',
          serverName: base.serverName,
          roleName: base.roleName,
          roleId: base.roleId,
          serverId: base.serverId,
          submitServerName: base.serverName,
          submitServerId: base.serverId,
          submitRoleName: base.roleName,
          submitRoleId: base.roleId,
          reportedRoleName: '',
          reportedRoleId: '',
          phone: '',
          desc: '',     
        },
        select: {
          problemType: [
            ['闪退', '卡机', '掉线', '无法登录', '无法连接', '黑屏', '更新失败', '找不到服务器', '其他']
          ],
          problemType2: [
            ['举报问题', '申诉问题']
          ],
          systemType: [
            ['IOS', '安卓', '其他']
          ],
          netOperator: [
            ['移动', '联通', '电信', '铁通', '教育网', '网通', '宽带', '其他']
          ],
          netType: [
            ['2G', '3G', '4G', 'wifi', '其他']
          ],
          reportType: [
            ['举报外挂', '举报工作室', '发布虚假消息', '发布黄色内容', '发布政治言论', '辱骂他人', '欺诈行为', '举报头像', '涉嫌赌博', '昵称违规', '宣传代练', '宣传线下交易', '宣传代充', '其他']
          ],
          appealType: [
            ['帐号封停', '角色禁言', '其他']
          ]
        },
        dialog: false
      }
    },
    watch: {
      issue0: {
        deep: true,
        handler(val, oldVal) {
          this.$nextTick(() => {
            this.issue0.money = val.money.replace(/-/g, '');
          })
        }
      }
    },
    computed: {
      ...mapGetters([
        'DONE_UPLOAD',
        'DONE_SERVER_LIST'
      ]),
      serverListData() {
        let arr = [
            ['']
          ],
          serverList = this.DONE_SERVER_LIST.serverList
        if (serverList && serverList.length) {
          serverList.forEach((v, k) => {
            arr[0][k] = v.serverName
          })
        }
        return arr
      },
      now() {
        let now = new Date()
        let year = now.getFullYear()
        let month = now.getMonth() + 1
        if (month < 10) month = '0' + month
        let date = now.getDate()
        if (date < 10) date = '0' + date
        let hours = now.getHours()
        let minutes = now.getMinutes()
        return {
          d: year + '-' + month + '-' + date,
          h: hours,
          m: minutes
        }
      }
    },
    created() {
      if (util.isEmpty(this.DONE_SERVER_LIST)) {
        let appId, role = util.getLocalData('role'),
          user = util.getLocalData('user')
        if (role) {
          appId = role.appId
        } else {
          appId = user.appId
        }
        this.$store.dispatch('FETCH_SERVER_LIST', {
          appId
        })
      }
    },
    mounted() {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    },
    destroyed() {
      this.$store.commit('TOGGLE_UPLOAD_RESET')
    },
    methods: {
      delImg(item) {
        const that = this
        this.$vux.confirm.show({
          title: '提示',
          content: '是否删除图片？',
          onConfirm() {
            that.$store.commit('TOGGLE_UPLOAD_DELETE', item)
          }
        })
      },
      setServerId(v,type){
        const serverList = this.DONE_SERVER_LIST.serverList
        const curServer = serverList.find(function(cur){
          return cur.serverName === v[0]
        })
        type.serverId = curServer.id
      },
      addImg(e) {
        let files = e.target.files[0]
        let that = this;
        lrz(files, {
            width: 1024,
            height: 1024
          })
          .then(function(rst) {
            // 处理成功会执行
            console.log(rst.fileLen / 1024 + 'kb')
            let user = util.getLocalData('user')
            let role = util.getLocalData('role')
            // 03-28 兼容考虑roleId不存在情况也能上传照片
            let data = {
              appId: user.appId || (role && role.appId),
              roleId: user.roleId || (role && role.roleId),
              image: rst.base64
            }
            that.$store.dispatch('POST_UPLOAD', data)
            return rst;
          })
          .catch(function(err) {
            // 处理失败会执行
          })
          .always(function() {
            // 不管是成功失败，都会执行
          });
      },
      submitData(type) {
        type = parseInt(type, 10)
        let data = util.deepClone(this['issue' + type])
        let images = []
        this.DONE_UPLOAD.forEach(v => {
          let obj = {
            imageUrl: v.imageUrl,
            width: v.width,
            height: v.height
          }
          images.push(obj)
        })
        data.serverName = data.serverName[0]
        if (!data.serverName || data.serverName.toString().trim() === '') {
          this.$vux.alert.show({
            title: '提示',
            content: '服务器不能为空'
          })
          return
        }
        if (!data.roleName || data.roleName.toString().trim() === '') {
          this.$vux.alert.show({
            title: '提示',
            content: '角色名不能为空'
          })
          return
        }
        // 03-28 若roleId无，新增校验需用户手动填写
        if (!data.roleId || data.roleId.toString().trim() === '') {
          this.$vux.alert.show({
            title: '提示',
            content: '角色ID不能为空'
          })
          return
        }
        if (type === 0 && (!data.money || data.money.toString().trim() === '')) {
          this.$vux.alert.show({
            title: '提示',
            content: '充值数量不能为空'
          })
          return
        }
        if (type === 0 && (!data.time || data.time.toString().trim() === '')) {
          this.$vux.alert.show({
            title: '提示',
            content: '请选择充值时间'
          })
          return
        }
        if (data.phone.trim() && !(/^1(3|4|5|7|8)\d{9}$/.test(data.phone.trim()))) {
          this.$vux.alert.show({
            title: '提示',
            content: '请输入正确手机号码'
          })
          return
        }
        if (data.desc.toString().trim().replace(/[\r\n]/g,"").length < 15) {
          this.$vux.alert.show({
            title: '提示',
            content: '请输入最少15字的详情信息'
          })
          return
        }
        if (!images.length && type === 0) {
          this.$vux.alert.show({
            title: '提示',
            content: '请上传相关截图'
          })
          return
        }
        data.images = images
        if (data.time !== undefined && data.time !== '') {
          data.time = data.time.replace(/\-/g, '/')
          data.time = new Date(data.time).getTime() / 1000
        }
        if (type === 3) {
          data.problemType = data.problemType[0] || ''
          data.systemType = data.systemType[0] || ''
          data.netOperator = data.netOperator[0] || ''
          data.netType = data.netType[0] || ''
        }
        if (type === 4) {
          data.problemType = data.problemType[0] || ''
          data.reportType = data.reportType[0] || ''
          data.complainType = data.complainType[0] || ''
        }
        switch (type) {
          case 0:
            this.$store.dispatch('POST_ISSUE0', data)
              .then(() => {
                this.submitSuccess()
              }, mes => alert(mes))
            break
          case 1:
            this.$store.dispatch('POST_ISSUE1', data)
              .then(() => {
                this.submitSuccess()
              }, mes => alert(mes))
            break
          case 2:
            this.$store.dispatch('POST_ISSUE2', data)
              .then(() => {
                this.submitSuccess()
              }, mes => alert(mes))
            break
          case 3:
            this.$store.dispatch('POST_ISSUE3', data)
              .then(() => {
                this.submitSuccess()
              }, mes => alert(mes))
            break
          case 4:
            this.$store.dispatch('POST_ISSUE4', data)
              .then(() => {
                this.submitSuccess()
              }, mes => alert(mes))
            break
        }
      },
      submitSuccess() {
        this.dialog = true
        this.$store.commit('TOGGLE_RESET_MYORDER')
      },
      goIndex() {
        this.$router.push({
          name: 'index'
        })
      },
      changeType(value) {
        this.issue4.reportType = []
        this.issue4.complainType = []
        this.issue4.time = ''
        this.issue4.reportedRoleName = ''
        this.issue4.reportedRoleId = ''
      }
    }
  }
</script>

<style lang="less">
  .issue {
    input {
      text-align: right;
    }
    .textarea {
      align-items: flex-start !important;
    }
    &-button {
      border-radius: .3rem;
      width: 100%;
      height: .6rem;
      margin-bottom: .8rem;
      color: #fff;
      font-size: .26rem;
      background-color: #FF8B2E;
      background-image: linear-gradient(to right, #FF8B2E, #FE6324);
      border: none;
      &_wrap {
        padding: 15px;
      }
    }
    .issue-counter{
      padding: 15px
    }
  }
  .upload {
    font-size: .3rem;
    padding: .2rem;
    color: #999;
    &-title {
      color: #333;
    }
    &-content {
      padding-top: .2rem;
    }
    &-label {
      height: 1.56rem;
      width: 1.56rem;
      background-image: url(../assets/img/upload.png);
      background-size: 100% 100%;
      margin-right: .2rem;
    }
    &-input {
      opacity: 0;
      display: block;
      height: 100%;
      width: 100%;
    }
  }
  .uploadImg {
    padding: 0 .2rem;
    font-size: 0;
    &-item {
      width: 32%;
      margin: 0 2% 2% 0;
      padding-top: 32%;
      text-align: right;
      background-position: center center;
      background-size: cover;
      position: relative;
      display: inline-block;
      &:nth-child(3n) {
        margin-right: 0;
      }
    }
    &-del {
      position: absolute;
      right: 0;
      top: .2em;
      color: red !important;
      font-size: .30rem !important;
    }
  }
  .issueDialog {
    &-content {
      padding: .2rem;
    }
    &-logo {
      background-size: 100% 100%;
      margin-bottom: .2rem;
      background-image: url(../assets/img/logo.png);
      width: 3.10rem;
      height: 1.16rem;
    }
    &-text {
      margin-bottom: .2rem;
      color: #999;
    }
    &-btn {
      margin-bottom: .3rem;
    }
  }
</style>
