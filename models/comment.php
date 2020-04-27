<?php
    header("Content-Type: application/json");
    session_start();
    include("../config/connection.php");
    $code = 500;
    $error = "";
    $post_id = $_POST["post_id"];
    $comment_text = $_POST["comment_text"];

    if (strlen($comment_text) < 5) { $error = "empty_comment"; }
    if (!isset($_SESSION["user"])) { $error = "log_to_comment"; }

    if ($error == "") {
        $user_id = $_SESSION["user"]->ID;
        $date = date("Y-m-d H:i:s", time());
        $query = "INSERT INTO comments (user_id, post_id, text, date) VALUES (:user_id, :post_id, :text, :date)";
        $priprema = $conn -> prepare($query);
        $priprema->bindParam(":user_id", $user_id);
        $priprema->bindParam(":post_id", $post_id);
        $priprema->bindParam(":text", $comment_text);
        $priprema->bindParam(":date", $date);
        $rezultat = $priprema->execute();
        if ($rezultat) {
            $code = 200;
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
