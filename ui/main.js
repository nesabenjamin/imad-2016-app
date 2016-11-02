console.log('Loaded!');

    function submit(){
        //alert(".value");
        var box = document.getElementById("comment_box");
        box.innerHTML = `
        <p>Name <input type="text" id="name"/></p>
        <p> comments <textarea id="txtarea" name="comments" rows="5" cols="30" placeholder="Type in your comment here..."></textarea></p>
         <p class= "center">         
            <input type="button" onclick="show_comments()" value="Post as a guest" class= "but2"/></p>`;}
   

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
