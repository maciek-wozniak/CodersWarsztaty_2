<?php


Class Book {


    private $conn;
    private $id;
    private $name;
    private $author;
    private $description;


    public function __construct(mysqli $conn, $id = null, $name = null, $author = null, $desc = null) {

        $this->conn = $conn;
        $this->id = -1;
        $this->name = '';
        $this->author = '';
        $this->description = '';

    }

    public function getId() {
        return $this->id;
    }

    public function setId($id) {
        $this->id = $id;
    }

    public function getName() {
        return $this->name;
    }

    public function setName($name) {
        $this->name = $name;
    }

    public function getAuthor() {
        return $this->author;
    }

    public function setAuthor($author) {
        $this->author = $author;
    }

    public function getDescription() {
        return $this->description;
    }

    public function setDescription($description) {
        $this->description = $description;
    }


    public function loadFromDb($id = null) {

        $booksWeNeed = [];

        if (!is_null($id)) {
            $sql = 'SELECT * FROM books WHERE id=' . $id;
        } else {
            $sql = 'SELECT * FROM books';
        }

        $result = $this->conn->query($sql);
        while ($bookFromDb = $result->fetch_assoc()) {
            $booksWeNeed[] = $bookFromDb;
        }

        return $booksWeNeed;
    }


    public function create(mysqli $conn, $name, $author, $description) {

    }

    public function update($conn, $id, $name, $author, $description) {

    }

    public function deleteFromDb(mysqli $conn, $id = null) {

    }

}