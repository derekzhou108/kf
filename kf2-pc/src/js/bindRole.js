var bindRoleVm = avalon.define({
    $id: 'bindRole',
    fillServerList: [],
    serverList: [],
    systemList: [{val: 1, text: 'IOS'}, {val: 2, text: '安卓'}],
    platformList: [{val: 1, text: '凯撒官方'}, {val: 2, text: '应用宝'}, {val: 3, text: '其他'}],
    app: '',
    pId: 0,
    system: 0,
    platform: 0,
    guide: '',
    cbSelect: function(data, key){
       this[key] = parseInt(data.value || 0, 10)
       if(key === 'pId'){
           var app = this.serverList.toJSON().filter(function(v){
               return parseInt(v.pId, 10) === parseInt(data.value, 10)
           })
           this.app = app[0]
       }
    },
    openGuide: function(){
        dialog.detail('游戏帐号所属平台问题', this.guide)
    },
    next: function(){
        var appId
        if(this.system === 1){
            appId = this.app.app_list.ios
        }else{
            appId = this.app.app_list.android
        }
        if(this.system === 2 && this.platform !== 1){
            window.location.href = '/pc/bind-role-validate?appId=' + appId
        }else{
            window.location.href = '/pc/bind-role-select?appId=' + appId + '&system=' + this.system
        }
    }
})

bindRoleVm.$watch('onReady', function(){
    var fillServerList = function(list){
        if(!list.length) return []
        return list.map(function(val){
            return {
                val: val.pId,
                text: val.appname
            }
        })
    }

    setTimeout(function(){
        navVm.$watch('apps', function(apps){
            bindRoleVm.serverList = apps
            bindRoleVm.fillServerList = fillServerList(apps)
        })
    }, 0)

    api.guide()
        .then(function(res){
            bindRoleVm.guide = res.data.value
        })
})