var accountInfoVm = avalon.define({
    $id: 'accountInfo',
    successCode:10000,
    userInfo:util.getStorage('userInfo') || false,
    userImg:"",
    canChoseDate:1,
    currentModule:"我的资料",
    crumbPath:'/pc/service',
    crumbName:'自助服务',
    accountInfos:{},
    accountInfo:{
        "icon":"../dist/img/default.png",
        "user_name":"",
        "head_img":"",
        "account":"",
        "nickname":"",
        "gender":"",
        "birthday":"",
        "qq":"",
        "education":"",
        "trade":"",
        "income":"",
        "province":"",
        "city":"",
        "gameList":[]
    },
    provinceVal:"",
    provinceList:util.getProvince(),
    cityList:[],
    cityVal:"",
    genderList:[{"text":"男","val":"1"},{"text":"女","val":"2"}],
    cancel:function(){
        window.open("/pc/service","_self")
    },
    provinceSelect:function(data,key){
        let _this = this;
        _this.accountInfo.province = data.value;
        _this.cityList = util.getCity(_this.accountInfo.province);
    },
    citySelect:function(data,key){
        let _this = this;
        _this.accountInfo.city = data.value;
    },
    genderSelect:function(data){
        let _this = this;
        _this.accountInfo.gender = data.value;
    },
    choseDate:function(data){
        console.log(data)
    },
    btnOk:function(){
        let _this = this;
        _this.accountInfo.sdkUserId = _this.userInfo.user_id || ''
        api.editAccountInfo(_this.accountInfo).then((res)=>{
            if(_this.successCode === res.code){
                dialog.successMsg('修改成功！')
            }else{
                dialog.errorMsg(res.msg)
            }
            
        })
    }
})

accountInfoVm.$watch('onReady', function(){
    let _this = this;
    setTimeout(function(){
        if(!_this.userInfo){
            dialog.errorMsg('账号未登录！')
            return;
        }
        api.getAccountInfo({"sdkUserId":_this.userInfo.user_id}).then((res)=>{
            if(_this.successCode === res.code){
                _this.accountInfo = res.data;
                _this.accountInfo.icon =res.data.icon || '../dist/img/default.png';
                _this.canChoseDate = _this.accountInfo.birthday ===""? 1: 0;
                if(_this.accountInfo.province !==''){
                    _this.cityList = util.getCity(_this.accountInfo.province);
                }
            }else{
                dialog.errorMsg(res.msg)
            }
        })
        accountInfoVm.$watch('uploadimgDone',function(res){
            // res = JSON.parse(res)
            if(_this.successCode === res.code){
                if(res.data.url !==''){
                    _this.accountInfo.icon = res.data.url;
                }
                
            }
        })
    },10)

})
