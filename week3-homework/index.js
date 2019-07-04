const express = require('express');
const createError = require('http-errors');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded());
//Data
let todos = [
  { id: 1, title: 'Coding', isDone: true },
  { id: 2, title: 'Walking', isDone: false },
  { id: 3, title: 'Shoppping', isDone: true },
  { id: 4, title: 'Cooking', isDone: true },
];
let idNext = 5;
//1.A list of todo items
app.get('/todos', (req, res) => {
  res.send(todos);
});
//2.Add a json body to todo list
app.post('/todos', (req, res, next) => {
  const title = req.body.title;
  const isDone = Boolean(req.body.isDone);
  if (!title) {
    return next(createError(400));
  }

  const todo = {
    id: idNext,
    title: title,
    isDone,
  }
  todos.push(todo);
  idNext += 1;
  res.json(todo);

});
//3 .A single todo
app.get('/todos/:id', (req, res, next) => {

  const id = Number(req.params.id);
  const todo = todos.find((todo) => todo.id === id);
  if (!todo) {
    return next(createError(404));
  }
  res.json(todo);

});
// 4.Edits existing routes
app.put('/todos/:id', (req, res, next) => {
  const id = Number(req.params.id);
  const todo = todos.find((todo) => todo.id === id);
  if (!todo) {
    return next(createError(404));
  }
  if (req.body.title) {
    todo.title = req.body.title;
  }
  if (req.body.isDone) {
    todo.isDone = req.body.isDone;
  }
  res.json(todo);
});

//5. delete
app.delete('/todos/:id', (req, res, next) => {
  const id = Number(req.params.id);
  const todo = todos.find((todo) => todo.id === id);
  if (!todo) {
    return next(createError(404));
  }
  todos = todos.filter((todo) => todo.id !== id);
  res.status(200).send(todos);
});

//6. Returns only the specific items
app.get('/todos/:id/not-done', (req, res, next) => {
  const id = Number(req.params.id);
  const todo = todos.find((todo) => todo.id === id);
  if (!todo) {
    return next(createError(404));
  }
  const notdone = todos.filter((todo) => todo.isDone === false);

  if (!notdone) {
    return next(createError(404));
  }
  res.status(200).json(notdone);

});

// 7 . error handling
app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  console.log(err.message);
  res.sendStatus(err.status);
});

app.listen(port, () =>
  console.log(
    `Example app listening on port ${port}!\nYou can access the base route by going to http://localhost:${port}/ in your browser.`
  )
);

