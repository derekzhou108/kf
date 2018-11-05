var bindRoleSelectVm = avalon.define({
    $id: 'bindRoleSelect',
    list: [],
    icon: '',
    item: '',
    selected: function(key, item){
        var _this = this
        this.list.forEach(function(v, k, arr){
            if(key === k){
                arr[k].selected = 1
                _this.item = item
            }else{
                arr[k].selected = 0
            }
        })
    },
    bindRole: function(){
        var _this = this
        if( !this.item ){
           dialog.errorMsg('请选择未绑定的游戏角色')
           return false
        }
        var appId = util.getQueryString('appId')
        var system = util.getQueryString('system')
        var sdkUserId = util.getStorage('userInfo').user_id
        var token = util.getStorage('userInfo').token
        api.check({loginAppId: appId, sdkUserId: sdkUserId, token: token})
            .then(function(res){
                var data = {
                    appId: appId,
                    platform: system,
                    serverId: _this.item.serverId,
                    roleId: _this.item.roleId,
                    roleType: _this.item.roleType,
                    roleName: _this.item.roleName,
                    sdkUserId: sdkUserId
                }
                api.sdkBindRole(data)
                    .then(function(res){
                        dialog.successMsg('绑定成功！')
                        setTimeout(function(){
                            util.reload()
                        }, 2000)
                    })
            })

    }
})

bindRoleSelectVm.$watch('onReady', function(){
    var _this = this
    var appId = util.getQueryString('appId')
    var system = util.getQueryString('system')
    var userInfo = util.getStorage('userInfo')

    api.serverList({appId: appId})
        .then(function(res){
            _this.icon = res.data.app.icon
        })
    if(appId && userInfo){
        api.sdkGameRoles({appId: appId, sdkUserId: userInfo.user_id, platform: system})
            .then(function(res){
                if(res.code === 10000){
                    _this.list = res.data.map(function(v){
                        v.selected = 0
                        return v
                    })
                }else{
                    dialog.errorMsg(res.msg)
                }

            })
    }
})