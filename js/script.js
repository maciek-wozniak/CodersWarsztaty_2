

$(function() {

    // Na dzień dobry wczytujemy książki z bazy
    loadBooks();
    localStorage.setItem('successAction', 0);
    localStorage.setItem('errorAction', 0);
    localStorage.setItem('allAction', 0);


    // Edycja książki
    $('#bookshelf').on('click', '.bookEdit', function() {
        loadBookToFromForEditing($(this).parent().prev().data('id'));
    });

    // Ładowanie książki do formularza żeby ją później edytować
    function loadBookToFromForEditing(id){
        var nameInput = $('#bookName');
        var descInput = $('#bookDesc');
        var authorInput = $('#bookAuthor');

        $.ajax({
            url: 'api/books.php?desc='+id,
            type: 'GET',
            dataType: 'json',
            success: function (book) {
                addSuccessAction();
                if (book.length > 0) {
                    authorInput.val(book[1]);
                    descInput.val(book[0]);
                    nameInput.val(book[2]);
                    $('#btnAddBook').toggle();

                    // dodanie buttonow do zmiany danych, lub opuszczenie trybu edytowania ksiazki
                    var newBtns = '<input type="hidden" name="bookId" value="'+id+'">';
                    newBtns += '<input type="Submit" id="btnEditBook" value="Zmień">';
                    newBtns += '<input type="Submit" id="cancelEditing" value="Anuluj">';
                    $('form').append(newBtns);
                }
            },
            error: function() {
                addErrorAction();
                console.log('Wystąpił błąd');
            },
            complete: function() {
                addAction();
                console.log('Zakończono request');
            }
        });
    }

    // Kliknięcie edytuj - zmiana danych książki
    $('form').on('click', '#btnEditBook', function(e) {
        e.preventDefault();
        var formData = $('form').serialize();

        $.ajax({
            url: 'api/books.php',
            type: 'PUT',
            dataType: 'json',
            data: formData,
            success: function (result) {
                addSuccessAction();

                if (result == 'ok') {
                    alert('Pomyslnie zaktualzowano ksiązkę')
                }

                // Czyscimy formularz, usuwamy niepotrzebne buttony i ladujemy od nowa ksiazki, z zaktualzowana
                endEditingBook();
                loadBooks();
            },
            error: function() {
                addErrorAction();
                console.log('Wystąpił błąd');
            },
            complete: function() {
                addAction();
                console.log('Zakończono request');
            }
        });
    });

    // Anulowanie edytowania książki
    $('form').on('click', '#cancelEditing', function(e){
        e.preventDefault();
        endEditingBook();
    });

    function endEditingBook() {
        $('#bookName').val('');
        $('#bookDesc').val('');
        $('#bookAuthor').val('');
        $('#btnAddBook').toggle();
        $('#btnEditBook').remove();
        $('#cancelEditing').remove();
    }

    // Wyszukiwanie informacji o książce - korzystamy z api google
    $('#bookshelf').on('click', '.bookSearch', function() {
        var bookTitle = $(this).parent().prev().prev().text();
        bookTitle = bookTitle.substr(7, bookTitle.length-1);
        var bookDiv = $(this).parent().parent();

        $.ajax({
            url: 'https://ajax.googleapis.com/ajax/services/search/web?v=1.0&q='+bookTitle,
            type: 'GET',
            dataType: 'jsonp',
            crossDomain: true,
            success: function (info) {
                addSuccessAction();

                info = info.responseData.results;
                if (info.length > 0) {
                    for (var a = 0; a < info.length; a++) {
                        var searchBook = info[a];

                        var searchDiv = '<div class="well">'+searchBook.titleNoFormatting;
                        searchDiv += ': <a href="'+searchBook.unescapedUrl+'">'+searchBook.content+'</a></div>';
                        var jqDiv = $(searchDiv);

                        bookDiv.append(jqDiv);
                    }
                }
            },
            error: function () {
                addErrorAction();
                console.log('Wystąpił błąd');
            },
            complete: function () {
                addAction();
                console.log('Zakończono request');
            },
        });

    });


    // ladowanie i wyswietlanie ksiazek z bazy (tytul i napisy: usun, edytuj, szukaj)
    function loadBooks() {
        $.ajax({
            url: 'api/books.php',
            type: 'GET',
            dataType: 'json',
            success: function (books) {
                addSuccessAction();
                if (books.length > 0) {
                    // czyścimy diva
                    $('#bookshelf').html('');
                    for (var a = 0; a < books.length; a++) {
                        var singleBook = books[a];

                        if (singleBook.id == 666) {
                            alert('Przykro nam, ale nie możemy wyświetlić informacji o tej książce id:'+singleBook.id);
                            continue;
                        }

                        var bookDiv = '<div class="singleBook panel panel-default">';
                        bookDiv += '<div class="bookTitle" data-id="' + singleBook.id + '">Tytuł: ' + singleBook.name + '</div>';
                        bookDiv += '<div class="bookAuthor" data-id="' + singleBook.id + '" style="display: none;"></div>';
                        bookDiv += '<div><a class="bookDelete" data-id="' + singleBook.id + '">Usuń</a> <a class="bookSearch">Szukaj</a> <a class="bookEdit">Edytuj</a></div>';
                        bookDiv += '<div class="bookDesc" data-id="' + singleBook.id + '" style="display: none;"></div></div><br>';
                        var jqDiv = $(bookDiv);

                        $('#bookshelf').append(jqDiv);
                    }

                }
            },
            error: function () {
                addErrorAction();
                console.log('Wystąpił błąd');
            },
            complete: function () {
                addAction();
                console.log('Zakończono request');
            }
        });
    }

    // Usuwanie książek
    $('#bookshelf').on('click', '.bookDelete', function(){
        var id = $(this).data('id');

        $.ajax({
            url: 'api/books.php',
            type: 'DELETE',
            dataType: 'json',
            data: 'bookId='+id,
            success: function (result) {
                addSuccessAction();
                if (result == 'ok') {
                    alert('Usunięto książkę');

                    // ładujemy wszystkie książki z bazy
                    loadBooks();
                }
            },
            error: function() {
                addErrorAction();
                console.log('Wystąpił błąd');
            },
            complete: function() {
                addAction();
                console.log('Zakończono request');
            }
        });


    });

    // wczytywanie danych o książce (autora i opisu) po kliknieciu na tytul ksiazki
    $('#bookshelf').on('click', '.bookTitle', function(){
        var ajaxUrl = 'api/books.php?desc=' + $(this).data('id');
        var descDiv = $(this).next().next().next();
        var authorDiv = $(this).next();

        $.ajax({
            url: ajaxUrl,
            type: 'GET',
            dataType: 'json',
            success: function (book) {
                addSuccessAction();
                if (book.length > 0) {
                    authorDiv.fadeIn('slow').text('Autor: '+book[1]);
                    descDiv.fadeIn('slow').text(book[0]);
                }
            },
            error: function() {
                addErrorAction();
                console.log('Wystąpił błąd');
            },
            complete: function() {
                addAction();
                console.log('Zakończono request');
            }
        });

    });


    // Dodawanie książki do bazy
    $('#btnAddBook').click(function(e){
        var bkAuthor = $('#bookAuthor').val();
        var bkName = $('#bookName').val();
        var bkDesc = $('#bookDesc').val();

        if (bkAuthor.length < 2 || bkName.length < 2 || bkDesc < 2) {
            alert('Proszę podać wszystkie dane');
            return false;
        }

        $.ajax({
            url: 'api/books.php',
            type: 'POST',
            data: 'bookAuthor='+bkAuthor+'&bookName='+bkName+'&bookDesc='+bkDesc+'',
            dataType: 'json',
            success: function (result) {
                addSuccessAction();
                if (result == 'ok') {
                    $('#bookName').val('');
                    $('#bookAuthor').val('');
                    $('#bookDesc').val('');
                    alert('Dodano książkę do bazy danych');

                    // ładujemy wszystkie książki z bazy
                    loadBooks();
                }
            },
            error: function() {
                addErrorAction();
                console.log('Wystąpił błąd');
            },
            complete: function() {
                addAction();
                console.log('Zakończono request');
            }
        });


        e.preventDefault();
    });


    function addAction() {
        var actualNumber = localStorage.getItem('allAction');
        //var actualNumber = parseInt($('#countActions').text(),10);
        $('#countActions').text(++actualNumber);
        localStorage.setItem('allAction',actualNumber);
    }

    function addErrorAction() {
        var actualNumber = localStorage.getItem('errorAction');
        //var actualNumber = parseInt($('#errorAction').text(),10);
        $('#errorAction').text(++actualNumber);
        localStorage.setItem('errorAction',actualNumber);
    }

    function addSuccessAction() {
        var actualNumber = localStorage.getItem('successAction');
        //var actualNumber = parseInt($('#successAction').text(),10);
        $('#successAction').text(++actualNumber);
        localStorage.setItem('successAction',actualNumber);
    }

});


// http://ajax.googleapis.com/ajax/services/search/images
// "This API is no longer available.", "responseStatus": 403









