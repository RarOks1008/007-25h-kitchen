<?php
    @ ob_start();
    header("Content-Type: application/octet-stream");
    header("Content-Disposition: attachment; filename=nikola_nedeljkovic.doc");
    http_response_code(200);
    $save_loc = exec('echo %SystemDrive%') . '\\Users\\' . get_current_user() . '\\Desktop';

    $word = new COM("word.application") or die("Unable to instantiate Word");
    $word->Visible = 1;
    $word->Documents->Add();
    $word->Selection->TypeText($_POST['author_name']);
    $word->Selection->TypeText($_POST['author_name_val']);
    $word->Selection->TypeText("\n");
    $word->Selection->TypeText($_POST['author_birth']);
    $word->Selection->TypeText($_POST['author_birth_val']);
    $word->Selection->TypeText("\n");
    $word->Selection->TypeText($_POST['author_mail']);
    $word->Selection->TypeText($_POST['author_mail_val']);
    $word->Selection->TypeText("\n");
    $word->Selection->TypeText($_POST['author_number']);
    $word->Selection->TypeText($_POST['author_number_val']);
    $word->Selection->TypeText("\n");
    $word->Selection->TypeText($_POST['author_work']);
    $word->Selection->TypeText($_POST['author_work_val']);

    $word->Documents[1]->SaveAs($save_loc.'\\nikola_nedeljkovic.doc');
    $word->Quit();
    $word = null;

    echo "OK";
?>
