$(function () {
    //日期插件
    $(".input_time").datetimepicker({
        format: 'yyyy-mm-dd',//显示格式
        todayHighlight: 1,//今天高亮
        minView: "month",//设置只显示到月份
        startView:2,
        forceParse: 0,
        showMeridian: 1,
        autoclose: 1//选择后自动关闭
    });
});