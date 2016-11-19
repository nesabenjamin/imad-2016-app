var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');
var session = require('express-session');
var config = {
	user:'nesabenjamin',
	database:'nesabenjamin',
	host:'db.imad.hasura-app.io',
	port:'5432',
	password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(session({
    secret: 'someRandomSecretValue',
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30}
}));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'loginindex.html'));
});

var counter=0;
app.get('/counter', function (req, res) {
	counter++;
  res.send(counter.toString());
});

function createTemplate(data){
	var title = data.title;
	var date = data.date;
	var heading = data.heading;
	var content = data.content;
	var htmlTemplate = `
            <!doctype html>
        <html>
        <head>
          <title> ${title}</title>
          <link rel="stylesheet" type="text/css" href="/ui/newarticle.css">
        </head>
        <body>
          <div id="wrapper">
            <img src="/ui/cooltext70.png" id="cooltxt"/><br/><br/><br/>
            <nav>     
              <ul>
              <li><a href="#">BLOG</a></li>
              <li><a href="#">ARTICLES</a>
                <ul>
                  <li><a href="#"> APIs </a></li>
                  <li><a href="#"> NODE.JS vs PHP </a></li>
                  <li><a href="http://nesabenjamin.imad.hasura-app.io/newarticle.html"> History of PROGRAMMING LANGUAGES </a></li>
                </ul></li>
              <li><a href="#">CONTACT</a>
                <ul>
                    <li><a href="#"> Office </a></li>
                    <li><a href="#"> Resident </a></li>
                </ul></li>
              <li><a href="#">HOME</a></li>
              </ul>
            </nav>    
            <div id="container"><br/>
                <p id="date" class=" tright"> ${date}</p>
                <h1>${heading}</h1><hr/>
                ${content}              
            </div>
            <input type="button" onclick="show_comments()" value="COMMENTS" class= "commentbut"><br/><br/>
            <div id="div2"> </div>
            <div id="div3"> </div>
          </div><br/><br/>
          <script type="text/javascript" src="/ui/articles.js"></script>
        </body>
        </html>`;
	return htmlTemplate;
}




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
function hash (input, salt) {
    var hashed = crypto.pbkdf2Sync(input, salt, 1000, 512, 'sha512');
    return ["pbkdf2", "1000", salt, hashed.toString('hex')].join('$');
}

app.get('/hash/:input', function(req, res) {
   var hashedString = hash(req.params.input, 'this-is-some-random-string');
   res.send(hashedString);
});

app.post('/create-user', function (req, res) {
   var username = req.body.username;
   var password = req.body.password;
   var salt = crypto.randomBytes(128).toString('hex');
   var dbString = hash(password, salt);
   pool.query('INSERT INTO "hash" (username, password) VALUES ($1, $2)', [username, dbString], function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          res.send('User successfully created: ' + username);
      }
   });
});
app.post('/login', function (req, res) {
   var username = req.body.username;
   var password = req.body.password;
   pool.query('SELECT * FROM "hash" WHERE username = $1', [username], function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          if (result.rows.length === 0) {
              res.status(403).send('username/password is invalid');
          } else {
              var dbString = result.rows[0].password;
              var salt = dbString.split('$')[2];
              var hashedPassword = hash(password, salt); 
              if (hashedPassword === dbString) {
                req.session.auth = {userId: result.rows[0].id};
                res.send('credentials correct! '+req.session.auth.userId);
              } else {
                res.status(403).send('username/password is invalid');
              }
          }
      }
   });
});

app.get('/check-login', function (req, res) {
   if (req.session && req.session.auth && req.session.auth.userId) {
       // Load the user object
       pool.query('SELECT * FROM "hash" WHERE id = $1', [req.session.auth.userId], function (err, result) {
           if (err) {
              res.status(500).send(err.toString());
           } else {
              res.send(result.rows[0].id.toString());    
           }
       });
   } else {
       res.status(400).send('You are not logged in');
   }
});

app.get('/logout', function (req, res) {
   delete req.session.auth;
   res.send('<html><body>Logged out!<br/><br/><a href="/">Back to home</a></body></html>');
});


app.get('/ui/:fileName', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', req.params.fileName));
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
