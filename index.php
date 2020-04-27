<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta name="author" content="Nikola Nedeljkovic"/>
        <meta name="copyright" content="RarOks 1008 Entertainment @ 2019"/>
        <meta name="robots" content="index,follow"/>
        <link rel="shortcut icon" href="favicon.ico"/>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous"/>

        <link rel="stylesheet" href="assets/css/style.css"/>
        <link rel="stylesheet" href="assets/css/main_template.css"/>
        <link rel="stylesheet" href="assets/css/header_template.css"/>
        <link rel="stylesheet" href="assets/css/footer_template.css"/>
        <link rel="stylesheet" href="assets/css/food_post_template.css"/>
        <link rel="stylesheet" href="assets/css/add_post_template.css"/>
        <link rel="stylesheet" href="assets/css/login_template.css"/>
        <link rel="stylesheet" href="assets/css/contact_template.css"/>
        <link rel="stylesheet" href="assets/css/admin_template.css"/>
        <link rel="stylesheet" href="assets/css/page_404.css"/>
    </head>
    <body>
        <?php
            require_once "config/connection.php";
            session_start();
            include("views/header_template.php");
            echo "<div id=\"main_panel\">";
            if (isset($_GET["page"])) {
                switch($_GET["page"]) {
                    case "main_template":
                        zabeleziPristupStranici($_GET["page"]);
                        include "views\main_template.php";
                        break;
                    case "appetizer":
                    case "main_course":
                    case "dessert":
                        zabeleziPristupStranici($_GET["page"]);
                        include "views/food_post_template.php";
                        break;
                    case "contact_template":
                        zabeleziPristupStranici($_GET["page"]);
                        include "views/contact_template.php";
                        break;
                    case "admin_template":
                        zabeleziPristupStranici($_GET["page"]);
                        include "views/admin_template.php";
                        break;
                    default:
                        zabeleziPristupStranici("page_404");
                        include "views/404.php";
                        break;
                }
            } else {
                include "views\main_template.php";
            }
            echo "</div>";
            include("views/footer_template.php");
        ?>
        <div class="notification">
            <span></span>
            <span></span>
        </div>
        <h1></h1>
    </body>

    <script type="text/javascript" src="assets/js/3rd/jquery.min.js"></script>

    <script type="text/javascript" src="assets/js/main.js"></script>

    <script type="text/javascript" src="assets/js/header_template.js"></script>
    <script type="text/javascript" src="assets/js/footer_template.js"></script>
    <script type="text/javascript" src="assets/js/main_template.js"></script>
    <script type="text/javascript" src="assets/js/food_post_template.js"></script>
    <script type="text/javascript" src="assets/js/add_post_template.js"></script>
    <script type="text/javascript" src="assets/js/login_template.js"></script>
    <script type="text/javascript" src="assets/js/contact_template.js"></script>
    <script type="text/javascript" src="assets/js/admin_template.js"></script>
</html>
