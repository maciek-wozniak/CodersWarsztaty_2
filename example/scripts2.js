$(function () {
    $('.pobieranieCzasu').on('click', function () {
        //tutaj stanie sie cos jak klikne button o klasie pobieranieCzasu
        $.ajax({
            url: 'http://date.jsontest.com/',
            type: 'GET',//pobierz metodą get
            dataType: 'json',
            success: function (result) {
                //to jest wykonane jak sie zakonczy request z sukcesem
                $('#aktualnyCzas').html(result.time);
                $('#timestamp').html(result.milliseconds_since_epoch);
                $('#data').html(result.date);
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