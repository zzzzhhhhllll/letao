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
        }
  });
})