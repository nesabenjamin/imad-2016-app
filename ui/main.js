console.log('Loaded!');

function logIN(){
    //alert("innn");
	var template =`<center>
                    <div><br/>
                        <label for="username">User name</label>
                        <input type="text" id="username" size="15" required="required"/>
                    </div>
                    <div>
                        <label for="password">Password</label>
                        <input type="password" id="password" size="15" required="required"/>
                    </div>                
                    <div><br/>
                    <button onclick="loggingin()" id="logbut" class="but">Login</button>
    	    	    </div></center>`;  
	var div3 = document.getElementById("div3");
			div3.innerHTML = template;
}


function signUP(){
    //document.getElementById("log").style.visibility = "hidden";
 	var template =`	<center>
                    <div><br/>
                    <label for="name">Name</label>
                    <input type="text" id="name" size="17" required="required"/>
                    </div>
                    <div>
                    <label for="usernamer">User Name</label>
                    <input type="text" id="usernamer" size="17" required="required"/>
                    </div>
                    <div>
                        <label for="passwordr">Password</label>
                        <input type="password" maxlength="10" id="passwordr" size="17" required="required"/>
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
                        <label for="email">E-mail</label>
                        <input type="email" id="email" size="17" required="required"/>
                    </div>
                    <div><br/>
                        <button onclick="register()" id="signbut" class="but">Register</button>
        	    	</div></center> `;
	var div3 = document.getElementById("div3");
	div3.innerHTML = template; 
}

 function loggingin(){
        //alert("loggingin");
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              if (request.status === 200) {
                    //alert(request.responseText);
                    alert('Logged in!');
              } else if (request.status === 403) {
                    alert(request.responseText);
                    alert('Invalid credentials. Try again!');
              } else if (request.status === 500) {
                    alert(request.responseText);
                    alert('500 - Something went wrong on the server');
                    //alert('Login');
              } else {
                    alert(request.responseText);
                    alert('error - Something went wrong on the server');
                    //alert('Login');
              }
          }  
        };
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        console.log(username);
        console.log(password);
        
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
                    alert(request.responseText);
                    //alert('user created successfully');
                    logIN();
                }else{
                    alert(request.responseText);
                    //alert('could not register the user');
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
        request.send(JSON.stringify({username:username,password:password,name:name,sex:sex,email:email}));
}
