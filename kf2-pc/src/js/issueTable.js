var tableVm = avalon.define({
    $id: "issueTable",
    // showPagination: false,//是否显示分页
    pageNum:3,//每页显示多少条数据
    paginationNum:0,//多少页
    activePage:1,//当前页
    maxLen:5,//最大显示多少分页按钮
    showMore:false,
    startPage:1,
    pId:"",
    userInfo:"",
    tableData:{
        headList:["游戏","单号","问题详情","答复状态","提单时间","回复时间","评价状态"],
    },
    dataList:[],
    newDataList:[],
    count: 0,//总数
    limit:10,//每页显示数
    jump: function(obj){
        var self = this;
        // self.newDataList = util.splitArrs(self.dataList,self.limit,obj.curr)
        api.myIssueList({pId:self.pId,sdkUserId: self.userInfo.user_id,pageIdx:obj.curr-1,pageSize:self.limit})
            .then(function(res){

                //self.dataList = res.data;
                self.newDataList = res.data;
                self.count = res.total;
                // if(_this.count > _this.limit){
                //     _this.newDataList =util.splitArrs(res.data,_this.limit,1)
                // }
        })
    }
})


tableVm.$watch('onReady',function(){
    var _this = this,
        app = util.getStorage('app');
    _this.userInfo = util.getStorage('userInfo');
    setTimeout(function(){
        navVm.$watch('pId', function (v) {
            _this.pId = v;
            if(app && _this.userInfo){
                api.myIssueList({pId:v,sdkUserId: _this.userInfo.user_id,pageIdx:0,pageSize:_this.limit}).then(function(res){
                    //_this.dataList = res.data;
                    _this.newDataList = res.data;
                    _this.count = res.total;
                    // if(_this.count > _this.limit){
                    //     _this.newDataList =util.splitArrs(res.data,_this.limit,1)
                    // }
                })
            }
        })
    }, 0)
})