var camera = camera;
var keyPressed = keyPressed;
var keyEventDatas = keyEventDatas;
var origo = origo;
var windowWidth = windowWidth;
var windowHeight = windowHeight;
var playerCubes = playerCubes;
var thisSocket = thisSocket;
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
    /*
    s = hAngle
    t = vAngle
    
    x = r * cos(s) * sin(t)
    y = r * sin(s) * sin(t)
    z = r * cos(t)
    
    */

    // up
    if(keyPressed[38]){ 
        if(movementStarted.direction != "down"){
            cubeAndCamMove("up");
        }
    }
    // down
    else if(keyPressed[40]){ 
        if(movementStarted.direction != "up"){
            cubeAndCamMove("down");
        }
    }
    // left
    else if(keyPressed[37]){ 
        if(movementStarted.direction != "right"){
            cubeAndCamMove("left");
        }
    }
    // right
    else if(keyPressed[39]){ 
        if(movementStarted.direction != "left"){
            cubeAndCamMove("right");
        }
    }
    
    if(movementStarted.isMoving){
        cubeAndCamMove(movementStarted.direction);
    }
    
    if(keyPressed[80]){ // P (pause)
        movementStarted.isMoving = !movementStarted.isMoving;
        // movementStarted.direction = "";
        delete keyPressed[80];
    }
    
    /*
    if(keyPressed["mouseMoveX"] > 0){ // right
        // if(keyPressed["mouseX"] > center.x){
            var angleUnit = ((Math.PI ) / (windowWidth / 2));
            var hDistance = center.x - keyPressed["mouseX"];
            console.log(hDistance);
            keyEventDatas.horizontalAngle = angleUnit * hDistance;
            
            var r = keyEventDatas.r;
            var vAngle = keyEventDatas.verticalAngle;
            var hAngle = keyEventDatas.horizontalAngle;

             camera.position.x = (r * cos(hAngle) * sin(vAngle));
             camera.position.y = (r * sin(hAngle) * sin(vAngle));
             camera.position.z = (r * cos(vAngle));
        
            camera.lookAt(origo);
        // }
    }
    if(keyPressed["mouseMoveX"] < 0){ // left
        // if(keyPressed["mouseX"] < center.x){
            var angleUnit = ((Math.PI ) / (windowWidth / 2));
            var hDistance = center.x - keyPressed["mouseX"];
            console.log(hDistance);
            keyEventDatas.horizontalAngle = angleUnit * hDistance;
            
            var r = keyEventDatas.r;
            var vAngle = keyEventDatas.verticalAngle;
            var hAngle = keyEventDatas.horizontalAngle;

            camera.position.x = (r * cos(hAngle) * sin(vAngle));
            camera.position.y = (r * sin(hAngle) * sin(vAngle));
            camera.position.z = (r * cos(vAngle));
        
            camera.lookAt(origo);
        // }
    }
    if(keyPressed["mouseMoveY"] > 0){ // down 
        // if(keyPressed["mouseY"] > center.y){
            var angleUnit = ((Math.PI) / (windowWidth / 2));
            var vDistance = center.y - keyPressed["mouseY"];
            console.log(vDistance);
            keyEventDatas.verticalAngle = angleUnit * vDistance;
            
            var r = keyEventDatas.r;
            var vAngle = keyEventDatas.verticalAngle;
            var hAngle = keyEventDatas.horizontalAngle;

            camera.position.x = (r * cos(hAngle) * sin(vAngle));
            camera.position.y = (r * sin(hAngle) * sin(vAngle));
            camera.position.z = (r * cos(vAngle));
        
            camera.lookAt(origo);
        // }
    }
    if(keyPressed["mouseMoveY"] < 0){ // up
        // if(keyPressed["mouseY"] < center.y){
            var angleUnit = ((Math.PI) / (windowWidth / 2));
            var vDistance = center.y - keyPressed["mouseY"];
            console.log(vDistance);
            keyEventDatas.verticalAngle = angleUnit * vDistance;
            
            var r = keyEventDatas.r;
            var vAngle = keyEventDatas.verticalAngle;
            var hAngle = keyEventDatas.horizontalAngle;

            camera.position.x = (r * cos(hAngle) * sin(vAngle));
            camera.position.y = (r * sin(hAngle) * sin(vAngle));
            camera.position.z = (r * cos(vAngle));
        
            camera.lookAt(origo);
        // }
    }
    */
    setTimeout(keyLogic, 5);
}

window.onload = function(){
    keyLogic();
}