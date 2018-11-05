var selectIssueVm = avalon.define({
    $id: 'selectIssue',
    isLogin: util.getStorage('userInfo') || false,
    goIssue: function(type){
        if(this.isLogin){
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
    }
})