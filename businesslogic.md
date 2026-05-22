# Overview

    1. Business Understanding
    2. Category
    3. Required Attributes
    4. Optional Attributes
    5. Base Unit
    6. Additional Units
    7. Pricing Logic
    8. Stock Logic
    9. Postman API Flow
    10. Database Impact
    11. Frontend Form Behavior
    12. Future Problems  


# PRODUCT 1 — ELECTRICAL WIRE

## STEP 1 — Business Understanding

In real hardware stores:

1 Coil = 90 Meters

Customer may buy:

    full coil
    5 meters
    12 meters

Store owner:

    purchases by coil
    sells by meter

This is the PERFECT product architecture test.

## STEP 2 — Category Creation

POST /categories

```
{
  "name": "Electrical"
}
```

Response

```
{
    "success": true,
    "data": {
        "category_uuid": "42309454-cfdf-45e5-88a3-53c1c50a05ca",
        "name": "Electrical",
        "parent_uuid": null,
        "created_at": "2026-05-22 03:11:39"
    }
}
```


## STEP 3 — Create Attributes

For wire we need:

| Attribute | Type |
| --------- | ---- |
| brand     | text |
| sqmm      | text |
| color     | text |
| material  | text |


### Create Attribute

#### Create BRAND Attribute

POST /attributes
```
{
  "name": "brand",
  "display_name": "Brand",
  "data_type": "text"
}
```

Response:
```
{
    "success": true,
    "data": {
        "attribute_uuid": "944d500a-4815-4d79-a9f8-d1370e8cb65b",
        "name": "brand",
        "display_name": "Brand",
        "data_type": "text",
        "created_at": "2026-05-22 03:14:08"
    }
}
```

#### Create SQMM Attribute

```
{
  "name": "sqmm",
  "display_name": "SQMM",
  "data_type": "text"
}
```
Response:

```
{
    "success": true,
    "data": {
        "attribute_uuid": "ac655c70-9f37-43df-946d-023e952ecfff",
        "name": "sqmm",
        "display_name": "SQMM",
        "data_type": "text",
        "created_at": "2026-05-22 03:16:45"
    }
}
```

#### Create COLOR Attribute

```
{
  "name": "color",
  "display_name": "Color",
  "data_type": "text"
}
```
Response:
```
{
    "success": true,
    "data": {
        "attribute_uuid": "234acedc-379b-4eaa-bfae-4890acdd80d0",
        "name": "color",
        "display_name": "Color",
        "data_type": "text",
        "created_at": "2026-05-22 03:19:09"
    }
}
```
#### Create MATERIAL Attribute
```
{
  "name": "material",
  "display_name": "Material",
  "data_type": "text"
}
```

Response:

```
{
    "success": true,
    "data": {
        "attribute_uuid": "44cd80ab-fbf9-4014-acb1-4d38f85fce20",
        "name": "material",
        "display_name": "Material",
        "data_type": "text",
        "created_at": "2026-05-22 03:20:18"
    }
}

```

## STEP 4 — Assign Attributes To Category

Now:

    Electrical category should automatically require these fields.

POST /category-attributes
```
{
  "category_uuid": "electrical-category-uuid",
  "attribute_uuid": "brand-attribute-uuid",
  "is_required": true,
  "sort_order": 1
}
```

Respones:
```
{
    "success": true,
    "message": "Attribute assigned"
}
```
Repeat for:

    sqmm
    color
    material

## STEP 5 — Create Product

Now create actual wire product.

POST /products
```
{
  "name": "Finolex 1.5 SQMM Copper Wire",

  "category_uuid": "42309454-cfdf-45e5-88a3-53c1c50a05ca",

  "price": 18,

  "purchase_price": 12,

  "gst_percent": 18,

  "stock": 0,

  "unit": "meter",

  "hsn_code": "8544",

  "attributes": [
    {
      "attribute_uuid": "944d500a-4815-4d79-a9f8-d1370e8cb65b",
      "name": "brand",
      "value": "Finolex"
    },
    {
      "attribute_uuid": "ac655c70-9f37-43df-946d-023e952ecfff",
      "name": "sqmm",
      "value": "1.5"
    },
    {
      "attribute_uuid": "234acedc-379b-4eaa-bfae-4890acdd80d0",
      "name": "color",
      "value": "Red"
    },
    {
      "attribute_uuid": "44cd80ab-fbf9-4014-acb1-4d38f85fce20",
      "name": "material",
      "value": "Copper"
    }
  ]
}
```
Response:

```
{
    "success": true,
    "data": {
        "product_uuid": "2d3e00e0-df30-42bf-b84c-1a944923bf3f",
        "name": "Finolex 1.5 SQMM Copper Wire",
        "category_uuid": "42309454-cfdf-45e5-88a3-53c1c50a05ca",
        "subcategory": null,
        "barcode": null,
        "sku": null,
        "unit": "meter",
        "price": 18,
        "purchase_price": 12,
        "gst_percent": 18,
        "stock": 0,
        "hsn_code": "8544",
        "image": null,
        "created_at": "2026-05-22 03:40:17",
        "updated_at": "2026-05-22 03:40:17",
        "attributes": [
            {
                "attribute_uuid": "944d500a-4815-4d79-a9f8-d1370e8cb65b",
                "name": "brand",
                "value": "Finolex"
            },
            {
                "attribute_uuid": "ac655c70-9f37-43df-946d-023e952ecfff",
                "name": "sqmm",
                "value": "1.5"
            },
            {
                "attribute_uuid": "234acedc-379b-4eaa-bfae-4890acdd80d0",
                "name": "color",
                "value": "Red"
            },
            {
                "attribute_uuid": "44cd80ab-fbf9-4014-acb1-4d38f85fce20",
                "name": "material",
                "value": "Copper"
            }
        ]
    }
}

```

