function start_food_posts() {
    if (!$("#main_panel_load_food:visible").length) { setTimeout(start_food_posts, 50); } else { load_food_posts(); }
}
function load_food_posts() {
    var sel_tag = selected_tags,
        type_id = food_types.indexOf(selected_food_type) + 2;
    if (sel_tag.length == 0) { sel_tag = [""]; }
    $.ajax({
        url: "models/posts.php",
        method: "GET",
        dataType: "json",
        data: {
            type_id: type_id,
            selected_tags: sel_tag
        },
        success: function (data) {
            post_to_array(data);
        },
        error: function (err) {
            write_error_to_file(err);
            post_to_array(err.responseText);
        }
    });
}
function post_to_array(data, post_id) {
    posts = [];
    data.forEach(function (longP) {
        var has = false;
        posts.forEach(function (post) {
            if (post.id == longP.id) { has = true; }
        });
        if (has) {
            posts.forEach(function (post) {
                if (post.id != longP.id) { return; }
                var hasimage = false,
                    hastag = false;
                post.images.forEach(function (pi) {
                    if (pi.picid == longP.picid) { hasimage = true; }
                });
                post.tags.forEach(function (pt) {
                    if (pt.tagid == longP.tagid) { hastag = true; }
                });
                if (!hasimage) {
                    var image = {
                        picsrc: longP.picsrc,
                        picSRBalt: longP.picSRBalt,
                        picalt: longP.picalt,
                        picid: longP.picid
                    };
                    post.images.push(image);
                }
                if (!hastag) {
                    var tag = {
                        tagid: longP.tagid,
                        tagSRBname: longP.tagSRBname,
                        tagname: longP.tagname
                    };
                    post.tags.push(tag);
                }
            });
        } else {
            var el = {
                SRBtext: longP.SRBtext,
                SRBtitle: longP.SRBtitle,
                id: longP.id,
                images: [{
                    picsrc: longP.picsrc,
                    picSRBalt: longP.picSRBalt,
                    picalt: longP.picalt,
                    picid: longP.picid
                }],
                last_name: longP.last_name,
                name: longP.name,
                postDate: longP.postDate,
                postText: longP.postText,
                tags: [{
                    tagid: longP.tagid,
                    tagSRBname: longP.tagSRBname,
                    tagname: longP.tagname
                }],
                title: longP.title,
                commentNumber: longP.commentNumber
            };
            posts.push(el);
        }
    });
    fill_mid_posts(posts, post_id);
}

