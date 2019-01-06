
$(function(){

    var currentPage =1;
    var pageSize = 5;
    render();

    function render(){

        $.ajax({
        
            type:"get",
            url:"/user/queryUser",
            data:{
                page:currentPage,
                pageSize:pageSize,
            },
            dataType:"json",
            success:function(info){
        
                console.log(info);
    
                var htmlStr = template("userTpl" , info);
    
                $("tbody").html(htmlStr);
    
                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:info.page,
                    totalPages:Math.ceil(info.total/info.size),
                    size:"small",
                    onPageClicked:function(a, b, c,page){
                      currentPage = page;
                      render();
                    }
                  });
            }
        
        })
    }

    // 模态
    var currentId;
    var isDelete;
    $("tbody").on("click" , ".btn" ,function(){

        $("#userModal").modal("show");

        currentId = $(this).parent().data("id");

        isDelete = $(this).hasClass("btn-danger") ? 0 : 1;
        
    })


    // 禁用

    $("#submit_btn").on("click" , function(){

        $.ajax({
            type:"post",
            url:"/user/updateUser",
            data:{
               id:currentId,
               isDelete: isDelete 
            },
            dataType:"json",
            success:function(info){

                if(info.success){

                    $("#userModal").modal("hide");
                    render();
                }
            }
        })
    })


})

