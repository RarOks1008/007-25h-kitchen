<?php
    header("Content-Type: application/json");
    include("../config/connection.php");
    $code = 500;
    $error = "";
    $subscription_mail = $_POST["subscription_mail"];
    $email_pattern = "^[a-zA-Z0-9.!#$%&’*+/=?_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$^";
    if ($subscription_mail == "") { $error = "subscribe_empty_field"; }
    if (!preg_match($email_pattern, $subscription_mail)) { $error = "not_valid_email"; }
    $query = "SELECT COUNT(email) AS rowCount FROM newsletter_subscribers WHERE email = :subscription_mail";
    $priprema = $conn -> prepare($query);
    $priprema->bindParam(":subscription_mail", $subscription_mail);
    $rezultat = $priprema->execute();
    $redovi = $priprema->FetchAll();
    $redovi = $redovi[0]->rowCount;
    if ($redovi == 1) { $error = "subscription_mail_exists"; }
    if ($error == "") {
        $query = "INSERT INTO newsletter_subscribers (email) VALUES (:subscription_mail)";
        $priprema = $conn -> prepare($query);
        $priprema->bindParam(":subscription_mail", $subscription_mail);
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
