avalon.component('ms-qrcode', {
    template: '<div class="qrcode">\
                    <div class="qrcode-wx icon-wx" :hover="\'active\'">\
                        <div class="icon-wx-qrcode"></div>\
                    </div>\
                    <div class="qrcode-qq icon-qq" :hover="\'active\'">\
                        <div class="qq-warp">\
                            <div class="qq-text">\
                            <p>安卓-1群：</p>\
                            <p>414279620</p>\
                            <p class="u-mt6">安卓-2群：</p>\
                            <p>331714736</p>\
                            <p class="u-mt6">iOS-1群：</p>\
                            <p>894061926</p>\
                            </div>\
                            <div class="mark">凯撒官方QQ群</div>\
                        </div>\
                    </div>\
                </div>',
    defaults: {

    }
})