<?php

include_once '../src/db.php';
include_once '../src/book.php';

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $book = new Book($conn);

    if (isset($_GET['id']) && is_numeric($_GET['id'])) {
        $bookList = $book->loadFromDb($_GET['id']);
    }
    else {
        $bookList = $book->loadFromDb();
    }

    echo json_encode($bookList);

    return;
}
else if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $book = new Book($conn);

}
else if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    $book = new Book($conn);

}
else if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    $book = new Book($conn);

}