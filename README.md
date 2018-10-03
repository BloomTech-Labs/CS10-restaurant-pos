# Table of Contents

- [Table of Contents](#table-of-contents)
- [Scripts](#scripts)
  - [Linting](#linting)
  - [Running](#running)
- [Environment Variables](#environment-variables)
- [Auth Token Payload](#auth-token-payload)
- [Backend Endpoints](#backend-endpoints)
  - [Employee Routes](#employee-routes)
    - [Register Admin](#register-admin)
    - [Register Employee](#register-employee)
    - [Login Admin](#login-admin)
    - [Login Employee](#login-employee)
    - [Get All Employees](#get-all-employees)
    - [Update Employee](#update-employee)
    - [Employee Logout](#employee-logout)
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
    - [Get All Tables](#get-all-tables)
    - [Get A Specific Table](#get-a-specific-table)
    - [Add Table](#add-table)
    - [Update Tables](#update-tables)
    - [Deactivate Table](#deactivate-table)
    - [Delete Table](#delete-table)
  - [Order Routes](#order-routes)
    - [Add a New Order](#add-a-new-order)
    - [Get All Orders](#get-all-orders)
    - [Get a Specific Order](#get-a-specific-order)
    - [Update Order](#update-order)
    - [Restaurant Routes](#restaurant-routes)
- [Tech-Stack](#tech-stack)
  - [Back-End Dependencies ```(Production)```](#back-end-dependencies-production)
    - [Send Grid](#send-grid)
    - [BcryptJS](#bcryptjs)
    - [Cors](#cors)
    - [ExpressJS](#expressjs)
    - [Helmet](#helmet)
    - [JSON Web Token](#json-web-token)
    - [Mongoose](#mongoose)
    - [Passport](#passport)
    - [Stripe](#stripe)
  - [Back-End Dependencies ```(Development)```](#back-end-dependencies-development)
    - [Concurrently](#concurrently)
    - [Crossenv](#crossenv)
    - [Eslint](#eslint)
    - [Husky](#husky)
    - [Jest](#jest)
    - [Morgan](#morgan)
    - [Nodemon](#nodemon)
    - [Supertest](#supertest)
  - [Front-End Dependencies ```(Production)```](#front-end-dependencies-production)
    - [React](#react)
    - [Redux](#redux)
    - [Redux Thunk](#redux-thunk)
    - [Sales Tax](#sales-tax)
    - [ShortID](#shortid)
    - [Styled Components](#styled-components)
    - [Uppy](#uppy)
    - [Axios](#axios)
    - [Connected React Router](#connected-react-router)
    - [Date FNS](#date-fns)
    - [ES6 Set Proptypes](#es6-set-proptypes)
    - [Formik](#formik)
    - [JWT Decode](#jwt-decode)
    - [Pixi](#pixi)
  - [Front-End Dependencies ```(Development)```](#front-end-dependencies-development)
    - [Eslint](#eslint-1)
    - [Stylelint](#stylelint)

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

`HEROKU_URI`: URL of website (front and back end are deployed here)

`MONGO_URI`: URL for the database

`NODE_MODULES_CACHE`: false

`SECRET_OR_KEY`: secret key for bcryptjs

# Auth Token Payload

The JWT payload will look like this:

```
{
  id: '1234567890',
  pin: '1234,
  role: {
    admin: true,
    manager: false
  },
  restaurant: '0987654321',
  membership: false
};
```

When the admin signs in these fields will be null:

- pin
- role

If the restaurant field is not defined, that means that the admin has not created a restaurant yet, and should be prompted to make one. Otherwise, the restaurant field will be populated with the ObjectId of the admin's restaurant.

When an employee logs in to the POS system through the employee login, the id, pin and role fields will be populated with the employee's data.

# Backend Endpoints

## Employee Routes

### Register Admin

POST `/api/employees/admin/register`

Registers a new admin. It will automatically assign the user a PIN of `0000` and set admin status as true.

Request body should look like this:

```
{
  "email": "admin@user.com",
  "pass": "password",
  "name": "Admin User"
}
```

`name`: String, required

`pass`: String, required, min 8 characters

`email`: Email, required, must be unique (should be unique)

Response includes the admin's PIN.

Response:

```
{
  "pin": "0000"
}
```

### Register Employee

POST `/api/employees/register`

**Requires Authentication**

**Admin/Manager only**

Registers a new employee. The `restaurant` field for the Employee will automatically be pulled from the JWT.

Request body should look like this:

```
{
  "name": "First Server",
  "pass": "password",
  "role": {
    "manager": "true"
  }
}
```

`name`: String, required

`pass`: String, required, min 8 characters

`role`: Object, optional

  - `admin`: Boolean
  - `manager`: Boolean

Response includes the new employee's PIN.

Response:

```
{
  "pin": "1234"
}
```

### Login Admin

POST `/api/employees/admin/login`

Logs in an existing administrator. This will bring the user to the employee login screen.

Request body should look like this:

```
{
  "email": "admin@user.com",
  "pass": "password"
}
```

`email`: Email, required

`pass`: String, required

Response includes a success message and a Bearer token for authorization. This token will NOT have user information on it, it will only contain the restaurant id!

Response:

```
{
  "token": "Bearer (token)"
}
```

### Login Employee

POST `/api/employees/login`

Logs an existing user into the application. If the user is a manager or admin, they need to provide their password.

Request body should look like this:

```
{
  "pin": "0000",
  "pass": "password"
}
```

`pin`: String, required, 4 characters

`pass`: String, required only for admin/managers

Response includes a Bearer token for authorization.

Response:

```
{
  "token": "Bearer (token)"
}
```

### Get All Employees

GET `/api/employees/all`

**Requires Authorization**

Retrieves a list of employees from the database. Admins can see all employees in the restaurant, managers can see only servers.

Response:

```
{
  "employees": [
    {
      "role": {
        "admin": true,
        "manager": false
      },
      "_id": "5ba6c050df4d147ee8cf9003",
      "name": "Admin User",
      "password": "(hashed password. should be changed)",
      "email": "admin@user.com",
      "pin": "0000",
      "__v": 0,
      "restaurant": "5ba6c19f0c6f7f7f7e859dc4"
    },
    {
      "role": {
        "admin": false,
        "manager": false
      },
      "_id": "5ba6c30a0c6f7f7f7e859dc5",
      "name": "First Server",
      "password": "(hashed password. should be changed)",
      "pin": "7350",
      "restaurant": "5ba6c19f0c6f7f7f7e859dc4",
      "__v": 0
    }
  ]
}
```


### Update Employee

PUT `/api/employees/update/:pin`

**Requires Authorization**

Changes the name, email or password for the user. The pin in the params must match the pin of the current user.

Request body should look like this:

```
{
  "pass": "password",
  "newPass": "password1",
  "email": "admin@user.com",
  "name": "New Name"
}
```

`pass`: String, required. This should be the current password!

`newPass`: String, optional

`email`: String, optional,

`name`: String, optional

Response will be a success message.

Response:

```
{
  "msg": "Succesfully updated the user."
}
```

### Employee Logout

GET `/api/employees/logout`

Response will be a new token with all the user information fields replaced with `null`. It will still have the restaurant information.

## Item Routes

### Get All Items

GET `/api/items/all`

**Requires Authorization**

Retrieves all of the food items from the database.

Each element in the response array includes and item's:

- name
- description
- category
- price

Response:

```
{
  "items": [
    {
      "_id": "5ba6c9f8914dc082011a1657",
      "name": "Spaghetti",
      "price": 10.99,
      "description": "Noodles and red stuff",
      "category": "entrees",
      "restaurant": "5ba6c19f0c6f7f7f7e859dc4",
      "__v": 0
    },
    {
      "_id": "5ba6caaf914dc082011a1658",
      "name": "Salad",
      "price": 6.75,
      "description": "Lettuce and various other things",
      "category": "sides",
      "restaurant": "5ba6c19f0c6f7f7f7e859dc4",
      "__v": 0
    }
  ]
}
```

### Get A Specific Item

GET `/api/items/:id`

**Requires Authorization**

Retrieves the food by the id specified in the parameters.

Response includes the item's:

- name
- price
- description
- category

Response:

```
{
  "item": {
    "_id": "5ba6c9f8914dc082011a1657",
    "name": "Spaghetti",
    "price": 10.99,
    "description": "Noodles and red stuff",
    "category": "entrees",
    "restaurant": "5ba6c19f0c6f7f7f7e859dc4",
    "__v": 0
  }
}
```

### Add Item

POST `/api/items/add`

**Requires Authorization**

Adds a new food item to the database. Only managers and admins can do this.

Request body should look like this:

```
{
  "name": "Spaghetti",
  "price": "7.99",
  "category": "entrees",
  "description": "Noodles and red stuff"
}
```

`name`: String, required, must be unique

`description`: String

`price`: Number, required

`category`: String, optional

Response includes the added item's:

- name
- price
- category
- description

Response:

```
{
  "item": {
    "_id": "5ba6c9f8914dc082011a1657",
    "name": "Spaghetti",
    "price": 7.99,
    "description": "Noodles and red stuff",
    "category": "entrees",
    "restaurant": "5ba6c19f0c6f7f7f7e859dc4",
    "__v": 0
  }
}
```

### Update Item

PUT `/api/items/update/:id`

**Requires Authorization**

Updates information for an existing food item. Only managers and admins can do this.

Request body should look like this:

```
{
  "price": "10.99"
}
```

`name`: String, must be unique

`description`: String

`price`: Number

`category`: String

You only need one field!

Response includes the updated item's:

- name
- price
- category
- description

Response:

```
{
  "updatedItem": {
    "_id": "5ba6c9f8914dc082011a1657",
    "name": "Spaghetti",
    "price": 10.99,
    "description": "Noodles and red stuff",
    "category": "entrees",
    "restaurant": "5ba6c19f0c6f7f7f7e859dc4",
    "__v": 0
  }
}
```

### Delete Item

DELETE `/api/items/delete/:id`

**Requires Authorization**

Deletes an item from the database. Only managers and admins can do this.

Response includes a success message and the deleted item's:

- name
- price
- category
- description

Response:

```
{
  "removedItem": {
    "_id": "5ba6caaf914dc082011a1658",
    "name": "Salad",
    "price": 6.75,
    "description": "Lettuce and various other things",
    "category": "sides",
    "restaurant": "5ba6c19f0c6f7f7f7e859dc4",
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
{
  "parties": [
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
}
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
{
  "party": {
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
}
```

### Add a New Party

POST `/api/party/add`

**Requires Authorization**

Adds a new party to the database

Request body should look like this:

```
{
  "tables": ["5ba6c6860c6f7f7f7e859dc6"],
  "server": "5ba6c30a0c6f7f7f7e859dc5"
}
```

`tables`: Should be an array of Table ObjectIds.

`server`: Employee ObjectId, optional

`tables` is an array so that if tables are combined, all tables are represented in the array. In most cases there will be only one table id.

Response includes the party's:

- Items list (name, price)
- tables list
- server name

Response:

```
{
  "party": {
    "food": [],
    "tables": [
      {
        "active": true,
        "_id": "5ba6c6860c6f7f7f7e859dc6",
        "x": 400,
        "y": 100,
        "number": 1,
        "restaurant": "5ba6c19f0c6f7f7f7e859dc4",
        "__v": 0
      }
    ],
    "_id": "5ba6c8070c6f7f7f7e859dc8",
    "server": {
      "_id": "5ba6c30a0c6f7f7f7e859dc5",
      "name": "First Server"
    },
    "restaurant": "5ba6c19f0c6f7f7f7e859dc4",
    "__v": 0
  }
}
```

### Update a Party

PUT `/api/party/update/:id`

**Requires Authorization**

Updates the party information

Request body should look like this:

```
{
  "updatedParty": {
    "tables": ["5b99a5d5603385aece3e367a"],
    "food": [
      "5b956483ed2e4d86346d6c82",
      "5b9564a0ed2e4d86346d6c83"
    ],
    "server": "5b98371f09563dc8dca06af3"
  }
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
  "msg": "Party has been removed."
}
```

## Table Routes

### Get All Tables

GET`/api/tables/all`

**Requires Authorization**

Get all tables.

Response:

```
{
  "tables": [
    {
      "active": false,
      "_id": "5ba6c6860c6f7f7f7e859dc6",
      "x": 100,
      "y": 250,
      "number": 1,
      "restaurant": "5ba6c19f0c6f7f7f7e859dc4",
      "__v": 0
    },
    {
      "active": false,
      "_id": "5ba6c6b00c6f7f7f7e859dc7",
      "x": 250,
      "y": 300,
      "number": 2,
      "restaurant": "5ba6c19f0c6f7f7f7e859dc4",
      "__v": 0
    }
  ]
}
```

### Get A Specific Table

GET`/api/tables/:id`

**Requires Authorization**

Get a table by it's ID. The ID will be pulled off of the request parameters.

Response:

```
{
  "table": {
    "active": false,
    "_id": "5ba6c6860c6f7f7f7e859dc6",
    "x": 100,
    "y": 250,
    "number": 1,
    "restaurant": "5ba6c19f0c6f7f7f7e859dc4",
    "__v": 0
  }
}
```

### Add Table

POST `/api/tables/add`

**Requires Authorization**

Adds a new table to the database with the given coordinates.

Request body should look like this:

```
{
  "x": "100",
  "y": "250",
  "number": "1"
}
```

`x`: Number, required

`y`: Number, required

`number`: Number, required

Response includes the added item's:

- x coordinate
- y coordinate
- active status (defaults to true)
- number

Response:

```
{
  "table": {
    "active": false,
    "_id": "5ba6c6860c6f7f7f7e859dc6",
    "x": 100,
    "y": 250,
    "number": 1,
    "restaurant": "5ba6c19f0c6f7f7f7e859dc4",
    "__v": 0
  }
}
```

### Update Tables

POST `api/tables/update`

**Requires Authorization**

Updates all the tables in array in the request body.

Request body should look like this:

```
{
	"updatedTables": [
    {
      "_id": "5ba6c6860c6f7f7f7e859dc6",
      "x": 400,
      "y": 100
    },
    {
      "_id": "5ba6c6b00c6f7f7f7e859dc7",
      "x": 100,
      "y": 250
    }
  ]
}
```

`tables`: Array of Objects with Table information

Response includes the added item's:

- x coordinate
- y coordinate
- active status (defaults to true)

Response:

```
[
  {
    "active": false,
    "_id": "5ba6c6860c6f7f7f7e859dc6",
    "x": 400,
    "y": 100,
    "number": 1,
    "restaurant": "5ba6c19f0c6f7f7f7e859dc4",
    "__v": 0
  },
  {
    "active": false,
    "_id": "5ba6c6b00c6f7f7f7e859dc7",
    "x": 100,
    "y": 250,
    "number": 2,
    "restaurant": "5ba6c19f0c6f7f7f7e859dc4",
    "__v": 0
  }
]
```

### Deactivate Table

PUT `api/tables/deactivate/:id`

**Requires Authorization**

Deactivates a table by its ID and removes the table from any connected party.

Response includes:

- the associated party with an updated list of tables
- the table that was just deactivated

Response:

```
{
  "populatedParty": {
    "food": [],
    "tables": [
      "5ba6c6b00c6f7f7f7e859dc7"
    ],
    "_id": "5ba6c8070c6f7f7f7e859dc8",
    "server": {
      "_id": "5ba6c30a0c6f7f7f7e859dc5",
      "name": "First Server"
    },
    "restaurant": "5ba6c19f0c6f7f7f7e859dc4",
    "__v": 1
  },
  "msg": "Table has been deactivated and removed from the party.",
  "updatedTable": {
    "active": true,
    "_id": "5ba6c6860c6f7f7f7e859dc6",
    "x": 400,
    "y": 100,
    "number": 1,
    "restaurant": "5ba6c19f0c6f7f7f7e859dc4",
    "__v": 0
  }
}
```

### Delete Table

Delete `api/tables/delete/:id`

**Requires Authorization**

Deletes a table by its ID. The ID will be pulled off of the request parameters. No request body is required for this route. Only managers and admins can do this.

Response:

```
{
  "tables": [
    {
      "active": false,
      "_id": "5ba6c6860c6f7f7f7e859dc6",
      "x": 400,
      "y": 100,
      "number": 1,
      "restaurant": "5ba6c19f0c6f7f7f7e859dc4",
      "__v": 0
    }
  ],
  "msg": "Table deleted from the database."
}
```

## Order Routes

### Add a New Order

POST `/api/orders/add`

**Requires Authorization**

Adds a new order to the selected table.

Request body should look like this:

```
{
  "order": {
    "table": "5b983e0726d91bbaec2fea1b",
    "server": "5b993879366d2671bcba0e02",
    "food": [
      "5b956483ed2e4d86346d6c82",
      "5b9564a0ed2e4d86346d6c83"
    ],
    "firstName": "First",
    "lastName": "Last",
    "last4": "1234"
  }
}
```

`table`: Table ObjectId, required

`server`: Employee ObjectId, required

`food`: Should be an array of Item ObjectIds, required

`firstName`: String, optional

`lastName`: String, optional

`last4`: String, optional

Response:

```
{
  "food": [
      "5b956483ed2e4d86346d6c82",
      "5b9564a0ed2e4d86346d6c83"
  ],
  "_id": "5b9945ad15c2eab76ccc78b1",
  "table": "5b983e0726d91bbaec2fea1b",
  "server": "5b993879366d2671bcba0e02",
  "lastName": "Last Name",
  "firstName": "first name",
  "last4": "1234",
  "date": "2018-09-12T16:58:21.473Z",
  "__v": 0
}
```

### Get All Orders

GET `/api/orders/all`

**Requires Authorization**

Retrieves all of the orders from the database.

Response:

```
{
  "orders": [
    {
      "food": [
        {
          "_id": "5b956483ed2e4d86346d6c82",
          "name": "Shrimp Tempura",
          "price": 5.99
        },
        {
          "_id": "5b9564a0ed2e4d86346d6c83",
          "name": "Sweet Potato Roll",
          "price": 4.99
        }
      ],
      "_id": "5b9945ad15c2eab76ccc78b1",
      "table": "5b983e0726d91bbaec2fea1b",
      "server": {
        "_id": "5b993879366d2671bcba0e02",
        "name": "Rigby Bird"
      },
      "lastName": "Last Name",
      "firstName": "first name",
      "last4": "1234",
      "date": "2018-09-12T16:58:21.473Z",
      "__v": 0
    }
  ]
}
```

### Get a Specific Order

GET `/api/orders/:id`

**Requires Authorization**

Retrieves a specific order from the database by the id provided.

Response:

```
{
  "order": {
    "food": [
      {
        "_id": "5b956483ed2e4d86346d6c82",
        "name": "Shrimp Tempura",
        "price": 5.99
      },
      {
        "_id": "5b9564a0ed2e4d86346d6c83",
        "name": "Sweet Potato Roll",
        "price": 4.99
      }
    ],
    "_id": "5b9945ad15c2eab76ccc78b1",
    "table": "5b983e0726d91bbaec2fea1b",
    "server": {
      "_id": "5b993879366d2671bcba0e02",
      "name": "Rigby Bird"
    },
    "lastName": "Last Name",
    "firstName": "first name",
    "last4": "1234",
    "date": "2018-09-12T16:58:21.473Z",
    "__v": 0
  }
}
```

### Update Order

PUT `/api/orders/:id`

**Requires Authorization**

Updates an existing order.

Request body should look like this:

```
{
  "food": ["5b956483ed2e4d86346d6c82", "5b9564a0ed2e4d86346d6c83"],
  "table
}
```

Response:

```
{
  "updatedOrder": {
    "food": [
      {
        "_id": "5b956483ed2e4d86346d6c82",
        "name": "Shrimp Tempura",
        "price": 5.99
      },
      {
        "_id": "5b9564a0ed2e4d86346d6c83",
        "name": "Sweet Potato Roll",
        "price": 4.99
      }
    ],
    "_id": "5b9945ad15c2eab76ccc78b1",
    "party": "5b983e0726d91bbaec2fea1b",
    "server": {
      "_id": "5b993879366d2671bcba0e02",
      "name": "Rigby Bird"
    },
    "lastName": "Last Name",
    "firstName": "first name",
    "last4": "1234",
    "date": "2018-09-12T16:58:21.473Z",
    "__v": 0
  }
}
```

### Restaurant Routes

POST `/api/restaurants/register`

**Requires Authorization**

Adds a new restaurant to the signed-in admin's account.

Request body should look like this:

```
{
  "name": "Rigby's Tacos",
  "location": "Saint Paul, MN",
  "billing": {
    "address": "123 Main St"
  }
}
```

`name`: String, required, the name of the restaurant

`location`: String, required

`billing`: Object, some fields required:

- `address`: String? required

Response contains a success messages and a new bearer token. The token will contain the restaurant id.

Response:

```
{
  "token": "Bearer (token)",
  "msg": "Successfully created"
}
```
# Tech-Stack

## Back-End Dependencies ```(Production)```

### Send Grid

### BcryptJS

### Cors

### ExpressJS

### Helmet

### JSON Web Token

### Mongoose

### Passport

### Stripe

## Back-End Dependencies ```(Development)```

### Concurrently

### Crossenv

### Eslint

### Husky

### Jest

### Morgan

### Nodemon

### Supertest

## Front-End Dependencies ```(Production)```

### React

### Redux

### Redux Thunk

### Sales Tax

### ShortID

### Styled Components

### Uppy

### Axios

### Connected React Router

### Date FNS

### ES6 Set Proptypes

### Formik

### JWT Decode

### Pixi

## Front-End Dependencies ```(Development)```

### Eslint

### Stylelint