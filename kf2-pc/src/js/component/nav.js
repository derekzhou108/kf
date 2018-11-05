var navVm;
avalon.component('ms-nav',{
    template: '<div class="wrap nav">\
                <div class="inner clear">\
                    <div class="nav-logo icon-logo"></div>\
                    <div class="nav-secondWrap" :visible="@secondShow" :css="{height: @secondHeight }"></div>\
                    <ul class="nav-list clear" :class="{ active: @secondShow }" :mouseover=" @secondShow = true " :mouseout=" @secondShow = false ">\
                        <li class="nav-item" :class="[@item.active ? \'active\' : \'\', @item.disabled ? \'disabled\' : \'\' ]" :for="(key, item) in @navList" :mouseover="@mouseoverLine(key, $event)" :mouseout="@mouseoutLine()">\
                            <a :click="@navJump(@item)">{{@item.title}}</a>\
                        </li>\
                        <li class="nav-line" id="navLine"></li>\
                        <li class="nav-second">\
                                <ul class="nav-secondList" :for="ul in navSecondList | limitBy(1)" :mouseover="@mouseoverLine(1)" :mouseout="@mouseoutLine()">\
                                    <li class="nav-secondItem" :for="li in ul.slice(0, 6)" ><a :click="@issueJump(@li)" >{{ @li.name }}</a></li>\
                                </ul>\
                                <ul class="nav-secondList" :for="ul in navSecondList | limitBy(1,1)" :mouseover="@mouseoverLine(2)" :mouseout="@mouseoutLine()">\
                                    <li class="nav-secondItem" :for="li in ul" :class="@li.disabled ? \'disabled\' : \'\' "><a :click="@navJump(@li)">{{ @li.title }}</a></li>\
                                </ul>\
                                <ul class="nav-secondList" :mouseover="@mouseoverLine(3)" :mouseout="@mouseoutLine()">\
                                    <li class="nav-secondItem"><a :click="@goIssue(0)">充值问题</a></li>\
                                    <li class="nav-secondItem"><a :click="@goIssue(3)">登录问题</a></li>\
                                    <li class="nav-secondItem"><a :click="@goIssue(1)">游戏问题</a></li>\
                                    <li class="nav-secondItem"><a :click="@goIssue(4)">举报申诉</a></li>\
                                    <li class="nav-secondItem"><a :click="@goIssue(2)">意见反馈</a></li>\
                                </ul>\
                                <ul class="nav-secondList" :mouseover="@mouseoverLine(4)" :mouseout="@mouseoutLine()">\
                                    <li class="nav-secondItem"><a :click="@jumpValidate(\'account-info\')">我的资料</a></li>\
                                    <li class="nav-secondItem"><a :click="@jumpValidate(\'issue-table\')">我的提单</a></li>\
                                    <li class="nav-secondItem"><a :click="@jumpValidate(\'bind-role-done\')">绑定角色</a></li>\
                                    <li class="nav-secondItem"><a :click="@jumpValidate(\'service-module?moduleName=查询充值明细&type=8\')">我的充值</a></li>\
                                    <li class="nav-secondItem"><a :click="@jumpValidate(\'account-safe\')">帐号安全</a></li>\
                                </ul>\
                        </li>\
                    </ul>\
                    <div class="nav-btns" :if="!@userInfo" :hover="\'active\'">\
                        <a class="nav-btn" :click="login">登录</a>\
                        <a class="nav-btn" :click="register">注册</a>\
                        <div class="nav-menu noLogin">\
                            <div class="nav-handle">\
                                <p>登录后可查看您的具体信息哦！</p>\
                                <p>（包括提单、角色、充值等）</p>\
                            </div>\
                            <div class="nav-action clear" :click="@goCenter"><a class="nav-actionItem">进入个人中心</a></div>\
                        </div>\
                    </div>\
                    <div class="nav-userInfo" :if="@userInfo" :hover="\'active\'">\
                        <!--<span class="nav-avatar" style="background: url(/dist/img/avatar.png)"></span>--><span>您好！{{ @userInfo && @userInfo.user_name}}</span>\
                        <div class="nav-menu">\
                            <div class="nav-handle clear" :click="@goIssueTable">\
                                <div class="nav-handleItem">\
                                    <div class="nav-handleTitle">{{ @myListNum.pending }}</div>\
                                    <div class="nav-handleText">待解决</div>\
                                </div>\
                               <div class="nav-handleItem">\
                                    <div class="nav-handleTitle">{{ @myListNum.scoring }}</div>\
                                    <div class="nav-handleText">待评分</div>\
                               </div>\
                                <div class="nav-handleItem nav-handleItem_done">\
                                    <div class="nav-handleTitle">{{ @myListNum.done }}</div>\
                                    <div class="nav-handleText">已解决</div>\
                                </div>\
                            </div>\
                            <div class="nav-action clear">\
                                <a class="nav-actionItem" :click="goCenter">进入个人中心</a><a class="nav-actionItem" :click="logout">退出</a>\
                            </div>\
                        </div>\
                    </div>\
                    <ul class="nav-gameList" :hover="\'active\'">\
                       <li class="nav-gameArrow"></li>\
                       <li class="nav-gameItem" :for="(key, item) in @appsOrderBy" :click="@selectApp(key, item)">\
                           <span class="nav-gameIcon" :css="{backgroundImage: \'url(\' + @item.icon + \')\' }"></span>{{@item.appname}} \
                       </li>\
                    </ul>\
                </div>\
            </div>',
    defaults: {
        userInfo: util.getStorage('userInfo') || false,
        active: 0,
        navList: [
            {title: '首页', href: '/pc/index', active: false, disabled: false},
            {title: '常见问题', href: '/pc/index?jump=category', active: false, disabled: false},
            {title: '自助服务', href: '/pc/service', active: false, disabled: false},
            {title: '联系客服', href: '/pc/select-issue', active: false, disabled: false, userInfo: true},
            {title: '个人中心', href: '/pc/bind-role-done', active: false, disabled: false, userInfo: true},
            ],
        navSecondList: [
            [],
            [
                {title: '帐号类', href: '/pc/service?type=1', disabled: false},
                {title: '安全类', href: '/pc/service?type=2', disabled: false},
                {title: '查询类', href: '/pc/service?type=3', disabled: false},
            ],
        ],
        category: [],
        apps: [],
        appsOrderBy: [],
        pId: '',
        myListNum: {},
        secondShow: false,
        secondHeight: '',
        issueJump: function(item){
            window.location.href = '/pc/issue-list?id=' + item.cId + '&text=' + encodeURIComponent(item.name)
        },
        navJump: function(item){
            if(item.href && !item.userInfo){
                window.location.href = item.href
            }

            if(item.href && item.userInfo){
                if(this.userInfo){
                    window.location.href = item.href
                }else{
                    account.login()
                }
            }
        },
        onInit: function(e){
            this.navList[this.active].active = true
            navVm = e.vmodel
        },
        onReady: function(){
            this.$watch('apps', function(v){
                var _this = this
                var app =  util.getStorage('app')
                var pId = util.getQueryString('pId')
                setTimeout(function(){  //组建$watch pId 可拿到值

                    if(pId){
                        _this.pId = pId;
                    }else{
                        var newPId = app && app.pId || '';
                        var isInObj = util.inObject(v,newPId,'pId')
                        if(v.length && isInObj){
                            _this.pId = newPId
                        }else{
                            _this.pId = v[0].pId;
                            util.setStorage('app', v[0])
                        }
                    }

                // 其他组件监听navVm可接受到pId
                if(v.length){
                    v.forEach(function(item, key){
                        if(item.pId === _this.pId){
                            if(!app){
                                util.setStorage('app', item.$model)
                            }
                            var appsOrderBy = v.slice()
                            appsOrderBy.splice(key, 1)
                            appsOrderBy.unshift(item.$model)
                            _this.appsOrderBy = appsOrderBy
                        }
                    })
                }

                    api.category({ pId: _this.pId, source: 'pc', pageSize: 12})
                        .then(function(res){
                            _this.navSecondList.set(0, res.data)
                            _this.category = res.data   //给index监听
                            setTimeout(function(){
                                _this.secondHeight = $('.nav-second').height() + 'px'
                            }, 0)
                        })
                },0)

            })

            this.initLine()
            var  _this = this
            api.appList()
                .then(function(res){
                    _this.apps = res.data
                })

            var userInfo = util.getStorage('userInfo')
            if(userInfo){
                api.myListNum({sdkUserId: userInfo.user_id})
                    .then(function(res){
                        _this.myListNum = res.data
                    })
            }

        },
        mouseoverLine: function(key, event){
            var _this = this
           var left = (event && event.target.offsetWidth || 110) * key
           $('#navLine').css('left', left)

        },
        mouseoutLine: function(){
            $('#navLine').css('left', this.initLine())
        },
        initLine: function(){
            var left
            return function(){
                if(!left){
                    var outerWidth = $('#navLine').outerWidth(true), key
                    this.navList.forEach(function(v, k){
                        if(v.active){
                            key = k
                        }
                    })
                    left = outerWidth * key
                    $('#navLine').css('left', left)
                }
                return left
            }
        }(),
        selectApp: function(key, item){
            if(key === 0) return
            util.setStorage('app', item.$model)
            util.reload()
        },
        goIssue: function(type){
            if(this.userInfo){
                if(util.getStorage('role')){
                    window.location.href = '/pc/issue?type=' + type
                }else{
                    dialog.confirm('请先选择角色', function(){
                        window.location.href = '/pc/bind-role-done?to=' + type
                    })
                }
            }else{
                account.login()
            }
        },
        goCenter: function(){
            if(this.userInfo){
                window.location.href = '/pc/bind-role-done'
            }else{
                account.login()
            }
        },
        goIssueTable: function(){
            window.location.href = '/pc/issue-table'
        },
        jumpValidate: function(jump){
          if(this.userInfo){
              window.location.href = '/pc/' + jump
          }else{
              account.login()
          }
        },
        login: function(){
            account.login()
        },
        register: function(){
            account.register()
        },
        logout: function(){
            account.logout();
        }
    }
})
