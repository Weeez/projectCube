var camera = camera;
var keyPressed = keyPressed;
var keyEventDatas = keyEventDatas;
var origo = origo;
var windowWidth = windowWidth;
var windowHeight = windowHeight;
var sin = Math.sin;
var cos = Math.cos;
var center = {
        x: windowWidth/2,
        y: windowHeight/2
    }

function keyLogic(){
    /*
    s = hAngle
    t = vAngle
    
    x = r * cos(s) * sin(t)
    y = r * sin(s) * sin(t)
    z = r * cos(t)
    
    */

    if(keyPressed[38]){ // up
    }
    if(keyPressed[40]){ // down
    }
    if(keyPressed[37]){ // left
    }
    if(keyPressed[39]){ // right
    }
    if(keyPressed["mouseMoveX"] > 0){ // right
        // if(keyPressed["mouseX"] > center.x){
            var angleUnit = ((Math.PI ) / (windowWidth / 2));
            var hDistance = center.x - keyPressed["mouseX"];
            console.log(hDistance);
            keyEventDatas.horizontalAngle = angleUnit * hDistance;
            
            var r = keyEventDatas.r;
            var vAngle = keyEventDatas.verticalAngle;
            var hAngle = keyEventDatas.horizontalAngle;

            camera.position.y = (r * cos(hAngle) * sin(vAngle));
            camera.position.x = (r * sin(hAngle) * sin(vAngle));
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

            camera.position.y = (r * cos(hAngle) * sin(vAngle));
            camera.position.x = (r * sin(hAngle) * sin(vAngle));
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

            camera.position.y = (r * cos(hAngle) * sin(vAngle));
            camera.position.x = (r * sin(hAngle) * sin(vAngle));
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

            camera.position.y = (r * cos(hAngle) * sin(vAngle));
            camera.position.x = (r * sin(hAngle) * sin(vAngle));
            camera.position.z = (r * cos(vAngle));
        
            camera.lookAt(origo);
        // }
    }
    setTimeout(keyLogic, 5);
}

window.onload = function(){
    keyLogic();
}
