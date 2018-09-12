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
Requires Authorization

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

### Add Item

POST `/api/items/add`
Requires Authorization

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

### Get All Items

GET `/api/items/all`
Requires Authorization

Retrieves all of the food items from the database.

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
Requires Authorization

Retrieves the food by the id specified in the parameters.

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

### Update Item

PUT `/api/items/:id`
Requires Authorization

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
Requires Authorization

Deletes an item from the database.

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

## Table Routes

### Add a New Table
POST `/api/tables/add`
Requires Authorization

Adds a new table to the database

Request body should look like this:

```
{
  "tableNumbers": ["1"]
}
```

`tableNumbers`: Should be an array with the table numbers.

`tableNumbers` is an array so that if tables are combined, all tables are represented in the array. In most cases there will be only one table number.

Response:

```
{
  "food": [],
  "tableNumbers": [
      1
  ],
  "active": true,
  "_id": "5b9854d75581035b36fd13e9",
  "__v": 0
}
```


### Update a Table

PUT `/api/tables/update/:id`
Requires Authorization

Updates the table information

Request body should look like this:

```
{
  "tableNumbers": ["1", "3"],
  "food": [
    "5b956483ed2e4d86346d6c82",
    "5b9564a0ed2e4d86346d6c83"
  ],
  "server": "5b98371f09563dc8dca06af3"
}
```

`tableNumbers`: Should be an array with the table numbers.

`food`: Should be an array of Item ObjectIds

`server`: Should be an Employee ObjectId

Response:

```
{
  "food": [
      "5b956483ed2e4d86346d6c82",
      "5b9564a0ed2e4d86346d6c83"
  ],
  "tableNumbers": [
      1
  ],
  "active": true,
  "_id": "5b9854d75581035b36fd13e9",
  "__v": 0,
  "server": "5b98371f09563dc8dca06af3"
}
```

### Delete a Table

DELETE `/api/tables/delete/:id`
Requires Authorization

Deletes a table from the database.

Response:

```
{
  "removedTable": {
      "food": [
          "5b956483ed2e4d86346d6c82",
          "5b9564a0ed2e4d86346d6c83"
      ],
      "tableNumbers": [
          1
      ],
      "active": true,
      "_id": "5b9854d75581035b36fd13e9",
      "__v": 0,
      "server": "5b98371f09563dc8dca06af3"
  },
  "msg": "Table has been removed."
}
```
