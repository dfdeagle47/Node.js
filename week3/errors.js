const express = require('express');
const createError = require('http-errors');

const app = express();

app.use(express.json());
app.use(express.urlencoded());

// GET error
app.get('/error/:number', (req, res, next) => {
    const number = Number(req.params.number);
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

app.listen(3000);