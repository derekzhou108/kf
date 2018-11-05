var issueListVm = avalon.define({
    $id:'issueList',
    id: decodeURIComponent(util.getQueryString('id')),
    search: decodeURIComponent(util.getQueryString('search')),
    text: util.getQueryString('text') && decodeURIComponent(util.getQueryString('text')) || '问题列表',
    list: [],
    count: 0,
    jump: function(obj){
        this.loadList(obj.curr - 1)
    },
    loadList: function(page){
        var _this = this
        if(_this.search !== 'undefined'){
            var searchData = {
                pId: util.getStorage('app').pId,
                content: this.search,
                pageIdx: page || 0,
                source: 'pc'
            }
            api.search(searchData)
                .then(function(res){
                    _this.list = res.data
                    _this.count = res.total
                })
        }
        if(_this.id !== 'undefined'){
            var listData = {
                pId: util.getStorage('app').pId,
                cId: this.id,
                pageIdx: page || 0,
                source: 'pc'
            }
            api.hot(listData)
                .then(function(res){
                    _this.list = res.data
                    _this.count = res.total
                })
        }
    }
})

issueListVm.$watch('onReady',function(){
    this.loadList()
})