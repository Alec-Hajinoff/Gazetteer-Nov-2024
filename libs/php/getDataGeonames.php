<?php
/* Call to api.geonames.org to fetch data: Capital city & Population*/
ini_set('display_errors', 'On');
error_reporting(E_ALL);
$executionStartTime = microtime(true);
$url = 'http://api.geonames.org/countryInfoJSON?country=' . $_REQUEST['country'] . '&username=hertford_networks';
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
$output['data'] = $decode['geonames'];
header('Content-Type: application/json; charset=UTF-8');
echo json_encode($output);
?>