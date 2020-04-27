var lang = "eng",
    language_content = "",
    food_types = ['appetizer', 'main_course', 'dessert'],
    selected_food_type = '',
    posts = [],
    page = window.location.href.substr(window.location.href.indexOf("?"), window.location.href.length - 1),
    page_content = page.substr(page.indexOf("=") + 1, page.length - 1);

$(document).ready(function () {
    get_language();
    get_content();
    get_navigation("header");
    get_navigation("footer");
    get_tags("footer");
    get_top_posts("footer");
});

function get_language() {
    if (window.localStorage.getItem("language")) {
        lang = window.localStorage.getItem("language");
    } else {
        lang = "eng";
    }
}

function language_head() {
    if (lang == "eng") {
        document.getElementsByTagName("head")[0].innerHTML += `<title>25Hour Kitchen</title>
            <meta name="keywords" content="25, hours, kitchen, meal, food"/>
        	<meta name="description" content="The best blog for your favourite meals and recipes!"/>
        	<meta name="abstract" content="25Hour Kitchen with RarOks 1008."/>`;
    }
    if (lang == "srb") {
        document.getElementsByTagName("head")[0].innerHTML += `<meta charset="utf-8"/>
            <title>25Sati Kuhinja</title>
            <meta name="keywords" content="25, sat, kuhinja, obrok, hrana"/>
        	<meta name="description" content="Najbolji blog za Vašu omiljenu hranu i recepte!"/>
        	<meta name="abstract" content="25Sati Kuhinja sa RarOks-om 1008."/>`;
    }
    $("h1").html(language_content.page_title);
}

function get_content() {
    $.ajax({
        url: "assets/lang/" + lang + ".json",
        method: "GET",
        dataType: "json",
        success: function (data) {
            language_content = data;
            language_head();
            language_header_template();
            language_footer_template();
            selected_food_type = "";
            switch(page_content) {
                case "main_template":
                    language_main_template();
                    break;
                case "appetizer":
                case "main_course":
                case "dessert":
                    selected_food_type = page_content;
                    start_food_posts();
                    break;
                case "contact_template":
                    start_contact();
                    break;
                case "admin_template":
                    start_admin();
                    break;
                default:
                    page_content = "main_template";
                    language_main_template();
                    break;
            }
        },
        error: function (err) {
            write_error_to_file(err);
            window.location.reload();
        }
    });
}

function get_top_posts(which) {
    $.ajax({
        url: "models/top_posts.php",
        method: "GET",
        dataType: "json",
        success: function (data) {
            var text = "";
            data.forEach(function (p) {
                text += `<div class="top_post"><h4>${lang=="eng"?p.title:(lang=="srb"?p.SRBtitle:"Error")}</h4><div><span>${p.postDate}</span><span>${p.name} ${p.lastname}</span></div></div>`;
            });
            if (which == "footer") {
                fill_top_posts_footer(text);
            }
        },
        error: function (err) {
            write_error_to_file(err);
            fill_top_posts_footer(err.responseText);
        }
    });
}

function get_navigation(which) {
    $.ajax({
        url: "models/navigation.php",
        method: "GET",
        dataType: "json",
        success: function (data) {
            var text = "";
            data.forEach(function (n) {
                text += `<li><a href="index.php?page=${n.Link}">${lang=="eng"?n.Title:(lang=="srb"?n.SRBTitle:"Error")}</a></li>`;
            });
            if (which == "header") {
                fill_navigation_header(text);
            }
            if (which == "footer") {
                fill_navigation_footer(text);
            }
        },
        error: function (err) {
            write_error_to_file(err.responseText);
            if (which == "header") {
                fill_navigation_header(err.responseText);
            }
            if (which == "footer") {
                fill_navigation_footer(err.responseText);
            }
        }
    });
}

function get_tags(which) {
    $.ajax({
        url: "models/tags.php",
        method: "GET",
        dataType: "json",
        success: function (data) {
            var text = "";
            data.forEach(function (n) {
                text += `<span data-id="${n.ID}">${lang=="eng"?n.name:(lang=="srb"?n.SRBname:"Error")}</span>`;
            });
            if (which == "footer") {
                fill_tags_footer(text);
            }
        },
        error: function (err) {
            write_error_to_file(err);
            fill_tags_footer(err.responseText);
        }
    });
}

