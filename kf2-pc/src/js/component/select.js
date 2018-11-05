avalon.component('ms-select', {
    template: '<select :attr="{ \'lay-filter\' : $id }">\
                    <option value="">{{ placeholder }}</option>\
                    <option :attr="{ value: @item.val, selected: @item.val === val}" :for="item in data">{{ @item.text }}</option>\
               </select>',
    defaults: {
        data: [],
        val: '',    //默认值
        key: '',
        placeholder: '--请选择--',
        cbSelect: avalon.noop,
        render: function(){
            var _this = this
            layui.use('form', function(){
                var form = layui.form
                form.render()
                form.on('select('+ _this.$id +')', function(data){
                    _this.cbSelect(data, _this.key)
                })
            })
        },
        onReady: function(){
            this.render()
        },
        onViewChange: function(){
            this.render()
        }
    }
})