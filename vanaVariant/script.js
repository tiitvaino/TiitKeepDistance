

document.getElementById("myBtn").addEventListener("click", createDivs());

function mouseCoords(event) {
    var x = parseInt(event.clientX);
    var y = parseInt(event.clientY);
    var coords = "X coords: " + x + ", Y coords: " + y;
    document.getElementById("coords").innerHTML = coords;
    
    var divs = document.getElementsByClassName("box");
    for(var i = 0 ; i< divs.length; i++){
        mouseMove(divs,i, x ,y);
    }  
  }

  function mouseMove(divs, i, x , y) {
    var divX = divs[i];
    moveDiv(divX,x,y, 30);

    for (let j = 0; j < divs.length; j++) {
        if (i === j){
            continue;
        }
        else{
            const divY = divs[j];
            var yDivY = parseInt(divY.style.top.replace('px', ''));
            var xDivY = parseInt(divY.style.left.replace('px', ''));
            moveDiv(divX,xDivY,yDivY, 60);
        }
    }
  }

  
  function moveDiv(divX, x, y, paddedbox){
    var yDivX = parseInt(divX.style.top.replace('px', ''));
    var xDivX = parseInt(divX.style.left.replace('px', ''));
    var x1 = xDivX-paddedbox;
    var x2 = xDivX+paddedbox;
    var y1 = yDivX-paddedbox;
    var y2 = yDivX+paddedbox;

    if (x1 < x && x < x2){
        if (y1 < y && y < y2){
            var newX = xDivX + xDivX-x;
            var newY = yDivX + yDivX-y;
            divX.style.left = newX + 'px';
            divX.style.top = newY + 'px';       
        }
    }
  }

  function createDivs(){
      var i = 0;
      var n = document.getElementById("fname").value;
      var areaWidth = document.getElementById("playArea").offsetWidth;
      var areaHeight = document.getElementById("playArea").offsetHeight;
      var boxSize = 50;
      var padding = 20;
      var paddedbox = boxSize + padding;
      var maxPerRow = Math.floor(areaWidth/paddedbox);
      var maxPerColumn = Math.floor(areaHeight/paddedbox);
      if (maxPerColumn * maxPerRow < n){
          n = maxPerColumn * maxPerRow;
      }

      while(i<n){
        var divX = document.createElement("div");
        divX.id = "div"+i;
        divX.style.position = "absolute";

        var x = paddedbox * (i % maxPerRow)  + boxSize/2 + paddedbox/2;
        var y = paddedbox*((i - i % maxPerRow) / maxPerRow) + paddedbox/2;
        
        divX.style.webkitTransform = "translate(-50%, -50%)";
        divX.style.transform = "translate(-50%, -50%)";
        divX.style.top = y + 'px';
        divX.style.left = x + 'px';
        divX.className = "box";
        document.getElementById("playArea").appendChild(divX);
          i++;
      }
  }