$(function(){

    // 点击显示模态框
    $(".icon_logout").on("click" , function(){

        $("#myModal").modal("show");
    })

    // 退出
    $("#btn-out").on("click" , function(){

        $("#myModal").modal("hide");

        $.ajax({
            type:"get",
            url:"/employee/employeeLogout",
            dataType:"json",
            success:function(info){
                if(info.success){

                    location.href = "login.html";
                }

            }
        })
    })

})