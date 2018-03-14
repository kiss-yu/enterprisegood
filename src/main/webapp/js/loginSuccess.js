var param = {};
var pagenumber = 1;
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
        url : '/member/list/'+ pagenumber +'.do',// 服务器数据的加载地址
        sidePagination : 'server',// 设置在哪里进行分页
        /*showRefresh: true, */ //显示刷新按钮
        contentType : 'application/json',// 发送到服务器的数据编码类型
        dataType : 'json',// 服务器返回的数据类型
        queryParams: function queryParams(params) {
            param.page = pagenumber;
            param.size=params.limit;
            param.sort = params.sort; // 排序列名
            param.order = params.order; // 排位命令（desc，asc）
            return param;
        },  // 请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
        selectItemName : '',// radio or checkbox 的字段名
        onLoadSuccess:function (backData) {
            console.log(backData);
            console.log(backData.list.length);
            showList(backData.list,param.size);
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
                return judgeRole(value);
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
                return "<span onclick='show("+JSON.stringify(row)+")'>查看</span>";
            }
        }]
        // 列配置项,详情请查看 列参数 表格
        /* 事件 */
    });
});
function judgeRole(role) {
    if(role == 0){
        return '系统管理员';
    }
    if(role == 1){
        return '合同部用户';
    }
    if(role == 2){
        return '销售部用户';
    }
    if(role == 3){
        return '客户部用户';
    }
    if(role == 4){
        return '客户';
    }
}
function showList(list,size) {
    if(list.length < size){

    }
}