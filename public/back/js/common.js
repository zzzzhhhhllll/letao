
// 进度条
$(document).ajaxStart(function(){
    NProgress.start();
});

$(document).ajaxStop(function(){
    setTimeout(function(){

        NProgress.done();
        
    },500)
})





$(function(){

    $(".category").on("click" , function(){
        $(this).stop().next().slideToggle();
    })

    // 菜单
    $(".menu_icon").on("click" , function(){

        $(".lt_main").toggleClass("hidemenu");
        $(".lt_aside").toggleClass("hidemenu");
        $(".lt_topbar").toggleClass("hidemenu");
    })



    
    // 退出登录
    $(".logout_icon").on("click" , function(){

        $("#myModal").modal('show');

    })

    $("#logoutBtn").on("click" , function(){

        $.ajax({
            type:"get",
            url:"/employee/employeeLogout",
            dataType:'json',
            success:function(info){
                if(info.success){
                    location.href = "login.html"
                }
            }
        })
    })
})