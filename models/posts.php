<?php
    header("Content-Type: application/json");
    include("../config/connection.php");
    $code = 500;
    $type_id = $_GET["type_id"];
    $selected_tags = $_GET["selected_tags"];
    $tag_count = count($selected_tags);
    $query = "SELECT p.ID AS id, p.title AS title, p.SRBtitle AS SRBtitle, p.text AS postText, p.SRBtext AS SRBtext, p.date AS postDate, u.name AS name, u.last_name AS last_name, pic.src AS picsrc, pic.ID AS picid, pic.alt AS picalt, pic.SRBalt AS picSRBalt, t.name AS tagname, t.ID AS tagid, t.SRBname AS tagSRBname, (SELECT COUNT(*) FROM comments c WHERE c.post_id = p.ID) AS commentNumber FROM post p INNER JOIN users u ON p.user_id = u.ID INNER JOIN post_pictures pp ON p.ID = pp.ID_post INNER JOIN pictures pic ON pp.ID_picture = pic.ID INNER JOIN post_tag pt ON p.ID = pt.ID_post INNER JOIN tags t ON t.ID = pt.ID_tag WHERE type_id = :type_id";
    if ($tag_count >= 1 && $selected_tags[0] != "") {
        $query .= " AND pt.ID_tag IN (".implode(',',$selected_tags).")";
    }
    if (isset($_GET["text"])) {
        $text = $_GET["text"];
        $text = strtolower($text);
        $query .=  " AND LOWER(p.title) LIKE '%".$text."%'";
    }
    $query .= " ORDER BY p.date DESC";
    $priprema = $conn->prepare($query);
    $priprema->bindParam(":type_id", $type_id);
    $rezultat = $priprema->execute();
    if ($rezultat) {
        $posts = $priprema->FetchAll();
        $code = 200;
        echo json_encode($posts);
    } else {
        $code = 504;
        echo json_encode("Update failed");
    }
    http_response_code($code);
?>
