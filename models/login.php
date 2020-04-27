<?php
    header("Content-Type: application/json");
    session_start();
    include("../config/connection.php");
    include("composer/contact_mail.php");
    $code = 500;
    $error = "";
    $email = $_POST["email"];
    $password = $_POST["password"];
    $email_pattern = "^[a-zA-Z0-9.!#$%&’*+/=?_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$^";
    if ($email == "" || $password == "") { $error = "empty_field"; }
    if (!preg_match($email_pattern, $email)) { $error = "not_valid_email"; }
    if (strlen($password) < 6) { $error = "password_short"; }

    if ($error == "") {
        $query = "SELECT * FROM users WHERE email=:email AND password=:password";
        $password = md5($password);
        $priprema = $conn -> prepare($query);
        $priprema->bindParam(":email", $email);
        $priprema->bindParam(":password", $password);
        $rezultat = $priprema->execute();
        if ($rezultat) {
            if ($priprema -> rowCount() == 1) {
                $user = $priprema -> Fetch();
                $_SESSION["user"] = $user;
                $code = 200;
                echo json_encode("Successful");
            } else if ($priprema -> rowCount() == 0) {
                $code = 203;
                $result = sendOthersMail($email, "Somebody tried to access your account on ".date('d-m-Y H:i:s'));
                echo json_encode("wrong_params");
            } else {
                $code = 503;
                echo json_encode("database_error");
            }
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
