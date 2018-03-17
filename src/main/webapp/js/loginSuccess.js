$(function () {
    $('#memberinfo').click(function (){
        $('#iframe').attr('src','../html/memberPage.html');
        $('#showWelcome').css('display','none');
    });
    $('#goodsinfo').click(function (){
        $('#iframe').attr('src','../html/goodsPage.html');
        $('#showWelcome').css('display','none');
    });
    $('#contractinfo').click(function (){
        $('#iframe').attr('src','../html/contractPage.html');
        $('#showWelcome').css('display','none');
    });
    $('#sellinfo').click(function (){
        $('#iframe').attr('src','../html/salesLogPage.html');
        $('#showWelcome').css('display','none');
    });
    $("#exit").click(function () {
        $(location).attr("href","/member/logout.do");
        $(location).attr("href","../html/loginPage.html");
    })
    $("#roleInfo").click(function () {
        $('#iframe').attr("src","../html/role.html");
        $('#showWelcome').css('display','none');
    })

});
window.onload = function(){
    var member = JSON.parse(sessionStorage.getItem("member"));
    switch (member.role.value) {
        case 4:$(".role_4").css("display","inline-block");break;
        case 0:$(".role_0").css("display","inline-block");break;
        case 3:$(".role_3").css("display","inline-block");break;
        case 1:$(".role_1").css("display","inline-block");break;
    }
}