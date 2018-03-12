function checkLogin(){
    $(" input[ name='password' ] ").val(hex_md5($("#password").val()));
    $.ajax({
        type: 'post',
        url: "/member/login.do" ,
        dataType:'json',
        data:$('#loginForm').serialize(),
        success: function (data) {
            if (data != null) {
                console.log(data.member)
                localStorage.setItem("member", JSON.stringify(data.member));
                location.href = "/index.html";
            }
        } ,
        error:function() {
        }
    })
}