<?php
    header("Content-Type: application/json");
    include("../../config/connection.php");
    $code = 500;
    $error = "";
    $email = $_POST["email"];
    $name = $_POST["name"];
    $lastname = $_POST["lastname"];
    $id = $_POST["id"];
    $email_pattern = "^[a-zA-Z0-9.!#$%&’*+/=?_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$^";
    $name_pat = "/^[A-Z][a-z]+$/";
    $lastname_pat = "/^([A-Z][a-z]+)+$/";
    if ($email == "" || $name == "" || $lastname == "") { $error = "empty_field"; }
    if (!preg_match($email_pattern, $email)) { $error = "not_valid_email"; }
    if (!preg_match($name_pat, $name) || !preg_match($lastname_pat, $lastname)) { $error = "name_invalid"; }
    $query = "SELECT COUNT(email) AS rowCount FROM users WHERE email = :email AND id != :id";
    $priprema = $conn -> prepare($query);
    $priprema->bindParam(":email", $email);
    $priprema->bindParam(":id", $id);
    $rezultat = $priprema->execute();
    $redovi = $priprema->FetchAll();
    $redovi = $redovi[0]->rowCount;
    if ($redovi == 1) { $error = "email_taken"; }
    if ($error == "") {
        $query = "UPDATE users SET email = :email, name = :name, last_name = :lastname WHERE ID = :id";
        $priprema = $conn -> prepare($query);
        $priprema->bindParam(":email", $email);
        $priprema->bindParam(":name", $name);
        $priprema->bindParam(":lastname", $lastname);
        $priprema->bindParam(":id", $id);
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
