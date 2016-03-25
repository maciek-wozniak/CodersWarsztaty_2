<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $receivedData = $_POST;
    $ts = $receivedData['timestamp'];
    $dataDoZwrotu = date('d.m.Y H:i:s', $ts);//tutaj mamy string z datą

    $tab = [];
    $tab['data'] = $dataDoZwrotu;

    echo json_encode($tab);//wyrzucenie na "ekran" jsona z tablica $tab zamieniona na json
}
elseif ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $receivedData = $_GET;

    $result = [];
    $result['czas'] = '28.02.2016';
    $result['czasTimestamp'] = time();
    $result['losowaLiczba'] = mt_rand(1, 10);

    /*
        $ts = $receivedData['timestamp'];
        $dataDoZwrotu = date('d.m.Y H:i:s', $ts);//tutaj mamy string z datą

        $tab = [];
        $tab['data'] = $dataDoZwrotu;*/

    echo json_encode($result);//wyrzucenie na "ekran" jsona z tablica $tab zamieniona na json
    return;
}