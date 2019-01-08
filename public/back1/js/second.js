$(function(){

    var currentPage=1;
    var pageSize = 5;

    render();

    function render(){

        $.ajax({
    
            type:"get",
            url:"/category/querySecondCategoryPaging",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            dataType:"json",
            success:function(info){
                console.log(info);
    
                var htmlStr = template("secondTpl" , info)
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

    // 模态框
    $("#btn-add").on("click" , function(){

        $("#secondModal").modal("show");

        $.ajax({

            type:"get",
            url:"/category/queryTopCategoryPaging",
            data:{
                page:1,
                pageSize:100
            },
            dataType:"json",
            success:function(info){
                console.log(info)
                var htmlStr = template("addTpl" , info);
                $(".dropdown-menu").html(htmlStr);
            }
        })
    })

    // 文字选择
    $(".dropdown-menu").on("click" , "a" , function(){

        var txt = $(this).text();

        $(".btn-text").text(txt);

        var id = $(this).data("id");

        console.log(txt);

        $('[name="categoryId"]').val(id);
        console.log(id);

        console.log( $('[name="categoryId"]'));

        $("#form").data('bootstrapValidator').updateStatus("categoryId", "VALID");
    })


    // 上传图片

    $("#fileupload").fileupload({
        dataType:"json",

        done:function (e, data) {
          console.log(data);

          var newsrc = data.result.picAddr;
          
          $("#img_box img").attr("src" , newsrc);

          $('[name="brandLogo"]').val(newsrc);

          $("#form").data('bootstrapValidator').updateStatus("brandLogo", "VALID");
          console.log($("#form").serialize());
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
    //发送后台

    $("#form").on("success.form.bv" , function(e){

        e.preventDefault();

        $.ajax({

            type:"post",
            url:"/category/addSecondCategory",
            data:$("#form").serialize(),
            dataType:"json",
            success:function(info){

                console.log(info);

                if(info.success){

                    $("#secondModal").modal("hide");

                    currentPage=1;
                    render();

                    $("#form").data("bootstrapValidator").resetForm(true);
                    $(".btn-text").text("请选择一级分类");
                    $("#img_box img").attr("src" , "../images/none.png");
                }
            }
        })

    })

})