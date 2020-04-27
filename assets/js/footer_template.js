var selected_tags = [];

function fill_navigation_footer(text) {
    document.getElementById("navigation_footer").innerHTML = text + document.getElementById("navigation_footer").innerHTML;
    $("#navigation_footer li a").on("click", function(e) {
        if ($.inArray($(this).attr("href"), food_types) !== -1) {
            selected_food_type = $(this).attr("href");
            start_food_posts();
        } else {
            selected_food_type = "";
            if ($(this).attr("href") == "index.php?page=main_template") {
                language_main_template();
            } else if ($(this).attr("href") == "index.php?page=admin_template") {
                start_admin();
            } else {
                start_contact();
            }
        }
    });
}

function fill_tags_footer(text) {
    document.getElementById("tags_footer").innerHTML = text;
    $("#tags_footer span").on("click", function(e) {
        if(selected_tags.indexOf($(this).attr("data-id")) >= 0) {
            for (var i = 0; i < selected_tags.length; i++) {
                if ( selected_tags[i] === $(this).attr("data-id")) {
                    selected_tags.splice(i, 1);
                }
            }
            $(this).removeClass("selected_footer_tag");
        } else {
            selected_tags.push($(this).attr("data-id"));
            $(this).addClass("selected_footer_tag");
        }
        filter_tags();
    });
}

function filter_tags() {
    load_food_posts();
}

function fill_top_posts_footer(text) {
    document.getElementById("recent_posts_footer").innerHTML = text;
}

function language_footer_template() {
    $(".footer_navigation h3").html(language_content.footer_template.navigation);
    $(".footer_recents h3").html(language_content.footer_template.recent_posts);
    $(".footer_tags h3").html(language_content.footer_template.tags);
}
