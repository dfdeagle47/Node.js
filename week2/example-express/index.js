const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World2!'));

app.get('/hello-3', (req, res) => res.send('Hello World3!'));

const posts = [
  {
    userId: 1,
    id: 1,
    title:
      'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
    body:
      'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
  },
];

app.get('/posts', (req, res) => res.send(posts));

app.get('/posts/:postId', (req, res) => {
  console.log(req.params.postId);

  return res.send('Got some value:' + req.params.postId);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
