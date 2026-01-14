# Backend Integration Guide: PHP & React

This guide provides step-by-step instructions and code snippets to replace the current mock data system with a real PHP backend.

## 1. CORS Configuration (PHP)
Place this at the top of your PHP files to allow the React frontend to communicate with your backend.

```php
<?php
// Replace with your frontend's domain
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
```

## 2. Updated Fetch Pattern
In your React components (e.g., `Dashboard.tsx`), replace the simulated fetch logic with the following:

```javascript
useEffect(() => {
  const API_URL = "https://your-backend.com/api/stats.php";

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Network response was not ok");
      
      const data = await response.json();
      
      // Ensure data mapping matches your UI expectations
      setStats(data.map(item => ({
        ...item,
        // Preserve icon/color logic if not provided by backend
        icon: resolveIcon(item.id), 
        color: resolveColor(item.id)
      })));
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  fetchData();
}, []);
```

## 3. Best Practices
- **Error Handling**: Always use `try/catch` and check `response.ok`.
- **Loading States**: Keep using your existing `useState` indicators to show skeletons while loading.
- **Environment Variables**: Use `.env` files for the API URL to make switching between dev and prod easier.
- **Auth**: If adding security, include `headers: { 'Authorization': 'Bearer ...' }` in your fetch calls.
