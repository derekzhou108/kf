var accountSafeVm = avalon.define({
    $id: 'accountSafe',
    step:0 ,
    successCode:10000,
    userInfo:util.getStorage('userInfo') || false,
    isBindEmail:0,
    isBindPhone:0,
    phoneNum:"",
    emailNum:"",
    certificationNum:"",
    isVerifyRealName:0,
    crumbPath:'/pc/index',
    crumbName:'首页',
    currentModule:'帐号安全',
    goService:function(module,activeModule){
        window.location.href = '/pc/service-module?moduleName=' + encodeURIComponent(module) + '&type=' + activeModule;
    },
    openLink:function() {
        window.location.href = '/pc/real-name';
    }
})

accountSafeVm.$watch('onReady', function(){
    var _this = this;
    api.securityInfo({"sdkUserId":_this.userInfo.user_id}).then((res)=>{
        if(_this.successCode === res.code){
            let email = res.data.email;
            let phone = res.data.phone;
            let certification = res.data.certification;
            _this.emailNum = email.replace(email.substring(4,email.lastIndexOf("@")-2),"****")
            _this.phoneNum = phone.replace(phone.substring(3,8),'*****');
            _this.certificationNum = certification.replace(certification.substring(6,11),'*****');
            _this.isBindEmail = res.data.email ==='' ? 0 : 1;
            _this.isBindPhone = res.data.phone === '' ? 0 : 1;
            _this.isVerifyRealName = res.data.certification === '1' ? 1 :0;
            _this.step = _this.isBindEmail + _this.isBindPhone + _this.isVerifyRealName;
        }else{
            dialog.errorMsg(res.msg)
        }
    })
})
