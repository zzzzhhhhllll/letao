// 进度条插件的基本使用

$(document).ajaxStart(function () {
    
    NProgress.start();
});

$(document).ajaxStop(function () {
    setTimeout(function(){

        NProgress.done();
    },)
});

$(function(){

    // 导航
    $(".category").on("click",function(){

        $(this).next().stop().slideToggle();
    })

    // 菜单栏

    $(".icon_menu").on("click",function(){

        $(".lt_main").toggleClass("hidemenu");
        $(".lt_aside").toggleClass("hidemenu");
        $(".lt_topbar").toggleClass("hidemenu");

    })

    // 退出功能

    $(".icon_logout").on("click",function(){

        $("#myModal").modal('show');
    })

    $("#confirm").on("click",function(){

        $.ajax({
            type:"get",
            url:"/employee/employeeLogout",
            dataType:"json",
            success:function(info){
                if(info.success){

                    location.href ="login.html";
                }
            }
        })
    })
})
