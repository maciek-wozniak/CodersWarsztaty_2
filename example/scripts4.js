$(function () {
    $('.pobieranieCzasu').on('click', function () {
        var toCalc = parseInt($('#timestamp').html());
        var dataToSend = {};
        dataToSend.timestamp = toCalc;

        //var dataToSend = {timestamp: toCalc};
        //tutaj sstanie sie cos jak klikne button o klasie pobieranieCzasu
        $.ajax({
            url: 'books.php',
            type: 'POST',//pobierz metodą get
            data: dataToSend,
            dataType: 'json',
            success: function (result) {
                $('#aktualnyCzas').html(result.data);
                //$('#timestamp').html(result.czasTimestamp);
                //$('#data').html(result.losowaLiczba);
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