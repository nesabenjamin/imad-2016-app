var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var config = {
	user:'nesabenjamin',
	database:'nesabenjamin',
	host:'db.imad.hasura-app.io',
	port:'5432',
	password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));

var articles = {	
	 'article_One' : {
		title:'Article ONE| 1 Nesa benjamin',
		heading: 'Article One',
		date : '29.10.2016',
		content:`<p>Article - ONEArticle - ONEArticle - ONEArticle - ONEArticle - ONEArticle - ONE
	            Article - ONEArticle - ONEArticle - ONE</p>
	            <p>Article - ONEArticle - ONEArticle - ONEArticle - ONEArticle - ONEArticle - ONE
	            Article - ONEArticle - ONEArticle - ONE</p>
	            <p>Article - ONEArticle - ONEArticle - ONEArticle - ONEArticle - ONEArticle - ONE
	            Article - ONEArticle - ONEArticle - ONE</p>`
	},
	'article_Two' : {
		title:'Article TWO| 2 Nesa benjamin',
		heading: 'Article Two',
		date : '30.10.2016',
		content:`<p>Article - 22222222222222222222222222222222222</p>`
	},
	'article_Three' : {
		title:'Article THREE| 3 Nesa benjamin',
		heading: 'Article Three',
		date : '31.10.2016',
		content:`<p>Article - 333333333333333333333333333333333333</p>`
	}
};

function createTemplate(data){
	var title = data.title;
	var date = data.date;
	var heading = data.heading;
	var content = data.content;
	var htmlTemplate = `<!doctype html>
						<html>
						    <head><title>${title}</title>
						        <meta name="viewport" content="width=device-width, initial-scale=1"/>
						        <link href="/ui/articles.css" rel="stylesheet" />
						    </head>
						    <body >
						    	<div id="cooltxt">
									<img id="madi" src="/ui/cooltext70.png" />
						    	</div><br/>
						    	<header><nav><ul>
						    		<li> <a href="#"> HOME</a></li>
						    		<li> <a href="#"> BLOG</a></li>
						    		<li> <a href="#"> ARTICLES</a></li>
						    		<li> <a href="#"> CONTACT</a></li>
						    	</ul></nav></header>						    	
						        <br/><br/>
						        <div class = "container">
						            <h1>${heading}</h1>
						            <p>${date}</p>
						            ${content}
						            <br/><br/>
						            <input type="button" onclick="submit()" value="COMMENTS" class= "but">
						            <br/><br/>
						            <div id="comment_box">	          
						            </div>
						            <div id="comment">
						            <p id="p1" class="right"></p>
						            <p id="p2"></p>
						            </div>
						        </div>
						        <script type="text/javascript" src="/ui/main.js"></script>
						    </body>
						</html>`;
	return htmlTemplate;
	
}


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var counter=0;
app.get('/counter', function (req, res) {
	counter++;
  res.send(counter.toString());
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
var names = [];
app.get('/submit_name/:name', function (req, res) {
  var name = req.params.name;
  names.push(name);
  res.send(JSON.stringify(names));
});


app.get('/articles/:articleName', function (req, res) {
	pool.query("SELECT * FROM article WHERE title = '"+req.params.articleName +"'", function(err, result){
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

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/ui/articles.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'articles.css'));
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
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
