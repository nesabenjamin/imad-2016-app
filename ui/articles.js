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
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
                if (request.status === 200) {
                   //alert(this.responseText);
                    var commentsData = JSON.parse(this.responseText);
                    //alert(commentsData[0].comments);
                    for (var i=0; i< commentsData.length; i++) {                    
                        document.getElementById('div2').innerHTML +=  `
                        <p class="right red">${commentsData[i].username}</p>
                        <p>${commentsData[i].comments}</p>
                        <hr/>`;
                    }                
                } else {
                    comments.innerHTML('Oops! Could not load comments!');
            }
        }
    };
    var template = `<div><br/>
                        <label for="username">User name</label>
                        <input type="text" id="username" size="15" />
                    </div>
                    <div>
                        <label for="txtarea">comment</label>
                        <textarea name="message" rows="5" cols="30"></textarea>
                    </div>                
                    <div><br/>
                    <input type="submit" onclick="add_comments()" value="Post as loginuser" id="" class= "but"/>
                    </div><br/><br/>`;
    document.getElementById("div3").innerHTML=template;
    request.open('GET', '/get-comments/' + currentArticleTitle, true);
    request.send(null);
}

function add_comments(){
   alert("Registering");
    var request = new XMLHttpRequest();
        request.onreadystatechange = function(){
            if(request.readyState === XMLHttpRequest.DONE){
                if(request.status === 200){
                    alert(request.responseText);
                    //alert('user created successfully');
                }else{
                    alert(request.responseText);
                    //alert('could not register the user');
                }
            }
        };
        var username = document.getElementById("usernamer").value;
        var password = document.getElementById("passwordr").value;
        console.log(username);
        console.log(password);

        request.open('POST','http://nesabenjamin.imad.hasura-app.io/create-user',true);
        request.setRequestHeader('Content-type','application/json');
        request.send(JSON.stringify({username:username,password:password}));
    
}
    
    
    
    
    //var template =`<a href="http://127.0.0.1:8080/login#"><button class="but left" id="logIN">Log <span class="bold" id="slogIN">IN</span></button></a>`;
                //document.getElementById("div2").innerHTML=template;