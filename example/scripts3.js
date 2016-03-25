$(function () {
    $('.pobieranieCzasu').on('click', function () {
        //tutaj stanie sie cos jak klikne button o klasie pobieranieCzasu
        $.ajax({
            url: 'http://localhost:8888/api.php',
            type: 'GET',//pobierz metodą get
            dataType: 'json',
            success: function (result) {
                $('#aktualnyCzas').html(result.czas);
                $('#timestamp').html(result.czasTimestamp);
                $('#data').html(result.losowaLiczba);
            },
            error: function () {
                console.log('Wystapił błąd.');//to jest jak blad
            },
            complete: function () {
                console.log('Zakonczono request');//to jest wykonywane zawsze
            }
        });
    });
});