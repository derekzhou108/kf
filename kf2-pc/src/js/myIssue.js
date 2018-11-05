var myIssueVm = avalon.define({
    $id:'myIssue',
    issueList:{},
    toEvaluation:function(){
        var issueList = this.issueList
        window.location.href = '/pc/evaluate?id=' + issueList.id + '&role_id=' + issueList.role_id + '&appId=' + issueList.app_id
    },
    setStarView:function(option){
        var self = this,
            starNum = option.satisfied_state,
            star_icon = 'icon-star-unselect',
            html ='';
        if(starNum>0&&starNum<3){
            star_icon = 'icon-star-gray';
        }else if(starNum>2&&starNum<5){
            star_icon = 'icon-star-selected';
        }else {
            star_icon = 'icon-star-great';
        }
        for(var j=0;j<5;j++){
            if(j<starNum){
                html += '<span class="star-item '+star_icon+'"></span>'
            }else {
                html += '<span class="star-item icon-star-unselect"></span>'
            }
        }
        return html;
    }

})

myIssueVm.$watch('onReady',function(){
    var self = this;
    var issueId = util.getQueryString("id");
    setTimeout(function(){
        navVm.$watch('pId',function(v){
            api.questionDetail({pId:v,id:issueId}).then(function(res){
                    res.data.hasEvaluated = util.isEmpty(res.data.evaluation);
                    if(!res.data.hasEvaluated){
                        res.data.starView = self.setStarView(res.data.evaluation);
                    }
                    res.data.start_time = util.formDate(res.data.submit_time);
                    res.data.last_reply_time = util.formDate(res.data.last_reply_time);
                    self.issueList = res.data;
            })
        })
    },0)
})