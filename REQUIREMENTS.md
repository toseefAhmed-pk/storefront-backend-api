# API Requirements

## API Endpoints
#### Products
- Index **[GET]** (http://localhost:8000/products)
- Show (args: product id) **[GET]** (http://localhost:8000/products/:id)
- Create (args: Product) ***[token required]* [POST]** (http://localhost:8000/products)
- Update (args: id, Product) ***[token required]* [PUT]** (http://localhost:8000/products/:id)
- Delete (args: product id) ***[token required]* [DELETE]** (http://localhost:8000/products/:id)

#### Users
- Index ***[token required]* [GET]** (http://localhost:8000/users)
- Show (args: id) ***[token required]* **[GET]** (http://localhost:8000/users/:id)
- Create (args: User) **[POST]** (http://localhost:8000/users)
- Update (args: id) ***[token required]* [UPDATE]** (http://localhost:8000/users/:id)
- Delete (args: id) ***[token required]* [DELETE]** (http://localhost:8000/users/:id)
- Authenticate (args: user, password) ***[token required]* [POST]** (http://localhost:8000/users/authenticate)

#### Orders
- Create a new Order (args: Order) ***[token required]* [POST]** (http://localhost:8000/orders)
- Index *[token required]* **[GET]** (http://localhost:8000/orders/)
- Show (args: id) ***[token required]* [GET]** (http://localhost:8000/orders/:id)
- Update (args: id) ***[token required]* [PUT]** (http://localhost:8000/orders/:id)
- Delete (args: id) ***[token required]* [DELETE]** (http://localhost:8000/orders/:id)
- Add Products in an order (args: product_id, quantity) ***[token required]* [POST]** (http://localhost:8000/orders/:id/products)
- Current Order by user (args: user id) ***[token required]* [GET]** (http://localhost:8000/user_orders/) 

## Data Shapes
#### Product
- id
- name
- price
- category

```
                                  Table "public.products"
  Column  |          Type          |                       Modifiers
----------+------------------------+-------------------------------------------------------
 id       | integer                | not null default nextval('products_id_seq'::regclass)
 name     | character varying(250) | not null
 price    | integer                | not null
 category | character varying(255) | not null
 
 Indexes:
    "products_pkey" PRIMARY KEY, btree (id)
Referenced by:
    TABLE "order_items" CONSTRAINT "order_items_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
```

#### User
- id
- username
- firstName
- lastName
- password

```
                                     Table "public.users"
     Column      |          Type          |                     Modifiers
-----------------+------------------------+----------------------------------------------------
 id              | integer                | not null default nextval('users_id_seq'::regclass)
 username        | character varying(250) | not null
 firstname       | character varying(250) | not null
 lastname        | character varying(250) | not null
 password_digest | character varying(250) | not null
Indexes:
    "users_pkey" PRIMARY KEY, btree (id)
Referenced by:
    TABLE "orders" CONSTRAINT "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)
```

#### Orders
- id
- user_id
- status of order (active or complete)

```
                                 Table "public.orders"
 Column  |          Type          |                      Modifiers
---------+------------------------+-----------------------------------------------------
 id      | integer                | not null default nextval('orders_id_seq'::regclass)
 user_id | bigint                 |
 status  | character varying(255) |
Indexes:
    "orders_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)
Referenced by:
    TABLE "order_items" CONSTRAINT "order_items_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
```

#### Order Items
- id
- product_id
- quantity

```
                          Table "public.order_items"
   Column   |  Type   |                        Modifiers
------------+---------+----------------------------------------------------------
 id         | integer | not null default nextval('order_items_id_seq'::regclass)
 product_id | bigint  |
 order_id   | bigint  |
 quantity   | integer | not null
Indexes:
    "order_items_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "order_items_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
    "order_items_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
```


