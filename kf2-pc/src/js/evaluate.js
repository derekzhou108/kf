var evaluateVm = avalon.define({
    $id:'myEvaluate',
    appId:"",
    selectedNum:5,
    evaluationDescs:[],
    hoverNum:0,
    finalNum:5,//最终选择的星星数
    isSelected:1,//默认选中已解决
    starChange:function(e){
        var self = this;
        var currentTarget = e.currentTarget,
            $this = $(currentTarget),
            currentIndex = $this.data("index");
        var starList = $(".star-item");
        $.each(starList,function(index,item){
            $(item).removeClass("icon-star-selected");
            $(item).removeClass("icon-star-great");
            $(item).addClass("icon-star-unselect");
        })
        self.selectedNum = currentIndex;
        if(currentIndex <3){
            // $(".list-issue-ques").show();
            for(var i=0;i<currentIndex;i++){
                $(starList[i]).removeClass("icon-star-unselect");
                $(starList[i]).removeClass("icon-star-great");
                $(starList[i]).removeClass("icon-star-selected");
                $(starList[i]).addClass("icon-star-gray");
            }
        }else if(currentIndex >2 && currentIndex <5){
            for(var i=0;i<currentIndex;i++){
                $(starList[i]).removeClass("icon-star-unselect");
                $(starList[i]).removeClass("icon-star-great");
                $(starList[i]).removeClass("icon-star-gray");
                $(starList[i]).addClass("icon-star-selected");
            }
        }else if(currentIndex === 5){
            // $(".list-issue-ques").hide();
            $(".star-item").removeClass("icon-star-unselect")
            $(".star-item").removeClass("icon-star-selected")
            $(".star-item").addClass("icon-star-great")
        }
    },
    starSelected:function(e){
        var self = this;
        var currentTarget = e.target,
            $this = $(currentTarget),
            currentIndex = $this.data("index");
        self.finalNum = currentIndex;
        if(currentIndex ===5){
            $(".list-issue-ques").hide();
        }else {
            $(".list-issue-ques").show();
        }
    },
    starOff:function(){
        var self = this;
        var starList = $(".star-item");
        self.selectedNum = self.finalNum;
        $.each(starList,function(index,item){
            $(item).removeClass("icon-star-selected");
            $(item).removeClass("icon-star-great");
            $(item).addClass("icon-star-unselect");
        })
        if(self.finalNum <3){
            // $(".list-issue-ques").show();
            for(var i=0;i<self.selectedNum;i++){
                $(starList[i]).removeClass("icon-star-unselect");
                $(starList[i]).removeClass("icon-star-great");
                $(starList[i]).removeClass("icon-star-selected");
                $(starList[i]).addClass("icon-star-gray");
            }
        }else if(self.finalNum >2 && self.finalNum <5){
            for(var i=0;i<self.selectedNum;i++){
                $(starList[i]).removeClass("icon-star-unselect");
                $(starList[i]).removeClass("icon-star-great");
                $(starList[i]).removeClass("icon-star-gray");
                $(starList[i]).addClass("icon-star-selected");
            }
        }else{
            for(var i=0;i<self.selectedNum;i++){
                $(starList[i]).removeClass("icon-star-unselect");
                $(starList[i]).removeClass("icon-star-gray");
                $(starList[i]).removeClass("icon-star-selected");
                $(starList[i]).addClass("icon-star-great");
            }
        }
    },
    selectProTag:function(){
        var self = this;
        var currentTarget = event.target,
            $this = $(currentTarget);
        $this.toggleClass("active")
    },
    submit:function(){
        var self = this,
            hasTag = $(".tag-item").length > 0,
            selectedTags = [],
            suggestTxt ="",
            tagList = $(".tag-item");
        if(hasTag){
            $.each(tagList,function(index,item){
                var activeItem = $(item).hasClass("active"),
                    activeVal ='';
                if(activeItem){
                    activeVal = $(item).text();
                    selectedTags.push(activeVal)
                }
            })
        }
        suggestTxt = $(".suggestTxt").val();
        var issueId = util.getQueryString("id"),
            role_id = util.getQueryString("role_id"),
            appId = util.getQueryString('appId'),
            formData = {
            id:issueId,
            roleId:role_id,
            appId:appId,
            solved_state:self.isSelected,
            evaluation_desc:selectedTags,
            satisfied_state:self.finalNum,
            description:suggestTxt
        }

        api.submitEvaluation(formData)
            .then(function(res){
                dialog.successMsg(res.msg)
                setTimeout(function(){
                    window.location.href = '/pc/my-issue?id=' + issueId
                }, 2000)
            }, function(res){
                dialog.errorMsg(res.msg)
            })
    }
})

evaluateVm.$watch('onReady', function(){
    var _this = this
    api.evaluationSetting().then(function(res){
        _this.evaluationDescs = res.data.evaluation_descs;
    })

})