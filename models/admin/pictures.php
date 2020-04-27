<?php
    header("Content-Type: application/json");
    include("../../config/connection.php");
    $query = "SELECT src, ID, alt, SRBalt FROM pictures";
    $pictures = executeQuery($query);
    echo json_encode($pictures);
?>
