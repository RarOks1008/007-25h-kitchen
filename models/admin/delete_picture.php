<?php
    header("Content-Type: application/json");
    include("../../config/connection.php");
    $code = 500;
    $picture_id = $_POST["picture"];
    $query_select = "SELECT * FROM pictures WHERE ID = :picture";
    $priprema_select = $conn -> prepare($query_select);
    $priprema_select->bindParam(":picture", $picture_id);
    $rezultat_select = $priprema_select->execute();
    if ($rezultat_select) {
        $pictures = $priprema_select->FetchAll();
        foreach ($pictures as $picture) {
            $where = '../../'.$picture->src;
            unlink($where);
        }
        $query = "DELETE FROM pictures WHERE ID = :picture";
        $priprema = $conn -> prepare($query);
        $priprema->bindParam(":picture", $picture_id);
        $rezultat = $priprema->execute();
        if ($rezultat) {
            $code = 202;
            echo json_encode("Successful");
        } else {
            $code = 503;
            echo json_encode("database_error");
        }
    } else {
        $code = 503;
        echo json_encode("database_error");
    }




    http_response_code($code);
?>
