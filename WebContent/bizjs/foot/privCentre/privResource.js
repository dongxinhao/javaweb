/**
 * Created by Administrator on 2017/3/11.
 */
/**
 * Created by Administrator on 2017/3/9.
 */
/**
 * Created by Administrator on 2017/3/6.
 */
$(function () {
    initFootImgGrid();
    queryFootImg();
})

function initFootImgGrid() {
    $("#privImgGrid").datagrid({
        singleSelect: true,
        fitColumns: "true",
        fit: true,
        autoRowHeight: true,
        //是否分页
        pagination: true,
        onDblClickRow: true,
        nowrap: false,

        onRowContextMenu: onRowContextMenu,
        //每页多少条
        pageSize: 10,

        pageList: [3, 5, 10, 20],
        columns: [[
            {
                field: 'imgURL', title: '图片文件', width: 100, align: 'center',
                formatter: function (value, row, index) {

                    return "<embed  loop='2'  style=' ;width: 100px;' src='" + path + "/upload/" + value + "'  ></embed>";
                }


            },
            {field: 'imgName', title: '图片名称', width: 100, align: 'center'},
            {field: 'type', title: '类型', width: 100, align: 'center'},


            {field: 'orders', title: '时尚排序', width: 100, align: 'center'},

            {
                field: 'dbid', title: '下载', width: 100, align: 'center',
                formatter: function (value, row, index) {
                    return "<a href=" + path + "/privFoot/imgDown?dbid=" + value + ">下载</a>";
                }
            }


        ]],
        onDblClickRow: function (rowIndex, rowData) {
            openImg(rowIndex, rowData)
        }

    });
}
//搜索
function queryFootImg() {
    var userName = userNameCenter;
    var imgName = $("#queryImgName").textbox("getValue");
    var type = $("#queryType").textbox("getValue");
    var data = {

        userName: userName,
        imgName: imgName,
        type: type
    };
    //console.log(data);
    $("#privImgGrid").datagrid("options").url = path + "/privFoot/queryFootImg";
    $("#privImgGrid").datagrid("load", data);
}
$(function () {
    $("#img_add").click(function () {
        $("#addCPM").window({
            modal: true,
            closed: true,
            title: "图片添加窗口",
            iconCls: 'icon-save',
            height: 350,
            width: 290,
            collapsible: false,
            minimizable: false,
            maximizable: false,

            onBeforeClose: function () {

            }
        })
        $("#addCPM").window('open');
    })
})


//刷新
$(function () {
    $("#refresh").click(function () {
        window.location.reload();
        initFootImgGrid();
    })
})
//右击事件
function onRowContextMenu(e, rowIndex, rowData) {
    if (rowData) {
        e.preventDefault();
        $(this).datagrid("selectRow", rowIndex);
        $('#m1').menu('show', {left: e.pageX, top: e.pageY});
    }
}

//编辑
$(function () {
    $("#img_update").click(function () {
        $("#edCPM").window({
            modal: true,
            closed: true,
            closable: false,
            title: "图片添加窗口",
            iconCls: 'icon-save',
            height: 350,
            width: 290,
            collapsible: false,
            minimizable: false,
            maximizable: false,
            footer: '#footer1',
            onBeforeClose: function () {

            }
        })
        var $gs = $("#privImgGrid").datagrid("getSelected");
        $("#img").attr("src", path + "/upload/" + $gs.imgURL);
        $("#imgName").textbox("setValue", $gs.imgName);
        $("#type").textbox("setValue", $gs.type);
        $("#orders").numberbox("setValue", $gs.orders);
        $("#dbid").text($gs.dbid);
        $("#edCPM").window('open');
    })
})
//关闭窗口

function closeEd() {
    $("#dbid").text("");
    $("#imgName").textbox("setValue", "");
    $("#type").textbox("setValue", "");
    $("#orders").numberbox("setValue", "");
    $("#edCPM").window('close');
}

//提交更改
$(function () {
    $("#edSubmit").click(function () {
        var imgName = $("#imgName").textbox("getValue");
        var type = $("#type").textbox("getValue");
        var orders = $("#orders").numberbox("getValue");
        var dbid = $("#dbid").text();
        data = {
            imgName: imgName,
            type: type,
            orders: orders,
            dbid: dbid
        }
        //console.log(data)
        var url = path + "/privFoot/updateFootImg"
        $.ajax({
            data: data,
            url: url,
            dataType: "json",
            method: "post",
            success: function (result) {
                if (result.success) {
                    $.messager.alert("提示", "操作成功！")
                } else {
                    $.messager.alert("提示", "网络异常！")
                }
                $("#edCPM").window('close');
                initFootImgGrid();
            }
        })
    })
})
//图片窗

function openImg(rowIndex, rowData) {
    $("#imgCPM").window({
        modal: true,
        closed: true,
        title: "图片窗口",
        iconCls: 'icon-save',
        fit: true,
        collapsible: false,
        minimizable: false,
        maximizable: false,
        onBeforeClose: function () {

        }
    })
    $("#img1").attr("src", path + "/upload/" + rowData.imgURL)
    $("#imgCPM").window('open');
}
//删除
$(function () {
    $("#img_del").click(function () {
        $.messager.confirm("删除", "是否删除", function (r) {

            if (!r) {

                return;
            }
            var $gs = $("#privImgGrid").datagrid("getSelected");
            var dbid = $gs.dbid;
            var data = {
                dbid: dbid
            }
            //console.log(data)
            var url = path + "/privFoot/deleteFootImg"
            $.ajax({
                data: data,
                url: url,
                dataType: "json",
                method: "post",
                success: function (result) {
                    if (result.success) {
                        $.messager.alert("提示", "删除成功")
                    } else {
                        $.messager.alert("提示", "网络异常")
                    }
                    initFootImgGrid();
                }
            })
        })
    })
})
//分享窗口
$(function () {
    $("#img_share").click(function () {

        $("#shareCPM").window({
            modal: true,
            closed: true,
            closable: false,
            title: "分享窗口",
            iconCls: 'icon-save',
            height: 200,
            width: 300,
            collapsible: false,
            minimizable: false,
            maximizable: false,
            footer: '#footer',
            onBeforeClose: function () {
                $(".emptyS").hide();
            }
        })
        getShareUser();
        $('#shareCPM').window('open');


    })
})
function getShareUser() {
    $('#shareCombobox').combobox({
        url: path + '/privFoot/getShareUser?userName='+userNameCenter,
        method: 'get',
        valueField: 'userName',
        panelHeight: 80,
        groupField: 'group',
        textField: 'userName',
        labelPosition: 'top',

    });

}
$(function () {
    $("#close").click(function () {
        $('#shareCPM').window('close');
    })
})
//分享保存
$(function () {
    $("#shareSubmit").click(function () {
        var $gs = $("#privImgGrid").datagrid("getSelected");
        var $shareUser=userNameCenter;
        var $imgURL=$gs.imgURL;
        var $imgName=$gs.imgName;
        var $userName=$("#shareCombobox").combobox('getValue');

        if($userName!=""){
            var data={
                shareUser:$shareUser,
                imgURL:$imgURL,
                imgName:$imgName,
                userName:$userName
            }
           // console.log(data)
            var url= path + '/privFoot/shareImg';
            $.ajax({
                data:data,
                url:url,
                dataType:"json",
                method:"post",
                success:function (result) {
                    if(result.success){
                        $.messager.alert("提示","分享成功");
                    }else{
                        $.messager.alert("提示","网络异常");
                    }
                    $('#shareCPM').window('close');
                }
            })
        }
    })
})