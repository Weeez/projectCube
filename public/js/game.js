var socket = io();

var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;
var scrollerWidth = 5;

var container, stats;

var fieldTable = [];
var fieldElements = [];

//THREE.js stuffs
var scene = new THREE.Scene();
// var camera = new THREE.PerspectiveCamera(1, window.innerWidth / window.innerHeight, 10, 100);
var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1,20 );
var renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.setClearColor(0x99bffc);
renderer.setSize(windowWidth-scrollerWidth, windowHeight-scrollerWidth);
renderer.gammaInput = true;
renderer.gammaOutput = true;

var Mesh = THREE.Mesh;
var Material = THREE.MeshBasicMaterial;
var Vector3 = THREE.Vector3;
var Vector2 = THREE.Vector2;
var Geometry = THREE.Geometry;
var Face3 = THREE.Face3;
var BoxGeometry = THREE.BoxGeometry;
var BufferGeometry = THREE.BufferGeometry;
var ShaderMaterial = THREE.ShaderMaterial;

var keyPressed = {};
var keyEventDatas = {
    r: 7,
    horizontalAngle: (Math.PI / 10000),
    newHorizontalAngle: (Math.PI / 100),
    verticalAngle: (Math.PI / 10000),
    newVerticalAngle: (Math.PI / 100),
    slideX : 0,
    slideZ : 0
}

var origo = new Vector3(0, 0, 0);

document.addEventListener('keydown', function(e){
    keyPressed[e.keyCode] = true;
}, false);


document.addEventListener('keyup', function(e){
    keyPressed[e.keyCode] = false;
}, false);

window.addEventListener("keydown", function(e){
    if(e.keyCode != 116 || e.keyCode != 123) e.preventDefault();
});

function generateFieldTable(){
    var tmpMesh = createFieldGeometry();
    
    var counter = 0;
    
    for(var i = 0; i < fieldTable.length; i++){
        for(var j = 0; j < fieldTable[i].length; j++){
            
            ++counter;
            
            var element = fieldTable[i][j];
            var tmp_Mesh = tmpMesh.clone();
            tmp_Mesh.position.x = element.position.x;
            tmp_Mesh.position.y = element.position.y;
            tmp_Mesh.position.z = element.position.z;
            scene.add(tmp_Mesh);
            fieldElements.push(tmp_Mesh);
            // scene.add(createFieldGeometry(fieldTable[i][j]));
        }
    }
    
    console.log(counter);
}

function addAxisCubeGeometry(obj){
    var geometry = new BoxGeometry(obj.x, obj.y, obj.z);
    var material = new Material({color: obj.color, transparent: true, opacity: 0.5});
    var cube = new Mesh(geometry, material);
    return cube;
}

function shaderWtf(){
    var vertexShader = document.getElementById('vertexShader').textContent;
    var fragmentShader = document.getElementById('fragmentShader').textContent;
    
    var material = new THREE.ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        side: THREE.DoubleSide
    });
    
    var geometry = new BufferGeometry();
    
    var vertices = new Float32Array([
        -0.5, 0.0, 0.0,
        0.5, 0.0, 0.0,
        0.0, 1.0, 0.0
    ]);
    
    geometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
    
    var mesh = new THREE.Mesh(geometry,material);
    // mesh.position.z = -200;
    // mesh.position.y = -100;
    
    mesh.position.x = 0;
    mesh.position.y = 0;
    mesh.position.z = 0;
    
    tmp = mesh;
    
    scene.add(mesh);
}

