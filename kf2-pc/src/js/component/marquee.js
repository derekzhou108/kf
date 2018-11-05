avalon.component('ms-marquee', {
    template: '<div class="wrap">\
                    <div class="inner marquee clear">\
                        <div class="icon-marquee"></div>\
                        <ul class="marquee-list" id="marquee">\
                            <li class="marquee-item" :for="item in @marqueeList"><a href="javascript:;" :click="openDetail(item)">{{ @item.title }}</a></li>\
                        </ul>\
                    </div>\
              </div>',
    defaults: {
        timer: false,
        speed: 3000,
        list: [],
        $computed: {
            marqueeList: function(){
                return this.list.concat(this.list[0] || [])
            }
        },
        onInit: function(){
            var _this = this

            navVm.$watch('pId', function (v) {
                api.announcement({pId: v, source: 'pc'})
                    .then(function(res){
                        if(res.data.length){
                            _this.list = res.data
                            _this.speed = res.data[0] && res.data[0].frequency || 5000
                           setTimeout(function(){
                               _this.init()
                           }, 0)
                        }
                    })
            })
        },
        init: function(){
            var _this = this
            var marquee = $('#marquee')
            var marqueeH = marquee.height()
            var marqueeScrollH = marquee[0].scrollHeight
            this.timer = setInterval(function(){
                marquee.animate({'scrollTop': marquee[0].scrollTop + marqueeH}, 'fast', function(){
                    if(marquee[0].scrollTop + marqueeH === marqueeScrollH){
                        marquee[0].scrollTop = 0
                    }
                })
            }, _this.speed)

        },
        openDetail: function(item){
            if(parseInt(item.type, 10) === 1){
                window.location.href = item.link
            }else{
                dialog.detail(item.title, item.desc)
            }
        },
        onDispose: function(){
            clearInterval(this.timer)
        }
    }
})