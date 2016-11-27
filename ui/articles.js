window.onload = checklogin();

console.log('Loaded!');



function show_comments(){
    var currentArticleTitle = window.location.pathname.split('/')[2];
    //alert(currentArticleTitle);
    var template_loader=`<center><div class="loader"></div></center>`;
    document.getElementById('div2').innerHTML=template_loader;
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
                if (request.status === 200) {
                    //alert(this.responseText);
                    var commentsData = JSON.parse(this.responseText);
                    //alert(commentsData[0].comments);
                    document.getElementById('div2').innerHTML=``;
                    for (var i=0; i< commentsData.length; i++) {
                        //var date = commentsData[i].date;
                        var date = new Date(commentsData[i].date);
                        //${date.toLocaleDateString()};
                        document.getElementById('div2').innerHTML +=  `
                            <p class="tright italics">${date.toLocaleDateString()}</p>
                            <p class="tright red italics">${commentsData[i].username}</p>
                            <p class="tright italics">${commentsData[i].comment}</p>
                            <hr/><br/>`;
                    }                
                } else {
                   document.getElementById('div2').innerHTML('Oops! Could not load comments!');
            }
        }
    };
    var template = `<div><br/><br/>
            <label for="message">Leave Comment</label>
            <textarea name="message" id="message" rows="5" cols="50"></textarea>
            </div>                
            <div><br/>
            <input type="submit" onclick="add_comments()" value="Post a Comment" id="" class= "but"/><br/><br/>
            </div>`;
    document.getElementById("div3").innerHTML=template;
    
    request.open('GET', '/get-comments/' + currentArticleTitle, true);
    request.send(null);
}

function add_comments(){
        //alert("comment entry");
        var currentArticleTitle = window.location.pathname.split('/')[2];
        //alert(currentArticleTitle);
        var request = new XMLHttpRequest();
        request.onreadystatechange = function(){
            if(request.readyState === XMLHttpRequest.DONE){
                if(request.status === 200){
                    alert('comment inserted successfully');
                    show_comments();
                    //alert(request.responseText);
                }else{
                    alert(request.responseText);
                    //alert('only login user can comment');
                    openx();
                }
            }
        };
        var comment = document.getElementById("message").value;
        //console.log(comment);

        request.open('POST','/submit-comment/'+currentArticleTitle,true);
        request.setRequestHeader('Content-type','application/json');
        request.send(JSON.stringify({comment:comment}));
}


function logIN(){
    document.getElementById("div01").style.display = "block";
    document.getElementById("div02").style.display = "none";
    
}
function signUP(){
    document.getElementById("div01").style.display = "none";
    document.getElementById("div02").style.display = "block";
}

function closex() {
    //alert('');
    var myModal = document.getElementById('myModal');
    myModal.style.display = "none";
    var myModalWindow = document.getElementById('myModalWindow');
    myModalWindow.style.display = "none";
}
function openx() {
    //alert('');
    var myModal = document.getElementById('myModal');
    myModal.style.display = "block";
    var myModalWindow = document.getElementById('myModalWindow');
    myModalWindow.style.display = "block";
}


 function loggingin(){
    //alert("loggingin");
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              if (request.status === 200) {
                    //alert(request.responseText);
                    alert('logged in Sucessfully!');
                    closex();
              } else if (request.status === 403) {
                    //alert(request.responseText);
                    alert('Invalid credentials. Try again!');
              } else if (request.status === 500) {
                    alert(request.responseText);
                    alert('500 - Something went wrong on the server');
                    //alert('Login');
              } else {
                    alert(request.responseText);
                    alert('error -Something went wrong on the server');
                    //alert('Login');
              }
          }  
        };
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        //console.log(username);
        //console.log(password);
        request.open('POST', 'http://nesabenjamin.imad.hasura-app.io/login', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({username: username, password: password})); 
 }
 
function register(){
        //alert("registering!");
        var request = new XMLHttpRequest();
        request.onreadystatechange = function(){
            if(request.readyState === XMLHttpRequest.DONE){
                if(request.status === 200){
                    //alert(request.responseText);
                    alert('user created successfully');
                    logIN();
                }else{
                    //alert(request.responseText);
                    alert('could not register the user');
                }
            }
        };
        var username = document.getElementById("usernamer").value;
        var password = document.getElementById("passwordr").value;
        var name = document.getElementById("name").value;
        //var dob = document.getElementById("dob").value;
        var sex = document.getElementById("gender").value;
        var email = document.getElementById("email").value;
        
        if (username.trim()===''||password.trim()===''||email.trim()==='') {
            alert("Invalid credentials entered");
        }
        console.log(username);
        console.log(password);
        console.log(name);
        //console.log(dob);
        console.log(sex);
        console.log(email);

        request.open('POST','http://nesabenjamin.imad.hasura-app.io/create-user',true);
        request.setRequestHeader('Content-type','application/json');
        //request.send(JSON.stringify({username:username,password:password}));
        request.send(JSON.stringify({username:username,password:password,name:name,sex:sex,email:email}));
}


function register1(){
    alert("Registering");
    var request = new XMLHttpRequest();
        request.onreadystatechange = function(){
            if(request.readyState === XMLHttpRequest.DONE){
                if(request.status === 200){
                    //alert(request.responseText);
                    alert('user created successfully');
                    logIN();
                }else{
                    //alert(request.responseText);
                    alert('could not register the user');
                }
            }
        };
        var username = document.getElementById("usernamer").value;
        var password = document.getElementById("passwordr").value;
        //console.log(username);
        //console.log(password);

        request.open('POST','http://nesabenjamin.imad.hasura-app.io/create-user',true);
        request.setRequestHeader('Content-type','application/json');
        request.send(JSON.stringify({username:username,password:password}));
}

var loginlink = document.getElementById("loginlink");
loginlink.onclick = function(){
    var currentArticleTitle = window.location.pathname;
    window.location = currentArticleTitle;
    return false;
}; 


var logoutlink = document.getElementById("logoutlink");
logoutlink.onclick = function(){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
               alert(this.responseText);
                        
            } else {
                //alert();
            }
        }
    };    
    request.open('GET', '/logout', true);
    request.send(null);   
    return false;
};


function checklogin(){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                console.log(this.responseText);
                if (this.responseText === "true") {
                   closex();
                }else if(this.responseText === "false"){
                    openx();
                }
            } else {
                //alert();
                //return false;
            }
        }
    };    
    request.open('GET', '/check-login', true);
    request.send(null);   
}




















   