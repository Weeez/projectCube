var camera = camera;
var keyPressed = keyPressed;
var keyEventDatas = keyEventDatas;
var origo = origo;
var windowWidth = windowWidth;
var windowHeight = windowHeight;
var playerCubes = playerCubes;
var thisSocket = thisSocket;
var lastPressedKey = lastPressedKey;
var sin = Math.sin;
var cos = Math.cos;
var center = {
        x: windowWidth/2,
        y: windowHeight/2
    }
var movementSpeed = 0.03;    
    
var movementStarted = {
    isMoving: false,
    direction: "",
};

function cubeAndCamMove(direction){

    var pos = playerCubes[thisSocket].position;
    
    movementStarted.isMoving = true;
    movementStarted.direction = direction;
    if(direction == "up"){
        playerCubes[thisSocket].position.y += movementSpeed;
    }
    else if(direction == "down"){
        playerCubes[thisSocket].position.y -= movementSpeed;
    }
    else if(direction == "left"){
        playerCubes[thisSocket].position.x -= movementSpeed;
    }
    else if(direction == "right"){
        playerCubes[thisSocket].position.x += movementSpeed;
    }
    
    var r = keyEventDatas.r;
    var vAngle = keyEventDatas.verticalAngle;
    var hAngle = keyEventDatas.horizontalAngle;
        
    camera.position.x = playerCubes[thisSocket].position.x + (r * cos(hAngle) * sin(vAngle));
    camera.position.y = playerCubes[thisSocket].position.y + (r * sin(hAngle) * sin(vAngle));
    camera.position.z = (r * cos(vAngle));
        
    camera.lookAt(playerCubes[thisSocket].position);
}

function keyLogic(){
    /* sphere
    s = hAngle
    t = vAngle
    
    x = r * cos(s) * sin(t)
    y = r * sin(s) * sin(t)
    z = r * cos(t)
    
    */
    if(thisSocket){
        var cubeHorizontalFrom = Math.floor(playerCubes[thisSocket].position.x);
        var cubeHorizontalTo = cubeHorizontalFrom + 1;
        var cubeVerticalFrom = Math.floor(playerCubes[thisSocket].position.y);
        var cubeVerticalTo = cubeVerticalFrom + 1;
        
        // console.log("x: " + cubeHorizontalFrom + " " + cubeHorizontalTo + " " + cubeVerticalFrom + " " + cubeVerticalTo);
        
        // up
        if(keyPressed[38]){ 
            if(movementStarted.direction != "down"){
                cubeAndCamMove("up");
            }
            delete keyPressed[38];
        }
        // down
        else if(keyPressed[40]){ 
            if(movementStarted.direction != "up"){
                cubeAndCamMove("down");
            }
            delete keyPressed[40];
        }
        // left
        else if(keyPressed[37]){ 
            if(movementStarted.direction != "right"){
                cubeAndCamMove("left");
            }
            delete keyPressed[37];
        }
        // right
        else if(keyPressed[39]){ 
            if(movementStarted.direction != "left"){
                cubeAndCamMove("right");
            }
            delete keyPressed[39];
        }
        
        if(movementStarted.isMoving){
            cubeAndCamMove(movementStarted.direction);
        }
        
        if(keyPressed[80]){ // P (pause)
            movementStarted.isMoving = !movementStarted.isMoving;
            // movementStarted.direction = "";
            delete keyPressed[80];
        }
        
    }

    setTimeout(keyLogic, 5);
}

window.onload = function(){
    keyLogic();
}