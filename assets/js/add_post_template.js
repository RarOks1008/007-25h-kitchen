function start_add_post() {
    $(".welcome_user span:first-child").html(language_content.add_post_template.welcome);
    $(".welcome_user button").html(language_content.add_post_template.logout);
    $(".add_post_form h2").html(language_content.add_post_template.title);
    $(".add_post_form #add_post_button").val(language_content.add_post_template.create_button);

    $(".add_post_param label[for='add_post_title']").html(language_content.add_post_template.add_post_title);
    $(".add_post_param #add_post_title").attr("placeholder", language_content.add_post_template.add_post_title);

    $(".add_post_param label[for='add_post_srb_title']").html(language_content.add_post_template.add_post_srb_title);
    $(".add_post_param #add_post_srb_title").attr("placeholder", language_content.add_post_template.add_post_srb_title);

    $(".add_post_param label[for='add_post_text']").html(language_content.add_post_template.add_post_text);
    $(".add_post_param label[for='add_post_srb_text']").html(language_content.add_post_template.add_post_srb_text);

    $(".add_post_param label[for='add_post_type']").html(language_content.add_post_template.add_post_type);
    $(".add_post_param label[for='add_post_image']").html(language_content.add_post_template.add_post_image);
    $(".add_post_param label[for='add_post_tag']").html(language_content.add_post_template.add_post_tag);

    post_get_types();
    post_get_tags();
}
function post_get_types() {
    $.ajax({
        url: "models/types.php",
        method: "GET",
        dataType: "json",
        success: function (data) {
            var text = "";
            data.forEach(function (t) {
                text += `<div><input type="radio" name="add_post_type" value="${t.ID}"/> ${lang=="eng"?t.text:(lang=="srb"?t.SRBtext:"Error")}</div>`;
            });
            $(".add_post_param .add_post_type_holder").html(text);
        },
        error: function (err) {
            write_error_to_file(err);
            $(".add_post_param .add_post_type_holder").html(err.responseText);
        }
    });
}
function post_get_tags() {
    $.ajax({
        url: "models/tags.php",
        method: "GET",
        dataType: "json",
        success: function (data) {
            var text = "";
            data.forEach(function (t) {
                text += `<div><input type="checkbox" name="add_post_tag[]" value="${t.ID}"/> ${lang=="eng"?t.name:(lang=="srb"?t.SRBname:"Error")}</div>`;
            });
            $(".add_post_param .add_post_tag_holder").html(text);
        },
        error: function (err) {
            write_error_to_file(err);
            $(".add_post_param .add_post_tag_holder").html(err.responseText);
        }
    });
}
function add_post_param_check() {
    var eng_title = document.getElementById("add_post_title").value,
        srb_title = document.getElementById("add_post_srb_title").value,
        eng_text = document.getElementById("add_post_text").value,
        srb_text = document.getElementById("add_post_srb_text").value,
        title_pattern = /^[A-ZŠĐŽČĆ][a-z0-9ščćđž]+$/,
        type_checked = $(".add_post_type_holder input:checked").val(),
        tags_checked = document.getElementsByName("add_post_tag[]"),
        has_checked = false,
        image_selected = document.getElementsByName("add_post_image[]").length;

    if (eng_title == "" || srb_title == "" || eng_text == "" || srb_text == "") {
        document.getElementById("add_post_error").innerHTML = language_content.add_post_template.empty_field;
        return false;
    }
    if (!type_checked) {
        document.getElementById("add_post_error").innerHTML = language_content.add_post_template.type_not_selected;
        return false;
    }
    if (!title_pattern.test(eng_title) || !title_pattern.test(srb_title)) {
        document.getElementById("add_post_error").innerHTML = language_content.add_post_template.title_invalid;
        return false;
    }
    tags_checked.forEach(function (t) {
        if (t.checked) { has_checked = true; }
    });
    if (!has_checked) {
        document.getElementById("add_post_error").innerHTML = language_content.add_post_template.tag_unchecked;
        return false;
    }
    if (image_selected <= 0) {
        document.getElementById("add_post_error").innerHTML = language_content.add_post_template.no_image_selected;
        return false;
    }
    document.getElementById("add_post_error").innerHTML = "";
    return true;
}
