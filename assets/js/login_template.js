function start_login_register() {
    $(".login_param label[for='register_email']").html(language_content.login_template.register_email);
    $(".login_param #register_email").attr("placeholder", language_content.login_template.register_email_placeholder);

    $(".login_param label[for='register_name']").html(language_content.login_template.register_name);
    $(".login_param #register_name").attr("placeholder", language_content.login_template.register_name_placeholder);

    $(".login_param label[for='register_lastname']").html(language_content.login_template.register_lastname);
    $(".login_param #register_lastname").attr("placeholder", language_content.login_template.register_lastname_placeholder);

    $(".login_param label[for='register_password']").html(language_content.login_template.register_password);
    $(".login_param label[for='register_password_repeat']").html(language_content.login_template.register_password_repeat);

    $("#register_button").html(language_content.login_template.register);
    $("#login_button").html(language_content.login_template.login);
    $("#forgot_password").html(language_content.login_template.forgot_password);

    $(".login_param label[for='login_email']").html(language_content.login_template.register_email);
    $(".login_param #login_email").attr("placeholder", language_content.login_template.register_email_placeholder);

    $(".login_param label[for='login_password']").html(language_content.login_template.register_password);

    $(".login_register .register_title").html(language_content.login_template.register);
    $(".login_register .login_title").html(language_content.login_template.login);
    if ($("#login_email:visible").length) { login_register_events(); }
}
function login_register_events() {
    document.getElementById("login_email").addEventListener("keyup", function (e) {
        if (e.key == "Enter") { login_request(); }
    });
    document.getElementById("login_password").addEventListener("keyup", function (e) {
        if (e.key == "Enter") { login_request(); }
    });
    $("#login_button").on("click", login_request);

    document.getElementById("register_email").addEventListener("keyup", function (e) {
        if (e.key == "Enter") { register_request(); }
    });
    document.getElementById("register_name").addEventListener("keyup", function (e) {
        if (e.key == "Enter") { register_request(); }
    });
    document.getElementById("register_lastname").addEventListener("keyup", function (e) {
        if (e.key == "Enter") { register_request(); }
    });
    document.getElementById("register_password").addEventListener("keyup", function (e) {
        if (e.key == "Enter") { register_request(); }
    });
    document.getElementById("register_password_repeat").addEventListener("keyup", function (e) {
        if (e.key == "Enter") { register_request(); }
    });
    $("#register_button").on("click", register_request);

    $("#forgot_password").on("click", forgot_password);
}
function login_request() {
    var email_pat = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        email = document.getElementById("login_email").value,
        password = document.getElementById("login_password").value;
    if (email == "" || password == "") {
        document.getElementById("login_error").innerHTML = language_content.login_template.empty_field;
        return;
    }
    if (password.length < 6) {
        document.getElementById("login_error").innerHTML = language_content.login_template.password_short;
        return;
    }
    if (!email_pat.test(email)) {
        document.getElementById("login_error").innerHTML = language_content.login_template.not_valid_email;
        return;
    }
    document.getElementById("login_error").innerHTML = "";
    $.ajax({
        url: "models/login.php",
        method: "POST",
        dataType: "json",
        data: {
            email: email,
            password: password
        },
        success: function (data) {
            if (data == "Successful") {
                show_notification("login", true);
            }
            if (data == "wrong_params") {
                document.getElementById("login_error").innerHTML = language_content.login_template.wrong_params;
            }
        },
        error: function (err) {
            write_error_to_file(err.responseJSON);
            switch(err.responseJSON) {
                case "database_error":
                    document.getElementById("login_error").innerHTML = language_content.login_template.database_error;
                    break;
                case "empty_field":
                    document.getElementById("login_error").innerHTML = language_content.login_template.empty_field;
                    break;
                case "not_valid_email":
                    document.getElementById("login_error").innerHTML = language_content.login_template.not_valid_email;
                    break;
                case "password_short":
                    document.getElementById("login_error").innerHTML = language_content.login_template.password_short;
                    break;
                default:
                    document.getElementById("login_error").innerHTML = language_content.login_template.other_error;
            }
        }
    });
}
function register_request() {
    var email_pat = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        name_pat = /^[A-Z][a-z]+$/,
        lastname_pat = /^([A-Z][a-z]+)+$/,
        email = document.getElementById("register_email").value,
        name = document.getElementById("register_name").value,
        lastname = document.getElementById("register_lastname").value,
        password = document.getElementById("register_password").value,
        password_repeat = document.getElementById("register_password_repeat").value;
    if (email == "" || name == "" || lastname == "" || password == "" || password_repeat == "") {
        document.getElementById("register_error").innerHTML = language_content.login_template.empty_field;
        return;
    }
    if (password.length < 6) {
        document.getElementById("register_error").innerHTML = language_content.login_template.password_short;
        return;
    }
    if (password != password_repeat) {
        document.getElementById("register_error").innerHTML = language_content.login_template.passwords_not_match;
        return;
    }
    if (!email_pat.test(email)) {
        document.getElementById("register_error").innerHTML = language_content.login_template.not_valid_email;
        return;
    }
    if (!name_pat.test(name) || !lastname_pat.test(lastname)) {
        document.getElementById("register_error").innerHTML = language_content.login_template.name_invalid;
        return;
    }
    document.getElementById("register_error").innerHTML = "";
    $.ajax({
        url: "models/register.php",
        method: "POST",
        dataType: "json",
        data: {
            email: email,
            name: name,
            lastname: lastname,
            password: password,
            password_repeat: password_repeat
        },
        success: function (data) {
            if (data == "Successful") {
                show_notification("register");
                document.getElementById("register_email").value = "";
                document.getElementById("register_name").value = "";
                document.getElementById("register_lastname").value = "";
                document.getElementById("register_password").value = "";
                document.getElementById("register_password_repeat").value = "";
            }
        },
        error: function (err) {
            write_error_to_file(err.responseJSON);
            switch(err.responseJSON) {
                case "database_error":
                    document.getElementById("register_error").innerHTML = language_content.login_template.database_error;
                    break;
                case "empty_field":
                    document.getElementById("register_error").innerHTML = language_content.login_template.empty_field;
                    break;
                case "passwords_not_match":
                    document.getElementById("register_error").innerHTML = language_content.login_template.passwords_not_match;
                    break;
                case "name_invalid":
                    document.getElementById("register_error").innerHTML = language_content.login_template.name_invalid;
                    break;
                case "email_taken":
                    document.getElementById("register_error").innerHTML = language_content.login_template.email_taken;
                    break;
                case "not_valid_email":
                    document.getElementById("register_error").innerHTML = language_content.login_template.not_valid_email;
                    break;
                case "password_short":
                    document.getElementById("register_error").innerHTML = language_content.login_template.password_short;
                    break;
                default:
                    document.getElementById("register_error").innerHTML = language_content.login_template.other_error;
            }
        }
    });
}
function forgot_password() {
    var email_pat = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        email = document.getElementById("login_email").value;
    if (email == "") {
        document.getElementById("login_error").innerHTML = language_content.login_template.empty_email;
        return;
    }
    if (!email_pat.test(email)) {
        document.getElementById("login_error").innerHTML = language_content.login_template.not_valid_email;
        return;
    }
    document.getElementById("login_error").innerHTML = "";
    $.ajax({
        url: "models/forgot_password.php",
        method: "POST",
        dataType: "json",
        data: {
            email: email
        },
        success: function (data) {
            show_notification("forgot_password");
            document.getElementById("login_email").value = "";
        },
        error: function (err) {
            write_error_to_file(err.responseJSON);
            switch(err.responseJSON) {
                case "database_error":
                    document.getElementById("login_error").innerHTML = language_content.login_template.database_error;
                    break;
                case "empty_email":
                    document.getElementById("login_error").innerHTML = language_content.login_template.empty_email;
                    break;
                case "not_valid_email":
                    document.getElementById("login_error").innerHTML = language_content.login_template.not_valid_email;
                    break;
                default:
                    document.getElementById("login_error").innerHTML = language_content.login_template.other_error;
            }
        }
    });
}
