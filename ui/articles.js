            function submit(){
                //alert(".value");
                var box = document.getElementById("comment_box");
                box.innerHTML = `
                <p>Name <input type="text" id="name"/></p>
                <p> comments <textarea id="txtarea" name="comments" rows="5" cols="30" placeholder="Type in your comment here..."></textarea></p>
                 <p class= "center">         
                    <input type="button" onclick="show_comments()" value="Post as a guest" class= "but2"/></p>`;}

            function show_comments(){
                alert("---------");
                var name = document.getElementById("name");
                var p1 = document.getElementById("p1");
                    p1.innerHTML ="<hr/>" +name.value;
                var p2 = document.getElementById("p2");
                    p2.innerHTML = document.getElementById("txtarea").value;
            }
