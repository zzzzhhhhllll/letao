$(function(){

    var currentPage=1;
    var pageSize=5;

    render();
    
    function render(){

        $.ajax({
    
            type:"get",
            url:"/category/queryTopCategoryPaging",
            data:{
                page:currentPage,
                pageSize:pageSize,
            },
            dataType:"json",
            success:function(info){
                console.log(info);
    
                var htmlStr = template("fristTpl" , info);
    
                $(".lt_content tbody").html(htmlStr);
    
                $("#pagintor").bootstrapPaginator({
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

    // 模态

    $(".categoryBtn").on("click" , function(){

        $("#categoryModal").modal("show");

    })

    // 规则

    $('#form').bootstrapValidator({

        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        fields:{
            categoryName:{
                validators: {
                    notEmpty: { 
                            message: '请输入一级分类名称'
                        }
                    }
                }
            }
    })
    


    // 后台请求
    $('#form').on("success.form.bv", function( e ) {

        e.preventDefault();

        $.ajax({
            type:"post",
            url:"/category/addTopCategory",
            data:$('#form').serialize(),
            dataType:"json",
            success:function(info){

                console.log(info);
                if(info.success){

                    $("#categoryModal").modal("hide");

                    currentPage =1;
                    render();

                    $('#form').data("bootstrapValidator").resetForm(true);
                }
            }
        })

    })

    
})

    