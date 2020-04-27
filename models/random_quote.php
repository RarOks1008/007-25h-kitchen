<?php
    header("Content-Type: application/json");
    include("../config/connection.php");
    $query = "SELECT COUNT(*) AS number FROM food_quotes";
    $max_number = executeQuery($query);
    $random_number = rand(0, $max_number[0]->number - 1);
    $query = "SELECT * FROM food_quotes";
    $food_quotes = executeQuery($query);
    echo json_encode($food_quotes[$random_number]);
?>
