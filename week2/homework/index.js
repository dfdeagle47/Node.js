
const express = require('express');

const app = express();
const port = 3000;

const posts = [
  { id: '1', title: 'Title of the post', text: 'Content of the post.' },
  { id: '2', title: 'Title of the post', text: 'Content of the post.' },
  { id: '3', title: 'Title of the post', text: 'Content of the post.' }
];

app.get('/', (req, res) => {
  console.log('Responding with `Hello World!`');

  res.send('Hello World! how are you?');
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

// This is the GET /posts route
app.get('/posts', (req, res) => {
  console.log('sending posts...');
  res.send('sending posts...');
});

// You can add the other two routes here
// 1. "GET /posts/:postId"

app.get('/posts/:postId', (req, res) => {
  console.log(req.params.postId);
  var paramId = req.params.postId;
  if (paramId > 0 && paramId <= posts.length) { //check if entered postid value exist in posts array.
    var wantedPost = posts.find(post => {
      return post.id === paramId;
      });
    const foundHTML = `<h1>${wantedPost.title}</h1><p>${wantedPost.text}</p>`
    return res.send(foundHTML);
  } else {
    res.status(400).json({ mssg: 'Post Number: ' + req.params.postId + ' does not exist!' });
  } 
});
// 2. "GET /posts/:postId/delete"
app.get('/posts/:postId/delete', (req,res) => {
  console.log('post number ' + req.params.postId + ' will be deleted');
  var toDelete = req.params.postId - 1; //to be used in splice
  posts.splice(toDelete, 1);
  return res.send('post number ' + req.params.postId + ' is deleted');
  console.log('post number ' + req.params.postId + ' is deleted');
})


// This starts the web server
app.listen(port, () =>
  console.log(
    `Example app listening on port ${port}!\nYou can access the base route by going to http://localhost:${port}/ in your browser.`
  )
);
