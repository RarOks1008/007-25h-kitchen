<?php
    include("../../config/connection.php");
    $error = "";
    if (isset($_POST['admin_insert_picture_submit'])) {
        $alt = $_POST['admin_insert_picture_alt'];
        $srb_alt = $_POST['admin_insert_picture_srbalt'];
        $post_id = $_POST['admin_insert_picture_options'];

        $image = $_FILES['admin_insert_picture_picture'];
        $name_pat = "/^[A-Z][a-z]+$/";
        if ($alt == "" || $srb_alt == "") { $error = "Fields are empty"; }
        if (!preg_match($name_pat, $alt) || !preg_match($name_pat, $srb_alt)) { $error = "Titles are not valid"; }
        try {
            $conn->beginTransaction();
            $image_name = $image["name"];
            $image_size = $image["size"];
            $image_tmp = $image["tmp_name"];

            $imageFileType = strtolower(pathinfo($image_name,PATHINFO_EXTENSION));
            if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif" ) { $error = "Not valid image"; }

            $alt = $alt . " 1";
            $srb_alt = $srb_alt . " 1";
            $upload_dir = '../../assets/images/recipes/';
            $src = 'assets/images/recipes/'.$image_name;

            $add_picture = "INSERT INTO pictures (src, alt, SRBalt) VALUES (:src, :alt, :srb_alt)";
            $priprema_pic = $conn -> prepare($add_picture);
            $priprema_pic->bindParam(":src", $src);
            $priprema_pic->bindParam(":alt", $alt);
            $priprema_pic->bindParam(":srb_alt", $srb_alt);
            $rezultat_pic = $priprema_pic->execute();
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
            $priprema_pp->bindParam(":post_id", $post_id);
            $priprema_pp->bindParam(":picture_id", $last_picture_id);
            $rezultat_pp = $priprema_pp->execute();
            if (!$rezultat_pp) { $error = "Error adding to table"; }
            if ($error != "") {
                echo $error;
                $conn->rollback();
            } else {
                $conn->commit();
                header("Location: ../../index.php");
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