BUSINESS MEANING

This means:

| Field               | Meaning                |
| ------------------- | ---------------------- |
| price = 18          | ₹18 per meter          |
| purchase_price = 12 | ₹12 per meter          |
| unit = meter        | stock stored in meters |
| stock = 0           | no stock yet           |

VERY IMPORTANT RULE

Stock MUST be in BASE UNIT

So:

`meter = base unit`

NOT coil.

This is extremely important.


## STEP 6 — Add Product Units

Now we add:

    meter
    coil

POST /product-units

```
{
  "product_uuid": "2d3e00e0-df30-42bf-b84c-1a944923bf3f",

  "unit_name": "meter",

  "conversion_factor": 1,

  "price": 18,

  "purchase_price": 12,

  "is_base_unit": 1
}
```

Response:
```
{
    "success": true,
    "data": {
        "unit_uuid": "c9778b59-61a3-4f68-aa6e-e813a7ab9973",
        "product_uuid": "2d3e00e0-df30-42bf-b84c-1a944923bf3f",
        "unit_name": "meter",
        "conversion_factor": 1,
        "barcode": null,
        "price": 18,
        "purchase_price": 12,
        "is_base_unit": 1,
        "created_at": "2026-05-22 10:55:54"
    }
}
```
Coil Unit
```
{
  "product_uuid": "2d3e00e0-df30-42bf-b84c-1a944923bf3f",

  "unit_name": "coil",

  "conversion_factor": 90,

  "price": 1600,

  "purchase_price": 1100,

  "is_base_unit": 0
}
```

Response:

```
{
    "success": true,
    "data": {
        "unit_uuid": "d887a31e-701c-4daa-b1a4-8d8f7c5f7a66",
        "product_uuid": "2d3e00e0-df30-42bf-b84c-1a944923bf3f",
        "unit_name": "coil",
        "conversion_factor": 90,
        "barcode": null,
        "price": 1600,
        "purchase_price": 1100,
        "is_base_unit": 0,
        "created_at": "2026-05-22 10:57:50"
    }
}

```
BUSINESS LOGIC

This means:
  
    1 coil = 90 meters

IMPORTANT INVENTORY RULE

If customer buys:

    2 coils

Frontend/backend should convert to:

    180 meters

before stock deduction.

## STEP 7 — Purchase Stock

BUSINESS SCENARIO

Supplier sends:

    5 coils

Each coil:

    90 meters

So actual stock entering inventory:

    5×90=450

Meaning:

    450 meters

will be stored.

## STEP 8 — Updated purchase_items Structure

Now purchase item MUST store:

| Field              | Meaning |
| ------------------ | ------- |
| quantity           | 5       |
| selected_unit_uuid | coil    |
| converted_quantity | 450     |


## STEP 9 — Purchase API Request

POST /purchases

```
{
  "supplier_uuid": "a2c865ae-e8b6-463d-a347-3525b8989bfb",

  "items": [
    {
      "product_uuid": "2d3e00e0-df30-42bf-b84c-1a944923bf3f",

      "selected_unit_uuid": "c9778b59-61a3-4f68-aa6e-e813a7ab9973",

      "quantity": 5,

      "cost_price": 1100
    }
  ]
}

```

Response:

```
{
    "success": true,
    "message": "Purchase created",
    "data": {
        "purchase_uuid": "22b5e98f-2506-417a-908a-7185fe30069e",
        "total": 5500,
        "supplier_uuid": "a2c865ae-e8b6-463d-a347-3525b8989bfb",
        "created_at": "2026-05-22 12:08:55",
        "updated_at": "2026-05-22 12:08:55",
        "items": [
            {
                "id": 1,
                "purchase_uuid": "22b5e98f-2506-417a-908a-7185fe30069e",
                "product_uuid": "2d3e00e0-df30-42bf-b84c-1a944923bf3f",
                "quantity": 5,
                "cost_price": 1100,
                "created_at": "2026-05-22 12:08:55",
                "updated_at": "2026-05-22 12:08:55",
                "product": {
                    "product_uuid": "2d3e00e0-df30-42bf-b84c-1a944923bf3f",
                    "name": "Finolex 1.5 SQMM Copper Wire",
                    "barcode": null,
                    "sku": null
                }
            }
        ],
        "supplier": {
            "supplier_uuid": "a2c865ae-e8b6-463d-a347-3525b8989bfb",
            "name": "ABC Supplies",
            "phone": "9876543210",
            "email": "abc@supplies.com",
            "address": "123 Business Park, Mumbai",
            "created_at": "2026-05-22 12:07:29",
            "updated_at": "2026-05-22 12:07:29"
        }
    }
}

```

## STEP 10 — Backend Logic

Now backend should:

##### A — Load Product Unit

Using:

    selected_unit_uuid

Find:

    coil

##### B — Read Conversion Factor
    90
##### C — Convert Quantity

    5×90=450

##### D — Store Purchase Item

| Field              | Value |
| ------------------ | ----- |
| quantity           | 5     |
| selected_unit_uuid | coil  |
| converted_quantity | 450   |

##### E — Update Product Stock
    products.stock += 450

Now:

    stock = 450 meters
##### F — Create Stock Ledger
    +450 meters














