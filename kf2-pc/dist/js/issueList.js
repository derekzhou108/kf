"use strict";var issueListVm=avalon.define({$id:"issueList",id:decodeURIComponent(util.getQueryString("id")),search:decodeURIComponent(util.getQueryString("search")),text:util.getQueryString("text")&&decodeURIComponent(util.getQueryString("text"))||"问题列表",list:[],count:0,jump:function(t){this.loadList(t.curr-1)},loadList:function(t){var e=this;if("undefined"!==e.search){var i={pId:util.getStorage("app").pId,content:this.search,pageIdx:t||0,source:"pc"};api.search(i).then(function(t){e.list=t.data,e.count=t.total})}if("undefined"!==e.id){var n={pId:util.getStorage("app").pId,cId:this.id,pageIdx:t||0,source:"pc"};api.hot(n).then(function(t){e.list=t.data,e.count=t.total})}}});issueListVm.$watch("onReady",function(){this.loadList()});