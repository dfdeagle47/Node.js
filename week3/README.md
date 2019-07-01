# Node.js Week 3

## Postman

- Installing Postman
    - [https://www.getpostman.com/](https://www.getpostman.com/)
    - [https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop//%40](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop//%40)
- How to use Postman with some REST API
    - [https://jsonplaceholder.typicode.com/](https://jsonplaceholder.typicode.com/)
    - [https://developers.themoviedb.org/3](https://developers.themoviedb.org/3)

## Nodemon

- Using nodemon to automatically restart the server when making changes: [https://www.npmjs.com/package/nodemon](https://www.npmjs.com/package/nodemon)

## Express

References:

- [https://expressjs.com/](https://expressjs.com/)
- [https://auth0.com/blog/node-js-and-express-tutorial-building-and-securing-restful-apis/](https://auth0.com/blog/node-js-and-express-tutorial-building-and-securing-restful-apis/)

## Starter

- `npm install express`
- `npm install http-errors`
 
## Data (see `data.js`)

How can we retrieve variables

- Using the query string `req.query`
- Using the path parameters `req.params`
- Using the body of the request `req.body`

## Routing 

### HTTP methods in Express (see `posts.js` or `items.js`)

```js
...
app.get('/', (req, res) => {
    return res.send('Received a GET HTTP method');
});

app.post('/', (req, res) => {
    return res.send('Received a POST HTTP method');
});

app.put('/', (req, res) => {
    return res.send('Received a PUT HTTP method');
});

app.delete('/', (req, res) => {
    return res.send('Received a DELETE HTTP method');
});

...
```

### REST API (see `posts.js` or `items.js`)

```js
...

app.get('/todos', (req, res) => {
    return res.send('GET HTTP method on todos resource');
});

app.post('/todos', (req, res) => {
    return res.send('POST HTTP method on todos resource');
});

app.put('/todos/:todoId', (req, res) => {
    return res.send(
    `PUT HTTP method on todos/${req.params.userId} resource`,
    );
});

app.delete('/todos/:todoId', (req, res) => {
    return res.send(
    `DELETE HTTP method on todos/${req.params.userId} resource`,
    );
});

...
```

## Middlewares (see `middleware.js`)

```js
const express = require('express');

const app = express();
const port = 3000;


// using express.json to parse JSON bodies into JS objects
app.use(express.json());
app.use(express.urlencoded());

// Middleware to wait 2 seconds
app.use((req, res, next) => {
    setTimeout(next, 2000);
});

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

const todos = [{ id: 0, text: 'Buy milk' }];
let idCounter = 1;

app.get('/todos', (req, res) => {
    return res.send('GET HTTP method on todos resource');
});

app.post('/todos', (req, res) => {
    return res.send('POST HTTP method on todos resource');
});

app.put('/todos/:todoId', (req, res) => {
    return res.send(
    `PUT HTTP method on todos/${req.params.userId} resource`,
    );
});

app.delete('/todos/:todoId', (req, res) => {
    return res.send(
    `DELETE HTTP method on todos/${req.params.userId} resource`,
    );
});
```

## Errors (see `errors.js`)

```js
const createError = require('http-errors');
...

// GET error
app.get('/error/:number', (req, res, next) => {
    const number = Number(req.params.number);
    // Generate an error in a route
    next(createError(number));
});

// 404 error
app.use((req, res, next) => {
    next(createError(404));
});

// Error handler middleware
app.use((err, req, res, next) => {
    res.send(err.status);
});
```

# Live coding: shopping cart REST API (see `items.js`)

Items have the structure `{ id: 1, name: 'Milk', price: 20, quantity: 4 }`

Our application should have the following routes:

1. `GET /items` - this should respond with a list of shopping items.
2. `POST /items` - this route should accept a JSON body and add it to the shopping list.
3. `GET /items/:id` - this route should display a single item's name, price and quantity.
4. `PUT /items/:id` - this route should accept edits to existing items (i.e. changing the `quantity` property)..
5. `DELETE /items/:id` - this route should allow you to delete a specific item from the array.
6. `POST /items`: "400 Bad Request" if the parameters are not valid (e.g. quantity is negative)
7. `GET /items/:id`: "404 Not Found" if item is not found

# Tutorials

- [https://www.rithmschool.com/courses/node-express-fundamentals](https://www.rithmschool.com/courses/node-express-fundamentals)
- [https://www.rithmschool.com/courses/node-express-fundamentals/helpful-express-middleware](https://www.rithmschool.com/courses/node-express-fundamentals/helpful-express-middleware)
- [https://www.robinwieruch.de/node-js-express-tutorial/](https://www.robinwieruch.de/node-js-express-tutorial/)
- [https://www.guru99.com/node-js-tutorial.html](https://www.guru99.com/node-js-tutorial.html)
- [https://guide.freecodecamp.org/miscellaneous/get-started-with-nodejs/](https://guide.freecodecamp.org/miscellaneous/get-started-with-nodejs/)
- [https://nodeschool.io/](https://nodeschool.io/)
- [https://www.codecademy.com/learn](https://www.codecademy.com/learn)

# Homework: Todo list REST API

Todos have the structure `{ id: 1, title: 'Buy cookies', isDone: true }`

Our application should have the following routes:

1. `GET /todos` - this should respond with a list of todo items.
2. `POST /todos` - this route should accept a JSON body and add it to the todo list.
3. `GET /todos/:id` - this route should display a single todo's title and isDone.
4. `PUT /todos/:id` - this route should accept edits to existing todos (i.e. changing the `isDone` property).
5. `DELETE /todos/:id` - this route should allow you to delete a specific todo from the array.
6. `GET /todos/not-done` - this should return only the items still TODO (`isDone` = false)
7. Add error handling (404 if todo not found, 400 if bad parameter such as isDone is not a boolean, ...)