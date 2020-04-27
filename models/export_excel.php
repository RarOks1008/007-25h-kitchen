<?php
http_response_code(200);
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

require_once($_SERVER["DOCUMENT_ROOT"]."/config/connection.php");
require_once ABSOLUTE_PATH.'/models/composer/vendor/autoload.php';
$save_loc = exec('echo %SystemDrive%') . '\\Users\\' . get_current_user() . '\\Desktop';

    $posts = executeQuery("SELECT p.ID AS id, title, SRBtitle, text, SRBtext, name, last_name FROM post p INNER JOIN users u ON p.user_id = u.ID");
    $spreadsheet = new Spreadsheet();
    $sheet = $spreadsheet->getActiveSheet();
    $sheet->setCellValue('A1', 'Post ID:');
    $sheet->setCellValue('B1', 'Title:');
    $sheet->setCellValue('C1', 'Naslov:');
    $sheet->setCellValue('D1', 'Text:');
    $sheet->setCellValue('E1', 'Tekst:');
    $sheet->setCellValue('F1', 'Author/Autor:');
    $i = 0;
    foreach ($posts as $post) {
        $sheet->setCellValue('A'.($i + 2), $post->id);
        $sheet->setCellValue('B'.($i + 2), $post->title);
        $sheet->setCellValue('C'.($i + 2), $post->SRBtitle);
        $sheet->setCellValue('D'.($i + 2), $post->text);
        $sheet->setCellValue('E'.($i + 2), $post->SRBtext);
        $sheet->setCellValue('F'.($i + 2), $post->name." ".$post->last_name);
        $i += 1;
    }
    $writer = new Xlsx($spreadsheet);
    $writer->save($save_loc.'\\posts.xlsx');
    echo "OK";
?>
