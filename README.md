
# Table of Contents
- [Table of Contents](#table-of-contents)
- [Scripts](#scripts)
  - [Linting](#linting)
  - [Running](#running)
- [Environment Variables](#environment-variables)
- [Backend Endpoints](#backend-endpoints)
  - [Employee Routes](#employee-routes)
    - [Register](#register)
    - [Login](#login)
    - [Change Password](#change-password)
  - [Item Routes](#item-routes)
    - [Get All Items](#get-all-items)
    - [Get A Specific Item](#get-a-specific-item)
    - [Add Item](#add-item)
    - [Update Item](#update-item)
    - [Delete Item](#delete-item)
  - [Party Routes](#party-routes)
    - [Get All Parties](#get-all-parties)
    - [Get a Specific Party](#get-a-specific-party)
    - [Add a New Party](#add-a-new-party)
    - [Update a Party](#update-a-party)
    - [Delete a Party](#delete-a-party)
  - [Table Routes](#table-routes)
    - [Add Item](#add-item-1)

# Scripts

## Linting
`npm run lint-all`: when at the root, lints front/back -end

`npm run lint`: lint the backend or frontend depending on location

When committing, `npm run lint-all` will automatically be run.

## Running

`npm run client`: Runs only the front-end client.
`npm run server`: Runs only the back-end server.
`npm run dev`: Runs both the front and back ends.


# Environment Variables

HEROKU_URI: URL of website (front and back end are deployed here)

MONGO_URI: URL for the database

NODE_MODULES_CACHE: false

SECRET_OR_KEY: secret key for bcryptjs

# Backend Endpoints

## Employee Routes

### Register

POST `/api/employees/register`

Registers a new user. If the user is the first in the database, it will automatically be made into an admin account.

Request body should look like this:

```
{
  "name": "First Last",
  "pin": "1234",
  "pass": "asdfghjkl",
  "role": {
    "manager": "true"
  }
}
```

`name`: String, required

`pin`: String, required, min 4 characters, must be unique

`pass`: String, required

`role`: Object, optional


Response includes the new employee's:
- role information (admin and manager status)
- name
- pin

Response:

```
{
  "role": {
      "admin": false,
      "manager": true
  },
  "_id": "5b9843deff3deb4f8166935f",
  "name": "First Last",
  "pin": "1234",
  "password": hashed password,
  "__v": 0
}
```


### Login

POST `/api/employees/login`

Logs in an existing user.

Request body should look like this:

```
{
  "pin": "1234",
  "pass": "asdfghjkl"
}
```

`pin`: String, required, min 4 characters

`pass`: String, required

Response:

```
{
  "token": "Bearer (token)"
}
```

### Change Password

PUT `/api/employees/update/:pin`

**Requires Authorization**

Changes the password for the user

Request body should look like this:

```
{
  "oldPassword": "asdfghjkl",
  "newPassword": "lkjhgfdsa"
}
```

`oldPassword`: String, required

`newPassword`: String, required



Response:

```
{
  "role": {
    "admin": false,
    "manager": true
  },
  "_id": "5b9843deff3deb4f8166935f",
  "name": "First Last",
  "pin": "1234",
  "password": "(hashed password)",
  "__v": 0
}
```

## Item Routes


### Get All Items

GET `/api/items/all`

**Requires Authorization**

Retrieves all of the food items from the database.

Each element in the response array includes and item's:
- name
- description
- price

Response:

```
[
  {
    "_id": "5b9564a0ed2e4d86346d6c83",
    "name": "Sweet Potato Roll",
    "description": "A yummy delight for all sane mortals",
    "price": 4.99,
    "__v": 0
  },
  {
    "_id": "5b983d7a26d91bbaec2fea19",
    "name": "Wow Burger Bro",
    "price": 59.99,
    "description": "A delish nutrish",
    "__v": 0
  }
]
```

### Get A Specific Item

GET `/api/items/:id`

**Requires Authorization**

Retrieves the food by the id specified in the parameters.

Response includes the item's:
- name
- price
- description

Response:

```
[
  {
    "_id": "5b983d7a26d91bbaec2fea19",
    "name": "Wow Burger Bro",
    "price": 59.99,
    "description": "A delish nutrish",
    "__v": 0
  }
]
```

### Add Item

POST `/api/items/add`

**Requires Authorization**

Adds a new food item to the database.

Request body should look like this:

```
{
  "name": "burger",
  "description": "It's a burger.",
  "price": "11.99"
}
```

`name`: String, required, must be unique

`description`: String

`price`: Number, required

Response includes the added item's:
- name
- price
- description

Response:

```
{
  "_id": "5b984988b345de51f0587d2e",
  "name": "burger",
  "price": 11.99,
  "description": "It's a burger.",
  "__v": 0
}
```

### Update Item

PUT `/api/items/:id`

**Requires Authorization**

Updates information for an existing food item.

Request body should look like this:

```
{
  "name": "burger",
  "description": "New description",
  "price": "13.99"
}
```

`name`: String, must be unique

`description`: String

`price`: Number


You only need one field!

Response includes the updated item's:
- name
- price
- description

Response:

```
{
  "_id": "5b9850813689155850e79c75",
  "name": "burger",
  "price": 13.99,
  "description": "New description",
  "__v": 0
}
```

### Delete Item

DELETE `/api/items/:id`

**Requires Authorization**

Deletes an item from the database.

Response includes a success message and the deleted item's:
- name
- price
- description

Response:

```
{
  "removedItem": {
    "_id": "5b9850813689155850e79c75",
    "name": "burger",
    "price": 13.99,
    "description": "New description",
    "__v": 0
},
  "msg": "Item deleted from the database."
}
```

## Party Routes

### Get All Parties

GET `/api/party/all`

**Requires Authorization**

Retrieves all parties from the database.

Each element in the response array includes:
- Items list (name and price)
- Table info (x/y coordinates and active status)
- Server info (name)

Response:

```
[
  {
    "food": [],
    "tables": [
      {
        "active": false,
        "_id": "5b99a5d5603385aece3e367a",
        "x": 0,
        "y": 0,
        "__v": 0
      }
    ],
    "_id": "5b99a5fc603385aece3e367b",
    "__v": 0
  },
  {
    "food": [
      {
        "_id": "5b956483ed2e4d86346d6c82",
        "name": "Shrimp Tempura",
        "price": 5.99,
      }
    ],
    "tables": [
      {
        "active": false,
        "_id": "5b99a5d5603385aece3e367a",
        "x": 0,
        "y": 0,
        "__v": 0
      }
    ],
    "_id": "5b99cfe927dac3c57eda73e6",
    "server": {
      "_id": "5b993879366d2671bcba0e02",
      "name": "Rigby Bird"
    },
    "__v": 0
  }
]
```

### Get a Specific Party

GET `/api/party/:id`

**Requires Authorization**

Retrieves a specific party from the database by its id.

Response includes the specified party's:
- Items list (name and price)
- Table info (x/y coordinates and active status)
- Server info (name)

Response:

```
[
  {
    "food": [
      {
        "_id": "5b956483ed2e4d86346d6c82",
        "name": "Shrimp Tempura",
        "price": 5.99,
      }
    ],
    "tables": [
      {
        "active": false,
        "_id": "5b99a5d5603385aece3e367a",
        "x": 0,
        "y": 0,
        "__v": 0
      }
    ],
    "_id": "5b99a5fc603385aece3e367b",
    "__v": 0
  }
]
```

### Add a New Party

POST `/api/party/add`

**Requires Authorization**

Adds a new party to the database

Request body should look like this:

```
{
  "tables": ["5b99a5d5603385aece3e367a"],
  "server": "5b993879366d2671bcba0e02"
}
```

`tables`: Should be an array of Table ObjectIds.

`server`: Employee ObjectId, optional

`tables` is an array so that if tables are combined, all tables are represented in the array. In most cases there will be only one table id.

Response includes the party's:
- Items list (name, price)
- tables list
- server id

Response:

```
{
  "food": [],
  "tables": [
    "5b99a5d5603385aece3e367a"
  ],
  "_id": "5b99cfe927dac3c57eda73e6",
  "server": "5b993879366d2671bcba0e02",
  "__v": 0
}
```


### Update a Party

PUT `/api/party/update/:id`

**Requires Authorization**

Updates the party information

Request body should look like this:

```
{
  "tables": ["5b99a5d5603385aece3e367a"],
  "food": [
    "5b956483ed2e4d86346d6c82",
    "5b9564a0ed2e4d86346d6c83"
  ],
  "server": "5b98371f09563dc8dca06af3"
}
```

`tables`: Should be an array with the table numbers.

**NOTE** Make sure to include all of the combined tables in the array. This endpoint replaces the whole `tables` field!

`food`: Should be an array of Item ObjectIds

`server`: Should be an Employee ObjectId

Response:

```
{
  "food": [
    "5b956483ed2e4d86346d6c82",
    "5b9564a0ed2e4d86346d6c83"
  ],
  "tables": ["5b99a5d5603385aece3e367a"],
  "active": true,
  "_id": "5b9854d75581035b36fd13e9",
  "__v": 0,
  "server": "5b98371f09563dc8dca06af3"
}
```

### Delete a Party

DELETE `/api/party/delete/:id`

**Requires Authorization**

Deletes a party from the database.

Response:

```
{
  "removedParty": {
    "food": [
      "5b956483ed2e4d86346d6c82",
      "5b9564a0ed2e4d86346d6c83"
    ],
    "tables": ["5b99a5d5603385aece3e367a"],
    "active": true,
    "_id": "5b9854d75581035b36fd13e9",
    "__v": 0,
    "server": "5b98371f09563dc8dca06af3"
  },
  "msg": "Table has been removed."
}
```