function fill_mid_posts(posts, post_id) {
    var text = "";
    posts.forEach(function (post) {
        text += `<div class="post_header"><ul class="post_tags">`;
        post.tags.forEach(function (t) {
            text += `<li><span data-id="${t.tagid}">${lang=="eng"?t.tagname:(lang=="srb"?t.tagSRBname:"Error")}</span></li>`;
        })
        text += "</ul>";
        text += `<h2>${lang=="eng"?post.title:(lang=="srb"?post.SRBtitle:"Error")}</h2>`;
        text += `<div class="post_image"><button data-way="back" data-image="${post.images[0].picid}" data-post="${post.id}"><span class="fas fa-arrow-left"></span></button><img src="${post.images[0].picsrc}" alt="${lang=="eng"?post.images[0].picalt:(lang=="srb"?post.images[0].picSRBalt:"Error")}" data-id="${post.images[0].picid}"/><button data-way="forward" data-image="${post.images[0].picid}" data-post="${post.id}"><span class="fas fa-arrow-right"></span></button></div>`;
        text += `<ul class="post_details"><li><span class="fa fa-calendar" aria-hidden="true"></span> ${post.postDate}</li><li><span class="far fa-user"></span> ${language_content.food_posts.by} ${post.name} ${post.last_name}</li><li><span class="fas fa-comment"></span> ${post.commentNumber} ${language_content.food_posts.comments}</li></ul>`;
        text += "</div>";
        if (post_id) {
            text += `<p class="bigger_letter">${lang=="eng"?post.postText:(lang=="srb"?post.SRBtext:"Error")}</p>`;
        } else {
            text += `<p class="bigger_letter">${lang=="eng"?(post.postText.substring(0,146) + "..."):(lang=="srb"?(post.SRBtext.substring(0,146) + "..."):"Error")}</p>`;
            text += `<div class="post_button"><button data-id="${post.id}">${language_content.food_posts.continue_reading}</button></div>`;
        }
    });
    if (posts.length == 0) {
        text += `<h2>${language_content.food_posts.no_posts}</h2>`;
    }
    if (food_types.indexOf(page_content) < 0) { return; }
    document.getElementById("main_panel_load_food").innerHTML = text;
    if (post_id) { get_post_comments(post_id); }
    $(".post_header .post_image button").on("click", function(e) {
        var div_tag = $(this).parent(),
            way = $(this).attr("data-way"),
            post_id = $(this).attr("data-post"),
            image_id = $(this).attr("data-image"),
            image_tag = $(this).parent().children('img');
        e.preventDefault();
        posts.forEach(function(p) {
            if(p.id != post_id) { return; }
            for (var i = 0; i < p.images.length; i++) {
                if (p.images[i].picid == image_id) {
                    if (way == "forward") {
                        var next_num = i + 1;
                        if (next_num == p.images.length) { next_num = 0; }
                        image_tag.attr("alt", lang=="eng"?p.images[next_num].picalt:(lang=="srb"?pp.images[next_num].picSRBalt:"Error"));
                        image_tag.attr("src", p.images[next_num].picsrc);
                        div_tag.children("button").eq(0).attr("data-image", p.images[next_num].picid);
                        div_tag.children("button").eq(1).attr("data-image", p.images[next_num].picid);
                    }
                    if (way == "back") {
                        var prev_num = i - 1;
                        if (prev_num < 0) { prev_num = p.images.length - 1; }
                        image_tag.attr("alt", lang=="eng"?p.images[prev_num].picalt:(lang=="srb"?pp.images[prev_num].picSRBalt:"Error"));
                        image_tag.attr("src", p.images[prev_num].picsrc);
                        div_tag.children("button").eq(0).attr("data-image", p.images[prev_num].picid);
                        div_tag.children("button").eq(1).attr("data-image", p.images[prev_num].picid);
                    }
                }
            }
        });
    });
    $(".post_button button").on("click", function() {
        get_single_post($(this).attr("data-id"));
    });
    finished_loading_posts();
}
function finished_loading_posts() {
    search_work();
    how_it_started_work();
    subscribe_newsletter_work();
    random_quote_work();
    rss_click();
    login_work();
    add_post_work();
    $("#logout").on("click", function() {
        $.ajax({
            url: "models/logout.php",
            method: "GET",
            dataType: "json",
            success: function (data) {
                show_notification("logout", true);
            },
            error: function (err) {
                write_error_to_file(err);
                window.location.reload();
            }
        });
    });
}
function search_work() {
    $("#search").attr("placeholder", language_content.food_posts.search);
    document.getElementById("search").addEventListener("keyup", function (e) {
        if (e.key == "Enter") { search_posts(); }
    });
    $(".search_field button").on("click", search_posts);
}
function search_posts() {
    var sel_tag = selected_tags,
        text = document.getElementById("search").value,
        type_id = food_types.indexOf(selected_food_type) + 2;
    if (sel_tag.length == 0) { sel_tag = [""]; }
    $.ajax({
        url: "models/posts.php",
        method: "GET",
        dataType: "json",
        data: {
            type_id: type_id,
            text: text,
            selected_tags: sel_tag
        },
        success: function (data) {
            post_to_array(data);
        },
        error: function (err) {
            write_error_to_file(err);
            post_to_array(err.responseText);
        }
    });
}
function how_it_started_work() {
    $("#main_panel_load_edit .how_it_started h2").html(language_content.food_posts.how_it_started_title);
    $("#main_panel_load_edit .how_it_started p").html(language_content.food_posts.how_it_started_text);
}
function subscribe_newsletter_work() {
    $("#subscribe").attr("placeholder", language_content.food_posts.subscribe);
    $("#main_panel_load_edit .subscribe_newsletter h2").html(language_content.food_posts.subscribe_newsletter_title);
    $("#main_panel_load_edit .subscribe_newsletter #subscribe_text").html(language_content.food_posts.subscribe_newsletter_text);
    document.getElementById("subscribe").addEventListener("keyup", function (e) { if (e.key == "Enter") { subscribe_send(); } });
}
function subscribe_send() {
    var email_pat = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        subscription_mail = document.getElementById("subscribe").value;
    if (subscription_mail == "") {
        document.getElementById("subscribe_error").innerHTML = language_content.food_posts.subscribe_empty_field;
        return;
    }
    if (!email_pat.test(subscription_mail)) {
        document.getElementById("subscribe_error").innerHTML = language_content.food_posts.not_valid_email;
        return;
    }
    document.getElementById("subscribe_error").innerHTML = "";
    $.ajax({
        url: "models/subscribe.php",
        method: "POST",
        dataType: "json",
        data: {
            subscription_mail: subscription_mail
        },
        success: function (data) {
            if (data == "Successful") {
                show_notification("subscription");
                document.getElementById("subscribe").value = "";
            }
        },
        error: function (err) {
            write_error_to_file(err.responseJSON);
            switch(err.responseJSON) {
                case "database_error":
                    document.getElementById("subscribe_error").innerHTML = language_content.food_posts.database_error;
                    break;
                case "subscribe_empty_field":
                    document.getElementById("subscribe_error").innerHTML = language_content.food_posts.subscribe_empty_field;
                    break;
                case "subscription_mail_exists":
                    document.getElementById("subscribe_error").innerHTML = language_content.food_posts.subscription_mail_exists;
                    break;
                case "not_valid_email":
                    document.getElementById("subscribe_error").innerHTML = language_content.food_posts.not_valid_email;
                    break;
                default:
                    document.getElementById("subscribe_error").innerHTML = language_content.food_posts.other_error;
            }
        }
    });
}
function random_quote_work() {
    $("#main_panel_load_edit .quote_field h2").html(language_content.food_posts.quote_title);
    $.ajax({
        url: "models/random_quote.php",
        method: "GET",
        dataType: "json",
        success: function (data) {
            var text = "<span>\"</span>";
            text += lang=="eng"?data.text:(lang=="srb"?data.SRBtext:"Error");
            text += "<span>\"</span>";
            $("#main_panel_load_edit .quote_field p").html(text);
        },
        error: function (err) {
            write_error_to_file(err);
            $("#main_panel_load_edit .quote_field p").html(err.responseText);
        }
    });
}
function get_single_post(data) {
    var post_id = data;
    $.ajax({
        url: "models/single_post.php",
        method: "POST",
        dataType: "json",
        data: {
            postId: data
        },
        success: function (data) {
            post_to_array(data, post_id);
        },
        error: function (err) {
            write_error_to_file(err);
            post_to_array(err.responseText);
        }
    });
}
function get_post_comments(post_id) {
    $.ajax({
        url: "models/comments.php",
        method: "GET",
        dataType: "json",
        data: {
            postId: post_id
        },
        success: function (data) {
            document.getElementById("main_panel_load_food").innerHTML += `<h2 class="comment_content">${language_content.food_posts.comments}:</h2>`;
            if (data.length) {
                data.forEach(function(c) {
                    document.getElementById("main_panel_load_food").innerHTML += `<div class="comment_holder"><p>${c.userName} ${c.userLastName}</p><p>${c.commentText}</p><p>${c.commentDate}</p></div><div id="add_comment"></div>`;
                });
            } else {
                document.getElementById("main_panel_load_food").innerHTML += `<h3>${language_content.food_posts.no_comment_show}</h3><div id="add_comment"></div>`;
            }
            add_comment_view(post_id);
        },
        error: function (err) {
            write_error_to_file(err);
            document.getElementById("main_panel_load_food").innerHTML = err.responseText;
        }
    });
}
function rss_click() {
    $(".rss_feed button").on("click", function() {
        var location = window.location.href,
            index_location = location.indexOf("index.php"),
            new_location = location.substring(0, index_location),
            rss_location = new_location + "data/rss-" + lang + ".xml",
            textArea = document.createElement("textarea");
        textArea.value = rss_location;
        textArea.className = "always_hidden";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        show_notification("rss");
    });
}
function login_work() {
    if (!$(".login_register:visible").length) { setTimeout(login_work, 50); } else { start_login_register(); }
}
function add_post_work() {
    if (!$("#add_post form:visible").length) { setTimeout(add_post_work, 50); } else { start_add_post(); }
}
function add_comment_view(post_id) {
    document.getElementById("add_comment").innerHTML = `<h2>${language_content.food_posts.add_comment_title}</h2><textarea rows="8" cols="60" name="add_comment_area" id="add_comment_area"></textarea><p id="add_comment_error"></p><button id="add_comment_button">${language_content.food_posts.add_comment_button}</button>`;
    comment_work(post_id);
}
function comment_work(post_id) {
    document.getElementById("add_comment_button").addEventListener("click", function() {
        var comment_text = document.getElementById("add_comment_area").value;
        if (comment_text.trim().length < 5) {
            document.getElementById("add_comment_error").innerHTML = language_content.food_posts.empty_comment;
            return;
        }
        document.getElementById("add_comment_error").innerHTML = "";
        $.ajax({
            url: "models/comment.php",
            method: "POST",
            dataType: "json",
            data: {
                post_id: post_id,
                comment_text: comment_text.trim()
            },
            success: function (data) {
                document.getElementById("add_comment_area").value = "";
                show_notification("comment", true);
            },
            error: function (err) {
                write_error_to_file(err);
                switch(err.responseJSON) {
                    case "empty_comment":
                        document.getElementById("add_comment_error").innerHTML = language_content.food_posts.empty_comment;
                        break;
                    case "log_to_comment":
                        document.getElementById("add_comment_error").innerHTML = language_content.food_posts.log_to_comment;
                        break;
                    case "database_error":
                        document.getElementById("add_comment_error").innerHTML = language_content.food_posts.database_error;
                        break;
                    default:
                        document.getElementById("add_comment_error").innerHTML = language_content.food_posts.other_error;
                }
            }
        });
    });
}
