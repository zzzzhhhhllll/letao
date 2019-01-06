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

                var htmlStr = template("selectTpl" , info);

                $(".dropdown-menu").html(htmlStr);
            }
        })
    })

    // 选择
    $(".dropdown-menu").on("click" , "a" , function(){

        var txt = $(this).text();

        $("#dropdown-text").text(txt);
    })

    // 文件
    $("#fileupload").fileupload({
        dataType:'json',
        done:function(e,data){
            console.log(data);
            var picUrl = data.result.picAddr;
            $("#imgbox img").attr("src" , picUrl);
        }
    })

})