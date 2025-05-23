<?php
/* Call to api.opencagedata.com to fetch data: Country name & Name of currency*/
ini_set('display_errors', 'On');
error_reporting(E_ALL);
$executionStartTime = microtime(true);
$url = 'https://openexchangerates.org/api/latest.json?app_id=' . $_REQUEST['app_id'];
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
$output['data'] = $decode['rates'];
header('Content-Type: application/json; charset=UTF-8');
echo json_encode($output);
?>