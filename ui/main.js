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
    
    var list='';
    function show_comments(){
                var name = document.getElementById("name").value;
                var comment = document.getElementById("txtarea").value;
                	list += '<p class= "right">'+name+'</p>';
                	list += '<p>'+comment+'</p> <hr/>';

                var inner= document.getElementById("comment");
                inner.innerHTML=list;
                    
    }


    function show_comments1(){
    	alert(document.getElementById("name").value);
    	var request = new XMLHttpRequest();
    	request.onreadystatechange = function(){
    		if(request.readyState === XMLHttpRequest.DONE){
    			if(request.status === 200){
    				var names  = request.responseText;
    				names = JSON.parse(names);
    				var list = '';
    				for (var i=0; i<names.length; i++){

    					list+= '<p>'+names[i]+'</p>';
    				}
    				var p = document.getElementById("p2");
            			p.innerHTML = list;
    			}
    		}
    	};

        var nameInput = document.getElementById("name");
        var name = nameInput.value;
        request.open('GET','http://127.0.0.1:8080/submit_name?name='+name,true);
        request.send(null);
    }
    
    

function logIN (){
        //alert("innn");
	var template =`<center>
                <div><br/>
                    <label for="username">User name</label>
                    <input type="text" id="username" size="15" required="required"/>
                </div>
                <div>
                    <label for="pword">Password</label>
                    <input type="password" id="pword" size="15" required="required"/>
                </div>                
                <div><br/>
                <button onclick="logingin()" id="logbut" class="but">Login</button>
	    	    </div> </center>`;  
	    	
	var div3 = document.getElementById("div3");
			div3.innerHTML = template;
  }

 function login(){
    alert("Logged in");
 }


function signUP(){
    document.getElementById("log").style.visibility = "hidden";
 	var template =`	
                    <div><br/>
                    <label for="name">Name</label>
                    <input type="text" id="name" size="17" required="required"/>
                    </div>
                    <div>
                    <label for="username">User Name</label>
                    <input type="text" id="username" size="17" required="required"/>
                    </div>
                    <div>
                        <label for="pword">Password</label>
                        <input type="password" maxlength="6" id="pword" size="17" required="required"/>
                    </div> 
                    <div>
                            <label for="dob">DOB</label>
                            <input type="date" id="dob" required="required"/>
                    </div>
                    <div>
                            <label for="gender">Gender</label>
                            <input type="radio" name="gender" id="gender" value="male" checked> M
                            <input type="radio" name="gender" id="gender" value="female"> F
                    </div>
                     <div>
                            <label for="tel">Phone no</label>
                            <input type="number" name="cell" id="cell" min="7000000000" max="9999999999" maxlength="10" 
                            required="required"/>
                    </div>
                    <div>
                            <label for="email">E-mail</label>
                            <input type="email" id="email" size="17" required="required"/>
                    </div>
                    <div><br/>
                        <button onclick="register()" id="signbut" class="but">Register</button>
        	    	</div> `;
	var div3 = document.getElementById("div3");
	div3.innerHTML = template; 
}
function signup (){
    //alert("Registered");
    }

 function loggingin(){
    //alert("-------");
        var request = new XMLHttpRequest();
        
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              // Take some action
              if (request.status === 200) {
                    alert(request.responseText);
                  alert('Sucess!');
              } else if (request.status === 403) {
                alert(request.responseText);
                  alert('Invalid credentials. Try again?');
              } else if (request.status === 500) {
                alert(request.responseText);
                  alert('500 - Something went wrong on the server');
                  //alert('Login');
              } else {
                alert(request.responseText);
                  alert('error - -- -- -- Something went wrong on the server');
                 //alert('Login');
              }
          }  
          // Not done yet
        };
        // Make the request
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        console.log(username);
        console.log(password);
        request.open('POST', 'http://nesabenjamin.imad.hasura-app.io/login', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({username: username, password: password}));  
        
 }

function register(){
    //alert("Registered");
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
        //document.getElementById("signbut").value="Registering...";
}
