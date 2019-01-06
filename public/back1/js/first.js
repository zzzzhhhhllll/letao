$(function(){

    var currentPage = 1;
    var pageSize = 5;

    render();

    function render(){

        $.ajax({
            type:"get",
            url:"/category/queryTopCategoryPaging",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            dataType:"json",
            success:function(info){
                console.log(info);
    
                var htmlStr = template("firstTpl" , info);
                $("tbody").html(htmlStr);
    
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage:info.page,//当前页
                    totalPages:Math.ceil(info.total/info.size),//总页数
                    size:"small",//设置控件的大小，mini, small, normal,large
                    onPageClicked:function(a, b, c,page){
                      //为按钮绑定点击事件 page:当前点击的按钮值
                      currentPage = page;
                      render();
                    }
                  });
            }
        })
    }


    // 点击显示模态框
    $("#btn-add").on("click" , function(){

        $("#addModal").modal("show");
    })

    // 表单验证

    $('#form').bootstrapValidator({
        // 配置图标
        feedbackIcons: {
          valid: 'glyphicon glyphicon-ok',    // 校验成功
          invalid: 'glyphicon glyphicon-remove',   // 校验失败
          validating: 'glyphicon glyphicon-refresh'  // 校验中
        },
        // 校验字段, 一定要先配置 input 的 name
        fields: {
          categoryName: {
            validators: {
              notEmpty: {
                message: "请输入一级分类名称"
              }
            }
          }
        }
      });

    // 提交

    $("#form").on('success.form.bv', function (e) {
        e.preventDefault();
        
        $.ajax({
            type:"post",
            url:"/category/addTopCategory",
            data:$("#form").serialize(),
            dataType:"json",
            success:function(info){
                console.log(info);
                if(info.success){
                    $("#addModal").modal("hide");
                    currentPage=1;
                    render();
                }
            }
        })
    });


})