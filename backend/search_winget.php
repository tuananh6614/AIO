<?php
/**
 * Winget Search Proxy
 * Vượt CORS bằng cách gọi API winget.run từ server
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

// Lấy keyword từ query string
$query = isset($_GET['q']) ? trim($_GET['q']) : '';

// Validate
if (empty($query) || strlen($query) < 2) {
    echo json_encode([
        'success' => false,
        'error' => 'Query too short',
        'data' => []
    ]);
    exit;
}

// URL encode query
$encodedQuery = urlencode($query);

// API URL - winget.run API v2
$apiUrl = "https://api.winget.run/v2/packages?query={$encodedQuery}&take=8";

// Initialize cURL
$ch = curl_init();

curl_setopt_array($ch, [
    CURLOPT_URL => $apiUrl,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 10,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTPHEADER => [
        'Accept: application/json',
        'User-Agent: AIO-Toolkit/1.0'
    ],
    CURLOPT_SSL_VERIFYPEER => true
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);

curl_close($ch);

// Handle errors
if ($error) {
    echo json_encode([
        'success' => false,
        'error' => 'Connection error: ' . $error,
        'data' => []
    ]);
    exit;
}

if ($httpCode !== 200) {
    echo json_encode([
        'success' => false,
        'error' => 'API returned status ' . $httpCode,
        'data' => []
    ]);
    exit;
}

// Parse response
$data = json_decode($response, true);

if (!$data || !isset($data['Packages'])) {
    echo json_encode([
        'success' => false,
        'error' => 'Invalid API response',
        'data' => []
    ]);
    exit;
}

// Format results
$results = [];
foreach ($data['Packages'] as $package) {
    $results[] = [
        'id' => $package['Id'] ?? '',
        'name' => $package['Name'] ?? $package['Id'] ?? 'Unknown',
        'publisher' => $package['Publisher'] ?? '',
        'version' => $package['Latest']['Version'] ?? '',
        'description' => $package['Description'] ?? ''
    ];
}

echo json_encode([
    'success' => true,
    'query' => $query,
    'count' => count($results),
    'data' => $results
]);
