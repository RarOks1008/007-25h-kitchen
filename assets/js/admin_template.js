function start_admin() {
    if (!$("#admin_panel:visible").length) { setTimeout(start_admin, 50); } else { load_admin_data(); }
}
function load_admin_data() {
    $("#admin_panel h2").html(language_content.admin_template.title);
    $(".admin_controls.file_controls h3").html(language_content.admin_template.visiting_title);
    $(".admin_controls .visiting_main span:first-child").html(language_content.admin_template.visiting_main);
    $(".admin_controls .visiting_appetizer span:first-child").html(language_content.admin_template.visiting_appetizer);
    $(".admin_controls .visiting_main_course span:first-child").html(language_content.admin_template.visiting_main_course);
    $(".admin_controls .visiting_dessert span:first-child").html(language_content.admin_template.visiting_dessert);
    $(".admin_controls .visiting_contact span:first-child").html(language_content.admin_template.visiting_contact);
    $(".admin_controls .visiting_admin span:first-child").html(language_content.admin_template.visiting_admin);
    $(".admin_controls .visiting_404 span:first-child").html(language_content.admin_template.visiting_404);

    $(".admin_controls.other_controls h3").html(language_content.admin_template.other_controls_title);
    $(".admin_controls.other_controls #export_to_excel").html(language_content.admin_template.export_to_excel);
    $(".admin_controls.other_controls a").html(language_content.admin_template.get_documentation);
    $(".admin_controls .number_logged_users span:first-child").html(language_content.admin_template.number_logged_users);

    var text = "",
        el,
        first_option = "";
    for (el in language_content.admin_template.admin_options) {
        if (!first_option) { first_option = el; }
        text += `<option value="${el}">${language_content.admin_template.admin_options[el]}</option>`;
    }
    $("#admin_panel #admin_option").html(text);
    $('#admin_panel #admin_option').on('change', function() {
        fill_admin_controls($(this).val());
    });
    $("#export_to_excel").on("click", export_to_excel);

    fill_admin_controls(first_option);
    get_page_access_info();
    get_logged_users();
}
function fill_admin_controls(option) {
    switch(option) {
        case "admin_insert_user":
            $("#admin_extra_option").css("display", "none");
            admin_insert_user_show();
            break;
        case "admin_insert_tag":
            $("#admin_extra_option").css("display", "none");
            admin_insert_tag_show();
            break;
        case "admin_insert_picture":
            $("#admin_extra_option").css("display", "none");
            admin_insert_picture_show();
            break;
        case "admin_insert_post_tag":
            $("#admin_extra_option").css("display", "none");
            admin_insert_post_tag_show();
            break;
        case "admin_edit_user":
            $("#admin_extra_option").css("display", "block");
            admin_edit_user_show();
            break;
        case "admin_edit_post":
            $("#admin_extra_option").css("display", "block");
            admin_edit_post_show();
            break;
        case "admin_edit_tag":
            $("#admin_extra_option").css("display", "block");
            admin_edit_tag_show();
            break;
        case "admin_delete_user":
            $("#admin_extra_option").css("display", "block");
            admin_delete_user_show();
            break;
        case "admin_delete_post":
            $("#admin_extra_option").css("display", "block");
            admin_delete_post_show();
            break;
        case "admin_delete_tag":
            $("#admin_extra_option").css("display", "block");
            admin_delete_tag_show();
            break;
        case "admin_delete_picture":
            $("#admin_extra_option").css("display", "block");
            admin_delete_picture_show();
            break;
        case "admin_delete_comment":
            $("#admin_extra_option").css("display", "block");
            admin_delete_comment_show();
            break;
        case "admin_delete_newsletter":
            $("#admin_extra_option").css("display", "block");
            admin_delete_newsletter_show();
            break;
        case "admin_delete_post_tag":
            $("#admin_extra_option").css("display", "block");
            admin_delete_post_tag_show();
            break;
    }
}
function admin_insert_user_show() {
    var text = `<div class="admin_option_holder"><label for="admin_insert_user_name">${language_content.admin_template.admin_controls.admin_insert_user_name}</label><input type="text" name="admin_insert_user_name" id="admin_insert_user_name" placeholder="${language_content.admin_template.admin_controls.admin_insert_user_name}"/></div>`;
    text += `<div class="admin_option_holder"><label for="admin_insert_user_lastname">${language_content.admin_template.admin_controls.admin_insert_user_lastname}</label><input type="text" name="admin_insert_user_lastname" id="admin_insert_user_lastname" placeholder="${language_content.admin_template.admin_controls.admin_insert_user_lastname}"/></div>`;
    text += `<div class="admin_option_holder"><label for="admin_insert_user_mail">${language_content.admin_template.admin_controls.admin_insert_user_mail}</label><input type="email" name="admin_insert_user_mail" id="admin_insert_user_mail" placeholder="${language_content.admin_template.admin_controls.admin_insert_user_mail}"/></div>`;
    text += `<div class="admin_option_holder"><label for="admin_insert_user_password">${language_content.admin_template.admin_controls.admin_insert_user_password}</label><input type="password" name="admin_insert_user_password" id="admin_insert_user_password" placeholder="* * * * * *"/></div>`;
    text += `<div class="admin_option_holder"><label for="admin_insert_user_admin">${language_content.admin_template.admin_controls.admin_insert_user_admin}</label><input type="checkbox" id="admin_insert_user_admin" name="admin_insert_user_admin"/></div>`;
    text += `<p id="admin_insert_user_error"></p>`;
    text += `<button id="admin_insert_user_submit">${language_content.admin_template.admin_controls.admin_insert_user_submit}</button>`;
    $("#admin_extra_space").html(text);
    document.getElementById("admin_insert_user_name").addEventListener("keyup", function (e) { if (e.key == "Enter") { admin_insert_user_send(); } });
    document.getElementById("admin_insert_user_lastname").addEventListener("keyup", function (e) { if (e.key == "Enter") { admin_insert_user_send(); } });
    document.getElementById("admin_insert_user_mail").addEventListener("keyup", function (e) { if (e.key == "Enter") { admin_insert_user_send(); } });
    document.getElementById("admin_insert_user_password").addEventListener("keyup", function (e) { if (e.key == "Enter") { admin_insert_user_send(); } });
    $("#admin_insert_user_submit").on("click", admin_insert_user_send);
}
function admin_insert_user_send() {
    var email_pat = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        name_pat = /^[A-Z][a-z]+$/,
        lastname_pat = /^([A-Z][a-z]+)+$/,
        email = document.getElementById("admin_insert_user_mail").value,
        name = document.getElementById("admin_insert_user_name").value,
        lastname = document.getElementById("admin_insert_user_lastname").value,
        password = document.getElementById("admin_insert_user_password").value,
        is_admin = document.getElementById("admin_insert_user_admin").checked;
    if (email == "" || name == "" || lastname == "" || password == "") {
        document.getElementById("admin_insert_user_error").innerHTML = language_content.admin_template.admin_errors.empty_field;
        return;
    }
    if (password.length < 6) {
        document.getElementById("admin_insert_user_error").innerHTML = language_content.admin_template.admin_errors.password_short;
        return;
    }
    if (!email_pat.test(email)) {
        document.getElementById("admin_insert_user_error").innerHTML = language_content.admin_template.admin_errors.not_valid_email;
        return;
    }
    if (!name_pat.test(name) || !lastname_pat.test(lastname)) {
        document.getElementById("admin_insert_user_error").innerHTML = language_content.admin_template.admin_errors.name_invalid;
        return;
    }
    document.getElementById("admin_insert_user_error").innerHTML = "";
    $.ajax({
        url: "models/admin/insert_user.php",
        method: "POST",
        dataType: "json",
        data: {
            email: email,
            name: name,
            lastname: lastname,
            password: password,
            is_admin: is_admin
        },
        success: function (data) {
            if (data == "Successful") {
                show_notification("insert_user");
                document.getElementById("admin_insert_user_mail").value = "";
                document.getElementById("admin_insert_user_name").value = "";
                document.getElementById("admin_insert_user_lastname").value = "";
                document.getElementById("admin_insert_user_password").value = "";
                document.getElementById("admin_insert_user_admin").checked = false;
            }
        },
        error: function (err) {
            write_error_to_file(err.responseJSON);
            switch(err.responseJSON) {
                case "database_error":
                    document.getElementById("admin_insert_user_error").innerHTML = language_content.admin_template.admin_errors.database_error;
                    break;
                case "empty_field":
                    document.getElementById("admin_insert_user_error").innerHTML = language_content.admin_template.admin_errors.empty_field;
                    break;
                case "name_invalid":
                    document.getElementById("admin_insert_user_error").innerHTML = language_content.admin_template.admin_errors.name_invalid;
                    break;
                case "email_taken":
                    document.getElementById("admin_insert_user_error").innerHTML = language_content.admin_template.admin_errors.email_taken;
                    break;
                case "not_valid_email":
                    document.getElementById("admin_insert_user_error").innerHTML = language_content.admin_template.admin_errors.not_valid_email;
                    break;
                case "password_short":
                    document.getElementById("admin_insert_user_error").innerHTML = language_content.admin_template.admin_errors.password_short;
                    break;
                default:
                    document.getElementById("admin_insert_user_error").innerHTML = language_content.admin_template.admin_errors.other_error;
            }
        }
    });
}

