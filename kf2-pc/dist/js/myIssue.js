"use strict";var myIssueVm=avalon.define({$id:"myIssue",issueList:{},toEvaluation:function(){var t=this.issueList;window.location.href="/pc/evaluate?id="+t.id+"&role_id="+t.role_id+"&appId="+t.app_id},setStarView:function(t){var a=t.satisfied_state,i="icon-star-unselect",e="";i=a>0&&a<3?"icon-star-gray":a>2&&a<5?"icon-star-selected":"icon-star-great";for(var s=0;s<5;s++)e+=s<a?'<span class="star-item '+i+'"></span>':'<span class="star-item icon-star-unselect"></span>';return e}});myIssueVm.$watch("onReady",function(){var t=this,a=util.getQueryString("id");setTimeout(function(){navVm.$watch("pId",function(i){api.questionDetail({pId:i,id:a}).then(function(a){a.data.hasEvaluated=util.isEmpty(a.data.evaluation),a.data.hasEvaluated||(a.data.starView=t.setStarView(a.data.evaluation)),a.data.start_time=util.formDate(a.data.submit_time),a.data.last_reply_time=util.formDate(a.data.last_reply_time),t.issueList=a.data})})},0)});