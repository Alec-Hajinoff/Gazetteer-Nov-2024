<?php
/* Call to api.opencagedata.com to fetch data: Country name & Name of currency*/
ini_set('display_errors', 'On');
error_reporting(E_ALL);
$executionStartTime = microtime(true);
$url = 'https://api.opencagedata.com/geocode/v1/json?q=' . $_REQUEST['latitude'] . '%2C' . $_REQUEST['longitude'] . '&key=a7f882d3ba784ed39e3ceed781eb6b3c';
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
$output['data'] = $decode['results'];
header('Content-Type: application/json; charset=UTF-8');
echo json_encode($output);
?>