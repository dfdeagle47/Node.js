const express = require('express');
const createError = require('http-errors');

const app = express();

app.use(express.json());
app.use(express.urlencoded());

const todos =[
    {id: 1, title: 'Do the Homework', isDone: true},
    {id: 2, title: 'Study Dutch', isDone: true},
    {id: 3, title: 'Buy cookies', isDone: true},
    {id: 4, title: 'Make tea', isDone: false},
    {id: 5, title: 'Drink Tea', isDone: true}
];

//. `GET /todos` - this should respond with a list of todo items.
app.get('/todos', (req, res) => {
    res.json(todos);
});

//`POST /todos` - this route should accept a JSON body and add it 
//to the todo list.
let nextId = 6;

app.post("/todos", (req, res) => {
  console.log(req.body);
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

//`GET /todos/:id` - this route should display a single todo's title and isDone
app.get('todos/:id', (req, res, next) =>{
    const id = Number(req, params.id);
    const todo = todos.find((todo) => todo.id === id);
    if(!todo) {
        return next(createError(404));
    }
    res.json(todo);
})

//`PUT /todos/:id` - this route should 
//accept edits to existing todos (i.e. changing the `isDone` property).
app.put('todos/:id', (req, res, next) => {
    const id = Number(req.params.id);
    const todo = todos.find((todo) => todo.id === id);
    if (!todo) {
        return next(createError(404));
    }
    if (req.body.title) {
        todo.title = Boolean(req.body.title);
    }
    if (req.body.isDone) {
        todo.isDone = Boolean(req.body.isDone);
    }
    res.json(todo);
});

//`DELETE /todos/:id` - this route should allow you to delete a specific 
//todo from the array.

app.delete('/todos/:id', (req,res, next) => {
    const id = Number(req.params.id);
    const todo = todos.find((todo) => todo.id === id);
    if (!todo) {
        return next(createError(404));
    }
    todos = todos.filter((todo) => todo.id !== id);
    res.send(`To-Do Item is deleted`);
    res.sendStatus(200);
});

//`GET /todos/not-done` - this should return only the items still TODO 
//(`isDone` = false)
app.get('/todos/not-done', (req, res) => {
  const notDone = todos.filter((todo) => todo.isDone === false);
  res.json(notDone);
});

//Error not Found

app.use((req, res, next) => {
    next(createError(404));
}):


// Error handler middleware
app.use((err, req, res, next) => {
    res.send(err.status);
});

app.listen(3000);