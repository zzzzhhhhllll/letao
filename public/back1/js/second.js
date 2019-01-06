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
            url:"/category/querySecondCategoryPaging",
            data:{
                page:1,
                pageSize:100
            },
            dataType:"json",
            success:function(info){

                var htmlStr = template("addTpl" , info);
                $(".dropdown-menu").html(htmlStr);
            }
        })
    })

    // 文字选择
    $(".dropdown-menu").on("click" , "a" , function(){

        var txt = $(this).text();

        $(".btn-text").text(txt);
    })


    // 上传图片

    $("#fileupload").fileupload({
        dataType:"json",

        done:function (e, data) {
          console.log(data);

          var newsrc = data.result.picAddr;
          
          $("#img_box img").attr("src" , newsrc);
        }
  });

})