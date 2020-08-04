const express = require('express');
const path = require('path');
const posts = require('./posts');
const app = express();

const port = process.env.port || 5050;

//--------------JSON GET ALL MEMBERS---------------------

app.get('/posts', (req, res) => {
  res.json(posts), console.log(typeof posts);
});
app.get('/posts/:postId', (req, res) => {
  // res.send(req.params.id);
  // res.json(memberfile.members.filter(member => member.id === parseInt(req.params.id)));
  //if no ID exists alert message-----------GET SINGLE MEMBER
  const found = posts.some(posts => posts.id === parseInt(req.params.postId));
  if (found) {
    res.json(posts.filter(posts => posts.id === parseInt(req.params.postId)));
  } else {
    res.status(400).json({ mssg: 'not found! Post Number: ' + req.params.postId });
  }
});

app.delete('/posts/:postId/delete', (req, res) => {
  // const found = posts.filter(posts => posts.id === parseInt(req.params.postId));
  // res.json({ 'the chosen object': found });
  // delete found;
  // res.json({ mssg: `the ${found} post is deleted` });
});

app.listen(port, () => {
  console.log('Server started ' + ' ' + port);
});
