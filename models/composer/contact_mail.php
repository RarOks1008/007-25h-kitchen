<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once($_SERVER["DOCUMENT_ROOT"]."/config/connection.php");
require_once ABSOLUTE_PATH.'/models/composer/vendor/autoload.php';

function sendContactMail ($to, $content) {
    $mail = new PHPMailer(true);
    try {
        $mail->SMTPDebug = 0;
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'twentyfivekitchen@gmail.com';
        $mail->Password = '25Kitchen';
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        $mail->setFrom('twentyfivekitchen@gmail.com', '25Hour Kitchen');
        $mail->addAddress('twentyfivekitchen@gmail.com');
        $mail->addReplyTo($to, 'Information: ');

        $mail->isHTML(true);
        $mail->Subject = '25Hours Kitchen Contact Form';
        $mail->Body = $content;

        $mail->send();

        return true;
    } catch (Exception $e) {
        echo $e;
        return false;
    }
}

function sendOthersMail ($to, $content) {
    $mail = new PHPMailer(true);
    try {
        $mail->SMTPDebug = 0;
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'twentyfivekitchen@gmail.com';
        $mail->Password = '25Kitchen';
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        $mail->setFrom($to, '25Hour Kitchen');
        $mail->addAddress($to);
        $mail->addReplyTo($to, 'Information: ');

        $mail->isHTML(true);
        $mail->Subject = '25Hours Kitchen Contact Form';
        $mail->Body = $content;

        $mail->send();

        return true;
    } catch (Exception $e) {
        echo $e;
        return false;
    }
}

?>
