$(document).ajaxStart(function () {
    NProgress.start();
});

$(document).ajaxStop(function () {
    setTimeout(function(){

        NProgress.done();
    },500)
});


$(function(){

    $(".category").on("click" , function(){
        $(this).next().stop().slideToggle();
    })

    $(".icon_menu").on("click" , function(){

        $(".lt_topbar").toggleClass("hidemenu");
        $(".lt_main").toggleClass("hidemenu");
        $(".lt_aside").toggleClass("hidemenu");
    })
})

