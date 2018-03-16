var param = {};
var member = JSON.parse(sessionStorage.getItem("member"));
$(function() {
    $('#searchbtn').attr('onclick','search()');
    $('#addbtn').click(function (){

        $("#contractIdbox").removeAttr("disabled");
        $("#createDatebox").removeAttr("disabled");
        $("#finish").removeAttr("disabled");
        $("#customer").removeAttr("disabled");
        $("#admin").removeAttr("disabled");

        $('#infoOperatetitle').text('添加');
        $('#contractIdbox').val("");
        $('#id').val("");
        $('#createDatebox').val("");
        $('#finish').val(0);
        $('#customer').val("");
        $('#admin').val("");
        $('#enable').attr('onclick','enableAdd()');
        $('#enable').css('display','block');
        $("#infoOperate").css('display','block');
    });
    getContractList();
});
function getContractList() {
    $('#table').bootstrapTable({
        method: 'POST',
        striped : true,// 隔行变色效果
        pagination : true,// 在表格底部显示分页条
        //pageNumber : 1,// 首页页码
        pageList : [3,5,10],// 设置可供选择的页面数据条数
        clickToSelect : false,// 设置true 将在点击行时，自动选择rediobox 和 checkbox
        cache : false,// 禁用 AJAX 数据缓存
        sortName : 'id',// 定义排序列
        sortOrder : 'asc',// 定义排序方式 getRceiptlistWithPaging
        url : '/contract/list.do',// 服务器数据的加载地址
        sidePagination : 'server',// 设置在哪里进行分页
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
            width : '5',// 宽度
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
            width : '6',// 宽度
            visible : false
        }, {
            field : 'contractId',// 返回值名称
            title : '合同编号',// 列名
            align : 'center',// 水平居中显示
            valign : 'middle',// 垂直居中显示
            width : '20',// 宽度
        }, {
            field : 'createDate',// 返回值名称
            title : '创建日期',// 列名
            align : 'center',// 水平居中显示
            valign : 'middle',// 垂直居中显示
            width : '15',// 宽度
        },{
            field : 'finish',// 返回值名称
            title : '签约状态',// 列名
            align : 'center',// 水平居中显示
            valign : 'middle',// 垂直居中显示
            width : '10',// 宽度
            formatter: function (value, row, index) {
                return value == true ? '已签约' : '未签约';
            }
        },  {
            field : 'customer.name',// 返回值名称
            title : '客户姓名',// 列名
            align : 'center',// 水平居中显示
            valign : 'middle',// 垂直居中显示
            width : '10',// 宽度
        },  {
            field : 'admin.name',// 返回值名称
            title : '签约管理',// 列名
            align : 'center',// 水平居中显示
            valign : 'middle',// 垂直居中显示
            width : '10',// 宽度
        }, {
            field : '',// 返回值名称
            title : '    操作    ',// 列名
            align : 'center',// 水平居中显示
            valign :'middle',// 垂直居中显示
            width : '35',// 宽度
            formatter: function (value, row, index) {
                return "<button onclick='show("+JSON.stringify(row)+")'>查看</button>" +
                    "<button onclick='edit("+JSON.stringify(row)+"," + index + ")'>编辑</button>" +
                    "<button onclick='del("+JSON.stringify(row)+")'>删除</button>" +
                    (row.finish ||  member == null || (member.role != 0 && member.role != 1)? ("") : ("<button onclick='signing("+JSON.stringify(row)+")'>签约</button>"));
            }
        }]
        // 列配置项,详情请查看 列参数 表格
        /* 事件 */
    });
}
function signing(data) {
    $.ajax({
        type: 'POST',
        url: "/contract/signing.do",
        dataType: 'json',
        data: data,
        success: function (o) {
            if (o.code == 'SUCCESS') {
                alert('签约成功!' );
                data.finish = true;
                $('#table').bootstrapTable('remove', {field: 'id', values: [data.id]});
                $('#table').bootstrapTable('append', data);
            }else if(o.code == 'FAIL'){
                alert('签约失败！');
            }
        },
        error: function () {
        }
    });
}
function enableAdd() {
    if(checkInput()){
        $.ajax({
            type: 'POST',
            url: "/contract/create.do",
            dataType: 'json',
            data: $("#info-form").serialize(),
            success: function (o) {
                if (o.code == 'SUCCESS') {
                    alert('添加成功!' );
                    $('#table').bootstrapTable('append', o.contract);
                    $('#enable').removeAttr('onclick');
                    $("#infoOperate").css('display','none');
                }else if(o.code == 'FAIL'){
                    alert('添加失败！');
                }
            },
            error: function () {
            }
        });
    }
}
function search() {
    $.ajax({
        type: 'post',
        url: "/contract/list.do",
        dataType: 'json',
        data: $("#search_form").serialize(),
        success: function (o) {
            if (o.code == 'SUCCESS') {
                $('#table').bootstrapTable('removeAll');
                $('#table').bootstrapTable('append', o.list);
            }
        },
        error: function () {
        }
    });
}
function checkInput() {
    if($('#contractIdbox').val() == null || $('#goodIdbox').val() == ''){
        alert('请输入商品编号！');
        return false;
    }
    if($('#createDatebox').val() == null || $('#createDatebox').val() == ''){
        alert('请输入创建日期！');
        return false;
    }
    return true;
}
/*展示方法*/
function show(data) {
    $('#infoOperatetitle').text('查看');
    $("#contractIdbox").attr("disabled","true");
    $("#createDatebox").attr("disabled","true");
    $("#finish").attr("disabled","true");
    $("#customer").attr("disabled","true");
    $("#admin").attr("disabled","true");

    $('#contractIdbox').val(data.contractId);
    $('#createDatebox').val(data.createDate);
    $('#customer').val(data.customer.memberId);
    $('#admin').val(data.admin.name);
    $('#finish').val(data.finish ? 1 : 0);
    $('#enable').css('display','none');
    $("#infoOperate").css('display','block');

}
function dismiss() {
    $("#infoOperate").css('display','none');
    $('#enable').css('display','block');
}
function edit(data,index) {

    $("#contractIdbox").removeAttr("disabled");
    $("#createDatebox").removeAttr("disabled");
    $("#finish").removeAttr("disabled");
    $("#customer").removeAttr("disabled");
    $("#admin").removeAttr("disabled");

    $('#infoOperatetitle').text('编辑');
    $('#contractIdbox').val(data.contractId);
    $('#id').val(data.id);
    $('#createDatebox').val(data.createDate);
    $('#finish').val(data.finish ? 1 : 0);
    $('#customer').val(data.customer.memberId);
    $('#admin').val(data.admin.memberId);
    $('#enable').css('display','block');
    $("#infoOperate").css('display','block');

    $('#enable').attr('onclick','enableEdit(' + index+ ')');

    $("#infoOperate").css('display','block');

}
function enableEdit(index) {
    if(checkInput()){
        $.ajax({
            type: 'put',
            url: "/contract/update.do",
            dataType: 'json',
            data: $("#info-form").serialize(),
            success: function (o) {
                if (o.code == 'SUCCESS') {
                    alert('修改成功!');
                    $('#enable').removeAttr('onclick');
                    $("#infoOperate").css('display','none');
                    $('#table').bootstrapTable('updateRow', {index: index,row: o.contract});
                }else if(o.code == 'FAIL'){
                    alert('修改失败！');
                }
            },
            error: function () {
            }
        });
    }
}
function del(data,index) {
    if(confirm('确认删除?') == true){
        $.ajax({
            method:'POST',
            url: '/contract/delete.do',
            data:'id=' + data.id,
            success : function(o) {
                if (o.code == 'FAIL') {
                    alert("删除失败");
                }else if(o.code == 'SUCCESS'){
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
                url: '/contract/delete.do',
                data:{id:ids},
                traditional:true,
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