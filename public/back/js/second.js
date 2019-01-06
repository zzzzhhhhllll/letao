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

})