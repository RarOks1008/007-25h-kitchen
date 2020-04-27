<?php
    header("Content-Type: application/json");
    include("../../config/connection.php");
    $code = 500;
    $newsletter = $_POST["newsletter"];
    $query = "DELETE FROM newsletter_subscribers WHERE ID = :newsletter";
    $priprema = $conn -> prepare($query);
    $priprema->bindParam(":newsletter", $newsletter);
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
