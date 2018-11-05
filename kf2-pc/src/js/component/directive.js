avalon.directive('date', {
    diff: function(copy, src, name){
        var _this = this
        layui.use('laydate', function(){
            var laydate = layui.laydate
            laydate.render({
                elem: _this.node.dom,
                min: '2000-01-01',
                max: 0,
                format: 'yyyy-MM-dd HH:mm:ss',
                type: 'datetime',
                theme: '#f76c35'
            })
        })
    }
})

avalon.directive('datetime', {
    diff: function(copy, src, name){
        var _this = this
        layui.use('laydate', function(){
            var laydate = layui.laydate
            laydate.render({
                elem: _this.node.dom,
                // min: '2000-01-01',
                max: 0,
                format: 'yyyy-MM-dd',
                type: 'date',
                theme: '#f76c35'
            })
        })
    }
})

avalon.directive('upload', {
    diff: function(copy, src, binding){
        var _this = this

        if(	document.all && !window.atob){  //判断IE9 及以下
            $(_this.node.dom).on('click', function(){
                if(!util.flashChecker().hasFlash){
                    dialog.detail('提示','未检测到flash，上传图片请先安装flash插件 <a target="_blank" href="https://get2.adobe.com/cn/flashplayer/">https://get2.adobe.com/cn/flashplayer/</a>')
                }
            })
        }

        setTimeout(function(){
            var uploader = WebUploader.create({

                // swf文件路径
                swf: 'http://cdn.staticfile.org/webuploader/0.1.5/Uploader.swf',

                // 文件接收服务端。
                server: 'http://webuploader.duapp.com/server/fileupload.php',

                // 选择文件的按钮。可选。
                // 内部根据当前运行是创建，可能是input元素，也可能是flash.
                pick: _this.node.dom,

                // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
                resize: false,
                accept: {
                    title: 'Images',
                    extensions: 'gif,jpg,jpeg,bmp,png',
                    mimeTypes: 'image/*'
                },
                thumb: {
                    width: 1,
                    height: 1,

                    // 图片质量，只有type为`image/jpeg`的时候才有效。
                    quality: 100,

                    // 是否允许放大，如果想要生成小图的时候不失真，此选项应该设置为false.
                    allowMagnify: true,

                    // 是否允许裁剪。
                    crop: true,

                    // 为空的话则保留原有图片格式。
                    // 否则强制转换成指定的类型。
                    type: 'image/jpeg'
                }
            })
            setTimeout(function() {
                var uplodeNode = $(uploader.options.pick).find('.webuploader-pick').next()
                uplodeNode.css({height: '100%', width: '100%', top: 0, left: 0, opacity: 0, filter: 'alpha(opacity=0)' })
            }, 0)

            uploader.on('fileQueued', function(file){
                uploader.makeThumb( file, function( error, src ) {
                    api.upload({pId: util.getStorage('app').pId,  sdkUserId: util.getStorage('userInfo').user_id, image: src})
                        .then(function(res){
                            uploader.reset()
                            _this.vm.$fire('upload', res)
                        })
                });
            })
        }, 100)

    }

})

avalon.directive('uploadimg', {
    diff: function(copy, src, binding){
        var _this = this

        if(	document.all && !window.atob){  //判断IE9 及以下
            $(_this.node.dom).on('click', function(){
                if(!util.flashChecker().hasFlash){
                    dialog.detail('提示','未检测到flash，上传图片请先安装flash插件 <a target="_blank" href="https://get2.adobe.com/cn/flashplayer/">https://get2.adobe.com/cn/flashplayer/</a>')
                }
            })
        }

        setTimeout(function(){
            var uploader = WebUploader.create({

                // swf文件路径
                swf: 'http://cdn.staticfile.org/webuploader/0.1.5/Uploader.swf',

                // 文件接收服务端。
                server: 'http://webuploader.duapp.com/server/fileupload.php',

                // 选择文件的按钮。可选。
                // 内部根据当前运行是创建，可能是input元素，也可能是flash.
                pick: _this.node.dom,

                // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
                resize: false,
                accept: {
                    title: 'Images',
                    extensions: 'gif,jpg,jpeg,bmp,png',
                    mimeTypes: 'image/jpeg,image/gif,image/png'
                },
                thumb: {
                    width: 1,
                    height: 1,

                    // 图片质量，只有type为`image/jpeg`的时候才有效。
                    quality: 100,

                    // 是否允许放大，如果想要生成小图的时候不失真，此选项应该设置为false.
                    allowMagnify: true,

                    // 是否允许裁剪。
                    crop: true,

                    // 为空的话则保留原有图片格式。
                    // 否则强制转换成指定的类型。
                    type: 'image/jpeg'
                }
            })
            setTimeout(function() {
                var uplodeNode = $(uploader.options.pick).find('.webuploader-pick').next()
                uplodeNode.css({height: '100%', width: '100%', top: 0, left: 0, opacity: 0, filter: 'alpha(opacity=0)' })
            }, 0)

            uploader.on('fileQueued', function(file){

                uploader.makeThumb( file, function( error, src ) {
                    api.uploadImg({img_data: src})
                        .then(function(res){
                            console.log(res);
                            
                            uploader.reset()
                            _this.vm.$fire('uploadimgDone', res)
                        })
                });
            })
        }, 10)

    }

})