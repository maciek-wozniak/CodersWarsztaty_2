<?php

include_once '../src/db.php';
include_once '../src/book.php';

// Pobieranie informacji o książkach
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $book = new Book($conn);

    if (isset($_GET['id']) && is_numeric($_GET['id'])) {
        $bookList = $book->loadFromDb($_GET['id']);
    }
    else  if (isset($_GET['desc']) && is_numeric($_GET['desc'])) {
        $bookList[0] = $book->loadFromDb($_GET['desc'])[0]['description'];
        $bookList[1] = $book->loadFromDb($_GET['desc'])[0]['author'];
        $bookList[2] = $book->loadFromDb($_GET['desc'])[0]['name'];
    }
    else {
        $bookList = $book->loadFromDb();
    }

    echo json_encode($bookList);

    return;
}

// Dodawanie książek
else if ($_SERVER['REQUEST_METHOD'] == 'POST' ) {
    if (isset($_POST['bookAuthor']) && isset($_POST['bookDesc']) && isset($_POST['bookName']) && strlen($_POST['bookName'])>1 && strlen($_POST['bookAuthor'])>1 && strlen($_POST['bookDesc'])>1 ) {

        $book = new Book($conn);

        $book->setAuthor($_POST['bookAuthor']);
        $book->setDescription($_POST['bookDesc']);
        $book->setName($_POST['bookName']);

        if ($book->createdAndAddedBook()) {
            echo json_encode('ok');
        }
        else {
            echo json_encode('error '.$conn->error.'<br>'.$_POST['bookName']);
        }

    }
    else {
        echo json_encode('Zle dane ' . $_POST['bookAuthor']);
    }
}

// Aktualizowanie ksiazek
else if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    $book = new Book($conn);
    parse_str(file_get_contents("php://input"),$put);
    if ($book->update($put['bookId'], $put['bookName'], $put['bookAuthor'], $put['bookDesc'])) {
        echo json_encode('ok');
    }
    else {
        echo json_encode('some kind of error');
    }
}

// Usuwanie ksiazek
else if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    $book = new Book($conn);
    parse_str(file_get_contents("php://input"),$delete);
    $bookId = $delete['bookId'];
    $book->loadFromDb($bookId);

    if ($book->deleteFromDb($bookId)) {
        echo json_encode('ok');
    }
    else {
        echo json_encode('error '.$conn->error);
    }
}