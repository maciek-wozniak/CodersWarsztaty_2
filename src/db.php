<?php

$host = 'localhost';
$user = 'book-root';
$password = 'narodowy123';
$db = 'books_db';

$conn = new mysqli($host, $user, $password, $db);

if ($conn->connect_error) {
    die ('Połączenie nieudane, błąd : ' . $conn->connect_error);
}
