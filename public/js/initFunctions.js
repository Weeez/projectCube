renderer.setClearColor(0x99bffc);
renderer.setSize(windowWidth-scrollerWidth, windowHeight-scrollerWidth);
renderer.gammaInput = true;
renderer.gammaOutput = true;

document.addEventListener('keydown', function(e){
    keyPressed[e.keyCode] = true;
}, false);

document.addEventListener('keyup', function(e){
    keyPressed[e.keyCode] = false;
}, false);

document.addEventListener('mousemove', function(e){
    keyPressed["mouseMoveX"] = e.movementX;
    keyPressed["mouseMoveY"] = e.movementY;
    keyPressed["mouseX"] = e.x;
    keyPressed["mouseY"] = e.y;
})

window.addEventListener("keydown", function(e){
    // if(e.keyCode == 116 || e.keyCode == 123){
    //     e.preventDefault()
    // };
    lastPressedKey = e.keyCode;
});

function removeLoading(){
    var parent = document.getElementById('loading').parentNode;
    var child = document.getElementById('loading');
    parent.removeChild(child);
    
    document.getElementById('debug').classList.add('debug');
}

function debugging(){
    if(thisSocket){
        var pos = playerCubes[thisSocket].position;    
        document.getElementById('debug').textContent = " DEBUG cube position: ( " + Math.round(pos.x) + " , " + Math.round(pos.y) + " )";
    }
}

function addAxisCubeGeometry(obj){
    var geometry = new BoxGeometry(obj.x, obj.y, obj.z);
    var material = new Material({color: obj.color, transparent: true, opacity: 0.5});
    var cube = new Mesh(geometry, material);
    return cube;
}

function createPlayerGeometry(socketId){
    var playerTexture = new THREE.TextureLoader().load("pics/aaa.png");
    var playerGeometry = new BoxGeometry(1,1,1);
    var playerMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0x050505, map: playerTexture } );
    var playerMesh = new Mesh(playerGeometry, playerMaterial);
    // playerMesh.position.z = 0.5;
    playerMesh.position.x = playerPos.x;
    playerMesh.position.y = playerPos.y;
    playerMesh.position.z = 0.5;
    playerCubes[socketId] = playerMesh;
    return playerMesh;
}

