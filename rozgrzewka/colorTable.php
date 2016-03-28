<?php


for ($i=0;$i<101;$i++) {
    $colorTable[$i] = randomColor();
}

echo json_encode($colorTable);


function randomColor() {
    $rand = array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f');
    return '#'.$rand[rand(0,15)].$rand[rand(0,15)].$rand[rand(0,15)].$rand[rand(0,15)].$rand[rand(0,15)].$rand[rand(0,15)];
}








