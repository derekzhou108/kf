let serviceModuleVm = avalon.define({
    $id: 'service',
    time:60,
    successCode:10000,
    app:util.getStorage('app') || false,
    userInfo:util.getStorage('userInfo') || false,
    pId:util.getStorage('app') && util.getStorage('app').pId || '',
    activeModule:-1,
    activeDay:1,
    verifiCode:'',
    crumbPath:'/pc/service',
    crumbName:'自助服务',
    count: 0,//总数
    limit:8,//每页显示数
    curr:1,//当前页
    currentModule:'',
    unbindPhoneInfo:{
        "step":1,//解绑手机进度
        "phoneNum":"",
        "verifyCode":""
    },
    bindEmailInfo:{
        "emailError":false,
        "emailCodeError":false,
        "emailCode":"",
        "emailAddress":"",
        "showEmailAddress":"",
        "step":1,
        "bindEmailPro":"icon-1",//绑定邮箱
        "btnText":"下一步",
        "errorText":"邮箱地址不能为空！"
    },
    unbindEmailInfo:{
        "emailError":false,
        "emailCodeError":false,
        "emailCode":"",
        "emailAddress":"",
        "step":1,
        "unbindEmailPro":"icon-1",//绑定邮箱
        "btnText":"继续"
    },
    findPwInfo:{
        "bindInfo":'',
        "account":'',
        "selected":3,
        "step":1,
        "verificationCode":"",//验证码
        "labelName":"当前绑定的手机",
        "newPWD":"",
        "newPWDAffirm":"",
        verifiCode:'',
        accountError:false,
        codeError:false
    },
    bindPhoneInfo:{
        "step":1,
        "phoneNum":"",
        "verificationCode":""
    },
    changePwInfo:{
        "step":1,
        "oldPWD":"",
        "newPWD":"",
        "newPWDAffirm":""
    },
    findAccountBackInfo:{
        "phoneNum":'',
        "code":'',
        "step":1,
        "accountNum":''
    },
    accountChannel:{
        step:1,
        accountChannelName:'',
        codeError:false,
        roleNameError:false,
        roleName:'',
        roleID:''
    },
    verificationCode:util.randomVerificationCode(6),
    gameList:[],
    serverList:[],
    serverListData:[],
    gameKey:'',
    serverKey:'',
    tableData:{
        headList:['游戏','服务器','角色名','角色ID','等级'],
        tableList:[]
    },
    rechargeTable:{
        headList:['游戏','服务器','角色名','充值金额','充值时间','状态'],
        tableList:[]
    },
    selectServer(data, key){
        let _this = this;
        _this.serverKey = data.value;
    },
    selectGame(data, key){
        let _this = this;
        _this.gameKey = data.value;        
        _this.serverListData.forEach((v,i)=>{
            if(v.appid === _this.gameKey){
                _this.serverList = v.serverList.map((v,i)=>{
                    return {val:v.id,text:v.serverName}
                })
            }
        })
    },
    searchRoleList:function(){
        let _this = this,
        appid = _this.gameKey||"";
        if(_this.userInfo){
            if(appid !==''){
                _this.fetchRoleList({"appId":appid,"sdkUserId":_this.userInfo.user_id});
            }else{
                dialog.errorMsg('请先选择要查询的游戏！')
            }
        }else{
            account.login();
        }
    },
    nextStep(){
        let _this = this;
        if(_this.bindEmailInfo.emailAddress !=="" && _this.bindEmailInfo.step===1 ){
            if(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(_this.bindEmailInfo.emailAddress)){
                api.isExitsEmail({email:_this.bindEmailInfo.emailAddress}).then((res)=>{
                    if(res.code === 10000){
                        let str = _this.bindEmailInfo.emailAddress;
                        _this.bindEmailInfo.showEmailAddress = str.replace(str.substring(4,str.lastIndexOf("@")-2),"****");
                        _this.bindEmailInfo.step++;
                    }else{
                        _this.bindEmailInfo.errorText =res.msg
                        _this.bindEmailInfo.emailError = true;
                    }
                })
            }else{
                _this.bindEmailInfo.errorText ="邮箱格式不正确！"
                _this.bindEmailInfo.emailError = true;
            }
            return;
        }else{
            _this.bindEmailInfo.emailError = true;
        }
        if(_this.bindEmailInfo.emailAddress !=="" &&_this.bindEmailInfo.emailCode !=="" && _this.bindEmailInfo.step===2){
            let dataJson={
                "sdkUserId":_this.userInfo.user_id,
                "email":_this.bindEmailInfo.emailAddress,
                "code":_this.bindEmailInfo.emailCode
            }
            api.bindEmail(dataJson).then((res)=>{
                if(_this.successCode === res.code ){
                    _this.bindEmailInfo.step++;
                }else{
                    dialog.errorMsg(res.msg)
                }
            })
        }else{
            _this.bindEmailInfo.emailCodeError = true;
        }
    },
    nextStepUPH(){
        let _this = this;
        if(_this.unbindPhoneInfo.step===1){
            api.getBindInfo().then((res)=>{
                if(_this.successCode === res.code){
                    if(res.data.phoneNum !==''){
                        _this.unbindPhoneInfo.phoneNum = res.data.phoneNum;
                        _this.unbindPhoneInfo.step++;
                    }else{
                        dialog.message('温馨提示','该帐号还未绑定过手机！')
                    }
                }
            })
            return;
        }
        if(_this.unbindPhoneInfo.verifyCode !=="" && _this.unbindPhoneInfo.step===2){
            _this.unbindPhoneInfo.step++;
        }else{
            // _this.unbindPhoneInfo.emailCodeError = true;
        }
    },
    nextStepUBE:function(){
        let _this = this;
        if(_this.unbindEmailInfo.step===1 ){
            _this.unbindEmailInfo.step++;
            return;
        }
        if(_this.unbindEmailInfo.emailCode !=="" && _this.unbindEmailInfo.step===2){
            _this.unbindEmailInfo.step++;
        }else{
            _this.unbindEmailInfo.emailCodeError = true;
        }
    },
    /**
     * 找回密码
     */
    nextStepFPW:function(){
        let _this = this;
        if(_this.findPwInfo.step ===1){
            if(_this.findPwInfo.selected ===3){
                _this.findPwInfo.labelName = "当前绑定的手机";
            }else{
                _this.findPwInfo.labelName = "当前绑定的邮箱";
            }
            if(_this.findPwInfo.account ===''){
                _this.findPwInfo.accountError =true;
                return;
            }
            if(_this.findPwInfo.verifiCode.toLocaleLowerCase() !== _this.verificationCode.toLocaleLowerCase()){
                _this.findPwInfo.codeError =true;
                return;
            }
            api.getBindInfoByAccount({user_name:_this.findPwInfo.account,type:_this.findPwInfo.selected}).then((res)=>{
                if(res.code === 10000){
                    _this.findPwInfo.bindInfo = res.data.content
                    _this.findPwInfo.step++;
                }else{
                    dialog.errorMsg(res.msg)
                }
            })
        }else if(_this.findPwInfo.step === 2){
            if(_this.findPwInfo.verificationCode !==''){
                api.checkFindPWDCode({user_name:_this.findPwInfo.account,type:_this.findPwInfo.selected,code:_this.findPwInfo.verificationCode}).then((res)=>{
                    if(res.code === 10000){
                        _this.findPwInfo.step++;
                    }else{
                        dialog.errorMsg(res.msg)
                    }
                })
            }else{
                dialog.errorMsg('验证码不能为空！')
            }
        }else if(_this.findPwInfo.step === 3){
            if(_this.findPwInfo.newPWD ==='' || _this.findPwInfo.newPWDAffirm ===''){
                dialog.errorMsg('密码不能为空！');
                return;
            }
            if(_this.findPwInfo.newPWD !== _this.findPwInfo.newPWDAffirm){
                dialog.errorMsg('密码不一致');
                return;
            }
            if(!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,18}$/.test(_this.findPwInfo.newPWD)){
                dialog.errorMsg('密码格式不正确！');
                return;
            }
            api.setNewPw({user_name:_this.findPwInfo.account,password:_this.findPwInfo.newPWD}).then((res)=>{
                if(res.code === 10000){
                    _this.findPwInfo.step++;
                }else{
                    dialog.errorMsg(res.msg)
                }
            })
            
        }
    },
    /**
     * 修改密码
     */
    nextStepCPW:function(){
        let _this = this;
        if(_this.changePwInfo.step ===1){
            if(_this.changePwInfo.oldPWD ==='' || _this.changePwInfo.newPWD ==='' || _this.changePwInfo.newPWDAffirm ===''){
                dialog.errorMsg('密码不能为空！');
                return;
            }
            if(_this.changePwInfo.newPWD !== _this.changePwInfo.newPWDAffirm){
                dialog.errorMsg('新密码不一致');
                return;
            }
            if(!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,18}$/.test(_this.changePwInfo.newPWD)){
                dialog.errorMsg('密码格式不正确！');
                return;
            }
            api.changePWD({sdkUserId:_this.userInfo.user_id,old_password:_this.changePwInfo.oldPWD,new_password:_this.changePwInfo.newPWD}).then((res)=>{
                if(res.code === 10000){
                    _this.changePwInfo.step++;
                }else{
                    dialog.errorMsg(res.msg)
                }
            })
        }
    },
    //获取找回帐号的验证码
    sendFindAccountCode:function(e,phone){
        let that = this;
        let event = window.event || e,srcElement = event.srcElement;
        if (!srcElement) {
            srcElement = event.target;
        }
        if(!phone){
            dialog.errorMsg('请输入手机号码');
            return;
        }
        if(!(/^1(3|4|5|7|8)\d{9}$/.test(phone))){
            dialog.errorMsg('手机号码格式不正确');
            return;
        }

        api.getAccountCode({phone: phone})
            .then(function(res){
                if(res.code === 10000){
                    that.countDown(srcElement);
                }else{
                    dialog.errorMsg(res.msg);
                }
            });
    },
    //找回帐号
    findAccountBack:function(){
        let _this = this;
        if(_this.findAccountBackInfo.code ===''){
            dialog.errorMsg('验证码不能为空！');
            return;
        }
        api.getUserAccount({phone:_this.findAccountBackInfo.phoneNum,code:_this.findAccountBackInfo.code}).then((res)=>{
            if(res.code === 10000){
                _this.findAccountBackInfo.accountNum = res.data.account;
                _this.findAccountBackInfo.step++;
            }else{
                dialog.errorMsg(res.msg);
            }
        })

    },
    bindPhone:function(){
        let _this = this;
        if(_this.bindPhoneInfo.phoneNum!=='' && _this.bindPhoneInfo.verificationCode !==''){
            api.bindPhone({"sdkUserId":_this.userInfo.user_id,"phone":_this.bindPhoneInfo.phoneNum,"code":_this.bindPhoneInfo.verificationCode})
            .then((res)=>{
                if(_this.successCode === res.code){
                    _this.bindPhoneInfo.step = 2;
                }else{
                    dialog.errorMsg(res.msg)
                }
            })
            
        }
    },
    changeVerifcateCode:function(){
        serviceModuleVm.verificationCode = util.randomVerificationCode(6);
    },
    jump: function(obj){
        let _this = this;
        _this.fetchRechargDatail(_this.activeDay,obj.curr,10);
    },
    fetchRechargDatail:function(activeItem,pageIdx,pageSize){
        let _this = this;
        _this.activeDay = activeItem;
        _this.limit = pageSize;
        _this.curr = pageIdx;
        if(_this.userInfo){
            let jsonData ={
                "pId":_this.app.pId || '',
                "pageIdx":pageIdx,
                "pageSize":pageSize,
                "sdkUserId":_this.userInfo.user_id,
                "activeDay":_this.activeDay
            }
            api.queryRechargeDetail(jsonData).then((res)=>{
                if(_this.successCode === res.code){
                    _this.rechargeTable.tableList = res.data;
                    _this.count =res.total;
                    _this.limit = pageSize;
                }else{
                    _this.rechargeTable.tableList = [];
                    _this.count =res.total || 0;
                    dialog.errorMsg(res.msg);
                }
                

            })
        }

    },
    queryAccountChannel:function(){
        let _this = this;
        if(_this.verifiCode.toLocaleLowerCase() === _this.verificationCode.toLocaleLowerCase()){
            
            let dataJson ={
                appId:_this.gameKey,
                serverId:_this.serverKey,
                roleId:_this.accountChannel.roleID
            }
            let dataJson2 ={
                appId:_this.gameKey,
                serverId:_this.serverKey,
                roleName:_this.accountChannel.roleName
            }

            let requestData = _this.accountChannel.roleName === '' ? dataJson : dataJson2;
            if(_this.accountChannel.roleName ==='' && _this.accountChannel.roleID ===''){
                dialog.errorMsg("角色名和角色ID需任意填写一项！");
                return;
            }
            api.queryRoleChannel(requestData).then((res)=>{
                if(res.code === 10000){
                    _this.accountChannel.accountChannelName = res.data.channelName;
                    _this.accountChannel.step++;
                }else{
                    dialog.errorMsg(res.msg)
                }
                
            })
        }else{
            _this.accountChannel.codeError = true;
        }
    },
    cancel:function(){
        window.open("/pc/service","_self")
    },
    countDown: function(e){
        let that = this;
        let time = that.time;
        e.innerHTML = that.time + 's';
        e.disabled = true;
        let timer = setInterval(function(){
            if(that.time == 0){
                clearInterval(timer);
                e.innerHTML = '免费获取验证码';
                e.disabled = false;
                that.time = time;
            }else{
                that.time--;
                e.innerHTML = that.time + 's';
            }
        },1000)
    },
    sendCode: function(e,phone,type){
        let that = this;
        let event = window.event || e,srcElement = event.srcElement;
        if (!srcElement) {
            srcElement = event.target;
        }
        if(type===1){
            if(!phone){
                dialog.errorMsg('请输入手机号码');
                return;
            }
            if(!(/^1(3|4|5|7|8)\d{9}$/.test(phone))){
                dialog.errorMsg('手机号码格式不正确');
                return;
            }
        }

        api.getSendCode({"sdkUserId":this.userInfo.user_id,content: phone,type:type})
            .then(function(res){
                if(res.code === 10000){
                    that.countDown(srcElement);
                }else{
                    dialog.errorMsg(res.msg);
                }
            });
    },
    sendFindPWCode:function(e,account,type){
        let that = this;
        let event = window.event || e,srcElement = event.srcElement;
        if (!srcElement) {
            srcElement = event.target;
        }
        api.getFindPWCode({user_name:account,type:type}).then((res)=>{
            if(res.code === 10000){
                that.countDown(srcElement);
            }else{
                dialog.errorMsg(res.msg);
            }
            
        })
    },
    /**
     * 查询全服角色
     */
    fetchRoleList:function(data){
        let _this = this;
        api.roleList(data).then((res)=>{
            if(_this.successCode === res.code){
                _this.tableData.tableList = res.data
            }else{
                dialog.errorMsg(res.msg);
                _this.tableData.tableList = [];
            }
        })
    }
})

