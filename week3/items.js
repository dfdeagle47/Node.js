const express = require('express');
const createError = require('http-errors');

const app = express();

app.use(express.json());
app.use(express.urlencoded());

// Data
let items = [{
    id: 1,
    name: 'Milk',
    price: 20,
    quantity: 4,
}, {
    id: 2,
    name: 'Egg',
    price: 1,
    quantity: 6,
}];

let idNext = 3;

// List
app.get('/items', (req, res) => {
    res.json(items);
});

// Read
app.get('/items/:id', (req, res, next) => {
    const id = Number(req.params.id);
    const item = items.find((item) => item.id === id);
    if (!item) {
        return next(createError(404));
    }
    res.json(item);
});

// Create
app.post('/items', (req, res, next) => {
    const name = req.body.name;
    const price = Number(req.body.price);
    const quantity = Number(req.body.quantity || 1);
    if (!name || !price) {
        return next(createError(400));
    }
    const item = {
        id: idNext,
        name,
        price,
        quantity,
    };
    items.push(item);
    idNext += 1;
    res.json(item);
});

// Update
app.put('/items/:id', (req, res, next) => {
    const id = Number(req.params.id);
    const item = items.find((item) => item.id === id);
    if (!item) {
        return next(createError(404));
    }
    if (req.body.name) {
        item.name = req.body.name;
    }
    if (req.body.price) {
        item.price = Number(req.body.price);
    }
    if (req.body.quantity) {
        item.quantity = Number(req.body.quantity);
    }
    res.json(item);
});

// Update add
app.put('/items/:id/add', (req, res, next) => {
    const id = Number(req.params.id);
    const item = items.find((item) => item.id === id);
    if (!item) {
        return next(createError(404));
    }
    item.quantity += 1;
    res.json(item);
});

// Update sub
app.put('/items/:id/sub', (req, res, next) => {
    const id = Number(req.params.id);
    const item = items.find((item) => item.id === id);
    if (!item) {
        return next(createError(404));
    }
    if (item.quantity === 1) {
        items = items.filter((item) => item.id !== id);
        res.send(`We are out of ${item.name}`);
    } else {
        item.quantity -= 1;
        res.json(item);
    }
});

// Delete
app.delete('/items/:id', (req, res, next) => {
    const id = Number(req.params.id);
    const item = items.find((item) => item.id === id);
    if (!item) {
        return next(createError(404));
    }
    items = items.filter((item) => item.id !== id);
    res.sendStatus(200);
});

// Checkout
app.get('/checkout', (req, res) => {
    const sum = items.reduce((previousValue, item) => {
        return previousValue + item.price * item.quantity;
    }, 0);
    res.send(sum.toString());
});

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