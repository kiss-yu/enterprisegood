
var param = {};
$('#infoOperatetitle').text('详情');
$(function() {
    $("#infoOperate").css('display','none');
    $('#table').bootstrapTable({
        method: 'POST',
        striped : true,// 隔行变色效果
        pagination : true,// 在表格底部显示分页条
        pageNumber : 1,// 首页页码
        pageList : [5,10],// 设置可供选择的页面数据条数
        clickToSelect : false,// 设置true 将在点击行时，自动选择rediobox 和 checkbox
        cache : false,// 禁用 AJAX 数据缓存
        sortName : 'id',// 定义排序列
        sortOrder : 'asc',// 定义排序方式 getRceiptlistWithPaging
        url : '/sales/list.do',// 服务器数据的加载地址
        sidePagination : 'client',// 设置在哪里进行分页
        /*showRefresh: true, */ //显示刷新按钮
        contentType : 'application/json',// 发送到服务器的数据编码类型
        dataType : 'json',// 服务器返回的数据类型
        queryParams: function queryParams(params) {
            param.page = (params.offset/params.limit) + 1;
            param.size=params.limit;
            param.sort = params.sort; // 排序列名
            param.order = params.order; // 排位命令（desc，asc）
            return param;
        },  // 请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
        selectItemName : '',// radio or checkbox 的字段名
        onLoadSuccess:function (backData) {
            console.log(backData);
            $('#table').bootstrapTable('removeAll');
            $('#table').bootstrapTable('append', backData.list);
        },
        columns : [ {
            checkbox : true,
            align : 'center',// 水平居中显示
            valign : 'middle',// 垂直居中显示
            width : '2'// 宽度
        },{
            title: '序号',//标题  可不加
            align : 'center',// 水平居中显示
            valign : 'middle',// 垂直居中显示
            width : '5',// 宽度
            formatter: function (value, row, index) {
                return index+1;
            }
        }, {
            field : 'id',// 返回值名称
            title : 'id',// 列名
            align : 'center',// 水平居中显示
            valign : 'middle',// 垂直居中显示
            width : '1',// 宽度
            visible : false
        },  {
            field : 'contract.createDate',// 返回值名称
            title : '创建时间',// 列名
            align : 'center',// 水平居中显示
            valign : 'middle',// 垂直居中显示
            width : '1'// 宽度
        }, {
            field : 'count',// 返回值名称
            title : '数量',// 列名
            align : 'center',// 水平居中显示
            valign : 'middle',// 垂直居中显示
            width : '10'// 宽度
        },  {
            field : 'good.name',// 返回值名称
            title : '物品名称',// 列名
            align : 'center',// 水平居中显示
            valign : 'middle',// 垂直居中显示
            width : '15'// 宽度
        }, {
            field : 'member.name',// 返回值名称
            title : '客户名',// 列名
            align : 'center',// 水平居中显示
            valign : 'middle',// 垂直居中显示
            width : '15'// 宽度
        }, {
            field : 'describe',// 返回值名称
            title : '描述',// 列名
            align : 'center',// 水平居中显示
            valign : 'middle',// 垂直居中显示
            width : '15'// 宽度
        }, {
            field : '',// 返回值名称
            title : '操作',// 列名
            align : 'center',// 水平居中显示
            valign :'middle',// 垂直居中显示
            width : '5',// 宽度
            formatter: function (value, row, index) {
                return "<input class='btn btn-info' type='button' style='margin-right: 5px' onclick='show("+JSON.stringify(row)+")' value='详情'>";
            }
        }]
        // 列配置项,详情请查看 列参数 表格
        /* 事件 */
    });
});
$('#searchbtn').click(function () {
    $.ajax({
        type: 'post',
        url: "/sales/list.do",
        dataType: 'json',
        data: $("#center").serialize(),
        success: function (o) {
            if (o.code == 'SUCCESS') {
                $('#table').bootstrapTable('removeAll');
                $('#table').bootstrapTable('append', o.list);
            }
        }
    })
});
/*展示方法*/
function show(data) {

    $("#createDatebox").attr("disabled","true");
    $("#countbox").attr("disabled","true");
    $("#goodnamebox").attr("disabled","true");
    $("#membernamebox").attr("disabled","true");
    $("#describebox").attr("disabled","true");

    $('#createDatebox').val(data.createDate);
    $('#countbox').val(data.count);
    $('#goodnamebox').val(undefined === data.good ? '':data.good.name);
    $('#membernamebox').val(data.member.name);
    $('#describebox').val(data.describe);
    $('#enable').css('display','none');
    $("#infoOperate").css('display','block');
}

function dismiss() {
    $("#infoOperate").css('display','none');
    $('#enable').css('display','block');
}