function show_notification(which, reload) {
    $(".notification").css({"display": "flex", "opacity": 1});
    switch (which) {
        case "rss":
            document.getElementsByClassName("notification")[0].firstElementChild.innerHTML = language_content.notification.rss_title;
            document.getElementsByClassName("notification")[0].lastElementChild.innerHTML = language_content.notification.rss_text;
            break;
        case "login":
            document.getElementsByClassName("notification")[0].firstElementChild.innerHTML = language_content.notification.login_title;
            document.getElementsByClassName("notification")[0].lastElementChild.innerHTML = language_content.notification.login_text;
            break;
        case "register":
            document.getElementsByClassName("notification")[0].firstElementChild.innerHTML = language_content.notification.register_title;
            document.getElementsByClassName("notification")[0].lastElementChild.innerHTML = language_content.notification.register_text;
            break;
        case "logout":
            document.getElementsByClassName("notification")[0].firstElementChild.innerHTML = language_content.notification.logout_title;
            document.getElementsByClassName("notification")[0].lastElementChild.innerHTML = language_content.notification.logout_text;
            break;
        case "comment":
            document.getElementsByClassName("notification")[0].firstElementChild.innerHTML = language_content.notification.comment_title;
            document.getElementsByClassName("notification")[0].lastElementChild.innerHTML = language_content.notification.comment_text;
            break;
        case "insert_user":
            document.getElementsByClassName("notification")[0].firstElementChild.innerHTML = language_content.notification.insert_user_title;
            document.getElementsByClassName("notification")[0].lastElementChild.innerHTML = language_content.notification.insert_user_text;
            break;
        case "insert_tag":
            document.getElementsByClassName("notification")[0].firstElementChild.innerHTML = language_content.notification.insert_tag_title;
            document.getElementsByClassName("notification")[0].lastElementChild.innerHTML = language_content.notification.insert_tag_text;
            break;
        case "insert_post_tag":
            document.getElementsByClassName("notification")[0].firstElementChild.innerHTML = language_content.notification.insert_post_tag_title;
            document.getElementsByClassName("notification")[0].lastElementChild.innerHTML = language_content.notification.insert_post_tag_text;
            break;
        case "update_user":
            document.getElementsByClassName("notification")[0].firstElementChild.innerHTML = language_content.notification.update_user_title;
            document.getElementsByClassName("notification")[0].lastElementChild.innerHTML = language_content.notification.update_user_text;
            break;
        case "update_post":
            document.getElementsByClassName("notification")[0].firstElementChild.innerHTML = language_content.notification.update_post_title;
            document.getElementsByClassName("notification")[0].lastElementChild.innerHTML = language_content.notification.update_post_text;
            break;
        case "update_tag":
            document.getElementsByClassName("notification")[0].firstElementChild.innerHTML = language_content.notification.update_tag_title;
            document.getElementsByClassName("notification")[0].lastElementChild.innerHTML = language_content.notification.update_tag_text;
            break;
        case "delete_user":
            document.getElementsByClassName("notification")[0].firstElementChild.innerHTML = language_content.notification.delete_user_title;
            document.getElementsByClassName("notification")[0].lastElementChild.innerHTML = language_content.notification.delete_user_text;
            break;
        case "delete_post":
            document.getElementsByClassName("notification")[0].firstElementChild.innerHTML = language_content.notification.delete_post_title;
            document.getElementsByClassName("notification")[0].lastElementChild.innerHTML = language_content.notification.delete_post_text;
            break;
        case "delete_tag":
            document.getElementsByClassName("notification")[0].firstElementChild.innerHTML = language_content.notification.delete_tag_title;
            document.getElementsByClassName("notification")[0].lastElementChild.innerHTML = language_content.notification.delete_tag_text;
            break;
        case "delete_picture":
            document.getElementsByClassName("notification")[0].firstElementChild.innerHTML = language_content.notification.delete_picture_title;
            document.getElementsByClassName("notification")[0].lastElementChild.innerHTML = language_content.notification.delete_picture_text;
            break;
        case "delete_comment":
            document.getElementsByClassName("notification")[0].firstElementChild.innerHTML = language_content.notification.delete_comment_title;
            document.getElementsByClassName("notification")[0].lastElementChild.innerHTML = language_content.notification.delete_comment_text;
            break;
        case "delete_newsletter":
            document.getElementsByClassName("notification")[0].firstElementChild.innerHTML = language_content.notification.delete_newsletter_title;
            document.getElementsByClassName("notification")[0].lastElementChild.innerHTML = language_content.notification.delete_newsletter_text;
            break;
        case "delete_post_tag":
            document.getElementsByClassName("notification")[0].firstElementChild.innerHTML = language_content.notification.delete_post_tag_title;
            document.getElementsByClassName("notification")[0].lastElementChild.innerHTML = language_content.notification.delete_post_tag_text;
            break;
        case "subscription":
            document.getElementsByClassName("notification")[0].firstElementChild.innerHTML = language_content.notification.subscription_title;
            document.getElementsByClassName("notification")[0].lastElementChild.innerHTML = language_content.notification.subscription_text;
            break;
        case "contact_mail_sent":
            document.getElementsByClassName("notification")[0].firstElementChild.innerHTML = language_content.notification.contact_mail_sent_title;
            document.getElementsByClassName("notification")[0].lastElementChild.innerHTML = language_content.notification.contact_mail_sent_text;
            break;
        case "word_saved":
            document.getElementsByClassName("notification")[0].firstElementChild.innerHTML = language_content.notification.word_saved_title;
            document.getElementsByClassName("notification")[0].lastElementChild.innerHTML = language_content.notification.word_saved_text;
            break;
        case "excel_saved":
            document.getElementsByClassName("notification")[0].firstElementChild.innerHTML = language_content.notification.excel_saved_title;
            document.getElementsByClassName("notification")[0].lastElementChild.innerHTML = language_content.notification.excel_saved_text;
            break;
        case "forgot_password":
            document.getElementsByClassName("notification")[0].firstElementChild.innerHTML = language_content.notification.forgot_password_title;
            document.getElementsByClassName("notification")[0].lastElementChild.innerHTML = language_content.notification.forgot_password_text;
            break;
    }
    $(".notification").animate({
        opacity: 0
    }, 5000, function() {
        $(".notification").css("display", "none");
        if (reload) { window.location.reload(); }
    });
}
function write_error_to_file(data) {
    $.ajax({
        url: "models/write_error.php",
        method: "POST",
        dataType: "json",
        data: {
            text: data
        },
        success: function (data) {
            console.log("Wrote error successfully");
        },
        error: function (err) {
            console.log("Could not write error");
        }
    });
}
