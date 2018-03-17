var param = {};

function legal(value) {
    try {
        var role = JSON.parse(sessionStorage.getItem("member")).role.value;
        for (var i = 0;i < value.length;i ++) {
            if (value[i] == role) {
                return true;
            }
        }
    }catch (e){
    }
    return false;
}
$(function() {
    $('#addbtn').click(function (){
        role();
        $('#finish').val('');
        $('#infoOperatetitle').text('添加');

        showData("",1);

        $('#enable').attr('onclick','enableAdd()');
        $('#enable').css('display','block');
        $(".log-window").css('display',"block");
        $("#infoOperate").css('display','block');
    });
    getContractList();

    if (legal([0,1])) {
        $(".role_controller").css("display","block");
    }
    if (legal([4])) {
        $(".add_role_controller").css("display","block");

    }
});
function role() {

    if (legal([4])) {
        $('.role_user').hide();
    }
    if (legal([1])) {
        $('.role_contract').hide();
    }
}
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
            width : '1%'// 宽度
        },{
            title: '序号',//标题  可不加
            align : 'center',// 水平居中显示
            valign : 'middle',// 垂直居中显示
            width : '1%',// 宽度
            formatter: function (value, row, index) {
                return index+1;
            }
        }, {
            field : 'id',// 返回值名称
            title : 'id',// 列名
            align : 'center',// 水平居中显示
            valign : 'middle',// 垂直居中显示
            width : '1%',// 宽度
            visible : false
        }, {
            field : 'contractId',// 返回值名称
            title : '合同编号',// 列名
            align : 'center',// 水平居中显示
            valign : 'middle',// 垂直居中显示
            width : '5%'// 宽度
        }, {
            field : 'createDate',// 返回值名称
            title : '创建日期',// 列名
            align : 'center',// 水平居中显示
            valign : 'middle',// 垂直居中显示
            width : '10%'// 宽度
        },  {
            field : 'finish',// 返回值名称
            title : '状态',// 列名
            align : 'center',// 水平居中显示
            valign : 'middle',// 垂直居中显示
            width : '10%',// 宽度
            formatter: function (value, row, index) {
                return value === true ? '已签约' : '未签约';
            }
        }, {
            field : 'customer.name',// 返回值名称
            title : '客户姓名',// 列名
            align : 'center',// 水平居中显示
            valign : 'middle',// 垂直居中显示
            width : '5%'// 宽度
        }, {
            field : 'customer.memberId',// 返回值名称
            align : 'center',// 水平居中显示
            visible : false
        }, {
            field : 'admin.name',// 返回值名称
            title : '管理姓名',// 列名
            align : 'center',// 水平居中显示
            valign : 'middle',// 垂直居中显示
            width : '5%'// 宽度
        },{
            field : 'admin.memberId',// 返回值名称
            align : 'center',// 水平居中显示
            visible : false
        }, {
            title : '操作',// 列名
            align : 'center',// 水平居中显示
            valign :'middle',// 垂直居中显示
            width : '10%',// 宽度
            formatter: function (value, row, index) {
                return "<input class='btn btn-info' type='button' style='margin-right: 5px' onclick='show("+JSON.stringify(row)+")' value='详情'>" +
                    (legal([0,1])?"<input class='btn btn-info' type='button' style='margin-right: 5px' onclick='edit("+JSON.stringify(row)+","+index +")' value='编辑'>":"") +
                    (legal([0,1]) ?"<input class='btn btn-danger' type='button' onclick='del("+JSON.stringify(row)+")' value='删除'>" : "") +
                    (!row.finish && legal([0,1])?  ("<input class='btn btn-info' type='button'  style='margin-left: 5px' onclick='signing("+JSON.stringify(row)+","+index +")' value='签约'>") : "");
            }
        }]
        // 列配置项,详情请查看 列参数 表格
        /* 事件 */
    });
}
function signing(data,index) {
    $('#id').val(data.id);
    $('#contractId').val(data.contractId);
    $('#createDate').val(data.createDate);
    $('#finish').val(1);
    $('#customerId').val(data.customer.memberId);
    $('#customerName').val(data.customer.name);
    $('#adminId').val(data.admin.memberId);
    $('#adminName').val(data.admin.name);
    $.ajax({
        type: 'POST',
        url: "/contract/signing.do",
        dataType: 'json',
        data: $("#info-form").serialize(),
        success: function (o) {
            if (o.code == 'SUCCESS') {
                alert('签约成功!' );
                data.finish = true;
                //当前行修改成功后再table中修改改行
                $('#table').bootstrapTable('updateRow', {index: index, row: data});
            }else if(o.code == 'FAIL'){
                alert('签约失败！' + o.msg == null ? "" : o.msg);
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
                    $('#enable').removeAttr('onclick');
                    $("#infoOperate").css('display','none');
                    addGood(false);
                    //添加成功后再table增加一行数据
                    $('#table').bootstrapTable('prepend', o.contract);
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
    if($('#contractId').val() == null || $('#contractId').val() == ''){
        alert('合同编号不合法');
        return false;
    }
    if($('#createDate').val() == null || $('#createDate').val() == ''){
        alert('请输入创建日期！');
        return false;
    }
    if($('#customerId').val() == null || $('#customerId').val() == ''){
        alert('签约客户不合法');
        return false;
    }
    return true;
}
/*展示方法*/
function show(data) {

    $('#infoOperatetitle').text('详情');
    $('#enable').css('display','none');
    $(".log-window").css('display',"block");
    $("#infoOperate").css('display','block');
    $("#contractId,#createDate,#finish,#customerId,#adminId,#goodButton,#adminName,#customerName").attr("disabled","true");

    showData(data.goodCountList,0);

    $('#contractId').val(data.contractId);
    $('#createDate').val(data.createDate);
    $('#finish').val(data.finish ? 1 : 0);
    $('#customerId').val(data.customer.memberId);
    $('#customerName').val(data.customer.name);
    $('#adminId').val(data.admin.memberId);
    $('#adminName').val(data.admin.name);

}


function dismiss() {

    $('#contractId').val('');
    $('#createDate').val('');
    $('#finish').val('');
    $('#customerId').val('');
    $('#customerName').val('');
    $('#adminId').val('');
    $('#adminName').val('');

    $("#contractId,#createDate,#finish,#customerId,#adminId,#goodButton,#customerName,#adminName").removeAttr("disabled");
    $('#goodsList').html("");
    $(".log-window").css('display',"none");
    $("#infoOperate").css('display','none');
    addGood(false);
    $('#enable').css('display','block');
}

function edit(data,index) {

    $('#infoOperatetitle').text('编辑');
    role();
    showData(data.goodCountList,1);

    $('#id').val(data.id);
    $('#contractId').val(data.contractId);
    $('#createDate').val(data.createDate);
    $('#finish').val(data.finish ? 1 : 0);
    $('#customerId').val(data.customer.memberId);
    $('#customerName').val(data.customer.name);
    $('#adminId').val(data.admin.memberId);
    $('#adminName').val(data.admin.name);

    $('#enable').attr('onclick','enableEdit(' + index + ')');

    $("#infoOperate").css('display','block');

}
function enableEdit(index) {
    if(checkInput()){
        $.ajax({
            type: 'POST',
            url: "/contract/update.do",
            dataType: 'json',
            data: $("#info-form").serialize(),
            success: function (o) {
                if (o.code == 'SUCCESS') {
                    //当前行修改成功后再table中修改改行
                    $('#table').bootstrapTable('updateRow', {index: index, row: o.contract});
                    $('#enable').removeAttr('onclick');
                    $("#infoOperate").css('display','none');
                    addGood(false);
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
            url: '/contract/delete.do?id=' + data.id,
            success : function(o) {
                if (o.code == 'FAIL') {
                    alert("删除失败");
                }else if(o.code == 'SUCCESS'){
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
                        alert("删除成功");
                        //删除一列数据成功在table中移除那行
                        $('#table').bootstrapTable('remove', {field: 'id', values: ids});
                    }
                }
            });
        }
    }
}
$('#searchbtn').click(function () {
    $.ajax({
        type: 'post',
        url: "/contract/list.do",
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
function getMemberMsg(id,input) {
    $.ajax({
        type: 'get',
        url: "/member/-1.do?memberId=" + id,
        dataType: 'json',
        success: function (o) {
            if (o.member != null) {
                input.val(o.member.name);
            }else {
                input.val("不存在用户");
            }
        }
    })
}
function addGood(b) {
    b ? $("#good-add").show() : $("#good-add").hide();
}

var goodName;

function setGood() {
    var count = $("#count");
    var btn = $("#goodAddButton");
    var inventory = $("#good-inventory");
    $.ajax({
        type: 'get',
        url: "/goods/-1.do?goodId=" + $("#input-goodId").val(),
        dataType: 'json',
        success: function (o) {
            if (o.goods != null) {
                inventory.val(o.goods.inventory - count.val());
                if (inventory.val() > 0 && count.val() > 0) {
                    btn.removeAttr("disabled");
                    goodName = o.goods.name;
                }else {
                    $("#goodAddButton").attr("disabled","true");
                }
            }else {
                inventory.val("0");
            }
        }
    })
}

function showData(listData,num) {
    var temp = [], showNum = listData.length;

    temp.push('<table class="table">');
    temp.push('<thead><tr><th>商品名</th><th>数量</th></tr><tbody>');
    if(num===0){//看
        for (var i = 0; i < showNum; i++) {
            temp.push("<tr id='"+ listData[i].goods.goodId +"'><td>" + listData[i].goods.name + "</td><td>" + listData[i].count +  "</td>");
        }
    }
    else if(num===1){//改
        for (var i = 0; i < showNum; i++) {
            temp.push("<tr><td>" + listData[i].goods.name + "</td><td>" + listData[i].count
                + "</td><td><input type='button' class='btn btn-danger' value='删除'>" +
                +  "</td>");
        }
    }
    temp.push('</tbody></table>');

    $('#goodsList').html(temp.join(''));
}

/*function addGoodItem(good,btn) {
    var goodId = good == null ? $("#input-goodId").val() : good.goods.goodId;
    var count = good == null ? $("#count").val() : good.count;
    var name = good == null ? goodName : good.goods.name;
    var dom = "" +
        "<li class='list-group-item ' id='" + goodId + "'>\n" +
        "<input hidden name='goodId' value='" + goodId + "'>\n" +
        "<input hidden name='count' value='" + count + "'>\n" +
        "<span class='good-name'>产品名:</span>\n" +
        "<span class='goodName'>" + name + "</span>\n" +
        "<span class='good-count'>数量:</span>\n" +
        "<span class='goodCount'>" + count + "</span>\n" +
        (!btn ? "" : "<input type='button' class='btn btn-danger right' value='移除' onclick='removeGood(\"" + goodId + "\")'>") +
        "</li>";
    $("#goodsListUl").append(dom);
    $("#count").val(0);
    $("#input-goodId").val('');
    $("#good-inventory").val(0);
    $("#goodAddButton").attr("disabled","true");

}*/
function removeGood(btn) {
    $("#goodsList").children("#" + btn).remove();
}