/**
 * Created by Administrator on 2017/10/15.
 */

    var indexVm = avalon.define({
        $id: 'index',
        hotList: [],
        issueList: [],
        goIssueList: function(item){
            window.location.href = '/pc/issue-list?id=' + item.cId + '&text=' + encodeURIComponent(item.name)
        }
    })

    indexVm.$watch('onReady', function(){
        var _this = this
        setTimeout(function(){
            navVm.$watch('pId', function (v) {
                api.hot({pId: v, source: 'pc'})
                    .then(function(res){
                        _this.hotList = res.data
                    })
            })
            navVm.$watch('category', function (v) {
                _this.issueList = v

                if(util.getQueryString('jump') === 'category'){
                    setTimeout(function(){
                        $('html,body').animate({ scrollTop: $('#category').offset().top}, 300)
                    }, 0)
                }

            })
        }, 0)

    })