function admin_insert_tag_show() {
    var text = `<div class="admin_option_holder"><label for="admin_insert_tag_name">${language_content.admin_template.admin_controls.admin_insert_tag_name}</label><input type="text" name="admin_insert_tag_name" id="admin_insert_tag_name" placeholder="${language_content.admin_template.admin_controls.admin_insert_tag_name}"/></div>`;
    text += `<div class="admin_option_holder"><label for="admin_insert_tag_srbname">${language_content.admin_template.admin_controls.admin_insert_tag_srbname}</label><input type="text" name="admin_insert_tag_srbname" id="admin_insert_tag_srbname" placeholder="${language_content.admin_template.admin_controls.admin_insert_tag_srbname}"/></div>`;
    text += `<p id="admin_insert_tag_error"></p>`;
    text += `<button id="admin_insert_tag_submit">${language_content.admin_template.admin_controls.admin_insert_tag_submit}</button>`;
    $("#admin_extra_space").html(text);
    document.getElementById("admin_insert_tag_name").addEventListener("keyup", function (e) { if (e.key == "Enter") { admin_insert_tag_send(); } });
    document.getElementById("admin_insert_tag_srbname").addEventListener("keyup", function (e) { if (e.key == "Enter") { admin_insert_tag_send(); } });
    $("#admin_insert_tag_submit").on("click", admin_insert_tag_send);
}
function admin_insert_tag_send() {
    var name_pat = /^[A-Z][a-z]+$/,
        name = document.getElementById("admin_insert_tag_name").value,
        srb_name = document.getElementById("admin_insert_tag_srbname").value;
    if (name == "" || srb_name == "") {
        document.getElementById("admin_insert_tag_error").innerHTML = language_content.admin_template.admin_errors.empty_field;
        return;
    }
    if (!name_pat.test(name) || !name_pat.test(srb_name)) {
        document.getElementById("admin_insert_tag_error").innerHTML = language_content.admin_template.admin_errors.tag_name_invalid;
        return;
    }
    document.getElementById("admin_insert_tag_error").innerHTML = "";
    $.ajax({
        url: "models/admin/insert_tag.php",
        method: "POST",
        dataType: "json",
        data: {
            name: name,
            srb_name: srb_name
        },
        success: function (data) {
            if (data == "Successful") {
                show_notification("insert_tag");
                document.getElementById("admin_insert_tag_name").value = "";
                document.getElementById("admin_insert_tag_srbname").value = "";
            }
        },
        error: function (err) {
            write_error_to_file(err.responseJSON);
            switch(err.responseJSON) {
                case "database_error":
                    document.getElementById("admin_insert_tag_error").innerHTML = language_content.admin_template.admin_errors.database_error;
                    break;
                case "empty_field":
                    document.getElementById("admin_insert_tag_error").innerHTML = language_content.admin_template.admin_errors.empty_field;
                    break;
                case "tag_name_invalid":
                    document.getElementById("admin_insert_tag_error").innerHTML = language_content.admin_template.admin_errors.tag_name_invalid;
                    break;
                case "tag_exists":
                    document.getElementById("admin_insert_tag_error").innerHTML = language_content.admin_template.admin_errors.tag_exists;
                    break;
                default:
                    document.getElementById("admin_insert_tag_error").innerHTML = language_content.admin_template.admin_errors.other_error;
            }
        }
    });
}
function admin_insert_picture_show() {
    $.ajax({
        url: "models/admin/posts.php",
        method: "GET",
        dataType: "json",
        success: function (data) {
            var text = `<form onsubmit="return admin_insert_picture_check()" method="POST" action="models/admin/insert_picture.php" name="admin_insert_picture_form" enctype="multipart/form-data"><div class="admin_option_holder"><label for="admin_insert_picture_picture">${language_content.admin_template.admin_controls.admin_insert_picture_picture}</label><input type="file" name="admin_insert_picture_picture" id="admin_insert_picture_picture"/></div>`;
            text += `<div class="admin_option_holder"><label for="admin_insert_picture_alt">${language_content.admin_template.admin_controls.admin_insert_picture_alt}</label><input type="text" name="admin_insert_picture_alt" id="admin_insert_picture_alt" placeholder="${language_content.admin_template.admin_controls.admin_insert_picture_alt}"/></div>`;
            text += `<div class="admin_option_holder"><label for="admin_insert_picture_srbalt">${language_content.admin_template.admin_controls.admin_insert_picture_srbalt}</label><input type="text" name="admin_insert_picture_srbalt" id="admin_insert_picture_srbalt" placeholder="${language_content.admin_template.admin_controls.admin_insert_picture_srbalt}"/></div>`;
            text += `<div class="admin_option_holder"><label for="admin_insert_picture_options">${language_content.admin_template.admin_controls.admin_insert_picture_options}</label><select name="admin_insert_picture_options" id="admin_insert_picture_options">`;
            data.forEach(function (p) {
                text += `<option value="${p.ID}">${lang=="eng"?p.title:(lang=="srb"?p.SRBtitle:"Error")}</option>`;
            });
            text += `</select></div>`;
            text += `<p id="admin_insert_picture_error"></p>`;
            text += `<button id="admin_insert_picture_submit" name="admin_insert_picture_submit" type="submit">${language_content.admin_template.admin_controls.admin_insert_picture_submit}</button>`;
            text += "</form>";
            $("#admin_extra_space").html(text);
        },
        error: function (err) {
            write_error_to_file(err);
            $("#admin_extra_space").html(err.responseText);
        }
    });
}
function admin_insert_picture_check() {
    var name_pat = /^[A-Z][a-z]+$/,
        alt = document.getElementById("admin_insert_picture_alt").value,
        srb_alt = document.getElementById("admin_insert_picture_srbalt").value,
        image_selected = document.getElementsByName("admin_insert_picture_picture").length;

    if (alt == "" || srb_alt == "") {
        document.getElementById("admin_insert_picture_error").innerHTML = language_content.admin_template.admin_controls.empty_field;
        return false;
    }
    if (!name_pat.test(alt) || !name_pat.test(srb_alt)) {
        document.getElementById("admin_insert_picture_error").innerHTML = language_content.admin_template.admin_controls.image_name_invalid;
        return false;
    }
    if (image_selected <= 0) {
        document.getElementById("admin_insert_picture_error").innerHTML = language_content.admin_template.admin_controls.no_image_selected;
        return false;
    }
    document.getElementById("admin_insert_picture_error").innerHTML = "";
    return true;
}
function admin_insert_post_tag_show() {
    var posts,
        tags;
    $.ajax({
        url: "models/admin/posts.php",
        method: "GET",
        dataType: "json",
        success: function (data) {
            posts = data;
            $.ajax({
                url: "models/admin/tags.php",
                method: "GET",
                dataType: "json",
                success: function (data) {
                    tags = data;
                    var text = `<div class="admin_option_holder"><label for="admin_insert_post_tag_post_options">${language_content.admin_template.admin_controls.admin_insert_post_tag_post_options}</label><select name="admin_insert_post_tag_post_options" id="admin_insert_post_tag_post_options">`;
                    posts.forEach(function (p) {
                        text += `<option value="${p.ID}">${lang=="eng"?p.title:(lang=="srb"?p.SRBtitle:"Error")}</option>`;
                    });
                    text += `</select></div>`;
                    text += `<div class="admin_option_holder"><label for="admin_insert_post_tag_tag_options">${language_content.admin_template.admin_controls.admin_insert_post_tag_tag_options}</label><select name="admin_insert_post_tag_tag_options" id="admin_insert_post_tag_tag_options">`;
                    tags.forEach(function (t) {
                        text += `<option value="${t.ID}">${lang=="eng"?t.name:(lang=="srb"?t.SRBname:"Error")}</option>`;
                    });
                    text += `</select></div>`;
                    text += `<p id="admin_insert_post_tag_tag_error"></p>`;
                    text += `<button id="admin_insert_post_tag_tag_submit">${language_content.admin_template.admin_controls.admin_insert_post_tag_tag_submit}</button>`;
                    $("#admin_extra_space").html(text);
                    $("#admin_insert_post_tag_tag_submit").on("click", admin_insert_post_tag_send);
                },
                error: function (err) {
                    write_error_to_file(err);
                    $("#admin_extra_space").html(err.responseText);
                }
            });
        },
        error: function (err) {
            write_error_to_file(err);
            $("#admin_extra_space").html(err.responseText);
        }
    });
}
function admin_insert_post_tag_send() {
    var post = document.getElementById("admin_insert_post_tag_post_options").options[document.getElementById("admin_insert_post_tag_post_options").selectedIndex].value,
        tag = document.getElementById("admin_insert_post_tag_tag_options").options[document.getElementById("admin_insert_post_tag_tag_options").selectedIndex].value;

    document.getElementById("admin_insert_post_tag_tag_error").innerHTML = "";
    $.ajax({
        url: "models/admin/insert_post_tag.php",
        method: "POST",
        dataType: "json",
        data: {
            post: post,
            tag: tag
        },
        success: function (data) {
            if (data == "Successful") {
                show_notification("insert_post_tag");
            }
        },
        error: function (err) {
            write_error_to_file(err);
            switch(err.responseJSON) {
                case "database_error":
                    document.getElementById("admin_insert_post_tag_tag_error").innerHTML = language_content.admin_template.admin_errors.database_error;
                    break;
                case "post_tag_exists":
                    document.getElementById("admin_insert_post_tag_tag_error").innerHTML = language_content.admin_template.admin_errors.post_tag_exists;
                    break;
                default:
                    document.getElementById("admin_insert_post_tag_tag_error").innerHTML = language_content.admin_template.admin_errors.other_error;
            }
        }
    });
}
function admin_edit_user_show() {
    var users;
    $.ajax({
        url: "models/admin/users.php",
        method: "GET",
        dataType: "json",
        success: function (data) {
            users = data;
            var text = "";
            users.forEach(function (u) {
                text += `<option value="${u.ID}">${u.name} ${u.last_name}</option>`;
            });
            $("#admin_extra_option").html(text);
            admin_edit_user_show_second(users, users[0].ID);
            $("#admin_extra_option").on('change', function() {
                admin_edit_user_show_second(users, $(this).val());
            });
        },
        error: function (err) {
            write_error_to_file(err);
            $("#admin_extra_space").html(err.responseText);
        }
    });
}
function admin_edit_user_show_second(users, user_id) {
    users.forEach(function (u) {
        if (u.ID != user_id) { return; }
        var text = `<div class="admin_option_holder"><label for="admin_edit_user_name">${language_content.admin_template.admin_controls.admin_edit_user_name}</label><input type="text" name="admin_edit_user_name" id="admin_edit_user_name" placeholder="${language_content.admin_template.admin_controls.admin_edit_user_name}" value="${u.name}"/></div>`;
        text += `<div class="admin_option_holder"><label for="admin_edit_user_lastname">${language_content.admin_template.admin_controls.admin_edit_user_lastname}</label><input type="text" name="admin_edit_user_lastname" id="admin_edit_user_lastname" placeholder="${language_content.admin_template.admin_controls.admin_edit_user_lastname}" value="${u.last_name}"/></div>`;
        text += `<div class="admin_option_holder"><label for="admin_edit_user_email">${language_content.admin_template.admin_controls.admin_edit_user_email}</label><input type="email" name="admin_edit_user_email" id="admin_edit_user_email" placeholder="${language_content.admin_template.admin_controls.admin_edit_user_email}" value="${u.email}"/></div>`;
        text += `<input type="hidden" name="admin_edit_user_id" id="admin_edit_user_id" value="${u.ID}"/></div>`;
        text += `<p id="admin_edit_user_error"></p>`;
        text += `<button id="admin_edit_user_submit">${language_content.admin_template.admin_controls.admin_edit_user_submit}</button>`;
        $("#admin_extra_space").html(text);
    });
    document.getElementById("admin_edit_user_name").addEventListener("keyup", function (e) { if (e.key == "Enter") { admin_edit_user_send(); } });
    document.getElementById("admin_edit_user_lastname").addEventListener("keyup", function (e) { if (e.key == "Enter") { admin_edit_user_send(); } });
    document.getElementById("admin_edit_user_email").addEventListener("keyup", function (e) { if (e.key == "Enter") { admin_edit_user_send(); } });
    $("#admin_edit_user_submit").on("click", admin_edit_user_send);
}
function admin_edit_user_send() {
    var email_pat = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        name_pat = /^[A-Z][a-z]+$/,
        lastname_pat = /^([A-Z][a-z]+)+$/,
        email = document.getElementById("admin_edit_user_email").value,
        name = document.getElementById("admin_edit_user_name").value,
        lastname = document.getElementById("admin_edit_user_lastname").value,
        id = document.getElementById("admin_edit_user_id").value;
    if (email == "" || name == "" || lastname == "") {
        document.getElementById("admin_edit_user_error").innerHTML = language_content.admin_template.admin_errors.empty_field;
        return;
    }
    if (!email_pat.test(email)) {
        document.getElementById("admin_edit_user_error").innerHTML = language_content.admin_template.admin_errors.not_valid_email;
        return;
    }
    if (!name_pat.test(name) || !lastname_pat.test(lastname)) {
        document.getElementById("admin_edit_user_error").innerHTML = language_content.admin_template.admin_errors.name_invalid;
        return;
    }
    document.getElementById("admin_edit_user_error").innerHTML = "";
    $.ajax({
        url: "models/admin/edit_user.php",
        method: "POST",
        dataType: "json",
        data: {
            email: email,
            name: name,
            lastname: lastname,
            id: id
        },
        success: function (data) {
            if (data == "Successful") {
                show_notification("update_user");
                document.getElementById("admin_edit_user_email").value = "";
                document.getElementById("admin_edit_user_name").value = "";
                document.getElementById("admin_edit_user_lastname").value = "";
                fill_admin_controls("admin_edit_user");
            }
        },
        error: function (err) {
            write_error_to_file(err.responseJSON);
            switch(err.responseJSON) {
                case "database_error":
                    document.getElementById("admin_edit_user_error").innerHTML = language_content.admin_template.admin_errors.database_error;
                    break;
                case "empty_field":
                    document.getElementById("admin_edit_user_error").innerHTML = language_content.admin_template.admin_errors.empty_field;
                    break;
                case "name_invalid":
                    document.getElementById("admin_edit_user_error").innerHTML = language_content.admin_template.admin_errors.name_invalid;
                    break;
                case "email_taken":
                    document.getElementById("admin_edit_user_error").innerHTML = language_content.admin_template.admin_errors.email_taken;
                    break;
                case "not_valid_email":
                    document.getElementById("admin_edit_user_error").innerHTML = language_content.admin_template.admin_errors.not_valid_email;
                    break;
                default:
                    document.getElementById("admin_edit_user_error").innerHTML = language_content.admin_template.admin_errors.other_error;
            }
        }
    });
}
function admin_edit_post_show() {
    var posts;
    $.ajax({
        url: "models/admin/posts.php",
        method: "GET",
        dataType: "json",
        success: function (data) {
            posts = data;
            var text = "";
            posts.forEach(function (p) {
                text += `<option value="${p.ID}">${lang=="eng"?p.title:(lang=="srb"?p.SRBtitle:"Error")}</option>`;
            });
            $("#admin_extra_option").html(text);
            admin_edit_post_show_second(posts, posts[0].ID);
            $("#admin_extra_option").on('change', function() {
                admin_edit_post_show_second(posts, $(this).val());
            });
        },
        error: function (err) {
            write_error_to_file(err);
            $("#admin_extra_space").html(err.responseText);
        }
    });
}
function admin_edit_post_show_second(posts, post_id) {
    posts.forEach(function (p) {
        if (p.ID != post_id) { return; }
        var text = `<div class="admin_option_holder"><label for="admin_edit_post_title">${language_content.admin_template.admin_controls.admin_edit_post_title}</label><input type="text" name="admin_edit_post_title" id="admin_edit_post_title" placeholder="${language_content.admin_template.admin_controls.admin_edit_post_title}" value="${p.title}"/></div>`;
        text += `<div class="admin_option_holder"><label for="admin_edit_post_srbtitle">${language_content.admin_template.admin_controls.admin_edit_post_srbtitle}</label><input type="text" name="admin_edit_post_srbtitle" id="admin_edit_post_srbtitle" placeholder="${language_content.admin_template.admin_controls.admin_edit_post_srbtitle}" value="${p.SRBtitle}"/></div>`;
        text += `<div class="admin_option_holder"><label for="admin_edit_post_text">${language_content.admin_template.admin_controls.admin_edit_post_text}</label><textarea rows="8" cols="40" name="admin_edit_post_text" id="admin_edit_post_text">${p.text}</textarea></div>`;
        text += `<div class="admin_option_holder"><label for="admin_edit_post_srbtext">${language_content.admin_template.admin_controls.admin_edit_post_srbtext}</label><textarea rows="8" cols="40" name="admin_edit_post_srbtext" id="admin_edit_post_srbtext">${p.SRBtext}</textarea></div>`;
        text += `<input type="hidden" name="admin_edit_post_id" id="admin_edit_post_id" value="${p.ID}"/></div>`;
        text += `<p id="admin_edit_post_error"></p>`;
        text += `<button id="admin_edit_post_submit">${language_content.admin_template.admin_controls.admin_edit_post_submit}</button>`;
        $("#admin_extra_space").html(text);
    });
    document.getElementById("admin_edit_post_title").addEventListener("keyup", function (e) { if (e.key == "Enter") { admin_edit_post_send(); } });
    document.getElementById("admin_edit_post_srbtitle").addEventListener("keyup", function (e) { if (e.key == "Enter") { admin_edit_post_send(); } });
    document.getElementById("admin_edit_post_text").addEventListener("keyup", function (e) { if (e.key == "Enter") { admin_edit_post_send(); } });
    document.getElementById("admin_edit_post_srbtext").addEventListener("keyup", function (e) { if (e.key == "Enter") { admin_edit_post_send(); } });
    $("#admin_edit_post_submit").on("click", admin_edit_post_send);
}
function admin_edit_post_send() {
    var title_pat = /^([A-Z][a-z]+)+$/,
        title = document.getElementById("admin_edit_post_title").value,
        srb_title = document.getElementById("admin_edit_post_srbtitle").value,
        text = document.getElementById("admin_edit_post_text").value,
        srb_text = document.getElementById("admin_edit_post_srbtext").value,
        id = document.getElementById("admin_edit_post_id").value;
    if (title == "" || srb_title == "" || text == "" || srb_text == "") {
        document.getElementById("admin_edit_post_error").innerHTML = language_content.admin_template.admin_errors.empty_field;
        return;
    }
    if (!title_pat.test(title) || !title_pat.test(srb_title)) {
        document.getElementById("admin_edit_post_error").innerHTML = language_content.admin_template.admin_errors.title_name_invalid;
        return;
    }
    document.getElementById("admin_edit_post_error").innerHTML = "";
    $.ajax({
        url: "models/admin/edit_post.php",
        method: "POST",
        dataType: "json",
        data: {
            title: title,
            srb_title: srb_title,
            text: text,
            srb_text: srb_text,
            id: id
        },
        success: function (data) {
            if (data == "Successful") {
                show_notification("update_post");
                document.getElementById("admin_edit_post_title").value = "";
                document.getElementById("admin_edit_post_srbtitle").value = "";
                document.getElementById("admin_edit_post_text").value = "";
                document.getElementById("admin_edit_post_srbtext").value = "";
                fill_admin_controls("admin_edit_post");
            }
        },
        error: function (err) {
            write_error_to_file(err.responseJSON);
            switch(err.responseJSON) {
                case "database_error":
                    document.getElementById("admin_edit_post_error").innerHTML = language_content.admin_template.admin_errors.database_error;
                    break;
                case "empty_field":
                    document.getElementById("admin_edit_post_error").innerHTML = language_content.admin_template.admin_errors.empty_field;
                    break;
                case "title_name_invalid":
                    document.getElementById("admin_edit_post_error").innerHTML = language_content.admin_template.admin_errors.title_name_invalid;
                    break;
                default:
                    document.getElementById("admin_edit_post_error").innerHTML = language_content.admin_template.admin_errors.other_error;
            }
        }
    });
}
function admin_edit_tag_show() {
    var tags;
    $.ajax({
        url: "models/admin/tags.php",
        method: "GET",
        dataType: "json",
        success: function (data) {
            tags = data;
            var text = "";
            tags.forEach(function (t) {
                text += `<option value="${t.ID}">${lang=="eng"?t.name:(lang=="srb"?t.SRBname:"Error")}</option>`;
            });
            $("#admin_extra_option").html(text);
            admin_edit_tag_show_second(tags, tags[0].ID);
            $("#admin_extra_option").on('change', function() {
                admin_edit_tag_show_second(tags, $(this).val());
            });
        },
        error: function (err) {
            write_error_to_file(err);
            $("#admin_extra_space").html(err.responseText);
        }
    });
}
function admin_edit_tag_show_second(tags, tag_id) {
    tags.forEach(function (t) {
        if (t.ID != tag_id) { return; }
        var text = `<div class="admin_option_holder"><label for="admin_edit_tag_name">${language_content.admin_template.admin_controls.admin_edit_tag_name}</label><input type="text" name="admin_edit_tag_name" id="admin_edit_tag_name" placeholder="${language_content.admin_template.admin_controls.admin_edit_tag_name}" value="${t.name}"/></div>`;
        text += `<div class="admin_option_holder"><label for="admin_edit_tag_srbname">${language_content.admin_template.admin_controls.admin_edit_tag_srbname}</label><input type="text" name="admin_edit_tag_srbname" id="admin_edit_tag_srbname" placeholder="${language_content.admin_template.admin_controls.admin_edit_tag_srbname}" value="${t.SRBname}"/></div>`;
        text += `<input type="hidden" name="admin_edit_tag_id" id="admin_edit_tag_id" value="${t.ID}"/></div>`;
        text += `<p id="admin_edit_tag_error"></p>`;
        text += `<button id="admin_edit_tag_submit">${language_content.admin_template.admin_controls.admin_edit_tag_submit}</button>`;
        $("#admin_extra_space").html(text);
    });
    document.getElementById("admin_edit_tag_name").addEventListener("keyup", function (e) { if (e.key == "Enter") { admin_edit_tag_send(); } });
    document.getElementById("admin_edit_tag_srbname").addEventListener("keyup", function (e) { if (e.key == "Enter") { admin_edit_tag_send(); } });
    $("#admin_edit_tag_submit").on("click", admin_edit_tag_send);
}
function admin_edit_tag_send() {
    var name_pat = /^[A-Z][a-z]+$/,
        name = document.getElementById("admin_edit_tag_name").value,
        srb_name = document.getElementById("admin_edit_tag_srbname").value,
        id = document.getElementById("admin_edit_tag_id").value;
    if (name == "" || srb_name == "") {
        document.getElementById("admin_edit_tag_error").innerHTML = language_content.admin_template.admin_errors.empty_field;
        return;
    }
    if (!name_pat.test(name) || !name_pat.test(srb_name)) {
        document.getElementById("admin_edit_tag_error").innerHTML = language_content.admin_template.admin_errors.tag_name_invalid;
        return;
    }
    document.getElementById("admin_edit_tag_error").innerHTML = "";
    $.ajax({
        url: "models/admin/edit_tag.php",
        method: "POST",
        dataType: "json",
        data: {
            name: name,
            srb_name: srb_name,
            id: id
        },
        success: function (data) {
            if (data == "Successful") {
                show_notification("update_tag");
                document.getElementById("admin_edit_tag_name").value = "";
                document.getElementById("admin_edit_tag_srbname").value = "";
                fill_admin_controls("admin_edit_tag");
            }
        },
        error: function (err) {
            write_error_to_file(err.responseJSON);
            switch(err.responseJSON) {
                case "database_error":
                    document.getElementById("admin_edit_tag_error").innerHTML = language_content.admin_template.admin_errors.database_error;
                    break;
                case "empty_field":
                    document.getElementById("admin_edit_tag_error").innerHTML = language_content.admin_template.admin_errors.empty_field;
                    break;
                case "tag_name_invalid":
                    document.getElementById("admin_edit_tag_error").innerHTML = language_content.admin_template.admin_errors.tag_name_invalid;
                    break;
                case "tag_exists":
                    document.getElementById("admin_edit_tag_error").innerHTML = language_content.admin_template.admin_errors.tag_exists;
                    break;
                default:
                    document.getElementById("admin_edit_tag_error").innerHTML = language_content.admin_template.admin_errors.other_error;
            }
        }
    });
}
function admin_delete_user_show() {
    $.ajax({
        url: "models/admin/users.php",
        method: "GET",
        dataType: "json",
        success: function (data) {
            var text = "";
            data.forEach(function (u) {
                text += `<option value="${u.ID}">${u.name} ${u.last_name}</option>`;
            });
            $("#admin_extra_option").html(text);
            var button_text = `<p id="admin_delete_user_error"></p>`;
            button_text += `<button id="admin_delete_user_submit">${language_content.admin_template.admin_controls.admin_delete_user_submit}</button>`;
            $("#admin_extra_space").html(button_text);
            $("#admin_delete_user_submit").on("click", admin_delete_user_send);
        },
        error: function (err) {
            write_error_to_file(err);
            $("#admin_extra_space").html(err.responseText);
        }
    });
}
function admin_delete_user_send() {
    var user = document.getElementById("admin_extra_option").options[document.getElementById("admin_extra_option").selectedIndex].value;
    document.getElementById("admin_delete_user_error").innerHTML = "";
    $.ajax({
        url: "models/admin/delete_user.php",
        method: "POST",
        dataType: "json",
        data: {
            user: user
        },
        success: function (data) {
            if (data == "Successful") {
                show_notification("delete_user");
                fill_admin_controls("admin_delete_user");
            }
        },
        error: function (err) {
            write_error_to_file(err.responseJSON);
            switch(err.responseJSON) {
                case "database_error":
                    document.getElementById("admin_delete_user_error").innerHTML = language_content.admin_template.admin_errors.database_error;
                    break;
                default:
                    document.getElementById("admin_delete_user_error").innerHTML = language_content.admin_template.admin_errors.other_error;
            }
        }
    });
}
function admin_delete_post_show() {
    $.ajax({
        url: "models/admin/posts.php",
        method: "GET",
        dataType: "json",
        success: function (data) {
            var text = "";
            data.forEach(function (p) {
                text += `<option value="${p.ID}">${lang=="eng"?p.title:(lang=="srb"?p.SRBtitle:"Error")}</option>`;
            });
            $("#admin_extra_option").html(text);
            var button_text = `<p id="admin_delete_post_error"></p>`;
            button_text += `<button id="admin_delete_post_submit">${language_content.admin_template.admin_controls.admin_delete_post_submit}</button>`;
            $("#admin_extra_space").html(button_text);
            $("#admin_delete_post_submit").on("click", admin_delete_post_send);
        },
        error: function (err) {
            write_error_to_file(err);
            $("#admin_extra_space").html(err.responseText);
        }
    });
}
function admin_delete_post_send() {
    var post = document.getElementById("admin_extra_option").options[document.getElementById("admin_extra_option").selectedIndex].value;
    document.getElementById("admin_delete_post_error").innerHTML = "";
    $.ajax({
        url: "models/admin/delete_post.php",
        method: "POST",
        dataType: "json",
        data: {
            post: post
        },
        success: function (data) {
            if (data == "Successful") {
                show_notification("delete_post");
                fill_admin_controls("admin_delete_post");
            }
        },
        error: function (err) {
            write_error_to_file(err.responseJSON);
            switch(err.responseJSON) {
                case "database_error":
                    document.getElementById("admin_delete_post_error").innerHTML = language_content.admin_template.admin_errors.database_error;
                    break;
                default:
                    document.getElementById("admin_delete_post_error").innerHTML = language_content.admin_template.admin_errors.other_error;
            }
        }
    });
}
function admin_delete_tag_show() {
    $.ajax({
        url: "models/admin/tags.php",
        method: "GET",
        dataType: "json",
        success: function (data) {
            var text = "";
            data.forEach(function (t) {
                text += `<option value="${t.ID}">${lang=="eng"?t.name:(lang=="srb"?t.SRBname:"Error")}</option>`;
            });
            $("#admin_extra_option").html(text);
            var button_text = `<p id="admin_delete_tag_error"></p>`;
            button_text += `<button id="admin_delete_tag_submit">${language_content.admin_template.admin_controls.admin_delete_tag_submit}</button>`;
            $("#admin_extra_space").html(button_text);
            $("#admin_delete_tag_submit").on("click", admin_delete_tag_send);
        },
        error: function (err) {
            write_error_to_file(err);
            $("#admin_extra_space").html(err.responseText);
        }
    });
}
function admin_delete_tag_send() {
    var tag = document.getElementById("admin_extra_option").options[document.getElementById("admin_extra_option").selectedIndex].value;
    document.getElementById("admin_delete_tag_error").innerHTML = "";
    $.ajax({
        url: "models/admin/delete_tag.php",
        method: "POST",
        dataType: "json",
        data: {
            tag: tag
        },
        success: function (data) {
            if (data == "Successful") {
                show_notification("delete_tag");
                fill_admin_controls("admin_delete_tag");
            }
        },
        error: function (err) {
            write_error_to_file(err.responseJSON);
            switch(err.responseJSON) {
                case "database_error":
                    document.getElementById("admin_delete_tag_error").innerHTML = language_content.admin_template.admin_errors.database_error;
                    break;
                default:
                    document.getElementById("admin_delete_tag_error").innerHTML = language_content.admin_template.admin_errors.other_error;
            }
        }
    });
}
function admin_delete_picture_show() {
    var comments;
    $.ajax({
        url: "models/admin/pictures.php",
        method: "GET",
        dataType: "json",
        success: function (data) {
            pictures = data;
            var text = "";
            pictures.forEach(function (p) {
                text += `<option value="${p.ID}">${lang=="eng"?p.alt:(lang=="srb"?p.SRBalt:"Error")}</option>`;
            });
            $("#admin_extra_option").html(text);
            admin_delete_picture_show_second(pictures, pictures[0].ID);
            $("#admin_extra_option").on('change', function() {
                admin_delete_picture_show_second(pictures, $(this).val());
            });
        },
        error: function (err) {
            write_error_to_file(err);
            $("#admin_extra_space").html(err.responseText);
        }
    });
}
function admin_delete_picture_show_second(pictures, picture_id) {
    pictures.forEach(function (p) {
        if (p.ID != picture_id) { return; }
        var text = `<img src="${p.src}" alt="${lang=="eng"?p.alt:(lang=="srb"?p.SRBalt:"Error")}"/>`;
        text += `<p id="admin_delete_picture_error"></p>`;
        text += `<button id="admin_delete_picture_submit">${language_content.admin_template.admin_controls.admin_delete_picture_submit}</button>`;
        $("#admin_extra_space").html(text);
    });
    $("#admin_delete_picture_submit").on("click", admin_delete_picture_send);
}
function admin_delete_picture_send() {
    var picture = document.getElementById("admin_extra_option").options[document.getElementById("admin_extra_option").selectedIndex].value;
    document.getElementById("admin_delete_picture_error").innerHTML = "";
    $.ajax({
        url: "models/admin/delete_picture.php",
        method: "POST",
        dataType: "json",
        data: {
            picture: picture
        },
        success: function (data) {
            if (data == "Successful") {
                show_notification("delete_picture");
                fill_admin_controls("admin_delete_picture");
            }
        },
        error: function (err) {
            write_error_to_file(err.responseJSON);
            switch(err.responseJSON) {
                case "database_error":
                    document.getElementById("admin_delete_picture_error").innerHTML = language_content.admin_template.admin_errors.database_error;
                    break;
                default:
                    document.getElementById("admin_delete_picture_error").innerHTML = language_content.admin_template.admin_errors.other_error;
            }
        }
    });
}
function admin_delete_comment_show() {
    var comments;
    $.ajax({
        url: "models/admin/comments.php",
        method: "GET",
        dataType: "json",
        success: function (data) {
            comments = data;
            var text = "";
            comments.forEach(function (c) {
                text += `<option value="${c.ID}">${c.text}</option>`;
            });
            $("#admin_extra_option").html(text);
            admin_delete_comment_show_second(comments, comments[0].ID);
            $("#admin_extra_option").on('change', function() {
                admin_delete_comment_show_second(comments, $(this).val());
            });
        },
        error: function (err) {
            write_error_to_file(err);
            $("#admin_extra_space").html(err.responseText);
        }
    });
}
function admin_delete_comment_show_second(comments, comment_id) {
    comments.forEach(function (c) {
        if (c.ID != comment_id) { return; }
        var text = `<span>${c.text}</span>`;
        text += `<p id="admin_delete_comment_error"></p>`;
        text += `<button id="admin_delete_comment_submit">${language_content.admin_template.admin_controls.admin_delete_comment_submit}</button>`;
        $("#admin_extra_space").html(text);
    });
    $("#admin_delete_comment_submit").on("click", admin_delete_comment_send);
}
function admin_delete_comment_send() {
    var comment = document.getElementById("admin_extra_option").options[document.getElementById("admin_extra_option").selectedIndex].value;
    document.getElementById("admin_delete_comment_error").innerHTML = "";
    $.ajax({
        url: "models/admin/delete_comment.php",
        method: "POST",
        dataType: "json",
        data: {
            comment: comment
        },
        success: function (data) {
            if (data == "Successful") {
                show_notification("delete_comment");
                fill_admin_controls("admin_delete_comment");
            }
        },
        error: function (err) {
            write_error_to_file(err.responseJSON);
            switch(err.responseJSON) {
                case "database_error":
                    document.getElementById("admin_delete_comment_error").innerHTML = language_content.admin_template.admin_errors.database_error;
                    break;
                default:
                    document.getElementById("admin_delete_comment_error").innerHTML = language_content.admin_template.admin_errors.other_error;
            }
        }
    });
}
function admin_delete_newsletter_show() {
    $.ajax({
        url: "models/admin/newsletter.php",
        method: "GET",
        dataType: "json",
        success: function (data) {
            var text = "";
            data.forEach(function (s) {
                text += `<option value="${s.ID}">${s.email}</option>`;
            });
            $("#admin_extra_option").html(text);
            var button_text = `<p id="admin_delete_newsletter_error"></p>`;
            button_text += `<button id="admin_delete_newsletter_submit">${language_content.admin_template.admin_controls.admin_delete_newsletter_submit}</button>`;
            $("#admin_extra_space").html(button_text);
            $("#admin_delete_newsletter_submit").on("click", admin_delete_newsletter_send);
        },
        error: function (err) {
            write_error_to_file(err);
            $("#admin_extra_space").html(err.responseText);
        }
    });
}
function admin_delete_newsletter_send() {
    var newsletter = document.getElementById("admin_extra_option").options[document.getElementById("admin_extra_option").selectedIndex].value;
    document.getElementById("admin_delete_newsletter_error").innerHTML = "";
    $.ajax({
        url: "models/admin/delete_newsletter.php",
        method: "POST",
        dataType: "json",
        data: {
            newsletter: newsletter
        },
        success: function (data) {
            if (data == "Successful") {
                show_notification("delete_newsletter");
                fill_admin_controls("admin_delete_newsletter");
            }
        },
        error: function (err) {
            write_error_to_file(err.responseJSON);
            switch(err.responseJSON) {
                case "database_error":
                    document.getElementById("admin_delete_newsletter_error").innerHTML = language_content.admin_template.admin_errors.database_error;
                    break;
                default:
                    document.getElementById("admin_delete_newsletter_error").innerHTML = language_content.admin_template.admin_errors.other_error;
            }
        }
    });
}
function admin_delete_post_tag_show() {
    $.ajax({
        url: "models/admin/post_tag.php",
        method: "GET",
        dataType: "json",
        success: function (data) {
            var text = "";
            data.forEach(function (pt) {
                text += `<option value="${pt.postID}-${pt.tagID}">${lang=="eng"?pt.postTitle:(lang=="srb"?pt.postSRBTitle:"Error")} - ${lang=="eng"?pt.tagName:(lang=="srb"?pt.tagSRBName:"Error")}</option>`;
            });
            $("#admin_extra_option").html(text);
            var button_text = `<p id="admin_delete_post_tag_error"></p>`;
            button_text += `<button id="admin_delete_post_tag_submit">${language_content.admin_template.admin_controls.admin_delete_post_tag_submit}</button>`;
            $("#admin_extra_space").html(button_text);
            $("#admin_delete_post_tag_submit").on("click", admin_delete_post_tag_send);
        },
        error: function (err) {
            write_error_to_file(err);
            $("#admin_extra_space").html(err.responseText);
        }
    });
}
function admin_delete_post_tag_send() {
    var post_tag = document.getElementById("admin_extra_option").options[document.getElementById("admin_extra_option").selectedIndex].value;
    document.getElementById("admin_delete_post_tag_error").innerHTML = "";
    $.ajax({
        url: "models/admin/delete_post_tag.php",
        method: "POST",
        dataType: "json",
        data: {
            post_tag: post_tag
        },
        success: function (data) {
            if (data == "Successful") {
                show_notification("delete_post_tag");
                fill_admin_controls("admin_delete_post_tag");
            }
        },
        error: function (err) {
            write_error_to_file(err.responseJSON);
            switch(err.responseJSON) {
                case "database_error":
                    document.getElementById("admin_delete_post_tag_error").innerHTML = language_content.admin_template.admin_errors.database_error;
                    break;
                default:
                    document.getElementById("admin_delete_post_tag_error").innerHTML = language_content.admin_template.admin_errors.other_error;
            }
        }
    });
}
function get_page_access_info() {
    $.ajax({
        url: "models/page_access_info.php",
        method: "GET",
        dataType: "json",
        success: function (data) {
            var sum = data.admin_template + data.appetizer + data.contact_template + data.dessert + data.main_course + data.main_template + data.page_404;
            $(".admin_controls .visiting_main span:last-child").html((data.main_template / sum * 100).toFixed(2) + "%");
            $(".admin_controls .visiting_appetizer span:last-child").html((data.appetizer / sum * 100).toFixed(2) + "%");
            $(".admin_controls .visiting_main_course span:last-child").html((data.main_course / sum * 100).toFixed(2) + "%");
            $(".admin_controls .visiting_dessert span:last-child").html((data.dessert / sum * 100).toFixed(2) + "%");
            $(".admin_controls .visiting_contact span:last-child").html((data.contact_template / sum * 100).toFixed(2) + "%");
            $(".admin_controls .visiting_admin span:last-child").html((data.admin_template / sum * 100).toFixed(2) + "%");
            $(".admin_controls .visiting_404 span:last-child").html((data.page_404 / sum * 100).toFixed(2) + "%");
        },
        error: function (err) {
            write_error_to_file(err);
            $(".admin_controls .admin_file_holder").html(language_content.admin_template.admin_errors.other_error);
        }
    });
}
function get_logged_users() {
    $.ajax({
        url: "models/logged_users.php",
        method: "GET",
        dataType: "json",
        success: function (data) {
            $(".admin_controls .number_logged_users span:last-child").html(data[0].logged_users);
        },
        error: function (err) {
            write_error_to_file(err);
            $(".admin_controls .admin_file_holder").html(language_content.admin_template.admin_errors.other_error);
        }
    });
}
function export_to_excel() {
    $.ajax({
        url: "models/export_excel.php",
        method: "GET",
        dataType: "json",
        success: function (data) {
            show_notification("excel_saved");
        },
        error: function (err) {
            if (err.status == 200) {
                show_notification("excel_saved");
            } else {
                alert(err.responseText);
            }
        }
    });
}
