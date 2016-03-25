
$(function () {

    $.ajax({
        url: 'http://date.jsontest.com/',
        type: 'GET',//pobierz metodą get
        dataType: 'json', // dane będą w jsonie
        success: function (result) {
            console.log(result);
            //to jest wykonane jak sie zakonczy request z sukcesem
            $('#aktualnyCzas').html(result.time);
            $('#timestamp').html(result.milliseconds_since_epoch);
            $('#data').html(result.date);
        },
        error: function(){
            console.log('Wystapił błąd.');//to jest jak blad
        },
        complete: function(){
            console.log('Zakonczono request');//to jest wykonywane zawsze
        }
    });
});