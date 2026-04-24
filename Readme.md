AUTH

Register

curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "shop_name": "My Shop",
    "name": "Admin",
    "email": "admin@test.com",
    "password": "123456"
  }'
Login

curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@test.com",
    "password": "123456"
  }'
Get Profile (Protected)

curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

PRODUCTS

Create Product

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

curl -X GET "http://localhost:3000/api/products/search?q=Product" \
  -H "Authorization: Bearer YOUR_TOKEN"
Find by Barcode

curl -X GET http://localhost:3000/api/products/barcode/123456789 \
  -H "Authorization: Bearer YOUR_TOKEN"
Find by SKU

curl -X GET http://localhost:3000/api/products/sku/SKU001 \
  -H "Authorization: Bearer YOUR_TOKEN"
Bulk Create Products

curl -X POST http://localhost:3000/api/products/bulk \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "products": [
      {"name": "Product A", "price": 10.99},
      {"name": "Product B", "price": 20.99}
    ]
  }'
# 1. Create a cart
curl -X POST http://localhost:3000/api/carts \
  -H "Authorization: Bearer YOUR_TOKEN"

# 2. Add items to cart
curl -X POST http://localhost:3000/api/carts/CART_UUID/items \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "product_uuid": "PRODUCT_UUID",
    "quantity": 2
  }'

# 3. Checkout
curl -X POST http://localhost:3000/api/carts/CART_UUID/checkout \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "customer_uuid": "CUSTOMER_UUID",
    "payments": [
      {
        "method": "cash",
        "amount": 199.98
      }
    ]
  }'

# 4. View sales
curl -X GET http://localhost:3000/api/sales \
  -H "Authorization: Bearer YOUR_TOKEN"

#  Create Customer

curl -X POST http://localhost:3000/api/customers \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "name": "John Doe",
    "mobile": "9876543210",
    "address": "123 Main St",
    "gstin": "GST123456",
    "credit_limit": 10000
  }'
Record Payment

curl -X POST http://localhost:3000/api/customers/CUSTOMER_UUID/payments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "amount": 500,
    "method": "cash"
  }'
Get Customer Ledger

curl -X GET http://localhost:3000/api/customers/CUSTOMER_UUID/ledger \
  -H "Authorization: Bearer YOUR_TOKEN"
Get Customer Summary

curl -X GET http://localhost:3000/api/customers/summary \
  -H "Authorization: Bearer YOUR_TOKEN"

  