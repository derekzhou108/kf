var realNameVm = avalon.define({
    $id: 'realName',
    step:1,
    user_id:util.getStorage('userInfo').user_id || false,
    userInfo: util.getStorage('userInfo') || false,
    successCode:10000,
    activeIndex:0,
    activeModule:-1,
    crumbPath:'/pc/index',
    crumbName:'首页',
    currentModule:'帐号安全',
    realNameInfo:{
        "step":1,
        "loginPW":"",
        "identityNum":"",
        "identityNumAgain":"",
        "realName":"",
        "identityErrorText":"身份证号码不能为空！"
    },
    error:{
        "loginPW":false,
        "identityNum":false,
        "identityNumAgain":false,
        "realName":false
    },
    goService:function(module,activeModule){
        window.location.href = '/pc/service-module?moduleName=' + encodeURIComponent(module) + '&type=' + activeModule;
    },
    nextStep:function(){
        let _this = this;
        if(_this.realNameInfo.step === 1){
            if(_this.realNameInfo.loginPW !==''){
                api.checkPW({"sdkUserId":_this.userInfo.user_id,"password":_this.realNameInfo.loginPW}).then((res)=>{
                    if(_this.successCode === res.code){
                        _this.realNameInfo.step++;
                    }else{
                        // dialog.message("温馨提示",res.msg)
                        dialog.errorMsg(res.msg)
                    }
                })
            }else{
                _this.error.loginPW = true;
            }

        }else if(_this.realNameInfo.step === 2){
            if(_this.realNameInfo.identityNum !=='' && _this.realNameInfo.identityNumAgain !=='' && _this.realNameInfo.realName !==''){
                if(_this.realNameInfo.identityNum !== _this.realNameInfo.identityNumAgain){
                    _this.realNameInfo.identityErrorText ='身份证号码不一致！'
                    _this.error.identityNumAgain = true;
                    return;
                }
                api.bindRealName({"sdkUserId":_this.userInfo.user_id,"card_id":_this.realNameInfo.identityNum,"real_name":_this.realNameInfo.realName}).then((res)=>{
                    if(_this.successCode ===res.code){
                        _this.realNameInfo.identityNum = _this.realNameInfo.identityNum.replace(_this.realNameInfo.identityNum.substring(6,11),'*****');
                        _this.realNameInfo.step++;
                    }else{
                        dialog.errorMsg(res.msg)
                    }
                })
            }else{
                if(_this.realNameInfo.identityNum ===''){
                    _this.error.identityNum = true;
                }
                if(_this.realNameInfo.identityNumAgain ===''){
                    _this.error.identityNumAgain = true;
                }
                if(_this.realNameInfo.realName ===''){
                    _this.error.realName = true;
                }
            }
            
        }
    },
    cancel:function(){
        window.location.href = '/pc/account-safe'
    }
})

realNameVm.$watch('onReady', function(){
    var _this = this;
    
})