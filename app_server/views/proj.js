        //moving box canvas
        window.requestAnimFrame = (function(callback) {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback) {
          window.setTimeout(callback, 1000 / 60);
        };
      })();

      function drawRectangle(myRectangle, context) {
        context.beginPath();
        context.rect(myRectangle.x, myRectangle.y, myRectangle.width, myRectangle.height);
        context.fillStyle = '#86F89F';
        context.fill();
        context.lineWidth = myRectangle.borderWidth;
        context.strokeStyle = '#102740';
        context.stroke();
      }
      function animate(myRectangle, canvas, context, startTime) {
        // update
        var time = (new Date()).getTime() - startTime;

        var linearSpeed = 60;
        // pixels / second
        var newX = linearSpeed * time / 1000;

        if(newX < canvas.width - myRectangle.width - myRectangle.borderWidth / 2) {
          myRectangle.x = newX;
        }

        // clear
        context.clearRect(0, 0, canvas.width, canvas.height);

        drawRectangle(myRectangle, context);

        // request new frame
        requestAnimFrame(function() {
          animate(myRectangle, canvas, context, startTime);
        });
      }
      var canvas = document.getElementById('myCanvas');
      var context = canvas.getContext('2d');
      var myRectangle = {
        x: 10,
        y: 35,
        width: 50,
        height: 70,
        borderWidth: 3
      };

      drawRectangle(myRectangle, context);

      // wait one second before starting animation
      setTimeout(function() {
        var startTime = (new Date()).getTime();
        animate(myRectangle, canvas, context, startTime);
      }, 1000);
      
    //drag and drop logos
    var image = null;
    function loadImageFromLocalStorage() {
      // If local storage does not have the image, use default
      if (localStorage.getItem("imgData") === null) {
        document.getElementById('task').src = "../images/pinterest logo.png";
        document.getElementById('tsak').src = "../images/walmart logo.png";

      }
      // If it can find local image, use it
      else {
        var dataImage = localStorage.getItem('imgData');
        document.getElementById('task').src = "data:image/png;base64," + dataImage;
      }
    }

    function allowDrop(ev) {
      ev.preventDefault();
    }

    function drag(ev) {
      ev.dataTransfer.setData("text", ev.target.id);
    }

    function drop(ev) {
      ev.preventDefault();
      var data = ev.dataTransfer.getData("text");
      ev.target.appendChild(document.getElementById(data));
    }

