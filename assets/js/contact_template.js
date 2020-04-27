function start_contact() {
    setTimeout(start_second_contact, 50);
}
function start_second_contact() {
    if (!$("#contact_template:visible").length) { setTimeout(start_second_contact, 50); } else { load_contact(); }
}
function load_contact() {
    $("#contact_template .contact_area h2").html(language_content.contact_template.title);
    $("#contact_template .contact_area button").html(language_content.contact_template.send_contact);
    $("#contact_template .contact_area #message_mail").attr("placeholder", language_content.contact_template.send_mail);

    $("#contact_template .author h2").html(language_content.contact_template.author);
    $("#contact_template .author #message_mail").attr("alt", language_content.contact_template.author);

    $("#contact_template .author .author_name p:first-child").html(language_content.contact_template.author_name);
    $("#contact_template .author .author_birth p:first-child").html(language_content.contact_template.author_birth);
    $("#contact_template .author .author_mail p:first-child").html(language_content.contact_template.author_mail);
    $("#contact_template .author .author_number p:first-child").html(language_content.contact_template.author_number);
    $("#contact_template .author .author_work p:first-child").html(language_content.contact_template.author_work);
    $("#contact_template .author button").html(language_content.contact_template.download_author_data);

    document.getElementById("message_mail").addEventListener("keyup", function (e) { if (e.key == "Enter") { mail_send_work(); } });
    $("#sent_contact").on("click", mail_send_work);
    $("#download_author_data").on("click", download_author_data);
}
function mail_send_work() {
    var email_pat = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        mail = document.getElementById("message_mail").value,
        text = document.getElementById("send_message").value;
    if (mail == "" || text == "") {
        document.getElementById("message_error").innerHTML = language_content.contact_template.empty_field;
        return;
    }
    if (!email_pat.test(mail)) {
        document.getElementById("message_error").innerHTML = language_content.contact_template.mail_invalid;
        return;
    }
    document.getElementById("message_error").innerHTML = "";
    $.ajax({
        url: "models/contact.php",
        method: "POST",
        dataType: "json",
        data: {
            mail: mail,
            text: text
        },
        success: function (data) {
            if (data == "Successful") {
                show_notification("contact_mail_sent");
                document.getElementById("message_mail").value = "";
                document.getElementById("send_message").value = "";
            }
        },
        error: function (err) {
            write_error_to_file(err.responseJSON);
            switch(err.responseJSON) {
                case "database_error":
                    document.getElementById("message_error").innerHTML = language_content.contact_template.database_error;
                    break;
                case "empty_field":
                    document.getElementById("message_error").innerHTML = language_content.contact_template.empty_field;
                    break;
                case "mail_invalid":
                    document.getElementById("message_error").innerHTML = language_content.contact_template.mail_invalid;
                    break;
                default:
                    document.getElementById("message_error").innerHTML = language_content.contact_template.other_error;
            }
        }
    });
}
function download_author_data() {
    $.ajax({
        url: "models/save_word.php",
        method: "POST",
        dataType: "json",
        data: {
            author_name: $("#contact_template .author .author_name p:first-child").html(),
            author_name_val: $("#contact_template .author .author_name p:last-child").html(),
            author_birth: $("#contact_template .author .author_birth p:first-child").html(),
            author_birth_val: $("#contact_template .author .author_birth p:last-child").html(),
            author_mail: $("#contact_template .author .author_mail p:first-child").html(),
            author_mail_val: $("#contact_template .author .author_mail p:last-child").html(),
            author_number: $("#contact_template .author .author_number p:first-child").html(),
            author_number_val: $("#contact_template .author .author_number p:last-child").html(),
            author_work: $("#contact_template .author .author_work p:first-child").html(),
            author_work_val: $("#contact_template .author .author_work p:last-child").html()
        },
        success: function (data) {
            show_notification("word_saved");
        },
        error: function (err) {
            if (err.status == 200) {
                show_notification("word_saved");
            } else {
                alert(err.responseText);
            }
        }
    });
}
