<?php
    include("../config/connection.php");
    include("composer/contact_mail.php");
    session_start();
    $error = "";
    if (isset($_POST['add_post_button'])) {
        $title = $_POST['add_post_title'];
        $srbTitle = $_POST['add_post_srb_title'];
        $text = $_POST['add_post_text'];
        $srbText = $_POST['add_post_srb_text'];
        $type = $_POST['add_post_type'];
        $tags = $_POST['add_post_tag'];
        $images = $_FILES['add_post_image'];
        $title_patern = "/^[A-ZŠĐŽČĆ][a-z0-9ščćđž]+$/";
        $date = date("Y-m-d H:i:s", time());
        $user_id = $_SESSION["user"]->ID;
        $number_of_images = count($images["name"]);
        if ($title == "" || $srbTitle == "" || $text == "" || $srbText == "") { $error = "Fields are empty"; }
        if (!$type) { $error = "Type not selected"; }
        if (!preg_match($title_patern, $title) || !preg_match($title_patern, $srbTitle)) { $error = "Titles are not valid"; }
        if (count($tags) <= 0 || $number_of_images <= 0) { $error = "Tags or Images not selected"; }
        try {
            $conn->beginTransaction();
            $query = "INSERT INTO post (type_id, user_id, title, SRBtitle, text, SRBtext, date) VALUES (:type_id, :user_id, :title, :SRBtitle, :text, :SRBtext, :date)";
            $priprema = $conn -> prepare($query);
            $priprema->bindParam(":type_id", $type);
            $priprema->bindParam(":user_id", $user_id);
            $priprema->bindParam(":title", $title);
            $priprema->bindParam(":SRBtitle", $srbTitle);
            $priprema->bindParam(":text", $text);
            $priprema->bindParam(":SRBtext", $srbText);
            $priprema->bindParam(":date", $date);
            $rezultat = $priprema->execute();
            if (!$rezultat) { $error = "Error adding post"; }
            $last_post_id = $conn->lastInsertId();
            $tag_query = "INSERT INTO post_tag (ID_post, ID_tag) VALUES";
            foreach ($tags as $tag) {
                $tag_query .= " (".$last_post_id.",".$tag."),";
            }
            $tag_query = rtrim($tag_query,',');
            $tag_priprema = $conn -> prepare($tag_query);
            $tag_rezultat = $tag_priprema->execute();
            if (!$tag_rezultat) { $error = "Error adding tags"; }

            for ($i = 0; $i < $number_of_images; $i++) {
                $image_name = $images["name"][$i];
                $image_size = $images["size"][$i];
                $image_tmp = $images["tmp_name"][$i];

                $imageFileType = strtolower(pathinfo($image_name,PATHINFO_EXTENSION));
                if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif" ) { $error = "Not valid image"; }

                $alt = $title . " " . ($i + 1);
                $srbAlt = $srbTitle . " " . ($i + 1);
                $upload_dir = '../assets/images/recipes/';
                $src = 'assets/images/recipes/'.$image_name;

                $add_picture = "INSERT INTO pictures (src, alt, SRBalt) VALUES (:src, :alt, :srbAlt)";
                $priprema_pic = $conn -> prepare($add_picture);
                $priprema_pic->bindParam(":src", $src);
                $priprema_pic->bindParam(":alt", $alt);
                $priprema_pic->bindParam(":srbAlt", $srbAlt);
                $rezultat_pic = $priprema_pic->execute();
                if (!$tag_rezultat) { $error = "Error adding image"; }
                $last_picture_id = $conn->lastInsertId();
                $image_path = $upload_dir."food_".$last_picture_id.".".$imageFileType;

                list($sirina, $visina) = getimagesize($image_tmp);
                $novaVisina = 200;
                $novaSirina = ($novaVisina/$visina) * $sirina;
                $novaSlika = imagecreatetruecolor($novaSirina, $novaVisina);
                $postojecaSlika = null;
                switch ($imageFileType) {
                    case 'jpeg':
                    case 'jpg':
                        $postojecaSlika = imagecreatefromjpeg($image_tmp);
                        break;
                    case 'png':
                        $postojecaSlika = imagecreatefrompng($image_tmp);
                        break;
                    case 'gif':
                        $postojecaSlika = imagecreatefromgif($image_tmp);
                        break;
                }
                imagecopyresampled($novaSlika, $postojecaSlika, 0, 0, 0, 0, $novaSirina, $novaVisina, $sirina, $visina);
                switch ($imageFileType) {
                    case 'jpeg':
                    case 'jpg':
                        imagejpeg($novaSlika, $image_path, 75);
                        break;
                    case 'png':
                        imagepng($novaSlika, $image_path);
                        break;
                    case 'gif':
                        imagegif($novaSlika, $image_path);
                        break;
                }

                $new_src = 'assets/images/recipes/food_'.$last_picture_id.".".$imageFileType;
                $change_pic = "UPDATE pictures SET src = :src WHERE ID = :id";
                $priprema_change = $conn -> prepare($change_pic);
                $priprema_change->bindParam(":src", $new_src);
                $priprema_change->bindParam(":id", $last_picture_id);
                $rezultat_change = $priprema_change->execute();
                if (!$rezultat_change) { $error = "Error changing name in database"; }

                $post_picture_query = "INSERT INTO post_pictures (ID_post, ID_picture) VALUES (:post_id, :picture_id)";
                $priprema_pp = $conn -> prepare($post_picture_query);
                $priprema_pp->bindParam(":post_id", $last_post_id);
                $priprema_pp->bindParam(":picture_id", $last_picture_id);
                $rezultat_pp = $priprema_pp->execute();
                if (!$rezultat_pp) { $error = "Error adding to table"; }

                $srb_xml = simplexml_load_file("../data/rss-srb.xml") or die("Error: Cannot create object");
                $srb_channel = $srb_xml->channel;
                $item = $srb_channel->addChild('item');
                $item->addChild('title', $srbTitle);
                $item->addChild('link', 'http://25h-kitchen.epizy.com/index.php');
                $item->addChild('description', $_SESSION["user"]->name.' '.$_SESSION["user"]->last_name);
                $srb_xml->asXML("../data/rss-srb.xml");

                $eng_xml = simplexml_load_file("../data/rss-eng.xml") or die("Error: Cannot create object");
                $eng_channel = $eng_xml->channel;
                $item = $eng_channel->addChild('item');
                $item->addChild('title', $title);
                $item->addChild('link', 'http://25h-kitchen.epizy.com/index.php');
                $item->addChild('description', $_SESSION["user"]->name.' '.$_SESSION["user"]->last_name);
                $eng_xml->asXML("../data/rss-eng.xml");
            }
            if ($error != "") {
                echo $error;
                $conn->rollback();
            } else {
                $conn->commit();
                $query = "SELECT * FROM newsletter_subscribers";
                $subscribers = executeQuery($query);
                foreach ($subscribers as $subscriber) {
                    $result = sendOthersMail($subscriber->email, "New post: ".$title);
                }
                header("Location: ../index.php");
                die();
            }
        }catch (PDOException $e) {
            echo $e->getMessage();
            $conn->rollback();
        }
    } else {
        $error = "Must send by form!";
        echo $error;
    }
?>
