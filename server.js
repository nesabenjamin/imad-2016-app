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
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
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
	//var currentArticleTitle = window.location.pathname;
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
                  <li><a href="http://nesabenjamin.imad.hasura-app.io/articles/1"> APIs </a></li>
                  <li><a href="http://nesabenjamin.imad.hasura-app.io/articles/2"> NODE.JS vs PHP </a></li>
                  <li><a href="http://nesabenjamin.imad.hasura-app.io/articles/3"> History of PROGRAMMING LANGUAGES </a></li>
                </ul></li>
              <li><a href="#">CONTACT</a>
                <ul>
                    <li><a href="#"> Office </a></li>
                    <li><a href="#"> Resident </a></li>
                </ul></li>
              <li><a href="http://nesabenjamin.imad.hasura-app.io">HOME</a></li>
              </ul>
            </nav>    
            <div id="container">
            <p class=" tright"> <a href="/" id="loginlink">Login </a>&nbsp; 
                                <a href="/logout" id="logoutlink">logout </a> </p>
                <p id="author" class=" tright italics"> Posted by Nesa benjamin</p>
                <p id="date" class=" tright italics"> ${date.toDateString()}</p>
                <h1>${heading}</h1><hr/>
            <div id="article_link">
            <h2 class="oblique">Articles</h2>
              <p class="oblique"><a href="http://nesabenjamin.imad.hasura-app.io/articles/1"> APIs </a></p>
              <p class="oblique"><a href="http://nesabenjamin.imad.hasura-app.io/articles/2"> NodeJS </a></p>
              <p class="oblique"><a href="http://nesabenjamin.imad.hasura-app.io/articles/3"> History in Coding Languages  </a></p>
              <p class="oblique"> More..</p>
            </div>
            <div id="content"><br/><br/><br/>${content}</div>               
            </div>
            <input type="button" onclick="show_comments()" value="COMMENTS" class= "commentbut"><br/><br/>
            <div id="div2"> </div>
            <div id="div3"> </div>
            <div id="div4">

                <div id="myModalWindow">
                <div id="myModal">
                <p id="xp"><button id="x" onclick="closex()" >x</button></p><hr/>            

                    <button onclick="logIN()" class="butm fleft" id="logIN">Log <span class="bold" id="slogIN">IN</span>
                    </button>            
                    <button onclick="signUP()" class="butm fright" id="signUP">Sign <span class="bold" id="ssignUP">UP</span></button><br/>
                <div id="div01" class="divmodal">
                    <div><br/><br/>
                        <label for="username">User name</label>
                        <input type="text" id="username" size="15" required="required"/>
                    </div>
                    <div>
                        <label for="password">Password</label>
                        <input type="password" id="password" size="15" required="required"/>
                    </div>                
                    <div><br/>
                    <button onclick="loggingin()" id="logbut" class="but fright">Login</button>
                    </div>
                </div>
                <div id="div02" class="divmodal">
                        <div><br/><br/>
                        <label for="name">Name</label>
                        <input type="text" id="name" size="15" required="required"/>
                        </div>
                        <div>
                        <label for="usernamer">User Name</label>
                        <input type="text" id="usernamer" size="15" required="required"/>
                        </div>
                        <div>
                            <label for="passwordr">Password</label>
                            <input type="password" maxlength="10" id="passwordr" size="15" required="required"/>
                        </div> 
                         <div>
                                <label for="gender">Gender</label>
                                <input type="radio" name="gender" id="gender" value="male" checked> M
                                <input type="radio" name="gender" id="gender" value="female"> F
                        </div>
                        <div>
                                <label for="email">E-mail</label>
                                <input type="email" id="email" size="15" required="required"/>
                        </div>
                        <div><br/>
                            <button onclick="register()" id="signbut" class="but fright">Register</button>
                        </div> 
                </div>
              </div>
              </div>
 </div>
          </div><br/><br/><br/><br/>
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
/*  
app.get('/:articleName', function (req, res) {
  var articleName = req.params.articleName;
  res.send(createTemplate(articles[articleName]));
});*/

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
    var name = req.body.name;
    var dob = req.body.dob;
    var sex = req.body.gender;
    var email = req.body.email;
   
   pool.query('INSERT INTO "user1" (name, username, dob, sex, email) VALUES ($1, $2, $3, $4, $5)', [name, username, dob, sex, email], function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          res.send('User successfully created: ' + username);
      }
   });
   
   var salt = crypto.randomBytes(128).toString('hex');
   var dbString = hash(password, salt);
   pool.query('INSERT INTO "hash1" (username, password) VALUES ($1, $2)', [username, dbString], function (err, result) {
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
                req.session.auth = {userId: result.rows[0].id,userName:result.rows[0].username};
                res.send('credentials correct! '+req.session.auth.userId);
              } else {
                res.status(403).send('username/password is invalid');
              }
          }
      }
   });
});

app.get('/get-comments/:articleId', function (req, res) {
  pool.query('SELECT * FROM comment WHERE article_id= $1',[req.params.articleId], function(err, result){
      if(err){
        res.status(500).send(err.toString());
      } else {
        res.send(JSON.stringify(result.rows));
      }
  });
});

app.post('/submit-comment/:articleId', function (req, res) {
   // Check if the user is logged in
    if (req.session && req.session.auth && req.session.auth.userId) {
        // First check if the article exists and get the article-id
        pool.query('SELECT id from articles where id = $1', [req.params.articleId], function (err, result) {
            if (err) {
                res.status(500).send(err.toString());
            } else {
                if (result.rows.length === 0) {
                    res.status(400).send('Article not found');
                } else {
                    var articleId = result.rows[0].id;
                    // Now insert the right comment for this article
                    pool.query(
                        "INSERT INTO comment ( username, comment, article_id,date) VALUES ($1, $2, $3, $4)",
                        [ req.session.auth.userName, req.body.comment, articleId,'now()'],
                        function (err, result) {
                            if (err) {
                                res.status(500).send(err.toString());
                            } else {
                                res.status(200).send('Comment inserted!');
                            }
                        });
                }
            }
       });     
    } else {
        res.status(403).send('Only logged in users can comment');
    }
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
   res.send('Logged out!');
});


app.get('/ui/:fileName', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', req.params.fileName));
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
