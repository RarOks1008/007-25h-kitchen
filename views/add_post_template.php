<form onsubmit="return add_post_param_check()" method="POST" action="models/add_post.php" class="add_post_form" name="add_post_form" enctype="multipart/form-data">
    <h2></h2>
    <div class="add_post_param">
        <label for="add_post_title"></label>
        <input type="text" name="add_post_title" id="add_post_title" placeholder=""/>
    </div>
    <div class="add_post_param">
        <label for="add_post_srb_title"></label>
        <input type="text" name="add_post_srb_title" id="add_post_srb_title" placeholder=""/>
    </div>
    <div class="add_post_param">
        <label for="add_post_text"></label>
        <textarea rows="4" cols="40" name="add_post_text" id="add_post_text"></textarea>
    </div>
    <div class="add_post_param">
        <label for="add_post_srb_text"></label>
        <textarea rows="4" cols="40" name="add_post_srb_text" id="add_post_srb_text"></textarea>
    </div>
    <div class="add_post_param">
        <label for="add_post_type"></label>
        <div class="add_post_param_holder add_post_type_holder"></div>
    </div>
    <div class="add_post_param">
        <label for="add_post_tag"></label>
        <div class="add_post_param_holder add_post_tag_holder"></div>
    </div>
    <div class="add_post_param">
        <label for="add_post_image"></label>
        <input type="file" name="add_post_image[]" id="add_post_image" multiple accept=".gif, .jpeg, .jpg, .png"/>
    </div>
    <p id="add_post_error"></p>
    <input type="submit" name="add_post_button" id="add_post_button"/>
</form>
