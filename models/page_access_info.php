<?php
    header("Content-Type: application/json");
    include("../config/connection.php");
    $podaci = file(LOG_FAJL);
    $objekat = array("main_template" => 0,
                     "appetizer" => 0,
                     "main_course" => 0,
                     "dessert" => 0,
                     "contact_template" => 0,
                     "admin_template" => 0,
                     "page_404" => 0);

    foreach ($podaci as $key => $value) {
        $vrednost = explode("\t", $value);
        $date_from_file = strtotime($vrednost[1]);
        if (time() - $date_from_file <= 24 * 60 * 60) {
            $objekat[$vrednost[0]] += 1;
        }
    }
    echo json_encode($objekat);
?>
