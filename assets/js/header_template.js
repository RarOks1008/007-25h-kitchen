function fill_navigation_header(text) {
    document.getElementById("header_content").innerHTML = text;
}

$(".header .language img").on("click", function() {
    set_language($(this).attr("data-img"));
});
$("#menu_click").click(function() {
    if ($("#header_content").hasClass("show_menu")) {
        $("#header_content").removeClass("show_menu");
    } else {
        $("#header_content").addClass("show_menu");
    }
});

function set_language(lang) {
    localStorage.setItem("language", lang);
    location.reload();
}

function language_header_template() {
    document.getElementsByClassName("language")[0].firstElementChild.alt = language_content.header_template.serbian_flag;
    document.getElementsByClassName("language")[0].lastElementChild.alt = language_content.header_template.uk_flag;
}