function createFieldGeometry(){
    var vertexShader = document.getElementById('vertexShader').textContent;
    var fragmentShader = document.getElementById('fragmentShader').textContent;
    
    var testTexture = new THREE.TextureLoader().load("pics/border.png");
    var uniform = {
        texture1: { type: "t", value: testTexture }
    };
    
    var fieldGeometry = new BufferGeometry();
    var fieldMaterial = new ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        // vertexColors: THREE.VertexColors,
        uniforms : uniform,
        transparent: false,
        // color: 0xaaaaaa, 
        // specular: 0xffffff, 
        // shininess: 250
        // side: THREE.DoubleSide
    });
    
    var vertexArray = [];
    var size = fieldTableSize;
    var cubeSize = 1;
    
    for(var i = 0; i < size; i++){
        var sizeHalf = size / 2;
        var tmpHalfX = -1*sizeHalf;
        var tmpHalfY = sizeHalf-i;
        for(var j = 0; j < size; j++){
            vertexArray.push((tmpHalfX)+(j*cubeSize),tmpHalfY-1,0);
            vertexArray.push((tmpHalfX+cubeSize)+(j*cubeSize),tmpHalfY-1,0);
            vertexArray.push((tmpHalfX+cubeSize)+(j*cubeSize),tmpHalfY,0);
            vertexArray.push((tmpHalfX)+(j*cubeSize),tmpHalfY,0);
        }
    }
    
    var uvsArray = [];
    for(var i = 0; i < size * size; i++){
        uvsArray.push(0.0, 0.0);
        uvsArray.push(1.0, 0.0);
        uvsArray.push(1.0, 1.0);
        uvsArray.push(0.0, 1.0);
    }
    
    var uvs = new Float32Array(uvsArray);
    
    var indexSize = 4;
    var indX = 0;
    var indY = 1;
    var indZ = 2;
    var indW = 3;
    
    var uvIndicesArray = [];
    
    for(var i = 0; i < size*size; i++){
        uvIndicesArray.push(indX + (i*indexSize));
        uvIndicesArray.push(indY + (i*indexSize));
        uvIndicesArray.push(indZ + (i*indexSize));
        
        uvIndicesArray.push(indZ + (i*indexSize));
        uvIndicesArray.push(indW + (i*indexSize));
        uvIndicesArray.push(indX + (i*indexSize));
    }
    
    var uvIndices = new Uint32Array(uvIndicesArray);
    var vertices = new Float32Array(vertexArray);
    var colors = new Float32Array([
        // 1.0, 0.0, 0.0,
        // 1.0, 1.0, 0.0,
        // 0.0, 0.0, 1.0,
        
        // 1.0, 1.0, 0.0,
        // 1.0, 1.0, 1.0,
        // 0.0, 0.0, 1.0
        
        // 0.4, 0.4, 0.4,
        0.2, 0.2, 0.2,
        0.2, 0.2, 0.2,
        0.2, 0.2, 0.2,
        
        0.2, 0.2, 0.2,
        0.2, 0.2, 0.2,
        // 0.4, 0.4, 0.4,
        0.2, 0.2, 0.2
    ]);
    
    var p1 = new Vector3();
    var p2 = new Vector3();
    var p3 = new Vector3();
    
    var q1 = new Vector3();
    var q2 = new Vector3();
    var q3 = new Vector3();
    
    p1.set( 0.0, 0.0, 0.0 );
    p2.set( 1.0, 0.0, 0.0 );
    p3.set( 0.0, -1.0, 0.0 );
    
    q1.set( 1.0, 0.0, 0.0 );
    q2.set( 1.0, -1.0, 0.0 );
    q3.set( 0.0, -1.0, 0.0 );
    
    var u = new Vector3();
    var v = new Vector3();
    var uu = new Vector3();
    var vv = new Vector3();
    
    u.subVectors(p3, p2);
    v.subVectors(p1, p2);
    u.cross(v);
    
    u.normalize();
    
    uu.subVectors(q3,q2);
    vv.subVectors(q1,q2);
    uu.cross(vv);
    
    uu.normalize();
    
    var normals = new Float32Array([
        u.x, u.y, u.z,
        u.x, u.y, u.z,
        u.x, u.y, u.z,
        
        uu.x, uu.y, uu.z,
        uu.x, uu.y, uu.z,
        uu.x, uu.y, uu.z,
    ]);
    

    fieldGeometry.addAttribute('position', new BufferAttribute( vertices, 3));
    fieldGeometry.addAttribute('normal', new BufferAttribute( normals, 3));
    // fieldGeometry.addAttribute('color', new THREE.BufferAttribute( colors, 3 ));
    fieldGeometry.addAttribute('uv', new BufferAttribute( uvs, 2));
    fieldGeometry.setIndex(new BufferAttribute( uvIndices, 1 ));

    var tmpGeo = new Mesh(fieldGeometry, fieldMaterial);
    return tmpGeo;
}

function init(){
    container = document.getElementById('container');
    container.appendChild(renderer.domElement);
    
    stats = new Stats();
    container.appendChild(stats.dom);
    
    scene.add(new AmbientLight( 0x444444 ) );
    var light1 = new DirectionalLight( 0xffffff, 0.5 );
    light1.position.set( 10, 10, 10 );
	scene.add( light1 );
	
	var light2 = new DirectionalLight( 0xffffff, 1.5 );
	light2.position.set( 0, 0, 30 );
	scene.add( light2 );
    
    scene.add(addAxisCubeGeometry({x:1000, y:0.1, z: 0.1, color:"rgba(255,0,0)"})); // x axis 
    scene.add(addAxisCubeGeometry({x:0.1, y:1000, z: 0.1, color:"rgba(0,255,0)"})); // y axis
    scene.add(addAxisCubeGeometry({x:0.1, y:0.1, z: 1000, color:"rgba(0,0,255)"})); // z axis
    
    scene.add(createFieldGeometry());
    scene.add(createPlayerGeometry(thisSocket));
    
    var hAngle = keyEventDatas.horizontalAngle;
    var vAngle = keyEventDatas.verticalAngle;
    var sin = Math.sin;
    var cos = Math.cos;
    var r = keyEventDatas.r;
                
    camera.position.x = playerCubes[thisSocket].position.x + (r * cos(hAngle) * sin(vAngle));
    camera.position.y = playerCubes[thisSocket].position.y +(r * sin(hAngle) * sin(vAngle));
    camera.position.z = (r * cos(vAngle));
    camera.lookAt(playerCubes[thisSocket].position);
}