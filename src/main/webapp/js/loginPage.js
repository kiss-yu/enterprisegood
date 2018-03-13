function checkInputMassage() {
    var massage = {};
    if($('#account').val() == null || $('#account').val() == ''){
        alert('请输入账号！');
        return;
    }
    if($('#password').val() == null || $('#password').val() == ''){
        alert('请输入密码！');
        return;
    }
    if($("input[name=type]:checked").val() == null) {
        alert('请选择用户类型！');
        return;
    }
    else {
        massage.account = $('#account').val();
        massage.password = $('#password').val();
        massage.grade = $("input[name=t1]:checked").val();
        return massage;
    }
}
function checkLogin(){
    var parame = checkInputMassage();

    $.ajax({
        url : '/member/login.do',
        method : 'POST',
        data : parame,
        success : function (o) {
            console.log(o);
            if(o.logintype == 0){
                alert('用户名或者密码错误！')
            }else if (o.logintype == 1){
                alert('您不是合法用户，请登陆后再进入!');
            }else /*if(o.logintype == 2)*/{
                window.location.href = "../html/loginSuccess.html";
            }
        }
    });
}