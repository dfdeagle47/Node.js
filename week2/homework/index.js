const express = require('express');
const app = express();
const port = 4000;

const posts = [
  { id: '1', title: 'Hello', text: 'English' },
  { id: '2', title: 'Hallo', text: 'Nederlands' },
  { id: '3', title: 'Bonjour', text: 'Francais' },
];
app.get('/', (req, res) => {
  console.log('Responding with `Hello World!`');

  res.send('Hello World!');
});

app.get('/hello-2', (req, res) => {
  console.log('Responding with `Hello World 2!`');

  res.send('Hello World 2!');
});

app.get('/hello/:name', (req, res) => {

  const name = req.params.name;

  console.log(`Responding with "Hello ${name}!"`);

  res.send(`Hello ${name}!`);
});

app.get('/posts', (req, res) => {
  console.log('sending posts...');
  res.send(posts);
});

app.get('/posts/:postId', (req, res) => {
  console.log(req.params.postId);

  const found = posts.find(posts => {
    return posts.id === req.params.postId;
  });

  const foundHTML = `<h1>${found.title}</h1><p>${found.text}</p>`
  return res.send(foundHTML);


});
app.get('/posts/:postId/delete', (req, res) => {
  console.log('deleting posts...');
  res.send(req.params.postId);
});

app.listen(port, () =>
  console.log(
    `Example app listening on port ${port}!\nYou can access the base route by going to http://localhost:${port}/ in your browser.`
  )
);
