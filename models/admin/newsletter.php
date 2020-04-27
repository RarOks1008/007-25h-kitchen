<?php
    header("Content-Type: application/json");
    include("../../config/connection.php");
    $query = "SELECT email, ID FROM newsletter_subscribers";
    $subscribers = executeQuery($query);
    echo json_encode($subscribers);
?>
