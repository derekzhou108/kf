avalon.component('ms-search', {
    template: '<div class="wrap">\
                    <form class="inner search" :submit="@submit | prevent">\
                        <input type="text" class="search-input" placeholder="请输入您遇到的问题关键字" :duplex="@search">\
                        <input type="submit" class="search-submit" value="搜索">\
                        <span class="search-hotTitle">热门搜索：</span>\
                        <ul class="search-hot">\
                            <li class="search-hotItem" :for="item in @list"><a  :click="href( @item )" >{{@item}}</a></li>\
                        </ul>\
                    </form>\
                </div>',
    defaults: {
        search: '',
        list: [],
        onReady: function(){
          var _this = this
          api.keywords()
              .then(function(res){
                  _this.list = res.data
              })
        },
        href: function(item){
            window.location.href = '/pc/issue-list?search=' + encodeURIComponent(item)
        },
        submit: function(){
            var search = $.trim(this.search)
            if(!search){
                dialog.errorMsg('请输入搜索内容')
                return false
            }
            window.location.href = '/pc/issue-list?search=' + encodeURIComponent(search)
        }
    }
})