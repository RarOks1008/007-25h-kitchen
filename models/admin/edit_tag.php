<?php
    header("Content-Type: application/json");
    include("../../config/connection.php");
    $code = 500;
    $error = "";
    $name = $_POST["name"];
    $srb_name = $_POST["srb_name"];
    $id = $_POST["id"];
    $name_pat = "/^[A-Z][a-z]+$/";
    if ($name == "" || $srb_name == "") { $error = "empty_field"; }
    if (!preg_match($name_pat, $name) || !preg_match($name_pat, $srb_name)) { $error = "tag_name_invalid"; }
    $query = "SELECT COUNT(name) AS rowCount FROM tags WHERE (name = :name OR SRBname = :srb_name) AND ID != :id";
    $priprema = $conn -> prepare($query);
    $priprema->bindParam(":name", $name);
    $priprema->bindParam(":srb_name", $srb_name);
    $priprema->bindParam(":id", $id);
    $rezultat = $priprema->execute();
    $redovi = $priprema->FetchAll();
    $redovi = $redovi[0]->rowCount;
    if ($redovi == 1) { $error = "tag_exists"; }
    if ($error == "") {
        $query = "UPDATE tags SET name = :name, SRBname = :srb_name WHERE ID = :id";
        $priprema = $conn -> prepare($query);
        $priprema->bindParam(":name", $name);
        $priprema->bindParam(":srb_name", $srb_name);
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
        echo json_encode($error);
    }
    http_response_code($code);
?>