function createFieldGeometry(){
    var vertexShader = document.getElementById('vertexShader').textContent;
    var fragmentShader = document.getElementById('fragmentShader').textContent;
    
    var testTexture = new THREE.TextureLoader().load("pics/test.jpg");
    var uniform = {
        texture1: { type: "t", value: testTexture }
    };
    
    var fieldGeometry = new BufferGeometry();
    var fieldMaterial = new ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        vertexColors: THREE.VertexColors,
        uniforms : uniform,
        // color: 0xaaaaaa, 
        // specular: 0xffffff, 
        // shininess: 250
        // side: THREE.DoubleSide
    });
    
    
    
    // 0.0, 0.0, 0.0,
    // 1.0, 0.0, 0.0,
    // 1.0, 0.0, 1.0,
    // 0.0, 0.0, 1.0,
    var vertexArray = [];
    for(var i = 0; i < fieldTable.length; i++){
        for(var j = 0; j < fieldTable[i].length; j++){
            
        }
    }
    
    var vertices = new Float32Array([
        0.0, 0.0, 0.0,
        1.0, 0.0, 0.0,
        1.0, 1.0, 0.0,
        0.0, 1.0, 0.0,
        
        1.0, 0.0, 0.0,
        2.0, 0.0, 0.0,
        2.0, 1.0, 0.0,
        1.0, 1.0, 0.0,
        
        2.0, 0.0, 0.0,
        3.0, 0.0, 0.0,
        3.0, 1.0, 0.0,
        2.0, 1.0, 0.0,
    ]);
    
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
    p3.set( 0.0, 0.0, -1.0 );
    
    q1.set( 1.0, 0.0, 0.0 );
    q2.set( 1.0, 0.0, -1.0 );
    q3.set( 0.0, 0.0, -1.0 );
    
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
    
    var uvs = new Float32Array([
        0.0, 0.0, //0
        1.0, 0.0, //1
        1.0, 1.0, //2
        0.0, 1.0, //3
        
        0.0, 0.0, //0
        1.0, 0.0, //1
        1.0, 1.0, //2
        0.0, 1.0, //3
        
        0.0, 0.0, //0
        1.0, 0.0, //1
        1.0, 1.0, //2
        0.0, 1.0, //3
    ]);
    
    var uvIndices = new Uint32Array([
        0, 1, 2,
        2, 3, 0,
        
        4, 5, 6,
        6, 7, 4,

        8, 9, 10,
        10, 11, 8
    ]);
    // function disposeArray() { this.array = null; }
    
    fieldGeometry.addAttribute('position', new THREE.BufferAttribute( vertices, 3));
    fieldGeometry.addAttribute('normal', new THREE.BufferAttribute( normals, 3));
    // fieldGeometry.addAttribute('color', new THREE.BufferAttribute( colors, 3 ));
    fieldGeometry.addAttribute('uv', new THREE.BufferAttribute( uvs, 2));
    fieldGeometry.setIndex(new THREE.BufferAttribute( uvIndices, 1 ));

    var tmpGeo = new Mesh(fieldGeometry, fieldMaterial);
    // tmpGeo.position.x = obj.position.x;
    // tmpGeo.position.y = obj.position.y;
    // tmpGeo.position.z = obj.position.z;
    return tmpGeo;
}

function init(){
    container = document.getElementById('container');
    container.appendChild(renderer.domElement);
    
    stats = new Stats();
    container.appendChild(stats.dom);
    
    scene.add(new THREE.AmbientLight( 0x444444 ) );
    var light1 = new THREE.DirectionalLight( 0xffffff, 0.5 );
    light1.position.set( 10, 10, 10 );
	scene.add( light1 );
	
	var light2 = new THREE.DirectionalLight( 0xffffff, 1.5 );
	light2.position.set( 0, 30, 0 );
	scene.add( light2 );
    
    scene.add(addAxisCubeGeometry({x:1000, y:0.1, z: 0.1, color:"rgba(255,0,0)"}));
    scene.add(addAxisCubeGeometry({x:0.1, y:1000, z: 0.1, color:"rgba(0,255,0)"}));
    scene.add(addAxisCubeGeometry({x:0.1, y:0.1, z: 1000, color:"rgba(0,0,255)"}));
    
    var asd = addAxisCubeGeometry({x:0.1, y:0.1, z: 0.1, color:"rgba(255,0,255)"});
    asd.position.x = 1;
    asd.position.z = 0;
    asd.position.y = 1;
    scene.add(asd);
    
    var hAngle = keyEventDatas.horizontalAngle;
    var vAngle = keyEventDatas.verticalAngle;
    var sin = Math.sin;
    var cos = Math.cos;
    var r = keyEventDatas.r;
                
    camera.position.x = (r * cos(hAngle) * sin(vAngle));
    camera.position.y = (r * sin(hAngle) * sin(vAngle));
    camera.position.z = (r * cos(vAngle)) - Math.PI/2;
    camera.lookAt(origo);
    
    var testTexture = new THREE.TextureLoader().load("pics/test.jpg");
    var testGeometry = new BoxGeometry(1,1,1);
    var testMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0x050505, map: testTexture } );
    var testMesh = new Mesh(testGeometry, testMaterial);
    testMesh.position.y = 0.5;
    // scene.add(testMesh);


    scene.add(createFieldGeometry());
    // generateFieldTable();
}

socket.on('joined', function(obj){//TODO: error code 503 can be a pain in my ass
    fieldTable = obj.fieldTable;
    socket.emit('joined', {socketId: socket.id});
    
    init();
    
    // shaderWtf();
    
    render();
});

var render = function () {
    requestAnimationFrame(render);

    renderer.render(scene, camera);
    stats.update();
    
    // for(var i = 0; i < fieldElements.length; i++){
    //     if(i%2==0) fieldElements[i].rotation.x += 0.005;
    // }
};