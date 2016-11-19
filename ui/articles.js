            function submit(){
                //alert(".value");
                var box = document.getElementById("comment_box");
                box.innerHTML = `
                <p>Name <input type="text" id="name"/></p>
                <p> comments <textarea id="txtarea" name="comments" rows="5" cols="30" placeholder="Type in your comment here..."></textarea></p>
                 <p class= "center">         
                    <input type="button" onclick="show_comments()" value="Post as a guest" class= "but2"/></p>`;}

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
                        document.getElementById('div2').innerHTML +=  `<hr/>
                        <p class="right">${commentsData[i].username}</p>
                        <p>${commentsData[i].comments}</p>
                        `;
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
                    </div>`;
    document.getElementById("div3").innerHTML=template;
    request.open('GET', '/get-comments/' + currentArticleTitle, true);
    request.send(null);
}

    function show_comments1(){
        alert("---------");
    	//alert(document.getElementById("name").value);
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
    //var template =`<a href="http://127.0.0.1:8080/login#"><button class="but left" id="logIN">Log <span class="bold" id="slogIN">IN</span></button></a>`;
                //document.getElementById("div2").innerHTML=template;