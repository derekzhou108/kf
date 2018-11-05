var issueDetailVm = avalon.define({
    $id:'issueDetail',
    detail: {},
    id: util.getQueryString('id'),
    postComment: function(score){
        var _this = this
        var userInfo = util.getStorage('userInfo')
        var app = util.getStorage('app')
        if( !userInfo ){
            dialog.errorMsg('请登录后操作')
        }else{
            if(parseInt(_this.detail.comment, 10) !== 0){
                return dialog.errorMsg('您已评论过 /(ㄒoㄒ)/~~')
            }
            api.comment({ pId: app.pId, score: score, sdkUserId: userInfo.user_id, qId: this.id })
                .then(function(res){
                    _this.detail.total ++
                    if(score === 1){
                        dialog.successMsg('多谢鼓励，我们会再接再励 O(∩_∩)O~')
                        _this.detail.comment = 1
                        _this.detail.useful ++
                    }else{
                        dialog.successMsg('非常抱歉，期待不断成长的我们下次能够帮到您 /(ㄒoㄒ)/~~')
                        _this.detail.comment = -1
                        _this.detail.useless ++
                    }
                }, function(res){
                    dialog.errorMsg(res.msg)
                })
        }
    }
})

issueDetailVm.$watch('onReady',function(){
    var _this = this
    var userInfo = util.getStorage('userInfo')
    var app = util.getStorage('app')
    api.hotQuestionDetail({id: _this.id, pId: app.pId, sdkUserId: userInfo && userInfo.user_id, })
        .then(function(res){
            _this.detail = res.data
        })
})