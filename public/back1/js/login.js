$(function(){
    
    // login: 登陆校验完成
    $("#form").bootstrapValidator({

        //指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        fields:{
            username:{
                validators:{
                    notEmpty:{
                        message:"用户名不能为空"
                    },
                    stringLength:{
                        min:2,
                        max:6,
                        message:"用户名长度必须在2到6之间"
                    },
                    callback:{
                        message:"用户名不存在"
                    }
                }
            },

            password:{
                validators:{
                    notEmpty:{
                        message:"密码不能为空"
                    },

                    stringLength:{
                        min:6,
                        max:12,
                        message:"密码长度必须在6到12之间"
                    },

                    callback:{
                        message:"密码错误"
                    }   

                }
            }
        }
    })

    // login: ajax请求登录功能

    $("#form").on("success.form.bv",function(e){

        e.preventDefault();

        $.ajax({
            type:"post",
            url:"/employee/employeeLogin",
            data:$('#form').serialize(),
            dataType:"json",
            success:function(info){
                console.log(info);
                if(info.error == 1000){
                   
                    $('#form').data("bootstrapValidator").updateStatus("username", "INVALID", "callback");
                    return;
                }
                if(info.error == 1001){
                
                    $('#form').data("bootstrapValidator").updateStatus("password", "INVALID", "callback");
                    return;
                }
                if(info.success){
                    location.href = "index.html";
                    return;
                }
            }
        })
    })

    // login:  重置表单bug

    $("[type='reset']").on("click",function(){

        $('#form').data("bootstrapValidator").resetForm();
    })

})