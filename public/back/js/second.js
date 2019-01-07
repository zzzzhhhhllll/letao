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
                pageSize:pageSize,
            },
            dataType:"json",
            success:function(info){
    
                console.log(info);
    
                var htmlStr = template("secondTpl" , info);
    
                $("tbody").html(htmlStr);
    
                $("#pagintor").bootstrapPaginator({
    
                    bootstrapMajorVersion:3,
                    currentPage:info.page,
                    totalPage:Math.ceil(info.total/info.size),
                    size:"small",
                    onPageClicked:function(a,b,c,page){
                        currentPage = page
                        render();
                    }
                })
            }
    
        })
    }


    // 模态框

    $(".secondBtn").on("click" , function(){

        $("#secondModal").modal("show");

        $.ajax({
            type:"get",
            url:"/category/querySecondCategoryPaging",
            data:{
                page:1,
                pageSize:100,
            },
            dataType:"json",
            success:function(info){

                console.log(info);
                var htmlStr = template("selectTpl" , info);

                $(".dropdown-menu").html(htmlStr);
            }
        })
    })

    // 选择
    $(".dropdown-menu").on("click" , "a" , function(){

        var txt = $(this).text();

        $("#dropdown-text").text(txt);

        var id = $(this).data("id");

        console.log(id);

        $('[name="categoryId"]').val(id);

        $("#form").data("bootstrapValidator").updateStatus("categoryId", "VALID")
    })  

    // 文件
    $("#fileupload").fileupload({
        dataType:'json',
        done:function(e,data){
            console.log(data);
            var picUrl = data.result.picAddr;
            $("#imgbox img").attr("src" , picUrl);

            $('[name="brandLogo"]').val(picUrl);

            $("#form").data("bootstrapValidator").updateStatus("brandLogo", "VALID")
        }
    })

    //表单校验
    $("#form").bootstrapValidator({

        excluded: [],

        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        fields:{
            categoryId:{
                validators:{
                    notEmpty:{
                        message:"请选择一级分类"
                    }
                }
            },

            brandName:{
                validators:{
                    notEmpty:{
                        message:"请选择二级分类"
                    }
                }
            },

            brandLogo:{
                validators:{
                    notEmpty:{
                        message:"请传入图片"
                    }
                }
            }
        }
    })


    // 上传内容
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
                    $("#dropdown-text").text("请选择一级分类");
                    $("#imgbox img").attr("src" , "../images/none.png");
                }
            }
        })

    })

})