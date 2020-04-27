<?php
    header("Content-Type: application/json");
    include("../config/connection.php");
    $query = "SELECT * FROM navigation";
    $navigation = executeQuery($query);
    echo json_encode($navigation);
?>
