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

    private function setId($id) {

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

    public function createdAndAddedBook() {
        if ($this->id == -1) {
            $addBookSql = 'INSERT INTO books (name, author, description)
                  values ("'.$this->name.'", "'.$this->author.'", "'.$this->description.'")';
        }
        if ($this->conn->query($addBookSql)) {
            $this->setId($this->conn->insert_id);
            return true;
        }
        return false;
    }

    public function update($id, $name, $author, $description) {
        $sqlUpdateBook = 'UPDATE books SET name="'.$name.'",
                            author="'.$author.'", description="'.$description.'" WHERE id='.$id;

        return ($this->conn->query($sqlUpdateBook));
    }

    public function deleteFromDb($id ) {
        $sqlDelete = 'DELETE FROM books WHERE id='.$id;
        return ($this->conn->query($sqlDelete));
    }

}