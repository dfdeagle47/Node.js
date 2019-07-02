const express = require('express');

const app = express();

// Posts
let posts = [{
    id: 1,
    title: 'Harry potter',
}, {
    id: 2,
    title: 'Star wars',
}, {
    id: 3,
    title: 'Indiana Jones',
}];

// GET /posts
// List
app.get('/posts', (req, res) => {
    res.json(posts);
});

// GET /posts/:id
// Read
app.get('/posts/:id', (req, res, next) => {
    const id = Number(req.params.id);
    const post = posts.find((post) => post.id === id);
    res.json(post);
});

// GET /posts/:id/delete
// Delete
app.delete('/posts/:id/delete', (req, res, next) => {
    const id = Number(req.params.id);
    posts = posts.filter((post) => post.id !== id);
    res.sendStatus(200);
});

app.listen(3000);