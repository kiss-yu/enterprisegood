
var param = {};

$('#addbtn').click(function (){
    $('#name').val('');
    $('#value').val('');
    $('#infoOperatetitle').text('添加');
    $(".log-window").css('display',"block");
    $('#enable').attr('onclick','enableAdd()');
    $('#enable').css('display','block');
    $("#infoOperate").css('display','block');
});
function enableAdd() {
    if(checkInput()){
        $.ajax({
            type: 'POST',
            url: "/role/create.do",
            dataType: 'json',
            data: $("#info-form").serialize(),
            success: function (o) {
                if (o.code === 'SUCCESS') {
                    dismiss();
                    $('#enable').removeAttr('onclick');
                    $("#infoOperate").css('display','none');
                    //添加成功后再table增加一行数据
                    $('#table').bootstrapTable('prepend', o.role);
                }else if(o.code === 'FAIL'){
                    alert('添加失败！');
                }
            },
            error: function () {
            }
        });
    }
}
function getMemberList() {
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
        url : '/role/list.do',// 服务器数据的加载地址
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
            width : '2'// 宽度
        }, {
            field : 'id',// 返回值名称
            title : 'id',// 列名
            align : 'center',// 水平居中显示
            valign : 'middle',// 垂直居中显示
            width : '1',// 宽度
            visible : false
        }, {
            field : 'name',// 返回值名称
            title : '角色名',// 列名
            align : 'center',// 水平居中显示
            valign : 'middle',// 垂直居中显示
            width : '1',// 宽度
        }, {
            field : 'value',// 返回值名称
            title : '权限值',// 列名
            align : 'center',// 水平居中显示
            valign : 'middle',// 垂直居中显示
            width : '1',// 宽度
        },{
            field : '',// 返回值名称
            title : '操作',// 列名
            align : 'center',// 水平居中显示
            valign :'middle',// 垂直居中显示
            width : '5',// 宽度
            formatter: function (value, row, index) {
                return "<input class='btn btn-info' type='button' style='margin-right: 5px' onclick='show("+JSON.stringify(row)+")' value='详情'>" +
                    "<input class='btn btn-info' type='button' style='margin-right: 5px' onclick='edit("+JSON.stringify(row)+","+index +")' value='编辑'>" +
                    "<input class='btn btn-danger' type='button' onclick='del("+JSON.stringify(row)+")' value='删除'>";
            }
        }]
    });
}

function checkInput() {
    if($('#value').val() == null || $('#value').val() === '' || !$('#value').val().match(/\d+/g)){
        alert('非法权限值');
        return false;
    }
    if($('#name').val() == null || $('#name').val() === ''){
        alert('请输入角色名');
        return false;
    }
    return true;
}

/*展示方法*/
function show(data) {

    $('#infoOperatetitle').text('详情');
    $("#name").attr("disabled","true");
    $("#value").attr("disabled","true");

    $('#name').val(data.name);
    $('#value').val(data.value);
    $('#enable').css('display','none');
    $(".log-window").css('display',"block");
    $("#infoOperate").css('display','block');
}


function dismiss() {
    $("#name").removeAttr("disabled");
    $("#value").removeAttr("disabled");
    $("#infoOperate").css('display','none');
    $('#enable').css('display','block');
    $(".log-window").css('display',"none");
}

function edit(data,index) {
    //在查看时候设置了$("#namebox").attr("disabled","true");
    //编辑修改时都应该设置$("#namebox").removeAttr("disabled");
    dismiss();
    $('#infoOperatetitle').text('编辑');
    $("#id").val(data.id);
    $("#name").val(data.name);
    $('#value').val(data.value);
    $(".log-window").css('display',"block");
    $('#enable').attr('onclick','enableEdit('+index+')');
    $("#infoOperate").css('display','block');
}
function enableEdit(index) {
    if(checkInput()){
        $.ajax({
            type: 'POST',
            url: "/role/update.do",
            dataType: 'json',
            data: $("#info-form").serialize(),
            success: function (o) {
                if (o.code === 'SUCCESS') {
                    alert('修改成功!');
                    $('#enable').removeAttr('onclick');
                    $("#infoOperate").css('display','none');
                    //当前行修改成功后再table中修改改行
                    $('#table').bootstrapTable('updateRow', {index: index, row: o.role});
                    dismiss();
                }else if(o.code === 'FAIL'){
                    alert('修改失败！' + o.msg == null ? '' : o.msg);
                }
            },
            error: function () {
            }
        });
    }
}

function del(data) {
    if(confirm('确认删除?') === true){
        $.ajax({
            method:'POST',
            url: '/member/delete.do?id=' + data.id,
            success : function(o) {
                if (o.code === 'FAIL') {
                    alert("删除失败" );
                }else if(o.code === 'SUCCESS'){
                    alert("删除成功");
                    //删除一列数据成功在table中移除那行
                    $('#table').bootstrapTable('remove', {field: 'id', values: [data.id]});
                }
            }
        });
    }
}
function delSelects() {
    var data = $('#table').bootstrapTable('getSelections');

    if (data.length === 0) {
        alert("请至少选中一条数据");
        return;
    }else{
        var ids = new Array();
        for (var i = 0; i < data.length; i++) {
            ids.push(data[i].id);
        }
        if(confirm('确认删除所有选中数据?') === true){
            $.ajax({
                method:'POST',
                url: '/member/delete.do',
                data:{id:ids},
                traditional:true,
                success : function(o) {
                    if (o.code === 'FAIL') {
                        alert("删除失败" );
                    }else if(o.code === 'SUCCESS'){
                        alert("删除成功");
                        //多行删除成功在table中移除多行
                        $('#table').bootstrapTable('remove', {field: 'id', values: ids});
                    }
                }
            });
        }
    }
}
getMemberList();
