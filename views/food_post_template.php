<div id="new_post_area">
    <?php
        if (isset($_SESSION['user'])) {
            echo "<div class='add_post_area'>";
            echo "<div class='welcome_user'><div><span></span><span>".$_SESSION['user']->name." ". $_SESSION['user']->last_name."</span></div><button id='logout'></button></div>";
            echo "<div id='add_post'>";
            include("add_post_template.php");
            echo "</div>";
            echo "</div>";
        } else {
            include("login_template.php");
        }
    ?>
</div>
<div id="main_panel_load_food"></div>
<div id="main_panel_load_edit">
    <div class="search_field">
        <input type="text" name="search" id="search" placeholder=""/>
        <button><span class="fa fa-search" aria-hidden="true"></span></button>
    </div>
    <div class="how_it_started">
        <h2></h2>
        <p></p>
    </div>
    <div class="rss_feed">
        <button><span class="fas fa-rss"></span></button>
    </div>
    <div class="quote_field">
        <h2></h2>
        <p></p>
    </div>
    <div class="subscribe_newsletter">
        <h2></h2>
        <input type="text" name="subscribe" id="subscribe" placeholder=""/>
        <p id="subscribe_error"></p>
        <p id="subscribe_text"></p>
    </div>
</div>
