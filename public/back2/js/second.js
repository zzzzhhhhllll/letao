$(function(){

    var currentPage = 1;
    var pageSize=5;

    render();

    function render(){

        $.ajax({
    
            type:"get",
            url:"/category/querySecondCategoryPaging",
            data:{
                page:currentPage,
                pageSize:pageSize,
            },
            dataType:"json",
            success:function(info){
    
                var htmlStr = template("secondTpl" , info);
    
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

    // 显示模态
    $("#btn-add").on("click" , function(){

        $("#addModal").modal("show");

        $.ajax({

            type:"get",
            url:"/category/querySecondCategoryPaging",
            data:{
                page:1,
                pageSize:100,
            },
            dataType:"json",
            success:function(info){

                var htmlStr = template("addTpl" , info);

                $(".dropdown-menu").html(htmlStr);

            }
        })
    })

    // 选择模式
    $(".dropdown-menu").on("click" , "a" , function(){

        var nowText = $(this).text();

        $(".dropdown-text").text(nowText);

        var id = $(this).data("id");

        $('[name="categoryId"]').val(id);

        $("#form").data("bootstrapValiator").updateStatus("categoryId" , "VALID");
    })

    // 文件上传
    $("#fileupload").fileupload({
        dataType:"json",
        //e：事件对象
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        done:function (e, data) {
          console.log(data);

          var newsrc = data.result.picAddr;

          $("#imgbox img").attr("src" , newsrc);

          $('[name="brandLogo"]').val(newsrc);

          $("#form").data("bootstrapValiator").updateStatus("brandLogo" , "VALID");
        }
    });

    //表单校验
    
    $('#form').bootstrapValidator({
        // 配置不校验的类型, 对 hidden 需要进行校验
        excluded: [],
    
        // 配置图标
        feedbackIcons: {
          valid: 'glyphicon glyphicon-ok',    // 校验成功
          invalid: 'glyphicon glyphicon-remove',   // 校验失败
          validating: 'glyphicon glyphicon-refresh'  // 校验中
        },
    
        // 配置校验字段
        fields: {
          categoryId: {
            validators: {
              notEmpty: {
                message: "请选择一级分类"
              }
            }
          },
          brandName: {
            validators: {
              notEmpty: {
                message: "请输入二级分类名称"
              }
            }
          },
          brandLogo: {
            validators: {
              notEmpty: {
                message: "请上传图片"
              }
            }
          }
        }
    });


    // 发送ajax请求

    $("#form").on("success.form.bv" , function(){

        $.ajax({

            type:"post",
            url:"/category/addSecondCategory",
            data:$("#form").serialize(),
            dataType:"json",
            success:function(info){
                if(info.success){

                    $("#addModal").modal("hide");

                    currentPage=1;
                    render();

                    $("#imgbox img").attr("src" , "../images/none.png");
                    $(".dropdown-text").text("请输入一级分类");

                }

            }
            
        })
    })
})