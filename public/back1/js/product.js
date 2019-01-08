$(function(){

    var currentPage = 1;
    var pageSize = 2;

    var picArr=[];

    render();

    function render(){

        $.ajax({

            type:"get",
            url:"/product/queryProductDetailList",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            dataType:"json",
            success:function(info){
                console.log(info);
                var htmlStr = template("productTpl" , info);
                $("tbody").html(htmlStr);

                $("#pagintor").bootstrapPaginator({

                    bootstrapMajorVersion:3,
                    currentPage:info.page,
                    totalPages:Math.ceil(info.total/info.size),
                    size:"small",
                    onPageClicked:function(a,b,c,page){

                        currentPage = page;

                        render();
                    }
                })

            }
        })
    }


    // 添加商品显示模态框
    $("#btn-add").on("click" , function(){

        $("#addModal").modal("show");

        $.ajax({

            type:"get",
            url:"/category/queryTopCategoryPaging",
            data:{
                page:1,
                pageSize:100
            },
            dataType:"json",
            success:function(info){
                console.log(info);

                var htmlStr = template("selectTpl" , info);

                $(".dropdown-menu").html(htmlStr);

            }
        })
    })

    // 给a注册点击事件

    $(".dropdown-menu").on("click" , "a " , function(){

        var txt = $(this).text();

        $(".btn-text").text(txt);

        var id = $(this).data("id");

        $('[name="categoryId"]').val(id);

        $("#form").data("bootstrapValidator").updateStatus("categoryId", "VALID")

    })

    // 上传图片

    $("#fileupload").fileupload({

        dataType:"json",
        done:function(e,data){

            var picObj = data.result;

            picArr.unshift(picObj);
            
            picSrc = picObj.picAddr;

            $("#img_box").prepend('<img src="'+picSrc+'" alt="" style="width: 100px">');

            if(picArr.length > 3){

                picArr.pop();

                $("#img_box img:last-of-type").remove();
            }

            if(picArr.length === 3){

                $('#form').data("bootstrapValidator").updateStatus("picStatus", "VALID");
            }
        }
    })

    // 表单验证

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
                        message: '请选择一级分类'
                    }
                }
            },
            proName:{
                validators:{
                    notEmpty:{
                        message: '请输入商品名称'
                    }
                }
            },
            proDesc:{
                validators:{
                    notEmpty:{
                        message: '请输入商品描述'
                    }
                }
            },
            num:{
                validators:{
                    notEmpty:{
                        message: '请输入商品库存'
                    },
                    regexp: {
                        regexp: /^[1-9]\d*$/,
                        message: '商品库存格式, 必须是非零开头的数字'
                    }
                }
            },
            size:{
                validators:{
                    notEmpty:{
                        message: '请输入商品尺码'
                    },
                    regexp: {
                        regexp: /^\d{2}-\d{2}$/,
                        message: '必须是 xx-xx 的格式, xx为两位的数字, 例如: 36-44'
                    }
                }
            },
            oldPrice:{
                validators:{
                    notEmpty:{
                        message: '请输入商品原价'
                    }
                }
            },
            Price:{
                validators:{
                    notEmpty:{
                        message: '请输入商品现价'
                    }
                }
            },
            picStatus:{
                validators: {
                    notEmpty: {
                      message: "请上传三张图片"
                    }
                }
            }
            
        }
    })

    //向后台发送请求

    $("#form").on("success.form.bv" , function(e){

        e.preventDefault();

        var record = $("#form").serialize();

        record+="&picArr="+JSON.stringify(picArr);

        $.ajax({
            type:"post",
            url:"/product/addProduct",
            dataType:"json",
            data:record,
            success:function(info){

                console.log(info);
                if(info.success){

                    $("#addModal").modal("hide");

                    currentPage = 1;

                    render();

                    $("#form").data('bootstrapValidator').resetForm();

                    $("#img_box img").remove();

                    $(".btn-text").text("请选择一级分类");
                }
            }
        })
    })

})