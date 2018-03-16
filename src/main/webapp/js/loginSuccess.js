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
        $('#iframe').attr('src','../html/goodsPage.html');
        $('#showWelcome').css('display','none');
    });
})