const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded());

// Middleware 1
app.use((req, res, next) => {
    console.log('Middleware 1');
    next();
});

// Middleware 2
app.use((req, res, next) => {
    console.log('Middleware 2');
    setTimeout(next, 2000);
});

// Home route
app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.listen(3000);