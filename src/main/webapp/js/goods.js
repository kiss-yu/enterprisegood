var param = {};
$(function() {
    $('#addbtn').click(function (){
        $('#goodIdbox').val('');
        $('#createDatebox').val('');
        $('#inventorybox').val('');
        $('#pricebox').val('');
        $('#infoOperatetitle').text('添加');
        $('#enable').attr('onclick','enableAdd()');
        $('#enable').css('display','block');
        $("#infoOperate").css('display','block');
    });
    getGoodList();
});
function getGoodList() {
    $('#table').bootstrapTable({
        method: 'POST',
        striped : true,// 隔行变色效果
        pagination : true,// 在表格底部显示分页条
        //pageNumber : 1,// 首页页码
        pageList : [5,10],// 设置可供选择的页面数据条数
        clickToSelect : false,// 设置true 将在点击行时，自动选择rediobox 和 checkbox
        cache : false,// 禁用 AJAX 数据缓存
        sortName : 'id',// 定义排序列
        sortOrder : 'asc',// 定义排序方式 getRceiptlistWithPaging
        url : '/goods/list.do',// 服务器数据的加载地址
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
            $('#table').bootstrapTable('removeAll');
            $('#table').bootstrapTable('append', backData.list);
        },
        columns : [ {
            checkbox : true,
            align : 'center',// 水平居中显示
            valign : 'middle',// 垂直居中显示
            width : '2',// 宽度
        },{
            title: '序号',//标题  可不加
            align : 'center',// 水平居中显示
            valign : 'middle',// 垂直居中显示
            width : '2',// 宽度
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
        }, {
            field : 'goodId',// 返回值名称
            title : '商品编号',// 列名
            align : 'center',// 水平居中显示
            valign : 'middle',// 垂直居中显示
            width : '1',// 宽度
        }, {
            field : 'name',// 返回值名称
            title : '商品名',// 列名
            align : 'center',// 水平居中显示
            valign : 'middle',// 垂直居中显示
            width : '1',// 宽度
        }, {
            field : 'createDate',// 返回值名称
            title : '创建日期',// 列名
            align : 'center',// 水平居中显示
            valign : 'middle',// 垂直居中显示
            width : '1',// 宽度
        }, {
            field : 'inventory',// 返回值名称
            title : '库存',// 列名
            align : 'center',// 水平居中显示
            valign : 'middle',// 垂直居中显示
            width : '10',// 宽度
        },  {
            field : 'price',// 返回值名称
            title : '单价',// 列名
            align : 'center',// 水平居中显示
            valign : 'middle',// 垂直居中显示
            width : '15',// 宽度
        }, {
            field : '',// 返回值名称
            title : '操作',// 列名
            align : 'center',// 水平居中显示
            valign :'middle',// 垂直居中显示
            width : '10',// 宽度
            formatter: function (value, row, index) {
                return "<input class='btn btn-info' type='button' style='margin-right: 5px' onclick='show("+JSON.stringify(row)+")' value='详情'>" +
                    "<input class='btn btn-info' type='button' style='margin-right: 5px' onclick='edit("+JSON.stringify(row)+","+index +")' value='编辑'>" +
                    "<input class='btn btn-danger' type='button' onclick='del("+JSON.stringify(row)+")' value='删除'>";
            }
        }]
        // 列配置项,详情请查看 列参数 表格
        /* 事件 */
    });
}
function enableAdd() {
    if(checkInput()){
        $.ajax({
            type: 'POST',
            url: "/goods/create.do",
            dataType: 'json',
            data: $("#info-form").serialize(),
            success: function (o) {
                if (o.code == 'SUCCESS') {
                    //添加成功后再table增加一行数据
                    $('#table').bootstrapTable('prepend', o.goods);
                    $('#enable').removeAttr('onclick');
                    $("#infoOperate").css('display','none');
                }else if(o.code == 'FAIL'){
                    alert('添加失败！' + o.msg == null ? '' : o.msg);
                }
            },
            error: function () {
            }
        });
    }
}
function checkInput() {
    if($('#goodIdbox').val() == null || $('#goodIdbox').val() == ''){
        alert('请输入商品编号！');
        return false;
    }
    if($('#createDatebox').val() == null || $('#createDatebox').val() == ''){
        alert('请输入创建日期！');
        return false;
    }
    if($('#inventorybox').val() == null || $('#inventorybox').val() == ''){
        alert('请输入库存！');
        return false;
    }
    if($('#pricebox').val() == null || $('#pricebox').val() == ''){
        alert('请输入单价！');
        return false;
    }
    return true;
}
/*展示方法*/
function show(data) {
    $('#infoOperatetitle').text('详情');
    $("#goodIdbox,#createDatebox,#inventorybox,#pricebox").attr("disabled","true");

    $('#goodIdbox').val(data.goodId);
    $('#createDatebox').val(data.createDate);
    $('#inventorybox').val(data.inventory);
    $('#pricebox').val(data.price);
    $('#enable').css('display','none');
    $("#infoOperate").css('display','block');

}
function dismiss() {
    $("#goodIdbox,#createDatebox,#inventorybox,#pricebox").removeAttr("disabled");
    $("#infoOperate").css('display','none');
    $('#enable').css('display','block');
}
function edit(data) {

    $('#infoOperatetitle').text('编辑');
    $("#id").val(data.id);
    $("#goodIdbox").val(data.goodId);
    $('#createDatebox').val(data.createDate);
    $('#inventorybox').val(data.inventory);
    $('#pricebox').val(data.price);

    $('#enable').attr('onclick','enableEdit()');

    $("#infoOperate").css('display','block');

}
function enableEdit(index) {
    if(checkInput()){
        $.ajax({
            type: 'put',
            url: "/goods/update.do",
            dataType: 'json',
            data: $("#info-form").serialize(),
            success: function (o) {
                if (o.code == 'SUCCESS') {
                    alert('修改成功!');
                    $('#enable').removeAttr('onclick');
                    $("#infoOperate").css('display','none');

                    $('#table').bootstrapTable('updateRow', {index: index, row: o.goods});
                }else if(o.code == 'FAIL'){
                    alert('修改失败！');
                }
            },
            error: function () {
            }
        });
    }
}
function del(data) {
    if(confirm('确认删除?') == true){
        $.ajax({
            method:'POST',
            url: '/goods/delete.do?id=' + data.id,
            success : function(o) {
                if (o.code == 'FAIL') {
                    alert("删除失败");
                }else if(o.code == 'SUCCESS'){

                    //删除一列数据成功在table中移除那行
                    $('#table').bootstrapTable('remove', {field: 'id', values: [data.id]});
                    alert("删除成功");
                }
            }
        });
    }
}
function delSelects() {
    var data = $('#table').bootstrapTable('getSelections');

    if (data.length == 0) {
        alert("请至少选中一条数据");
        return;
    }else{
        var ids = new Array();
        for (var i = 0; i < data.length; i++) {
            ids.push(data[i].id);
        }
        if(confirm('确认删除所有选中数据?') == true){
            $.ajax({
                method:'POST',
                url: '/goods/delete.do',
                data:ids,
                success : function(o) {
                    if (o.code == 'FAIL') {
                        alert("删除失败");
                    }else if(o.code == 'SUCCESS'){
                        $('#table').bootstrapTable('remove', {field: 'id', values: ids});
                        alert("删除成功");
                    }
                }
            });
        }
    }
}
$('#searchbtn').click(function () {
    $.ajax({
        type: 'post',
        url: "/goods/list.do",
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