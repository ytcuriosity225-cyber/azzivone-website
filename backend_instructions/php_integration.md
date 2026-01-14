# PHP Backend Integration Guide for Azzivone

To replace the current mock API with a PHP backend, follow these instructions.

## 1. CORS Configuration
Ensure your PHP backend allows requests from the frontend domain. Add these headers to your entry point (e.g., `index.php` or `.htaccess`).

```php
<?php
header("Access-Control-Allow-Origin: https://your-frontend-domain.replit.app");
header("Access-Control-Allow-Methods: GET, POST, PATCH, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit;
}
?>
```

## 2. API Implementation Examples

### GET: Fetch Statistics
**Endpoint:** `GET /stats`
```php
// Example Response
echo json_encode([
    ["id" => "1", "label" => "Total Visitors", "value" => "12,405", "change" => "+14%", "trendingUp" => true],
    ["id" => "2", "label" => "New Orders", "value" => "842", "change" => "+8%", "trendingUp" => true]
]);
```

### POST: Update Hero Section
**Endpoint:** `POST /hero`
```php
$data = json_decode(file_get_contents('php://input'), true);
$title = $data['title'];
$subtitle = $data['subtitle'];
// Update database and return updated object
echo json_encode(["status" => "success", "data" => $data]);
```

### GET: Products
**Endpoint:** `GET /products`
```php
echo json_encode([
    ["id" => "1", "name" => "Snail Mucin Serum", "price" => "3500", "inventory" => "45", "status" => "In Stock"]
]);
```

### POST: Add Review
**Endpoint:** `POST /reviews`
```php
$data = json_decode(file_get_contents('php://input'), true);
// Validate and insert into reviews table
echo json_encode(["status" => "success", "id" => uniqid()]);
```

## 3. Frontend Configuration
Update the `VITE_API_URL` environment variable in your production environment to point to your PHP server's base URL.
