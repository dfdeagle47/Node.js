const express = require("express");
const createError = require("http-errors");

const app = express();
const port = 8000;

app.use(express.json());
app.use(express.urlencoded());
const todos = [
  { id: 1, title: "Buy cookies", isDone: true },
  { id: 2, title: "wash the dishes", isDone: false },
  { id: 3, title: "iron the clothes", isDone: false }
];

//GET /todos - this should respond with a list of todo items.

app.get("/todos", (req, res) => {
  res.json(todos);
});

//GET /todos/:id - this route should display a single todo's title and isDone.

app.get("/todos/:id", (req, res, next) => {
  const id = Number(req.params.id);
  const todo = todos.find(todo => todo.id === id);
  if (!todo) {
    return next(createError(404));
  }

  res.json(todo);
});
// POST /todos - this route should accept a JSON body and add it to the todo list.

let idNext = 4;

app.post("/todos", (req, res) => {
  console.log(req.body);
  //res.json(req.body);
  const title = req.body.title;
  const isDone = Boolean(req.body.isDone);

  const todo = {
    id: idNext,
    title,
    isDone
  };

  todos.push(todo);
  idNext += 1;
  res.json(todo);
});

//PUT /todos/:id - this route should accept edits to existing todos (i.e. changing the isDone property).

app.put("/todos/:id", (req, res, next) => {
  const id = Number(req.params.id);
  const todo = todos.find(todo => todo.id === id);
  console.log(todo);

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

//DELETE /todos/:id - this route should allow you to delete a specific todo from the array.

app.delete("/todos/:id", (req, res, next) => {
  const id = Number(req.params.id);
  const todo = todos.find(todo => todo.id === id);
  //console.log(todo);

  if (!todo) {
    return next(createError(404));
  }
  todos = todos.filter(todo => todo.id !== id);
  res.sendStatus(200);
});
//GET /todos/not-done - this should return only the items still TODO (isDone = false)

app.get("/todos/:id/not-done", (req, res, next) => {
  const id = Number(req.params.id);
  const todo = todos.find(todo => todo.id === id);
  console.log(todo);

  if (!todo) {
    return next(createError(404));
  }
  if (todo.isDone === false) {
    const isNotDone = todos.filter(todo => todo.isDone === false);
    res.json(isNotDone);
  } else {
    res.json("Done");
  }
});

//Error 404

app.use((req, res, next) => {
  next(createError(404));
});
//Error Status
app.use((err, req, res, next) => {
  console.log(err.message);
  res.sendStatus(err.status);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
