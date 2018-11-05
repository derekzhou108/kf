/**
 * Created by Administrator on 2017/10/15.
 */
var issueVm = avalon.define({
    $id: 'issue',
    type: parseInt(util.getQueryString('type'), 10),
    serverList: [],
    uploadList: [],
    problemType: ['闪退', '卡机', '掉线', '无法登录', '无法连接', '黑屏', '更新失败','找不到服务器','其他'].map(function(val){ return { val: val, text: val }}),
    problemType2: ['举报问题','申诉问题'].map(function(val){ return { val: val, text: val }}),
    systemType: ['IOS','安卓','其他'].map(function(val){ return { val: val, text: val }}),
    netOperator: ['移动','联通','电信','铁通','教育网','网通','宽带','其他'].map(function(val){ return { val: val, text: val }}),
    netType: ['2G','3G','4G','wifi','其他'].map(function(val){ return { val: val, text: val }}),
    reportType: ['举报外挂','举报工作室','发布虚假消息','发布黄色内容','发布政治言论','辱骂他人','欺诈行为','举报头像','涉嫌赌博','昵称违规','宣传代练','宣传线下交易','宣传代充','其他'].map(function(val){ return { val: val, text: val }}),
    appealType: ['帐号封停','角色禁言','其他'].map(function(val){ return { val: val, text: val }}),
    issue0: {
        appId: util.getStorage('role').appId,
        qType: parseInt(util.getQueryString('type'), 10) + 1,
        channelId: util.getStorage('role') && util.getStorage('role').channelId || '',
        serverName: util.getStorage('role') && util.getStorage('role').serverName || '',
        roleName: util.getStorage('role') && util.getStorage('role').roleName || '',
        roleId: util.getStorage('role') && util.getStorage('role').roleId || '',
        submitRoleId: util.getStorage('role') && util.getStorage('role').roleId || '',
        submitServerId:util.getStorage('role') && util.getStorage('role').serverId || '',
        phone: '',
        money: '',
        time: '',
        desc: ''
    },
    issue1: {
        appId: util.getStorage('role').appId,
        qType: parseInt(util.getQueryString('type'), 10) + 1,
        channelId: util.getStorage('role') && util.getStorage('role').channelId || '',
        serverName: util.getStorage('role') && util.getStorage('role').serverName || '',
        roleName: util.getStorage('role') && util.getStorage('role').roleName || '',
        roleId: util.getStorage('role') && util.getStorage('role').roleId || '',
        submitRoleId: util.getStorage('role') && util.getStorage('role').roleId || '',
        submitServerId:util.getStorage('role') && util.getStorage('role').serverId || '',
        phone: '',
        desc: ''
    },
    issue2: {
        appId: util.getStorage('role').appId,
        qType: parseInt(util.getQueryString('type'), 10) + 1,
        channelId: util.getStorage('role') && util.getStorage('role').channelId || '',
        serverName: util.getStorage('role') && util.getStorage('role').serverName || '',
        roleName: util.getStorage('role') && util.getStorage('role').roleName || '',
        roleId: util.getStorage('role') && util.getStorage('role').roleId || '',
        submitRoleId: util.getStorage('role') && util.getStorage('role').roleId || '',
        submitServerId:util.getStorage('role') && util.getStorage('role').serverId || '',
        phone: '',
        desc: ''
    },
    issue3: {
        appId: util.getStorage('role').appId,
        qType:  parseInt(util.getQueryString('type'), 10) + 1,
        problemType: '',
        systemType: '',
        netOperator: '',
        netType: '',
        time: '',
        briefDesc: '',
        phoneType: '',
        systemVersion: '',
        city: '',
        channelId: util.getStorage('role') && util.getStorage('role').channelId || '',
        serverName: util.getStorage('role') && util.getStorage('role').serverName || '',
        roleName: util.getStorage('role') && util.getStorage('role').roleName || '',
        roleId: util.getStorage('role') && util.getStorage('role').roleId || '',
        submitRoleId: util.getStorage('role') && util.getStorage('role').roleId || '',
        submitServerId:util.getStorage('role') && util.getStorage('role').serverId || '',
        phone: '',
        desc: ''
    },
    issue4: {
        appId: util.getStorage('role').appId,
        qType: parseInt(util.getQueryString('type'), 10) + 1,
        problemType: '举报问题',
        reportType: '',
        complainType: '',
        time: '',
        channelId: util.getStorage('role') && util.getStorage('role').channelId || '',
        serverName: util.getStorage('role') && util.getStorage('role').serverName || '',
        roleName: util.getStorage('role') && util.getStorage('role').roleName || '',
        roleId: util.getStorage('role') && util.getStorage('role').roleId || '',
        submitRoleId: util.getStorage('role') && util.getStorage('role').roleId || '',
        submitServerId:util.getStorage('role') && util.getStorage('role').serverId || '',
        reportedRoleName: '',
        reportedRoleId: '',
        phone: '',
        desc: ''
    },
    issue0err: {
        serverName: false,
        roleName: false,
        money: false,
        time: false,
        phone: false,
        desc: false,
        images: false
    },
    issue1err: {
        serverName: false,
        roleName: false,
        phone: false,
        desc: false,
    },
    issue2err: {
        serverName: false,
        roleName: false,
        phone: false,
        desc: false,
    },
    issue3err: {
        serverName: false,
        roleName: false,
        phone: false,
        desc: false,
    },
    issue4err: {
        serverName: false,
        roleName: false,
        phone: false,
        desc: false,
    },
    cbSelect: function(data, key){
        var keyArr = key.split('.')
        this[keyArr[0]][keyArr[1]] = data.value
        this[keyArr[0] + 'err'][keyArr[1]] = false
    },
    changeType: function(){
        this.issue4.reportType = ''
        this.issue4.complainType = ''
        this.issue4.time = ''
        this.issue4.reportedRoleName = ''
        this.issue4.reportedRoleId = ''
    },
    uploadDel: function(item){
        var _this = this
        dialog.confirm('确认删除吗？', function(){
            _this.uploadList.forEach(function(v, k, arr){
                if(v.imageUrl === item.imageUrl){
                    arr.splice(k, 1)
                }
            })
        })
    },
    openPhotos: function(key){
        var arr = this.uploadList.map(function(v){
            return { "alt": "",  "pid": 0, "src": v.imageUrl , "thumb": v.imageUrl }
        })
        var json = {
            "title": "",
            "id": this.$id,
            "start": key,
            "data": arr
        }
        layer.photos({
            photos: json,
            anim: 5
        })
    },
    submit: function(){
        var _this = this
        var type = this.type
        var data = this['issue' + type].$model
        data.images = this.uploadList.toJSON()
        data.sdkUserId = util.getStorage('userInfo').user_id
        if(data.time){
            data.time = new Date( data.time.replace(/\-/g,'/') ).getTime() / 1000
        }
       if( data.serverName !== undefined && $.trim(data.serverName) === '' ){
           this['issue' + type + 'err'].serverName = true
       }
       if( data.roleName !== undefined && $.trim(data.roleName) === '' ){
           this['issue' + type + 'err'].roleName = true
       }
        if( data.money !== undefined && $.trim(data.money) === '' && type === 0){
            this['issue' + type + 'err'].money = true
        }
        if( data.time !== undefined && $.trim(data.time) === '' && type === 0){
            this['issue' + type + 'err'].time = true
        }
        if( !!$.trim(data.phone) && !util.isPhone( $.trim(data.phone) )){
            this['issue' + type + 'err'].phone = true
        }
        if( $.trim(data.desc).length < 6 ){
            this['issue' + type + 'err'].desc = true
        }
        if( !data.images.length && type === 0 ){
            this['issue' + type + 'err'].images = true
        }
        var error = this['issue' + type + 'err'].$model
        for(var key in error){
            if(error[key]){
                return false
            }
        }

        switch (type){
            case 0:
                api.postRecharge(data)
                    .then(function(res){
                        if(res.code === 10000){
                            _this.submitSuccess()
                        }else{
                            dialog.errorMsg(res.msg)
                        }
                    })
                break
            case 1:
                api.postBug(data)
                    .then(function(res){
                        if(res.code === 10000){
                            _this.submitSuccess()
                        }else{
                            dialog.errorMsg(res.msg)
                        }
                    })
                break
            case 2:
                api.postSuggest(data)
                    .then(function(res){
                        if(res.code === 10000){
                            _this.submitSuccess()
                        }else{
                            dialog.errorMsg(res.msg)
                        }
                    })
                break
            case 3:
                api.postNetwork(data)
                    .then(function(res){
                        if(res.code === 10000){
                            _this.submitSuccess()
                        }else{
                            dialog.errorMsg(res.msg)
                        }
                    })
                break
            case 4:
                api.postReport(data)
                    .then(function(res){
                        if(res.code === 10000){
                            _this.submitSuccess()
                        }else{
                            dialog.errorMsg(res.msg)
                        }
                    })
                break
        }
    },
    submitSuccess: function(){
        dialog.successMsg('提交成功，请等候GM消息！')
        setTimeout(function(){
            window.location.href = '/pc/issue-table'
        }, 2000)
    }
})

issueVm.$watch('onReady', function(){
    var _this = this
    var appId = util.getStorage('role').appId
    api.serverList({appId: appId})
        .then(function(res){
            _this.serverList = res.data.serverList.map(function(v){
                return {
                    val: v.serverName,
                    text: v.serverName
                }
            })
        })


    issueVm.$watch('issue4.problemType', function(){
        this.changeType()
    })

    issueVm.$watch('upload', function(v){
        this.uploadList.push(v)
    })

    issueVm.$watch('uploadList', function(v){
        if(v.length){
            this.issue0err.images = false
        }
    })

})
