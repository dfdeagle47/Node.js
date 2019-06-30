const express = require('express');
const createError = require('http-errors');

const app = express();

app.use(express.json());
app.use(express.urlencoded());

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

let idNext = 4;

// GET /posts
// List
app.get('/posts', (req, res) => {
    console.log(req.query.onlyTitle);
    if (req.query.onlyTitle === 'true') {
        const modifiedPosts = posts.map((post) => ({
            title: post.title,
        }));
        res.json(modifiedPosts);
    } else {
        res.json(posts);
    }
});

// GET /posts/:id
// Read
app.get('/posts/:id', (req, res, next) => {
    const id = Number(req.params.id);
    const post = posts.find((post) => post.id === id);
    if (!post) {
        return next(createError(404));
    }
    res.json(post);
});

// POST /posts
// Create
app.post('/posts', (req, res, next) => {
    const title = req.body.title;
    if (!title) {
        return next(createError(400));
    }
    const post = {
        id: idNext,
        title,
    };
    idNext += 1;
    posts.push(post);
    res.json(post);
});

// PUT /posts
// Update
app.put('/posts/:id', (req, res, next) => {
    const id = Number(req.params.id);
    const title = req.body.title;
    const post = posts.find((post) => post.id === id);
    if (!post) {
        return next(createError(404));
    }
    post.title = title;
    res.json(post);
});

// DELETE /posts/:id
// Delete
app.delete('/posts/:id', (req, res, next) => {
    const id = Number(req.params.id);
    const post = posts.find((post) => post.id === id);
    if (!post) {
        return next(createError(404));
    }
    posts = posts.filter((post) => post.id !== id);
    res.sendStatus(200);
});

// Home route
app.get('/', (req, res, next) => {
    const err = createError(500);
    next(err);
});

// Catch all
// const createError = require('http-errors');
app.use((req, res, next) => {
    next(createError(404));
})

// Error handler
app.use((err, req, res, next) => {
    res.send(err.status);
});

app.listen(3000);