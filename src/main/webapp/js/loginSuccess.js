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