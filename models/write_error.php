<?php
    include("../config/connection.php");
    $text = $_POST["text"];
    $open = fopen(ERROR_FAJL, "a");
    if ($open) {
        $date = date('d-m-Y H:i:s');
        fwrite($open, "{$content}\t{$date}\t\n");
        fclose($open);
    }
    echo "OK";
?>
