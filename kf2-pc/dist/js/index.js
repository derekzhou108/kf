"use strict";var indexVm=avalon.define({$id:"index",hotList:[],issueList:[],goIssueList:function(t){window.location.href="/pc/issue-list?id="+t.cId+"&text="+encodeURIComponent(t.name)}});indexVm.$watch("onReady",function(){var t=this;setTimeout(function(){navVm.$watch("pId",function(i){api.hot({pId:i,source:"pc"}).then(function(i){t.hotList=i.data})}),navVm.$watch("category",function(i){t.issueList=i,"category"===util.getQueryString("jump")&&setTimeout(function(){$("html,body").animate({scrollTop:$("#category").offset().top},300)},0)})},0)});