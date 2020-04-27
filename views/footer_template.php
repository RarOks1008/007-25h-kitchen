<div class="footer">
    <p class="copyright">&copy; Nikola Nedeljkovic 2019 &nbsp;&nbsp;&nbsp; @ ICT</p>
    <div class="footer_holder">
        <div class="footer_part footer_navigation">
            <h3>Navigation</h3>
            <ul id="navigation_footer">
                <?php
                    if (isset($_SESSION["user"])) {
                        if ($_SESSION["user"]->ID == 1) {
                            echo '<li><a href="index.php?page=admin_template">Admin Panel</a></li>';
                        }
                    }
                ?>
            </ul>
        </div>
        <div class="footer_part footer_recents">
            <h3>Recent Posts</h3>
            <div id="recent_posts_footer"></div>
        </div>
        <div class="footer_part footer_tags">
            <h3>Tags</h3>
            <div id="tags_footer"></div>
        </div>
    </div>
</div>
