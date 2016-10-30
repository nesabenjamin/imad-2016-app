var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/articles.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'articles.html'));
});

app.get('/ui/articles.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'articles.css'));
});
app.get('/articles_css.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'articles_css.html'));
});


app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/nesh.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'nesh.jpg'));
});

app.get('/ui/cooltext70.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'cooltext70.png'));
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
