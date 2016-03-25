

$(function() {

    $.ajax({
        url: 'api/books.php',
        type: 'GET',
        dataType: 'json',
        success: function (books) {
            if (books.length > 0) {
                for (var a=0; a<books.length; a++) {
                    var singleBook = books[a];
                    var bookDiv = '<div class="singleBook">';
                    bookDiv += '<div class="bookTitle" data-id="' + singleBook.id + '">Tytuł: ' + singleBook.name + '</div>';
                    bookDiv += '<div class="bookAuthor" data-id="' + singleBook.id + '">Autor: ' + singleBook.author + '</div>';
                    bookDiv += '<div class="bookDelete" data-id="' + singleBook.id + '">Usuń</div>';
                    bookDiv += '<div class="bookDesc" data-id="' + singleBook.id + '">' + singleBook.description + '</div></div><br>';
                    var jqDiv = $(bookDiv);

                    $('#biblioteczka').append(jqDiv);
                }
            }
        },
        error: function(a, b, c) {
            console.log('Wystąpił błąd');
            console.log(a);
            console.log(b);
            console.log(c);
        },
        complete: function() {
            console.log('Zakończono request');
        }
    });


    $('.bookDelete', '#biblioteczka').click(function () {
        console.log('aa');
    });
});