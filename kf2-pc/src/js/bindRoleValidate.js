var bindRoleValidateVm = avalon.define({
    $id: 'bindRoleValidate',
    appId: util.getQueryString('appId'),
    app: {},
    appName: '',
    channelList: [],
    channelId: '',
    channelName: '',
    serverList: [],
    serverId: '',
    serverName: '',
    roleName: '',
    roleId: '',
    mobilePhone: '',
    verificationCode: '',
    role: '角色昵称',
    roleItems: ['角色昵称','游戏ID'].map(function(val){ return { val: val, text: val }}),
    step: 0,
    cbSelect: function(data, key){
        var _this = this
        this[key] = data.value

        if(key === 'channelId'){
            _this.channelList.forEach(function(v){
                if(v.val === data.value){
                    _this.channelName = v.text
                }
            })
        }

        if(key === 'serverId'){
            _this.serverList.forEach(function(v){
                if(v.val === data.value){
                    _this.serverName = v.text
                }
            })
        }

    },
    goStep1: function(){
        var _this = this

        var data = {
            appId: _this.appId,
            sdkUserId: util.getStorage('userInfo').user_id,
            channelId: this.channelId,
            serverId: this.serverId,
            roleId: $.trim(this.roleId),
            roleName: $.trim(this.roleName),
            mobilePhone: $.trim(this.mobilePhone)
        }

        if( !( data.roleId || data.roleName ) ){
            dialog.errorMsg('请输入角色昵称或者角色ID')
            return false
        }
        if(!(util.isPhone( data.mobilePhone ))){
            dialog.errorMsg('请输入正确手机号码')
            return false
        }

        api.sendVerification(data)
            .then(function(res){
                _this.step = 1
            })
    },
    goStep0: function(){
        this.step = 0
        // this.channelId = ''
        // this.serverId = ''
        // this.roleName = ''
        // this.roleId = ''
        // this.mobilePhone = ''
        // this.verificationCode = ''
        // this.channelName = ''
    },
    roleBind: function(){
        var userInfo = util.getStorage('userInfo')
        var data = {
            appId: this.appId,
            sdkUserId: userInfo.user_id,
            channelId: this.channelId,
            serverId: this.serverId,
            roleId: this.roleId,
            roleName: this.roleName,
            mobilePhone: this.mobilePhone,
            verificationCode: $.trim(this.verificationCode)
        }
        if( !data.verificationCode ){
            dialog.errorMsg('请输入验证码')
            return false
        }
        api.validateRoleBind(data)
            .then(function(res){
                dialog.confirm('绑定成功', function(){
                    window.location.href = '/pc/bind-role-done'
                }, function(){
                    window.location.href = '/pc/bind-role-done'
                })
            })
    }
})

bindRoleValidateVm.$watch('onReady', function(){
    var _this = this
    api.serverList({appId: _this.appId})
        .then(function(res){
            _this.app = res.data.app
            _this.appName = res.data.app.appname
            _this.channelList = res.data.channelList.map(function(v){
                return {
                    val: v.channelNo,
                    text: v.channelName
                }
            })
            _this.serverList = res.data.serverList.map(function(v){
                return {
                    val: v.id,
                    text: v.serverName
                }
            })
        })

    bindRoleValidateVm.$watch('role', function(){
        this.roleName = ''
        this.roleId = ''
    })
})