serviceModuleVm.$watch('onReady', function(){
    let _this = this;
    setTimeout(function(){
        if(util.getQueryString('moduleName')){
            _this.currentModule = util.getQueryString('moduleName');
        }
        if(util.getQueryString('type')){
            _this.activeModule = util.getQueryString('type');
            if(parseInt(_this.activeModule) === 8){
                _this.fetchRechargDatail(_this.activeDay,1,10);
                return;
            }
            if(parseInt(_this.activeModule) === 9 ){
                api.gameSeverList({pId:_this.pId}).then((res)=>{
                    if(res.code === 10000){
                        _this.serverListData = res.data;
                        _this.gameList = res.data.map((v,i)=>{
                            return {val:v.appid,text:v.app_name}
                        })
                    }else{
                        dialog.errorMsg(res.msg);
                    }
    
                })
            }
            if(parseInt(_this.activeModule) ===10){
                _this.verificationCode = util.randomVerificationCode(6);
                api.gameSeverList({pId:_this.pId}).then((res)=>{
                    _this.serverListData = res.data;
                    // _this.gameKey = res.data[0].appid;
                    _this.gameList = res.data.map((v,i)=>{
                        return {val:v.appid,text:v.app_name,server_list:v.serverList}
                    })
                })
            }
        }
    },10)

})