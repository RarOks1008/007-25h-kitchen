<?php
    header("Content-Type: application/json");
    include("../../config/connection.php");
    $code = 500;
    $error = "";
    $post = $_POST["post"];
    $conn->beginTransaction();
    $query_pictures = "SELECT * FROM post_pictures WHERE ID_post = :post";
    $priprema_pictures = $conn -> prepare($query_pictures);
    $priprema_pictures->bindParam(":post", $post);
    $rezultat_pictures = $priprema_pictures->execute();
    if ($rezultat_pictures) {
        $picture_ids = $priprema_pictures->FetchAll();
        foreach ($picture_ids as $picture_id) {
            $query_pict = "SELECT * FROM pictures WHERE ID = :pic_id";
            $priprema_pict = $conn -> prepare($query_pict);
            $priprema_pict->bindParam(":pic_id", $picture_id->ID_picture);
            $rezultat_pict = $priprema_pict->execute();
            if ($rezultat_pict) {
                $pictures = $priprema_pict->FetchAll();
                foreach($pictures as $picture) {
                    $where = '../../'.$picture->src;
                    unlink($where);
                    $query_pic = "DELETE FROM pictures WHERE ID = :picture";
                    $priprema_pic = $conn -> prepare($query_pic);
                    $priprema_pic->bindParam(":picture", $picture->ID);
                    $rezultat_pic = $priprema_pic->execute();
                    if (!$rezultat_pic) {
                        $error = "database_error";
                    }
                }
            } else {
                $error = "database_error";
            }
        }
        $query_post = "SELECT * FROM post WHERE ID = :post";
        $priprema_post = $conn ->prepare($query_post);
        $priprema_post->bindParam(":post", $post);
        $rezultat_post = $priprema_post->execute();
        if ($rezultat_post) {
            $post_rez = $priprema_post -> Fetch();
            $srb_xml = simplexml_load_file("../../data/rss-srb.xml") or die("Error: Cannot create object");
            $srb_channel = $srb_xml->channel;
            $srb_nodes = $srb_xml->xpath('//channel/item/title[.="'.$post_rez->SRBtitle.'"]/parent::*');
            $srb_trazeni_node = $srb_nodes[0];
            unset($srb_trazeni_node);
            $srb_xml->asXML("../../data/rss-srb.xml");

            $eng_xml = simplexml_load_file("../../data/rss-eng.xml") or die("Error: Cannot create object");
            $eng_channel = $eng_xml->channel;
            $eng_nodes = $eng_xml->xpath('//channel/item/title[.="'.$post_rez->title.'"]/parent::*');
            $eng_trazeni_node = $eng_nodes[0];
            unset($eng_trazeni_node);
            $eng_xml->asXML("../../data/rss-eng.xml");
        } else {
            $error = "database_error";
        }


        $query = "DELETE FROM post WHERE ID = :post";
        $priprema = $conn -> prepare($query);
        $priprema->bindParam(":post", $post);
        $rezultat = $priprema->execute();
        if ($rezultat) {
            $code = 202;
            if ($error == "") {
                echo json_encode("Successful");
                $conn->commit();
            } else {
                $conn->rollback();
                $code = 503;
                echo $error;
            }
        } else {
            $code = 503;
            $conn->rollback();
            echo json_encode("database_error");
        }
    } else {
        $code = 503;
        $conn->rollback();
        echo json_encode("database_error");
    }
    http_response_code($code);
?>
