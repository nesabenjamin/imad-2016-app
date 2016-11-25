console.log('Loaded!');

function submit(){
                //alert(".value");
                var box = document.getElementById("comment_box");
                box.innerHTML = `
                <p>Name <input type="text" id="name"/></p>
                <p> comments <textarea id="txtarea" name="comments" rows="5" cols="30" placeholder="Type in your comment here..."></textarea></p>
                 <p class= "center">         
                    <input type="button" onclick="show_comments()" value="Post as a guest" class= "but2"/></p>`;
}

function show_comments(){
    var currentArticleTitle = window.location.pathname.split('/')[2];
    //alert(currentArticleTitle);
    var template_loader=`<div class="loader"></div>`;
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
                        var time = commentsData[i].time;
                        document.getElementById('div2').innerHTML +=  `
                            <p class="tright italics">${time}</p>
                            <p class="tright red italics">${commentsData[i].username}</p>
                            <p class="tright italics">${commentsData[i].comment}</p>
                            <hr/><br/>`;
                    }                
                } else {
                   document.getElementById('div2').innerHTML('Oops! Could not load comments!');
            }
        }
    };
    var template = `<!--<div><br/>
            <label for="username">User name</label>
            <input type="text" id="username" size="15" />
            </div>-->
            <div><br/><br/>
            <label for="message">Leave Comment</label>
            <textarea name="message" id="message" rows="5" cols="50"></textarea>
            </div>                
            <div><br/>
            <input type="submit" onclick="add_comments()" value="Post as loginuser" id="" class= "but"/><br/><br/>
            </div>`;
    document.getElementById("div3").innerHTML=template;
    
    request.open('GET', '/get-comments/' + currentArticleTitle, true);
    request.send(null);
}

function add_comments(){
   //alert("comment entry");
   //var currentArticleTitle = window.location.pathname.split('/')[2];
   alert(currentArticleTitle);
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
                }
            }
        };
        //var username = document.getElementById("username").value;
        var comment = document.getElementById("message").value;
        //console.log(username);
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

//var close = document.getElementById("x");
//close.onclick = function() {
    //alert('');
//    var modal = document.getElementById('myModal');
//    modal.style.display = "none";
//    var myModalWindow = document.getElementById('myModalWindow');
//    myModalWindow.style.display = "none";
//};

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
    //alert("-------");
        var request = new XMLHttpRequest();
        
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              // Take some action
              if (request.status === 200) {
                    //alert(request.responseText);
                  alert('logged in Sucessfully!');
                  closex();
              } else if (request.status === 403) {
                //alert(request.responseText);
                  alert('Invalid credentials. Try again.');
              } else if (request.status === 500) {
                alert(request.responseText);
                  alert('500 - Something went wrong on the server');
                  //alert('Login');
              } else {
                alert(request.responseText);
                  alert('error - -- Something went wrong on the server');
                 //alert('Login');
              }
          }  
          // Not done yet
        };
        // Make the request
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        //console.log(username);
        //console.log(password);
        request.open('POST', 'http://nesabenjamin.imad.hasura-app.io/login', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({username: username, password: password}));  
        
 }

function register(){
    alert("Registering");
    var request = new XMLHttpRequest();
        request.onreadystatechange = function(){
            if(request.readyState === XMLHttpRequest.DONE){
                if(request.status === 200){
                    //alert(request.responseText);
                    alert('user created successfully');
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
        //document.getElementById("signbut").value="Registering...";
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

   