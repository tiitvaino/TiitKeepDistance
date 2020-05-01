var el = document.getElementById("playarea");
if (el) {
    el.addEventListener("mousemove", mouseCoords);
}


function mouseCoords(event) {
    var node = document.getElementById('playarea');
    var x = parseInt(event.clientX);
    var y = parseInt(event.clientY);
    var coords = "X coords: " + x + ", Y coords: " + y;
    document.getElementById("virus").style.top = y + 'px';
    document.getElementById("virus").style.left = x + 'px';
    document.getElementById("coords").innerHTML = coords;
    var eventMove = new CustomEvent('mousemoved', { detail: { x: x, y: y } });
    eventMove.initEvent('mousemoved', true, true);
    node.childNodes.forEach(divX => { divX.dispatchEvent(eventMove) });
}

function moveThisDiv(divX, event, paddedbox) {
    var paddedbox = 100;
    var x = event.detail.x;
    var y = event.detail.y;
    var yDivX = parseInt(divX.style.top.replace('px', ''));
    var xDivX = parseInt(divX.style.left.replace('px', ''));
    var x1 = xDivX - paddedbox;
    var x2 = xDivX + paddedbox;
    var y1 = yDivX - paddedbox;
    var y2 = yDivX + paddedbox;

    if (x1 < x && x < x2) {
        if (y1 < y && y < y2) {
            var newX = xDivX + xDivX - x;
            var newY = yDivX + yDivX - y;
            /*var newX = xDivX + (x < xDivX ? 1 : -1);
            var newY = yDivX + (y < yDivX ? 1 : -1);*/
            if (newX < 50 || newX > (el.offsetWidth)) {
                newX = xDivX;
            }
            if (newY < 50 || newY > (el.offsetWidth - 50)) {
                newY = yDivX;
            }
            divX.style.left = newX + 'px';
            divX.style.top = newY + 'px';
            var eventMove = new CustomEvent('divmoved', { detail: { x: newX, y: newY } });
            eventMove.initEvent('divmoved', true, true);
            var childs = document.getElementById('playarea').childNodes;
            for (let i = 0; i < childs.length; i++) {
                const element = childs[i];
                if (element !== divX) {
                    element.dispatchEvent(eventMove);
                }

            }
        }
    }
}

function createDivs() {
    var i = 0;
    var n = document.getElementById("boxesnum").value;
    var areaWidth = document.getElementById("playarea").offsetWidth;
    var areaHeight = document.getElementById("playarea").offsetHeight;
    var boxSize = 100;
    var padding = 50;
    var paddedbox = boxSize + padding;
    var maxPerRow = Math.floor(areaWidth / paddedbox);
    var maxPerColumn = Math.floor(areaHeight / paddedbox);
    if (maxPerColumn * maxPerRow < n) {
        n = maxPerColumn * maxPerRow;
    }

    while (i < n) {
        var divX = document.createElement("div");
        divX.id = "div" + i;
        divX.style.position = "absolute";

        var x = paddedbox * (i % maxPerRow) + boxSize / 2 + paddedbox / 2;
        var y = paddedbox * ((i - i % maxPerRow) / maxPerRow) + paddedbox / 2;

        divX.style.webkitTransform = "translate(-50%, -50%)";
        divX.style.transform = "translate(-50%, -50%)";
        divX.style.top = y + 'px';
        divX.style.left = x + 'px';
        divX.className = "box";
        divX.addEventListener("divmoved", function(event) { moveThisDiv(this, event, 100) });
        divX.addEventListener("mousemoved", function(event) { moveThisDiv(this, event, 60) });
        document.getElementById("playarea").appendChild(divX);
        i++;
    }
}