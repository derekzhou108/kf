var serviceVm = avalon.define({
    $id: 'service',
    userInfo: util.getStorage('userInfo') || false,
    activeIndex:0,
    activeModule:-1,
    crumbPath:'/pc/index',
    crumbName:'首页',
    currentModule:'自助服务',
    selectModule:function(module,activeModule,needLogin){
        if(needLogin){
            if(this.userInfo){
                serviceVm.showSubModule = true;
                serviceVm.crumbPath = '/pc/service';
                serviceVm.crumbName = '自助服务';
                serviceVm.currentModule = module;
                serviceVm.activeModule = activeModule;
                if(module === '绑定手机'){
                    api.isBindPhone({"sdkUserId":this.userInfo.user_id}).then((res)=>{
                        if(res.code === 10000){
                            window.location.href = '/pc/service-module?moduleName=' + encodeURIComponent(module) + '&type=' + activeModule;
                        }else{
                            dialog.errorMsg(res.msg)
                        }
                    })
                }else if(module === '绑定邮箱'){
                    api.isBindEmail({"sdkUserId":this.userInfo.user_id}).then((res)=>{
                        if(res.code === 10000){
                            window.location.href = '/pc/service-module?moduleName=' + encodeURIComponent(module) + '&type=' + activeModule;
                        }else{
                            dialog.errorMsg(res.msg)
                        }
                    })
                }else{
                    window.location.href = '/pc/service-module?moduleName=' + encodeURIComponent(module) + '&type=' + activeModule;
                }
            }else{
                account.login()
            }
        }else{
            serviceVm.showSubModule = true;
            serviceVm.crumbPath = '/pc/service';
            serviceVm.crumbName = '自助服务';
            serviceVm.currentModule = module;
            serviceVm.activeModule = activeModule;
            window.location.href = '/pc/service-module?moduleName=' + encodeURIComponent(module) + '&type=' + activeModule;
        }

    },
    openLink:function(path,type){
        if(this.userInfo){
            window.open(path,type);
        }else{
            account.login()
        }
    }
})

serviceVm.$watch('onReady', function(){
    var _this = this;
    if(util.getQueryString('type')){
        _this.activeIndex = util.getQueryString('type');
    }
})