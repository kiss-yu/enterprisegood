
var param = {};


$('#addbtn').click(function (){
    $('#namebox').val('');
    $('#selectRole').val();
    $('#sexbox').val();
    $('#agebox').val('');
    $('#infoOperatetitle').text('添加');
    $('#enable').attr('onclick','enableAdd()');
    $('#enable').css('display','block');
    $("#infoOperate").css('display','block');
});

$('#searchbtn').attr('onclick','search()');

function enableAdd() {
    if(checkInput()){
        $.ajax({
            type: 'POST',
            url: "/member/create.do?admin=true",
            dataType: 'json',
            data: $("#info-form").serialize(),
            success: function (o) {
                console.log(o);
                if (o.code === 'SUCCESS') {
                    alert('添加成功!');
                    $('#enable').removeAttr('onclick');
                    $("#infoOperate").css('display','none');
                    $('#table').bootstrapTable('prepend', o.member);
                }else if(o.code === 'FAIL'){
                    alert('添加失败！');
                }
            },
            error: function () {
            }
        });
    }
}
function search() {
    var info = $('#search').val();
    if(info == null || info === ''){
        $.ajax({
            type: 'POST',
            url: "/member/create.do",
            dataType: 'json',
            data: $("#info-form").serialize(),
            success: function (o) {
                console.log(o);
                if (o.code === 'SUCCESS') {
                    console.log(o.msg);
                    alert('修改成功!');
                    $('#enable').removeAttr('onclick');
                    $("#infoOperate").css('display','none');
                }else if(o.code === 'FAIL'){
                    alert('修改失败！' + o.msg == null ? '' : o.msg);
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
        url : '/member/list.do',// 服务器数据的加载地址
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
            console.log(backData.list.length);
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
        }, {
            field : 'memberId',// 返回值名称
            title : 'memberId',// 列名
            align : 'center',// 水平居中显示
            valign : 'middle',// 垂直居中显示
            width : '1',// 宽度
            visible : false
        }, {
            field : 'password',// 返回值名称
            title : 'password',// 列名
            align : 'center',// 水平居中显示
            valign : 'middle',// 垂直居中显示
            width : '1',// 宽度
            visible : false
        }, {
            field : 'name',// 返回值名称
            title : '姓名',// 列名
            align : 'center',// 水平居中显示
            valign : 'middle',// 垂直居中显示
            width : '10'// 宽度
        },  {
            field : 'role.value',// 返回值名称
            title : '角色',// 列名
            align : 'center',// 水平居中显示
            valign : 'middle',// 垂直居中显示
            width : '15',// 宽度
            formatter: function (value, row, index) {
                return getRole(value);
            }
        }, {
            field : 'sex',// 返回值名称
            title : '性别',// 列名
            align : 'center',// 水平居中显示
            valign : 'middle',// 垂直居中显示
            width : '15',// 宽度
            formatter: function (value, row, index) {
                return value === true ? '男' : '女';
            }
        }, {
            field : 'age',// 返回值名称
            title : '年龄',// 列名
            align : 'center',// 水平居中显示
            valign : 'middle',// 垂直居中显示
            width : '5'// 宽度
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
        // 列配置项,详情请查看 列参数 表格
        /* 事件 */
    });
}
function getRole(data) {

    if(data === 0){
        return '系统管理员';
    }else if(data === 1){
        return '合同部用户';
    }else if(data === 2){
        return '销售部用户';
    }else if(data === 3){
        return '客户部用户';
    }else if(data === 4){
        return '用户';
    }else if(data === '系统管理员'){
        return 0;
    }else if(data === '合同部用户'){
        return 1;
    }else if(data === '销售部用户'){
        return 2;
    }else if(data === '客户部用户'){
        return 3;
    }else if(data === '用户'){
        return 4;
    }
}

function checkInput() {
    if($('#namebox').val() == null || $('#namebox').val() === ''){
        alert('请输入姓名！');
        return false;
    }
    if($('#agebox').val() == null || $('#agebox').val() === ''){
        alert('请输入年龄！');
        return false;
    }
    return true;
}

/*展示方法*/
function show(data) {

    $('#infoOperatetitle').text('详情');
    $("#namebox").attr("disabled","true");
    $("#selectRole").attr("disabled","true");
    $("#sexbox").attr("disabled","true");
    $("#agebox").attr("disabled","true");

    $('#namebox').val(data.name);
    $('#selectRole').val(data.role.value);
    $('#sexbox').val(data.sex ? 0 : 1);
    $('#agebox').val(data.age);
    $('#enable').css('display','none');
    $("#infoOperate").css('display','block');
}

function dismiss() {
    $("#namebox").removeAttr("disabled");
    $("#selectRole").removeAttr("disabled");
    $("#sexbox").removeAttr("disabled");
    $("#agebox").removeAttr("disabled");
    $("#infoOperate").css('display','none');
    $('#enable').css('display','block');
}

function edit(data,index) {

    $('#infoOperatetitle').text('编辑');
    $("#id").val(data.id);
    $("#memberId").val(data.memberId);
    $('#namebox').val(data.name);
    $('#selectRole').val(data.role);
    $('#sexbox').val(data.sex ? 0 : 1);
    $('#agebox').val(data.age);

    $('#enable').attr('onclick','enableEdit('+index+')');

    $("#infoOperate").css('display','block');

}

function enableEdit(index) {
    if(checkInput()){
        $.ajax({
            type: 'put',
            url: "/member/update.do",
            dataType: 'json',
            data: $("#info-form").serialize(),
            success: function (o) {
                console.log(o);
                if (o.code === 'SUCCESS') {
                    console.log(o.msg);
                    alert('修改成功!');
                    $('#enable').removeAttr('onclick');
                    $("#infoOperate").css('display','none');

                    $('#table').bootstrapTable('updateRow', {index: index, row: o.member});

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
        console.log(data.id);
        $.ajax({
            method:'POST',
            url: '/member/delete.do?id=' + data.id,
            success : function(o) {
                console.log(o.code);
                if (o.code === 'FAIL') {
                    alert("删除失败" );
                }else if(o.code === 'SUCCESS'){
                    alert("删除成功");
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
            ids.push(data.id);
        }
        if(confirm('确认删除所有选中数据?') === true){
            $.ajax({
                method:'POST',
                url: '/member/delete.do',
                data:{id:ids},
                traditional:true,
                success : function(o) {
                    console.log(o.code);
                    if (o.code === 'FAIL') {
                        alert("删除失败" );
                    }else if(o.code === 'SUCCESS'){
                        alert("删除成功");
                        $('#table').bootstrapTable('remove', {field: 'id', values: ids});
                    }
                }
            });
        }
    }
}


getMemberList();
