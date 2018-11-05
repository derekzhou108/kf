var bindRoleDoneVm = avalon.define({
    $id: 'bindRoleDone',
    list: [],
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
    unBind: function(){
        var _this = this
        dialog.confirm('确定要解除角色<span style="color:#F87643;margin:0 5px;">"'+ _this.item.roleName +'" </span>的绑定吗？', function(){
           var userInfo = util.getStorage('userInfo')
           var data = {
               appId: _this.item.appId,
               sdkUserId: userInfo.user_id,
               serverId: _this.item.serverId,
               id: _this.item._id
           }
           api.roleUnbind(data)
               .then(function(res){
                   var role = util.getStorage('role')
                   if(role && (role.roleId === _this.item.roleId)){
                        util.removeStorage('role')
                   }
                   util.reload()
               })
       })
    },
    goIssue: function(){
        util.setStorage('role', this.item.$model)
        var to = util.getQueryString('to')
        if(to){
            window.location.href = '/pc/issue?type=' + to
        }else{
            window.location.href = '/pc/select-issue'
        }
    },
    goBind: function(){
        window.location.href = '/pc/bind-role'
    },
})

bindRoleDoneVm.$watch('onReady', function(){
    var _this = this
    var userInfo = util.getStorage('userInfo')

    if(userInfo){
        api.rolesList({sdkUserId: userInfo.user_id})
            .then(function(res){
                if(res.code === 10000){
                    _this.list = res.data.map(function(v){
                        v.selected = 0
                        return v
                    })
                }else{
                    dialog.errorMsg(res.msg);
                }

            })
    }
})