avalon.component('ms-paging', {
    template: '<div class="paging"></div>',
    defaults: {
        count: 0,
        limit: 10,
        curr:1,
        jump: avalon.noop,
        render: function(){
            var _this = this
            layui.use('laypage', function(res){
                var laypage = layui.laypage,
                    showPage= _this.count /_this.limit >1;
                if(showPage){
                    laypage.render({
                        elem: _this.$element,
                        count: _this.count,
                        curr:_this.curr,
                        limit: _this.limit,
                        theme: '#ff6d33',
                        jump: function(obj, first){
                            if(!first){
                                _this.jump(obj)
                            }
                            
                        }
                    })
                }

            })
        },
        onReady: function(res){
            this.render()
        },
        onViewChange: function(res){
            this.render()
        }
    }
})