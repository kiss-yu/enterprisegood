
var param = {};

function dismiss() {
    $("#namebox,#memberId,#selectRole,#sexbox,#agebox,#password").removeAttr("disabled");

    $('#namebox').val('');
    $('#memberId').val('');
    $('#selectRole').val('');
    $('#sexbox').val('');
    $('#agebox').val('');
    $('#password').val('');

    $(".log-window").css('display',"none");
    $("#infoOperate").css('display','none');
    $('#enable').removeAttr('onclick');
    $('#enable').css('display','block');

}

$('#addbtn').click(function (){
    $('#namebox').val('');
    $('#selectRole').val('');
    $('#sexbox').val('');
    $('#agebox').val('');
    $('#infoOperatetitle').text('添加');
    $('#enable').attr('onclick','enableAdd()');
    $('#enable').css('display','block');
    $("#infoOperate").css('display','block');
    $(".log-window").css('display',"block");
});


function enableAdd() {

    if(checkInput()){
        if ($("#password").val() != null && $("#password").val() != '') {
            console.log($("#password").val())
            $(" input[ name='password' ] ").val(hex_md5($("#password").val()));
        }else {
            $(" input[ name='password' ] ").val(hex_md5('123456'));
        }
        $.ajax({
            type: 'POST',
            url: "/member/create.do?admin=true",
            dataType: 'json',
            data: $("#info-form").serialize(),
            success: function (o) {
                if (o.code === 'SUCCESS') {
                    alert('添加成功!');
                    dismiss();

                    //添加成功后再table增加一行数据
                    $('#table').bootstrapTable('prepend', o.member);
                }else if(o.code === 'FAIL'){
                    alert('添加失败！');
                    dismiss();
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                if (XMLHttpRequest.status == 401) {
                    alert("权限不足！！！")
                }
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
            title : '用户名',// 列名
            align : 'center',// 水平居中显示
            valign : 'middle',// 垂直居中显示
            width : '1'// 宽度
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
            field : 'role.name',// 返回值名称
            title : '角色',// 列名
            align : 'center',// 水平居中显示
            valign : 'middle',// 垂直居中显示
            width : '15',// 宽度
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

function checkInput() {
    if($('#namebox').val() == null || $('#namebox').val() == ''){
        alert('请输入姓名！');
        return false;
    }
    if($('#agebox').val() == null || $('#agebox').val() == ''){
        alert('请输入年龄！');
        return false;
    }
    return true;
}

/*展示方法*/
function show(data) {

    $('#infoOperatetitle').text('详情');
    $("#namebox,#memberId,#selectRole,#sexbox,#agebox,#password").attr("disabled","true");

    $("#id").val(data.id);
    $("#memberId").val(data.memberId);
    $('#namebox').val(data.name);
    $('#selectRole').val(data.role.value);
    $('#sexbox').val(data.sex ? 1 : 0);
    $('#agebox').val(data.age);
    $('#enable').css('display','none');
    $(".log-window").css('display',"block");
    $("#infoOperate").css('display','block');
}

function edit(data,index) {
    //在查看时候设置了$("#namebox").attr("disabled","true");
    //编辑修改时都应该设置$("#namebox").removeAttr("disabled");

    $("#namebox,#selectRole,#sexbox,#agebox,#password").removeAttr("disabled");

    $('#infoOperatetitle').text('编辑');
    $("#id").val(data.id);
    $("#memberId").val(data.memberId);
    $('#namebox').val(data.name);
    $('#selectRole').val(data.role.value);
    $('#sexbox').val(data.sex ? 1 : 0);
    $('#agebox').val(data.age);

    $('#enable').attr('onclick','enableEdit('+index+')');

    $(".log-window").css('display',"block");
    $("#infoOperate").css('display','block');

}

function enableEdit(index) {
    if(checkInput()){
        if ($("#password").val() != null && $("#password").val() != '') {
            $(" input[ name='password' ] ").val(hex_md5($("#password").val()));
        }
        $.ajax({
            type: 'POST',
            url: "/member/update.do",
            dataType: 'json',
            data: $("#info-form").serialize(),
            success: function (o) {
                dismiss();
                if (o.code === 'SUCCESS') {
                    alert('修改成功!');
                    $('#table').bootstrapTable('updateRow', {index: index, row: o.member});

                }else if(o.code === 'FAIL'){
                    alert('修改失败！' + o.msg == null ? '' : o.msg);
                    dismiss();
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                if (XMLHttpRequest.status == 401) {
                    alert("权限不足！！！")
                }
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

                    //删除一列数据成功在table中移除那行
                    $('#table').bootstrapTable('remove', {field: 'id', values: [data.id]});
                    alert("删除成功");
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                if (XMLHttpRequest.status == 401) {
                    alert("权限不足！！！")
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
                data:{
                    id:ids
                },
                traditional:true,
                success : function(o) {
                    console.log(o.code);
                    if (o.code === 'FAIL') {
                        alert("删除失败" );
                        dismiss();
                    }else if(o.code === 'SUCCESS'){

                        //多行删除成功在table中移除多行
                        $('#table').bootstrapTable('remove', {field: 'id', values: ids});
                        dismiss();
                        alert("删除成功");

                    }
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    if (XMLHttpRequest.status == 401) {
                        alert("权限不足！！！")
                    }
                }
            });
        }
    }
}

$('#searchbtn').click(function () {
    var info = $('#search').val();
    var fiel = $("#filed").val();

    $.ajax({
        type: 'POST',
        url: "/member/list.do",
        dataType: 'json',
        data: {
            field: fiel,
            content: info
        },
        success: function (data) {
            console.log(data);
            if (data.code === 'SUCCESS') {
                $('#table').bootstrapTable('removeAll');
                $('#table').bootstrapTable('append', data.list);
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            if (XMLHttpRequest.status == 401) {
                alert("权限不足！！！")
            }
        }
    })
});

getMemberList();