//Good Luck canvas
    function Banner(){
    
    var keyword = "Good Luck";
    var canvas;
    var context;
    
    var bgCanvas;
    var bgContext;
    
    var denseness = 10;
    
    //Each particle/icon
    var parts = [];
    
    var mouse = {x:-100,y:-100};
    var mouseOnScreen = false;
    
    var itercount = 0;
    var itertot = 40;
    
    this.initialize = function(canvas_id){
      canvas = document.getElementById(canvas_id);
      context = canvas.getContext('2d');
      
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      bgCanvas = document.createElement('canvas');
      bgContext = bgCanvas.getContext('2d');
      
      bgCanvas.width = window.innerWidth;
      bgCanvas.height = window.innerHeight;
    
      canvas.addEventListener('mousemove', MouseMove, false);
      canvas.addEventListener('mouseout', MouseOut, false);
        
      start();
    }
    
    var start = function(){
        
      bgContext.fillStyle = "#000000";
      bgContext.font = '300px impact';
      bgContext.fillText(keyword, 83, 275);
      clear();  
      getCoords();
    }
    
    var getCoords = function(){
      var imageData, pixel, height, width;
      
      imageData = bgContext.getImageData(0, 0, canvas.width, canvas.height);
      
        for(height = 0; height < bgCanvas.height; height += denseness){
              for(width = 0; width < bgCanvas.width; width += denseness){   
                 pixel = imageData.data[((width + (height * bgCanvas.width)) * 4) - 1];
                    if(pixel == 255) {
                      drawCircle(width, height);
                    }
              }
          }
          
          setInterval( update, 40 );
    }
    
    var drawCircle = function(x, y){
      
      var startx = (Math.random() * canvas.width);
      var starty = (Math.random() * canvas.height);
      
      var velx = (x - startx) / itertot;
      var vely = (y - starty) / itertot;  
      
      parts.push(
        {c: '#' + (Math.random() * 0x949494 + 0xaaaaaa | 0).toString(16),
         x: x, //goal position
         y: y,
         x2: startx, //start position
         y2: starty,
         r: true, //Released (to fly free)
         v:{x:velx , y: vely}
        }
      )
    }
      
    var update = function(){
      var i, dx, dy, sqrDist, scale;
      itercount++;
      clear();
      for (i = 0; i < parts.length; i++){
            
        //If dot released
        if (parts[i].r == true){
          //Fly into infinity
          parts[i].x2 += parts[i].v.x;
              parts[i].y2 += parts[i].v.y;
        }
        if (itercount == itertot){
          parts[i].v = {x:(Math.random() * 6) * 2 - 6 , y:(Math.random() * 6) * 2 - 6};
          parts[i].r = false;
        }
        
          dx = parts[i].x - mouse.x;
            dy = parts[i].y - mouse.y;
            sqrDist =  Math.sqrt(dx*dx + dy*dy);
        
        if (sqrDist < 20){
          parts[i].r = true;
        }       

        //Drawing circle
        context.fillStyle = parts[i].c;
        context.beginPath();
        context.arc(parts[i].x2, parts[i].y2, 4 ,0 , Math.PI*2, true);
        context.closePath();
          context.fill(); 
          
      } 
    }
    var MouseMove = function(e) {
        if (e.layerX || e.layerX == 0) {
          //Reset particle positions
          mouseOnScreen = true;
            mouse.x = e.layerX - canvas.offsetLeft;
            mouse.y = e.layerY - canvas.offsetTop;
        }
    }
    
    var MouseOut = function(e) {
      mouseOnScreen = false;
      mouse.x = -100;
      mouse.y = -100; 
    }
    
    //Clear the on screen canvas
    var clear = function(){
      context.fillStyle = '#48F6A1';
      context.beginPath();
        context.rect(0, 0, canvas.width, canvas.height);
      context.closePath();
      context.fill();
    }
  }

  var banner = new Banner();
  banner.initialize("canvas");

    // Function to save image to Local Storage with a button
    function changeImage() {
      bannerImage = document.getElementById('img');
      imgData = getBase64Image(bannerImage);
      localStorage.setItem("imgData", imgData);
    }

    // Store image in local storage
    function getBase64Image(img) {
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      var dataURL = canvas.toDataURL("image/png");

      return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    }

    document.getElementById("uploadBtn").onchange = function () {
      document.getElementById("uploadFile").value = this.value;
    };
    var myNodelist = document.getElementsByTagName("LI");
    var i;
    for (i = 0; i < myNodelist.length; i++) {
      var span = document.createElement("SPAN");
      var txt = document.createTextNode("\u00D7");
      span.className = "close";
      span.appendChild(txt);
      myNodelist[i].appendChild(span);
    }

    // Click on a close button to hide the current list item
    var close = document.getElementsByClassName("close");
    var i;
    for (i = 0; i < close.length; i++) {
      close[i].onclick = function () {
        var div = this.parentElement;
        div.style.display = "none";
      }
    }

    // Add a "checked" symbol when clicking on a list item
    var list = document.querySelector('ul');
    list.addEventListener('click', function (ev) {
      if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
      }
    }, false);

    // Create a new list item when clicking on the "Add" button
    function newElement() {
      var li = document.createElement("li");
      var inputValue = document.getElementById("myInput").value;
      var t = document.createTextNode(inputValue);
      li.appendChild(t);
      if (inputValue === '') {
        alert("You must write something!");
      } else {
        document.getElementById("myUL").appendChild(li);
      }
      document.getElementById("myInput").value = "";

      var span = document.createElement("SPAN");
      var txt = document.createTextNode("\u00D7");
      span.className = "close";
      span.appendChild(txt);
      li.appendChild(span);

      for (i = 0; i < close.length; i++) {
        close[i].onclick = function () {
          var div = this.parentElement;
          div.style.display = "none";
        }
      }
    }
