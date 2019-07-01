const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded());

// GET Query
app.get('/', (req, res) => {
    const a = Number(req.query.a);
    const b = Number(req.query.b);
    const sum = a + b;
    res.send(sum.toString());
});

// POST Body
app.post('/', (req, res) => {
    const a = Number(req.body.a);
    const b = Number(req.body.b);
    const sum = a + b;
    res.send(sum.toString());
});

// DELETE Params
app.delete('/:a/:b', (req, res) => {
    const a = Number(req.params.a);
    const b = Number(req.params.b);
    const sum = a + b;
    res.send(sum.toString());
});

app.listen(3000);