<?php
    header("Content-Type: application/json");
    include("composer/contact_mail.php");
    $mail = $_POST["mail"];
    $text = $_POST["text"];
    $code = 500;
    $error = "";
    $email_pattern = "^[a-zA-Z0-9.!#$%&’*+/=?_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$^";
    if ($mail == "" || $text == "") { $error = "empty_field"; }
    if (!preg_match($email_pattern, $mail)) { $error = "mail_invalid"; }
    if ($error == "") {
        $result = sendContactMail($mail, $text);
        if ($result) {
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
