# Restaurant POS [![Build Status](https://travis-ci.com/Lambda-School-Labs/CS10-restaurant-pos.svg?branch=master)](https://travis-ci.com/Lambda-School-Labs/CS10-restaurant-pos)
Welcome to our Restaurant Point-of-Sale System.

Click [here](https://www.maincourse.app/) to visit the app, or click on the image below to view our video demo and tutorial:

[![Main Course App](https://storage.googleapis.com/main-course-images/Screen%20Shot%202018-10-16%20at%202.50.22%20PM.png)](https://www.youtube.com/watch?v=wPkpSewq568)

## Team
|   [**Ronnie Miksch**](https://github.com/myxozoa)  |   [**Dani Tacheny**](https://github.com/danitacheny)   |    [**Eric Hech**](https://github.com/EricHech)    |   [**Chris Beards**](https://github.com/ChristopherBeards)  |
|:----------------:|:----------------:|:---------------:|:---------------:|
| [<img src="https://avatars1.githubusercontent.com/u/32121076?s=80" width="80">](https://github.com/myxozoa) | [<img src="https://avatars0.githubusercontent.com/u/34424414?s=80" width="80">](https://github.com/danitacheny)  | [<img src="https://avatars3.githubusercontent.com/u/34724684?s=80" width="80">](https://github.com/EricHech) | [<img src="https://avatars2.githubusercontent.com/u/34330944?s=80" width="80">](https://github.com/ChristopherBeards) |
| [<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/myxozoa)  |  [<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/danitacheny) | [<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/EricHech)  | [<img src="https://github.com/favicon.ico" width="15"> Github](https://github.com/ChristopherBeards) |
| [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> LinkedIn](https://www.linkedin.com/in/ronnie-miksch/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> LinkedIn](https://www.linkedin.com/in/dani-tacheny-647403173/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> LinkedIn](https://www.linkedin.com/in/erichech/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> LinkedIn](https://www.linkedin.com/in/christopher-beards-1292b529/) |


# Table of Contents
- [Restaurant POS](#restaurant-pos)
- [Team](#team)
- [Table of Contents](#table-of-contents)
- [Scripts](#scripts)
  - [Linting](#linting)
  - [Running](#running)
- [Environment Variables](#environment-variables)
- [Tech-Stack](#tech-stack)
  - [Back-End Dependencies ```(Production)```](#back-end-dependencies-production)
    - [Send Grid](#send-grid)
    - [BcryptJS](#bcryptjs)
    - [Cors](#cors)
    - [ExpressJS](#expressjs)
    - [MongoDB](#mongodb)
    - [Mongoose](#mongoose)
    - [Helmet](#helmet)
    - [JSON Web Token](#json-web-token)
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
    - [ShortID](#shortid)
    - [Styled Components](#styled-components)
    - [Uppy](#uppy)
    - [Axios](#axios)
    - [Connected React Router](#connected-react-router)
    - [Date FNS](#date-fns)
    - [Formik](#formik)
    - [JWT Decode](#jwt-decode)
    - [PixiJS](#pixijs)
  - [Front-End Dependencies ```(Development)```](#front-end-dependencies-development)
    - [Eslint](#eslint-1)
    - [Stylelint](#stylelint)
- [API Documentation](#api-documentation)
  - [Third-Party APIs](#third-party-apis)
    - [Send Grid](#send-grid-1)
    - [Avalara](#avalara)
    - [Lorem Picsum](#lorem-picsum)
    - [Transloadit](#transloadit)
    - [Stripe](#stripe-1)
    - [Google Cloud Storage](#google-cloud-storage)
  - [Backend API](#backend-api)
    - [Auth Token Payload](#auth-token-payload)
    - [Employee Routes](#employee-routes)
      - [Register Admin](#register-admin)
      - [Register Employee](#register-employee)
      - [Login Admin](#login-admin)
      - [Login Employee](#login-employee)
      - [Get All Employees](#get-all-employees)
      - [Update Employee](#update-employee)
      - [Change Role](#change-role)
      - [Delete Employee](#delete-employee)
      - [Employee Logout](#employee-logout)
    - [Item Routes](#item-routes)
      - [Add Item](#add-item)
      - [Get All Items](#get-all-items)
      - [Get A Specific Item](#get-a-specific-item)
      - [Update Item](#update-item)
      - [Delete Item](#delete-item)
    - [Party Routes](#party-routes)
      - [Add a New Party](#add-a-new-party)
      - [Get All Parties](#get-all-parties)
      - [Get a Specific Party](#get-a-specific-party)
      - [Update a Party](#update-a-party)
      - [Delete a Party](#delete-a-party)
    - [Table Routes](#table-routes)
      - [Add Table](#add-table)
      - [Get All Tables](#get-all-tables)
      - [Get A Specific Table](#get-a-specific-table)
      - [Update Tables](#update-tables)
      - [Deactivate Table](#deactivate-table)
      - [Delete Table](#delete-table)
    - [Restaurant Routes](#restaurant-routes)

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

# Tech-Stack

## Back-End Dependencies ```(Production)```

### Send Grid

Used for user confirmation Emails (Required by employer). | [View Dependency](https://sendgrid.com/docs/)

### BcryptJS

Bcrypt is an adaptive hash function which adjusts the cost of hashing, which means that in the future as computers become more powerful, simply increasing the salt rounds will suffice at keeping Main Course secure due to the amount of processing time that would be required to generate all possible password combinations. | [View Dependency](https://www.npmjs.com/package/bcryptjs)

### Cors

Used to configure API security. This was used to allow for secure communication between the front-end and back-end servers. | [View Dependency](https://github.com/expressjs/cors)

### ExpressJS

A prebuilt NodeJS framework that makes creating server side applications simple, fast, and flexible. NodeJS is powered by Google's V8 Engine which means it's powerful and can handle a large number of requests without lapsing in dependability. Also, this means that this is a highly scalable choice when you consider the Event Loop which manages all asynchronous operations allowing the program to continue to run as expected without stops. | [View Dependency](http://expressjs.com/)

### MongoDB

MongoDB is an object-oriented, simple, dynamic, and scalable NoSQL database. Due to the minimal about of data relationships we felt this was a good choice for Main Course. | [View Dependency](https://docs.mongodb.com/)

### Mongoose

Provides a straight-forward, schema-based solution to model application data with MongoDB. It also offers out of the box perks such as validation. | [View Dependency](https://mongoosejs.com/)

### Helmet

A collection of nine smaller middleware functions that set security-related HTTP headers appropriatley. This protects Main Course from numerous well known vulnerablilites. | [View Dependency](https://helmetjs.github.io/)

### JSON Web Token

Realizing that there is not inherent benefit to using tokens over sessions, we chose to implement jwts due to the added benefit of storing the session on the client side as opposed to being in-memory. Main Course is built with the active server in mind and the potential to have the application be accessed from various devices in different locations. With this, instead of running the risk of having a session be interrupted due to data roaming, connection issues, or server side problems, we chose to store the session information on the client side. We also found this to be more efficient for our needs, as jwts eliminate the need to fetch additional information from the DB to validate the user. | [View Dependency](https://www.npmjs.com/package/jsonwebtoken)

### Passport

Passport is a flexible and fully customizable NodeJS middleware that comes with various out of the box authentication strategies for Facebook, Twitter, etcetera. This was an obvious choice for us because it makes future authentication features readily accessible. | [View Dependency](http://www.passportjs.org/)

### Stripe

A powerful, simple, and seamless payment commerce solution (Required by employer). | [View Dependency](https://stripe.com/docs/)


## Back-End Dependencies ```(Development)```

### Concurrently

This provides the ability to conveniently run both the back-end and front-end servers simultaneously on one terminal, which makes keeping track of errors easy during development as well as cutting back on time switching between terminals. | [View Dependency](https://www.npmjs.com/package/concurrently)

### Crossenv

Due to the variance of operating systems on the development team, Crossenv allows us to universally set environment variables. | [View Dependency](https://www.npmjs.com/package/cross-env)

### Eslint

Eslint is the dominant linting tool for NodeJS and it makes it possible to establish a clear coding convention for a team or project, as well as aiding in catching various bugs such as variables improperly scoped. | [View Dependency](https://eslint.org/)

### Husky

Used to prevent possible bad git commits or pushes due to running pre-commit linting hooks. | [View Dependency](https://github.com/typicode/husky)

### Jest

Chosen for its out of the box readiness. Jest comes with inbuilt mocking, the ability to run tests in parallel, it works with both the front-end and back-end, has promise support, and is a one stop shop for most testing needs within the scope of this project. | [View Dependency](https://jestjs.io/)

### Morgan

An HTTP request logging middleware used for production to easily identify bugs in routes. | [View Dependency](https://github.com/expressjs/morgan)

### Nodemon

Automatically restarts the server on save making production more efficient. | [View Dependency](https://nodemon.io/)

### Supertest

Using supertest with jest for integration testing makes things easy to implement and easy to read. | [View Dependency](https://www.npmjs.com/package/supertest)

## Front-End Dependencies ```(Production)```

### React

React is the current industry standard that offers a lot of out of the box benefits. It is fast, efficient, and scalable. Due to the large community, finding solutions to potential problems and reference material is much easier, even for a potential dev without a lot of experience who would like to contribute to Main Course. | [View Dependency](https://reactjs.org/docs/getting-started.html)

### Redux

A state management tool making it possible to store the entire state of the application in a single store. This means a unidirectional data flow, and as the application scales we have predictable state updates which subsequently make things easier to test and introduce new features. Redux also has solid documentation and an active community, meaning that as new devs become introduced to the project it's likely that any problems they face would have already been encountered by someone else, thus making solutions easy to find. | [View Dependency](https://redux.js.org/)

### Redux Thunk

A middleware that allows you to write action creators that return a function instead of an action. The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met. This functionality makes it easier to scale and implement features given diverse needs in a growing project. | [View Dependency](https://github.com/reduxjs/redux-thunk)

### ShortID

Used to fill a specific need in assigning items unique IDs for sorting on the front-end. | [View Dependency](https://www.npmjs.com/package/shortid)

### Styled Components

Has a thriving community and offers the ability to directly style multiple components within a file. The syntax used is familiar to JavaScript and improves code cleanliness and makes it easy to get up and going for those without a lot of css experience. Styled components are also very efficient, improving load time for users. | [View Dependency](https://www.styled-components.com/docs/)

### Uppy

"Sleek, modular file uploader that integrates seamlessly with any framework. It fetches files from local disk, Google Drive, Dropbox, Instagram, remote URLs, cameras and other exciting locations, and then uploads them to the final destination. It’s fast, easy to use and let's you worry about more important problems than building a file uploader." | [View Dependency](https://uppy.io/docs/)

### Axios

A lightweight, promise-based HTTP client with an intuitive API that makes interfacing with a REST API simple. | [View Dependency](https://www.npmjs.com/package/react-axios)

### Connected React Router

Allows for the ability to synchronize state with redux store through uni-directional data flow, time traveling, and dispatching of history methods. This makes for an incredibly useful tool when dealing with various stages of state and subsequent routing for a seamless and intuitive UI. | [View Dependency](https://www.npmjs.com/package/connected-react-router)

### Date FNS

A lightweight option for formatting JavaScript dates. | [View Dependency](https://date-fns.org/)

### Formik

This library utilizes essential React form functionality under the hood which makes implementing it feel very intuitive and not magical. It keeps track of values, errors, and submissions, which reduces the time needed to implement forms and makes for a more enjoyable experience. | [View Dependency](https://jaredpalmer.com/formik)

### JWT Decode

Used to decode JWTs on the front-end to retrieve user data. | [View Dependency](https://github.com/auth0/jwt-decode)

### PixiJS

An open source, cross browser JavaScript 2D WebGL graphics library with canvas fallback used to build core floor-plan functionality on the app. | [View Dependency](http://www.pixijs.com/)

## Front-End Dependencies ```(Development)```

### Eslint

[See Above Explanation](#eslint)

### Stylelint

Used to enforce project conventions in styling to keep code consistent. | [View Dependency](https://stylelint.io/)

# API Documentation

## Third-Party APIs

### Send Grid

Used for user confirmation Emails (Required by employer). | [View API](https://sendgrid.com/docs/)

### Avalara

Used for retrieving local sales tax rates for restaurant location. | [View API](https://developer.avalara.com/api-reference/avatax/rest/v2/)

### Lorem Picsum

Used for generating random profile images when users choose not to upload their own image. | [View API](https://picsum.photos/images/)

### Transloadit

Used for uploading and processing images to Google Cloud Storage. | [View API](https://transloadit.com/docs/)

### Stripe

A powerful, simple, and seamless payment commerce solution (Required by employer). | [View API](https://stripe.com/docs/)

### Google Cloud Storage

Used for storing the app's image and video files for high availability in all regions. | [View API](https://cloud.google.com/storage/docs/)

## Backend API

### Auth Token Payload

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


### Employee Routes

#### Register Admin

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

#### Register Employee

POST `/api/employees/register`

**Requires:** Authentication, an admin must create a restaurant first, must be an admin or a manager.

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

#### Login Admin

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

#### Login Employee

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

#### Get All Employees

GET `/api/employees/all`

**Requires:** Authorization

Retrieves a list of employees from the database. Admins can see all employees in the restaurant, managers can see only servers.

Response:

```
{
  "employees": [
    {
      "_id": "5bb7d8e50f5a084e70e84bd4",
      "name": "server 1",
      "images": null,
      "parties": [
        {
          "tables": [],
          "food": []
        }
      ]
    },
    {
      "_id": "5bb7d3ceb2786a2c785eee1c",
      "name": "employee name",
      "images": null,
      "parties": [
        {
          "tables": [],
          "food": []
        }
      ]
    }
  ]
}
```

#### Update Employee

PUT `/api/employees/update/:pin`

**Requires:** Authorization

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

#### Change Role

PUT `/api/employees/update/role/:id`

**Requires:** Authorization

Changes the role of the employee with the given ID.

Request body should look like this:

```
{
  "role": {
    "admin": false,
    "manager": true
  }
}
```

`role`: An object containing admin and manager flags

Response will be a success message.

Response:

```
{
  msg: 'Employee successfully updated.' }
}
```

#### Delete Employee

DELETE `/api/employees/delete/:id`

**Requires:** Authorization

Deletes an employee from the database. Only admins can do this.

Response includes a success message.

Response:

```
{
  "msg": "The employee was removed from the database."
}
```

#### Employee Logout

GET `/api/employees/logout`

Response will be a new token with all the user information fields replaced with `null`. It will still have the restaurant information.

### Item Routes

#### Add Item

POST `/api/items/add`

**Requires:** Authorization

Adds a new food item to the database. Only managers and admins can do this.

Request body should look like this:

```
{
  "name": "Sweet Potato Roll",
  "price": "7.99",
  "category": "sushi",
  "description": "Sweet and also amazing"
}
```


`name`: String, required, must be unique

`description`: String

`price`: Number, required

`category`: String, optional

`images`: String, optional

Response includes the added item's:

- name
- price
- description
- category
- restaurant ID (taken from req.user)

Response:

```
{
  "items": [
    {
      "_id": "5bb7eec30f5a084e70e84bd7",
      "name": "Sweet Potato Roll",
      "price": 4.99,
      "description": "Sweet and also amazing",
      "category": "sushi",
      "restaurant": "5bb7d501d333ca2760d1d334",
      "__v": 0
    }
  ]
}
```

#### Get All Items

GET `/api/items/all`

**Requires:** Authorization

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

#### Get A Specific Item

GET `/api/items/:id`

**Requires:** Authorization

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

#### Update Item

PUT `/api/items/update/:id`

**Requires:** Authorization

Updates information for an existing food item. Only managers and admins can do this.

If only updating the price, the request body should look like this:

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

#### Delete Item

DELETE `/api/items/delete/:id`

**Requires:** Authorization

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

### Party Routes

#### Add a New Party

POST `/api/party/add`

**Requires:** Authorization

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

#### Get All Parties

GET `/api/party/all`

**Requires:** Authorization

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

#### Get a Specific Party

GET `/api/party/:id`

**Requires:** Authorization

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

#### Update a Party

PUT `/api/party/update/:id`

**Requires:** Authorization

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

#### Delete a Party

DELETE `/api/party/delete/:id`

**Requires:** Authorization

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

### Table Routes

#### Add Table

POST `/api/tables/add`

**Requires:** Authorization

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

#### Get All Tables

GET`/api/tables/all`

**Requires:** Authorization

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

#### Get A Specific Table

GET`/api/tables/:id`

**Requires:** Authorization

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

#### Update Tables

POST `api/tables/update`

**Requires:** Authorization

Updates all the tables in array in the request body.

Request body should look like this:

```
{
"tables": [
	  {
	    "_id": "5bb91ad8d5461a87502efc83",
	    "x": 2,
	    "y": 2
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
{
  "updatedTables": [
     {
      "active": false,
      "_id": "5bb91ad8d5461a87502efc83",
      "x": 2,
      "y": 2,
      "number": 1,
      "restaurant": "5bb7d501d333ca2760d1d334",
      "__v": 0
    }
  ]
}
```

#### Deactivate Table

PUT `api/tables/deactivate/:id`

**Requires:** Authorization

Deactivates a table by its ID and removes the table from any connected party.

Response includes:

- the associated party with an updated list of tables
- the table that was just deactivated

Response:

```
{
  "updatedParty": {
    "tables": [],
    "_id": "5bb922f8d5461a87502efc85",
    "server": {
        "_id": "5bb7d3ceb2786a2c785eee1c",
        "name": "Milo Pup"
    },
    "restaurant": "5bb7d501d333ca2760d1d334",
    "food": [],
    "__v": 1
  },
  "msg": "Table has been deactivated and removed from the party.",
  "updatedTable": {
    "active": true,
    "_id": "5bb91ad8d5461a87502efc83",
    "x": 2,
    "y": 2,
    "number": 1,
    "restaurant": "5bb7d501d333ca2760d1d334",
    "__v": 0
  }
}
```

#### Delete Table

Delete `api/tables/delete/:id`

**Requires:** Authorization

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

### Restaurant Routes

POST `/api/restaurants/register`

**Requires:** Authorization

Adds a new restaurant to the signed-in admin's account.

Request body should look like this:

```
{
  "name": "Rigby's Tacos",
  "location": "28711",
}
```

`name`: String, required, the name of the restaurant

`location`: String, required, the zip code of the restaurant


Response contains a success messages and a new bearer token. The token will contain the restaurant id.

Response:

```
{
  "token": "Bearer (token)",
  "msg": "Successfully created"
}
```
