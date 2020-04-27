<?php
    header("Content-Type: application/json");
    include("../config/connection.php");
    $code = 500;
    $error = "";
    $email = $_POST["email"];
    $name = $_POST["name"];
    $lastname = $_POST["lastname"];
    $password = $_POST["password"];
    $password_repeat = $_POST["password_repeat"];
    $email_pattern = "^[a-zA-Z0-9.!#$%&’*+/=?_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$^";
    $name_pat = "/^[A-Z][a-z]+$/";
    $lastname_pat = "/^([A-Z][a-z]+)+$/";
    if ($email == "" || $name == "" || $lastname == "" || $password == "" || $password_repeat == "") { $error = "empty_field"; }
    if (strlen($password) < 6) { $error = "password_short"; }
    if ($password != $password_repeat) { $error = "passwords_not_match"; }
    if (!preg_match($email_pattern, $email)) { $error = "not_valid_email"; }
    if (!preg_match($name_pat, $name) || !preg_match($lastname_pat, $lastname)) { $error = "name_invalid"; }
    $query = "SELECT COUNT(email) AS rowCount FROM users WHERE email = :email";
    $priprema = $conn -> prepare($query);
    $priprema->bindParam(":email", $email);
    $rezultat = $priprema->execute();
    $redovi = $priprema->FetchAll();
    $redovi = $redovi[0]->rowCount;
    if ($redovi == 1) { $error = "email_taken"; }
    if ($error == "") {
        $query = "INSERT INTO users (email, password, rights_id, name, last_name) VALUES (:email, :password, 2, :name, :lastname)";
        $password = md5($password);
        $priprema = $conn -> prepare($query);
        $priprema->bindParam(":email", $email);
        $priprema->bindParam(":password", $password);
        $priprema->bindParam(":name", $name);
        $priprema->bindParam(":lastname", $lastname);
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
