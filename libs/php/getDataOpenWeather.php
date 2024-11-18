<?php
/* Call to api.openweathermap.org to fetch weather data*/
ini_set('display_errors', 'On');
error_reporting(E_ALL);
$executionStartTime = microtime(true);
$url = 'https://api.openweathermap.org/data/2.5/weather?lat=' . $_REQUEST['latitude'] . '&lon=' . $_REQUEST['longitude'] . '&appid=5b25b2d29d964e323a4673212fa148e5';
error_log("CheckURL= " . $url);
$ch = curl_init();
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_URL, $url);
$result = curl_exec($ch);
curl_close($ch);
$decode = json_decode($result, true);
$output['status']['code'] = "200";
$output['status']['name'] = "ok";
$output['status']['description'] = "success";
$output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
$output['data'] = $decode['weather'];
header('Content-Type: application/json; charset=UTF-8');
echo json_encode($output);
?>