$(function() {
    $('#table').bootstrapTable({
        striped : true,// 隔行变色效果
        pagination : true,// 在表格底部显示分页条
        pageSize : 5,// 页面数据条数
        pageNumber : 1,// 首页页码
        pageList : [3,5,10,20],// 设置可供选择的页面数据条数
        clickToSelect : false,// 设置true 将在点击行时，自动选择rediobox 和 checkbox
        cache : false,// 禁用 AJAX 数据缓存
        sortName : 'id',// 定义排序列
        sortOrder : 'asc',// 定义排序方式 getRceiptlistWithPaging
        url : 'account/getaccounts',// 服务器数据的加载地址
        sidePagination : 'server',// 设置在哪里进行分页
        /*showRefresh: true, */ //显示刷新按钮
        contentType : 'application/json',// 发送到服务器的数据编码类型
        dataType : 'json',// 服务器返回的数据类型
        queryParams: function queryParams(params) {
            param.row=params.limit;
            param.page=params.offset;
            param.sort = params.sort; // 排序列名
            param.order = params.order; // 排位命令（desc，asc）
            param.type = type;
            param.userID = userID;
            return param;
        },  // 请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
        selectItemName : '',// radio or checkbox 的字段名
        onLoadSuccess : function(data) {
            console.log(data);
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
            width : '5',// 宽度
            formatter: function (value, row, index) {
                return index+1;
            }
        }, {
            field : 'ID',// 返回值名称
            title : 'ID',// 列名
            align : 'center',// 水平居中显示
            valign : 'middle',// 垂直居中显示
            width : '1',// 宽度
            visible : false
        }, {
            field : 'roleID',// 返回值名称
            title : 'roleID',// 列名
            align : 'center',// 水平居中显示
            valign : 'middle',// 垂直居中显示
            width : '1',// 宽度
            visible : false
        }, {
            field : 'departmentID',// 返回值名称
            title : 'departmentID',// 列名
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
            field : 'loginName',// 返回值名称
            title : '账号名',// 列名
            align : 'center',// 水平居中显示
            valign : 'middle',// 垂直居中显示
            width : '15',// 宽度
        }, {
            field : 'remark',// 返回值名称
            title : '描述',// 列名
            align : 'center',// 水平居中显示
            valign : 'middle',// 垂直居中显示
            width : '15',// 宽度
            visible : false
        }, {
            field : 'role',// 返回值名称
            title : '角色',// 列名
            align : 'center',// 水平居中显示
            valign : 'middle',// 垂直居中显示
            width : '5',// 宽度
        }, {
            field : 'phoneNumber',// 返回值名称
            title : '联系方式',// 列名
            align : 'center',// 水平居中显示
            valign : 'middle',// 垂直居中显示
            width : '14',// 宽度
        }, {
            field : 'isParent',// 返回值名称
            title : '联系方式',// 列名
            align : 'center',// 水平居中显示
            valign : 'middle',// 垂直居中显示
            width : '1',// 宽度
            visible : false
        }, {
            field : 'company',// 返回值名称
            title : '所属单位',// 列名
            align : 'center',// 水平居中显示
            valign : 'middle',// 垂直居中显示
            width : '15',// 宽度
        },{
            field : 'createTime',// 返回值名称
            title : '创建时间',// 列名
            align : 'center',// 水平居中显示
            valign :'middle',// 垂直居中显示
            width : '10',// 宽度
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