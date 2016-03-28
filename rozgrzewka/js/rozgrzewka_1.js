$(function() {

    $.ajax({
        url: 'http://date.jsontest.com/',
        type: 'GET',
        dataType: 'json',
        success: function (date) {
            $('#date').text(date.time + ' ' + date.date);
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


});