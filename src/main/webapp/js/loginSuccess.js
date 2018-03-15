var param = {};
$(function() {
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
        url : '/member/list.do',// 服务器数据的加载地址
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
            console.log(backData);
            console.log(backData.list.length);
            $('#table').bootstrapTable('removeAll');
            $('#table').bootstrapTable('append', backData.list);
        },
        // data:[{"id":1,"memberId":"1","password":"123456","name":"1","role":1,"sex":true,"age":1},{"id":2,"memberId":"2","password":"222222","name":"2","role":2,"sex":true,"age":1},{"id":3,"memberId":"admin","password":"21232f297a57a5a743894a0e4a801fc3","name":"管理员","role":0,"sex":true,"age":1}],
        columns : [ {
            checkbox : true,
            align : 'center',// 水平居中显示
            valign : 'middle',// 垂直居中显示
            width : '2',// 宽度
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
            width : '10',// 宽度
        },  {
            field : 'role',// 返回值名称
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
                return value == true ? '男' : '女';
            }
        }, {
            field : 'age',// 返回值名称
            title : '年龄',// 列名
            align : 'center',// 水平居中显示
            valign : 'middle',// 垂直居中显示
            width : '5',// 宽度
        },{
            field : '',// 返回值名称
            title : '操作',// 列名
            align : 'center',// 水平居中显示
            valign :'middle',// 垂直居中显示
            width : '5',// 宽度
            formatter: function (value, row, index) {
                return "<button onclick='show("+JSON.stringify(row)+")'>查看</button>" +
                    "<button onclick='edit("+JSON.stringify(row)+")'>编辑</button>" +
                    "<button onclick='del("+JSON.stringify(row)+")'>删除</button>";
            }
        }]
        // 列配置项,详情请查看 列参数 表格
        /* 事件 */
    });
    $('#goodsinfo').click(function (){
        location.href = "../html/goodsPage.html";
    });
});

function getRole(data) {

    if(data == 0){
        return '系统管理员';
    }else if(data == 1){
        return '合同部用户';
    }else if(data == 2){
        return '销售部用户';
    }else if(data == 3){
        return '客户部用户';
    }else if(data == 4){
        return '用户';
    }else if(data == '系统管理员'){
        return 0;
    }else if(data == '合同部用户'){
        return 1;
    }else if(data == '销售部用户'){
        return 2;
    }else if(data == '客户部用户'){
        return 3;
    }else if(data == '用户'){
        return 4;
    }
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

    $('#infoOperatetitle').text('查看');
    $("#namebox").attr("disabled","true");
    $("#selectRole").attr("disabled","true");
    $("#sexbox").attr("disabled","true");
    $("#agebox").attr("disabled","true");

    $('#namebox').val(data.name);
    $('#selectRole').val(getRole(data.role));
    $('#sexbox').val(data.sex == true? '男':'女');
    $('#agebox').val(data.age);
    $('#enable').css('display','none');
    $("#infoOperate").css('display','block');
}
function dismiss() {
    $("#infoOperate").css('display','none');
    $('#enable').css('display','block');
}
function edit(data) {

    $('#infoOperatetitle').text('编辑');
    $("#namebox").removeAttr("disabled");
    $("#selectRole").removeAttr("disabled");
    $("#sexbox").removeAttr("disabled");
    $("#agebox").removeAttr("disabled");
    $("#id").val(data.id);
    $("#memberId").val(data.memberId);
    $('#namebox').val(data.name);
    $('#selectRole').val(data.role);
    $('#sexbox').val(data.sex ? 0 : 1);
    $('#agebox').val(data.age);

    $('#enable').attr('onclick','enableEdit()');

    $("#infoOperate").css('display','block');

}
function enableEdit() {
    if(checkInput()){
        // var membermodel = {};
        // membermodel.id = data.id;
        // membermodel.memberId = data.memberId;
        // membermodel.password = data.password;
        // membermodel.name = $("#namebox").val();
        // membermodel.role = getRole($('#selectRole').val());
        // membermodel.sex = $('#sexbox').val() == '男'? true: false;
        // membermodel.age = data.age;
        $.ajax({
            type: 'put',
            url: "/member/update.do",
            dataType: 'json',
            data: $("#info-form").serialize(),
            success: function (data) {
                if (data == 1) {
                    console.log(data.member);
                    alert('修改成功!');
                    $('#enable').removeAttr('onclick');
                    $("#infoOperate").css('display','none');
                }else{
                    alert('修改失败！');
                }
            },
            error: function () {
            }
        });
    }
}
function del(data) {

}