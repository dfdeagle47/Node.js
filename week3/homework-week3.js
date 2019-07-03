const express = require('express');
const createError = require('http-errors');

const app = express();

app.use(express.json());
app.use(express.urlencoded());

// Data
let todos =[{
  id: 1, title: 'Buy cookies', isDone: true,
}, {
  id: 2, title: 'Do laundry', isDone: true,
}, {
  id: 3, title: 'Go to the bank', isDone: true,
},{
  id: 4, title: 'Clean the floor', isDone: false,
}];
let idNext = t5;

// List
//this should respond with a list of todo items.
app.get('/todos',(req, res) => {
  res.json(todos);
});

//GET /todos/not-done
//this should return only the items still TODO (isDone = false)
app.get('/todos/not-done',(req, res) => {
  const notDone = todos.filter((todo) => todo.isDone === false);
  res.json(notDone);
});


// Create
//POST /todos - this route should accept a JSON body and add it to the todo list.
app.post('/todos',(req, res) => {
  const body = req.body;
  console.log(body);
  const title = String(body.title);
  const isDone = Boolean(body.isDone || false);
  if (!title) {
      return next(createError(400));
  }
  const todo = {
    id: idNext,
    title,
    isDone,
  };
  todos.push(todo);
  idNext += 1;
  res.json(todo);
});

//GET /todos/:id - this route should display a single todo's title and isDone.
app.get('/todos/:id',(req, res, next) => {
  const id = Number(req.params.id);
  const todo = todos.find((todo)=> todo.id === id);
  res.json(todo);
});

//PUT
///todos/:id - this route should accept edits to existing todos
//(i.e. changing the isDone property)
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
        todo.isDone = Boolean(req.body.isDone);
    }
    res.json(todo);
});

// Delete
//this route should allow you to delete a specific todo from the array.
app.delete('/todos/:id', (req, res, next) => {
    const id = Number(req.params.id);
    const todo = todos.find((todo) => todo.id === id);
    if (!todo) {
        return next(createError(404));
    }
    todos = todos.filter((todo) => todo.id !== id);
    res.sendStatus(200);
});

// Doesn't work here, WTF?
/*app.get('/todos/not-done',(req, res) => {
  //const notDone = todos.filter((todo) => todo.isDone === false);
  res.json(todos);
});*/

// Error Not Found
app.use((req, res, next) => {
    next(createError(404));
});

// // Error handler
app.use((err, req, res, next) => {
    console.log(err.message);
    res.sendStatus(err.status);
});

app.listen(3000);
