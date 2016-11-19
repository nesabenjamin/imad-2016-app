var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var config = {
	user:'nesabenjamin',
	database:'nesabenjamin',
	host:'db.imad.hasura-app.io',
	port:'5432',
	password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));


function createTemplate(data){
	var title = data.title;
	var date = data.date;
	var heading = data.heading;
	var content = data.content;
	var htmlTemplate = `
            <!doctype html>
            <html><head>
            	<title> ${title} </title>
            	<link rel="stylesheet" type="text/css" href="/ui/newarticle.css">
            </head>
            <body>
            	<div id="wrapper">
            		<header><img src="/ui/cooltext70.png" id="cooltxt"/></header>
            		<nav>
            			<ul>
            			<li><a href="#">BLOG</a></li>
            			<li><a href="#">ARTICLES</a>
            				<ul>
            					<li><a href="http://nesabenjamin.imad.hasura-app.io/articles/1"> APIs </a></li>
            					<li><a href="http://nesabenjamin.imad.hasura-app.io/articles/2"> NODE.JS vs PHP </a></li>
            					<li><a href="http://nesabenjamin.imad.hasura-app.io/articles/3"> History of PROGRAMMING LANGUAGES </a></li>
            				</ul></li>
            			<li><a href="#">CONTACT</a>
            				<ul>
            						<li><a href="#"> Office </a></li>
            						<li><a href="#"> Resident </a></li>
            				</ul></li>
            			<li><a href="http://nesabenjamin.imad.hasura-app.io/">HOME</a></li>
            			</ul>			
            		</nav>	
            		
            		<div id="container">
            			<p id="date"> ${date} </p>
            			<h1> ${heading} </h1><hr/>
            			${content}
            			<br/>
            			<button onclick="submit()" class="but">COMMENTS</button>
            			<div id="comment_box"></div>
            			<p id="p0"><hr/></p>
            			<p id="p1">Nov 6, 2016</p>
            			<p id="p2">nice job</p>
            			<p id="p3">user nesh</p>
            		</div>
            	</div>
            <script type="text/javascript" src="/ui/articles.js"></script>
            </body>
            </html>`;
	return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'loginindex.html'));
});

var counter=0;
app.get('/counter', function (req, res) {
	counter++;
  res.send(counter.toString());
});

function hash(input,salt){
  var hashed = crypto.pbkdf2Sync(input,salt,1000,512,'sha512');
  return hashed.toString('hex')   
}

app.get('/hash/:input',function(req, res){
  var hashedString = hash(req.params.input,'a-random-string');
  res.send(hashedString);
});

var pool = new Pool(config);
app.get('/test-db', function (req, res) {
  pool.query('SELECT * FROM test', function(err, result){
  		if(err){
  			res.status(500).send(err.toString());
  		} else {
  			res.send(JSON.stringify(result.rows));
  		}
  });
});

app.get('/articles/:articleId', function (req, res) {
	pool.query('SELECT * FROM articles WHERE id = $1', [req.params.articleId], function(err, result){
		if(err){
  			res.status(500).send(err.toString());
  		} else {
  			if(result.rows.length === 0){
  				res.status(404).send('Article not found');
  			} else {
  				var articleData = result.rows[0];
  				res.send(createTemplate(articleData));
  			}  			
  		}
	});
});  
  
app.get('/:articleName', function (req, res) {
  var articleName = req.params.articleName;
  res.send(createTemplate(articles[articleName]));
});
var names = [];
app.get('/submit_name/:name', function (req, res) {
  var name = req.params.name;
  names.push(name);
  res.send(JSON.stringify(names));
});

app.get('/ui/:fileName', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', req.params.fileName));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
