<?php
    header("Content-Type: application/json");
    include("../../config/connection.php");
    $code = 500;
    $error = "";
    $title = $_POST["title"];
    $srb_title = $_POST["srb_title"];
    $text = $_POST["text"];
    $srb_text = $_POST["srb_text"];
    $id = $_POST["id"];
    $title_pat = "/^([A-Z][a-z]+)+$/";
    if ($title == "" || $srb_title == "" || $text == "" || $srb_text == "") { $error = "empty_field"; }
    if (!preg_match($title_pat, $title) || !preg_match($title_pat, $srb_title)) { $error = "title_name_invalid"; }
    if ($error == "") {
        $query_post = "SELECT * FROM post WHERE ID = :id";
        $priprema_post = $conn ->prepare($query_post);
        $priprema_post->bindParam(":id", $id);
        $rezultat_post = $priprema_post->execute();
        if ($rezultat_post) {
            $post_rez = $priprema_post -> Fetch();
            $srb_xml = simplexml_load_file("../../data/rss-srb.xml") or die("Error: Cannot create object");
            $srb_nodes = $srb_xml->xpath('//channel/item/title[.="'.$post_rez->SRBtitle.'"]/parent::*');
            $srb_trazeni_node = $srb_nodes[0];
            $srb_trazeni_node->title = $srb_title;
            $srb_xml->asXML("../../data/rss-srb.xml");

            $eng_xml = simplexml_load_file("../../data/rss-eng.xml") or die("Error: Cannot create object");
            $eng_nodes = $eng_xml->xpath('//channel/item/title[.="'.$post_rez->title.'"]/parent::*');
            $eng_trazeni_node = $eng_nodes[0];
            $eng_trazeni_node->title = $title;
            $eng_xml->asXML("../../data/rss-eng.xml");

            $query = "UPDATE post SET title = :title, SRBtitle = :srb_title, text = :text, SRBtext = :srb_text WHERE ID = :id";
            $priprema = $conn -> prepare($query);
            $priprema->bindParam(":title", $title);
            $priprema->bindParam(":srb_title", $srb_title);
            $priprema->bindParam(":text", $text);
            $priprema->bindParam(":srb_text", $srb_text);
            $priprema->bindParam(":id", $id);
            $rezultat = $priprema->execute();
            if ($rezultat) {
                $code = 201;
                echo json_encode("Successful");
            } else {
                $code = 503;
                echo json_encode("database_error");
            }
        } else {
            $code = 503;
            echo json_encode("database_error");
        }
    } else {
        $code = 503;
        echo json_encode($error);
    }
    http_response_code($code);
?>
