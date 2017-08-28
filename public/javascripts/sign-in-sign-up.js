$(function() {

    //注册表单的提交
    $("#register_now").click(function() {
        $("#reg_form").submit()
    });

    //注册表单的验证
    $('#reg_form').validate({
        //ajax提交表单
        submitHandler: function(form) {
            $("#reg_form").ajaxSubmit({
                url: "/auth/sign-up.html",
                type: "POST",
                beforeSubmit: function(formData, jqForm, options) {
                    //提交前要做的事情
                },
                success: function(responseText, statusText) {
                    $('#myModal').modal('show');
                    $('#reg_form').resetForm();
                    //提交成功要做的事
                }
            });
        },
        //验证规则
        rules: {
            nickname_r: {
                required: true,
                rangelength: [1, 12],
                remote: {
                    url: '/auth/is_nickname_occupy.html',
                    type: 'GET'
                }
            },
            password1: {
                required: true,
                minlength: 8
            },
            password2: {
                required: true,
                equalTo: "#pass1"
            },
            email: {
                email: true,
                required: true,
                remote:{
                    url:'/auth/is_email_occupy.html',
                    type:'GET'
                }
            }
        },
        messages: {
            nickname_r: {
                required: '昵称不得为空!',
                rangelength: jQuery.format('昵称必须在{0}-{1}位之间!'),
                remote: "昵称被占用！"
            },
            password1: {
                required: "密码不得为空！",
                minlength: jQuery.format("密码不得少于{0}位！")
            },
            password2: {
                required: "密码确认不能为空！",
                equalTo: "两次密码必须一致！"
            },
            email: {
                email: "请输入正确格式的电子邮件！",
                required: "邮箱不得为空！",
                remote:"该邮箱已经别注册过！"
            }
        },

        //验证不通过时调用的函数
        highlight: function(element, errorClass) {
            $(element).css('border', '1px solid red');
        },
        //验证通过是调用的函数
        unhighlight: function(element, errorClass) {
            $(element).css('border', '');
        }
    });


    //登录表单的提交
    $("#login_now").click(function() {
        $("#log_form").submit();
    });

    //登录表单的验证
    $('#log_form').validate({
        //ajax提交表单
        submitHandler: function(form) {
            $("#log_form").ajaxSubmit({
                url: "/auth/sign-in.html",
                type: "POST",
                beforeSubmit: function(formData, jqForm, options) {

                    //提交前要做的事情
                },
                success: function(responseText, statusText) {
                    location.href='/';
                    //提交成功要做的事
                }
            });
        },
        //验证规则
        rules: {
            email_l: {
                required: true
            },
            password: {
                required: true,
                minlength: 8,
                remote: {
                    url: '/auth/is_right.html',
                    type: 'GET',
                    data: {
                        email: function(){
                            return $("#email_l").val()
                        }
                    }
                }
            }
        },
        messages: {
            email_l: {
                required: '邮箱账号或用户名不得为空!',
            },
            password: {
                required: "密码不得为空！",
                minlength: jQuery.format("密码不得少于{0}位！"),
                remote: '邮箱或用户名或密码错误'
            }
        },

        //验证不通过时调用的函数
        highlight: function(element, errorClass) {
            $(element).css('border', '1px solid red');
        },
        //验证通过是调用的函数
        unhighlight: function(element, errorClass) {
            $(element).css('border', '');
        }
    });



});