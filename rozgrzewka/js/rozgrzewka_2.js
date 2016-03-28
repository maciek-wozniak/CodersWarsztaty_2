$(function() {

    $.ajax({
        url: 'colorTable.php',
        type: 'GET',
        dataType: 'json',
        success: function (table) {
            var returnTable = '<table>';
            $.each(table, function(key, value){
                returnTable += '<tr><td style="background-color: '+value+';">' + value + '</td></tr>';
            });
            returnTable += '</table>';

            $('#colorTable').html(returnTable);
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