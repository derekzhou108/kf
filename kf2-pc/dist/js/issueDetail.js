"use strict";var issueDetailVm=avalon.define({$id:"issueDetail",detail:{},id:util.getQueryString("id"),postComment:function(e){var t=this,i=util.getStorage("userInfo"),s=util.getStorage("app");if(i){if(0!==parseInt(t.detail.comment,10))return dialog.errorMsg("您已评论过 /(ㄒoㄒ)/~~");api.comment({pId:s.pId,score:e,sdkUserId:i.user_id,qId:this.id}).then(function(i){t.detail.total++,1===e?(dialog.successMsg("多谢鼓励，我们会再接再励 O(∩_∩)O~"),t.detail.comment=1,t.detail.useful++):(dialog.successMsg("非常抱歉，期待不断成长的我们下次能够帮到您 /(ㄒoㄒ)/~~"),t.detail.comment=-1,t.detail.useless++)},function(e){dialog.errorMsg(e.msg)})}else dialog.errorMsg("请登录后操作")}});issueDetailVm.$watch("onReady",function(){var e=this,t=util.getStorage("userInfo"),i=util.getStorage("app");api.hotQuestionDetail({id:e.id,pId:i.pId,sdkUserId:t&&t.user_id}).then(function(t){e.detail=t.data})});