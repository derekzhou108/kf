avalon.component('ms-carousel', {
    template: '<div class="layui-carousel">\
                    <ul class="carousel" carousel-item>\
                        <li class="carousel-item" :for="item in @banners" data-for-rendered="@init">\
                            <a :if="@item.type == 1" :attr="{ href: @item.link }" target="_blank" :css="{backgroundImage: \'url(\' + @item.image_url + \')\'}"></a>\
                            <a :if="@item.type == 2" :attr="{ href: @item.link }" target="_self" :css="{backgroundImage: \'url(\' + @item.image_url + \')\'}"></a>\
                        </li>\
                    </ul>\
               </div>',
    defaults: {
        banners: [],
        onReady: function(){
            var _this = this
            api.carousel()
                .then(function(res){
                    _this.banners = res.data
                })
        },
        init: function(){
            var _this = this
            layui.use('carousel', function(){
                var carousel = layui.carousel
                carousel.render({
                    elem: _this.$element,
                    width: '100%',
                    anim: 'fade',
                    arrow: 'none'
                })
                $('.layui-carousel-arrow').hide()
            })
        }
    }
})