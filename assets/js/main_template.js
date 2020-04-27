function start_main_template() {
    if (!$(".landing_screen") || !$(".landing_screen h2:visible").length || !$(".landing_screen img:visible").length) {
        setTimeout(start_main_template, 50);
    } else {
        var elArray = document.getElementsByClassName("landing_screen");
        setTimeout(function() {
            var firstChild = elArray[0];
            fill_first_child(firstChild);
        }, 10);
    }
}
function language_main_template() {
    setTimeout(start_main_template, 50);
}
function fill_first_child(firstChild) {
    firstChild.firstElementChild.innerHTML = language_content.main_template.title;
    firstChild.lastElementChild.alt = language_content.main_template.baking_image;
}
