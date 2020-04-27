<?php
    header("Content-Type: application/json");
    include("../../config/connection.php");
    $code = 500;
    $user = $_POST["user"];
    $query = "DELETE FROM users WHERE ID = :user";
    $priprema = $conn -> prepare($query);
    $priprema->bindParam(":user", $user);
    $rezultat = $priprema->execute();
    if ($rezultat) {
        $code = 202;
        echo json_encode("Successful");
    } else {
        $code = 503;
        echo json_encode("database_error");
    }
    http_response_code($code);
?>
