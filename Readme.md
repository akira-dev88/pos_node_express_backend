AUTH

Register
bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "shop_name": "My Shop",
    "name": "Admin",
    "email": "admin@test.com",
    "password": "123456"
  }'
Login
bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@test.com",
    "password": "123456"
  }'
Get Profile (Protected)
bash
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

PRODUCTS

Create Product
bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "name": "Product 1",
    "price": 99.99,
    "barcode": "123456789",
    "sku": "SKU001",
    "gst_percent": 18,
    "stock": 50
  }'
Search Products
bash
curl -X GET "http://localhost:3000/api/products/search?q=Product" \
  -H "Authorization: Bearer YOUR_TOKEN"
Find by Barcode
bash
curl -X GET http://localhost:3000/api/products/barcode/123456789 \
  -H "Authorization: Bearer YOUR_TOKEN"
Find by SKU
bash
curl -X GET http://localhost:3000/api/products/sku/SKU001 \
  -H "Authorization: Bearer YOUR_TOKEN"
Bulk Create Products
bash
curl -X POST http://localhost:3000/api/products/bulk \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "products": [
      {"name": "Product A", "price": 10.99},
      {"name": "Product B", "price": 20.99}
    ]
  }'

  Create Cart
bash
curl -X POST http://localhost:3000/api/carts \
  -H "Authorization: Bearer YOUR_TOKEN"
Add Item to Cart
bash
curl -X POST http://localhost:3000/api/carts/CART_UUID/items \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "product_uuid": "PRODUCT_UUID",
    "quantity": 2
  }'
Get Cart with Items and Summary
bash
curl -X GET http://localhost:3000/api/carts/CART_UUID \
  -H "Authorization: Bearer YOUR_TOKEN"
Apply Bill Discount
bash
curl -X POST http://localhost:3000/api/carts/CART_UUID/discount \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "discount": 10.00
  }'
Hold Cart
bash
curl -X POST http://localhost:3000/api/carts/CART_UUID/hold \
  -H "Authorization: Bearer YOUR_TOKEN"