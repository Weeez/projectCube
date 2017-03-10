var camera = camera;
var keyPressed = keyPressed;
var keyEventDatas = keyEventDatas;
var origo = origo;

function keyLogic(){
    /*
    s = hAngle
    t = vAngle
    
    x = r * cos(s) * sin(t)
    y = r * sin(s) * sin(t)
    z = r * cos(t)
    
    */
    var slideX = 0;
    var slideZ = 0;
    
    var sin = Math.sin;
    var cos = Math.cos;

    if(keyPressed[38]){ // up
        var newVal = keyEventDatas.verticalAngle + keyEventDatas.newVerticalAngle;
        if(newVal < Math.PI / 2 && newVal > (-1 * Math.PI / 2)){
            keyEventDatas.verticalAngle += keyEventDatas.newVerticalAngle;
            var r = keyEventDatas.r;
            var vAngle = keyEventDatas.verticalAngle;
            var hAngle = keyEventDatas.horizontalAngle;

            // camera.position.y = (r * cos(hAngle) * sin(vAngle));
            // camera.position.x = (r * sin(hAngle) * sin(vAngle));
            // camera.position.z = (r * cos(vAngle));
            
            camera.position.y = r * sin(vAngle);
            camera.position.z = r * cos(vAngle);
            
            // var inversePos = new Vector3(-1*camera.position.x, -1* camera.position.y, -1*camera.position.z);
            camera.lookAt(origo);
        }
    }
    if(keyPressed[40]){ // down
        var newVal = keyEventDatas.verticalAngle - keyEventDatas.newVerticalAngle;
        if(newVal < Math.PI / 2 && newVal > (-1 * Math.PI / 2 )){
            keyEventDatas.verticalAngle -= keyEventDatas.newVerticalAngle;
            var r = keyEventDatas.r;
            var vAngle = keyEventDatas.verticalAngle;
            var hAngle = keyEventDatas.horizontalAngle;

            camera.position.y = r * sin(vAngle);
            camera.position.z = r * cos(vAngle);
            // camera.position.y = (r * cos(hAngle) * sin(vAngle));
            // camera.position.x = (r * sin(hAngle) * sin(vAngle));
            // camera.position.z = (r * cos(vAngle));
            camera.lookAt(origo);
        }
    }
    
    if(keyPressed[37]){ // left
        var newVal = keyEventDatas.horizontalAngle - keyEventDatas.newHorizontalAngle;
        // if(newVal < Math.PI / 2 && newVal > (-1 * Math.PI / 2)){
            keyEventDatas.horizontalAngle -= keyEventDatas.newHorizontalAngle;
            var r = keyEventDatas.r;
            var vAngle = keyEventDatas.verticalAngle;
            var hAngle = keyEventDatas.horizontalAngle;
        
            camera.position.x = r * sin(hAngle);
            camera.position.z = r * cos(hAngle);
        
            camera.lookAt(origo);
        // }
        // camera.position.x = (r * cos(hAngle) * sin(vAngle));
        // camera.position.y = (r * sin(hAngle) * sin(vAngle));
        // camera.position.z = (r * cos(vAngle));
        // camera.lookAt(origo);
    }
    if(keyPressed[39]){ // right
        var newVal = keyEventDatas.horizontalAngle + keyEventDatas.newHorizontalAngle;
        // if(newVal < Math.PI / 2 && newVal > (-1 * Math.PI / 2)){
            keyEventDatas.horizontalAngle += keyEventDatas.newHorizontalAngle;
            var r = keyEventDatas.r;
            var vAngle = keyEventDatas.verticalAngle;
            var hAngle = keyEventDatas.horizontalAngle;

        // camera.position.x = (r * cos(hAngle) * sin(vAngle));
        // camera.position.y = (r * sin(hAngle) * sin(vAngle));
        
            camera.position.x = r * sin(hAngle);
            camera.position.z = r * cos(hAngle);
        
            camera.lookAt(origo);
        
        // camera.position.z = (r * cos(vAngle));
        // camera.lookAt(origo);
        // camera.rotateY(Math.PI / 18000);
        // }
    }
    setTimeout(keyLogic, 5);
}

window.onload = function(){
    keyLogic();
}

        // 0.0, 0.0, 0.0,
        // 1.0, 0.0, 0.0,
        // 1.0, 1.0, 0.0,
        // 0.0, 1.0, 0.0,
        
        // // 1.0, 0.0, 0.0,
        // 2.0, 0.0, 0.0,
        // 2.0, 1.0, 0.0,
        // // 1.0, 1.0, 0.0
        
        // 3.0, 0.0, 0.0,
        // 3.0, 1.0, 0,0