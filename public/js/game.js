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
var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
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
    r: 5,
    angle: 0,
    newAngle: (Math.PI / 150)
}

var origo = new Vector3(0,0,0);

document.addEventListener('keydown', function(e){
    keyPressed[e.keyCode] = true;
}, false);


document.addEventListener('keyup', function(e){
    keyPressed[e.keyCode] = false;
}, false);

window.addEventListener("keydown", function(e){
        e.preventDefault();
    
});

function keyLogic(){
    if(keyPressed[37]){ // left
        keyEventDatas.angle += keyEventDatas.newAngle;
                
        var angle = keyEventDatas.angle;
        var r = keyEventDatas.r;
                
        camera.position.x = r * Math.sin(angle);
        camera.position.z = r * Math.cos(angle);
        camera.lookAt(origo);
    }
    if(keyPressed[39]){
        keyEventDatas.angle -= keyEventDatas.newAngle;
                
        var angle = keyEventDatas.angle;
        var r = keyEventDatas.r;
                
        camera.position.x = r * Math.sin(angle);
        camera.position.z = r * Math.cos(angle);
        camera.lookAt(origo);
    }
    setTimeout(keyLogic, 5);
}

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

var tmp = undefined;

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
    
    var fieldGeometry = new BufferGeometry();
    var fieldMaterial = new ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        vertexColors: THREE.VertexColors
        // side: THREE.DoubleSide
    });
    
    var vertices = new Float32Array([
        0.0, 0.0, 0.0,
        1.0, 0.0, 0.0,
        0.0, 0.0, -1.0,
        
        1.0, 0.0, 0.0,
        1.0, 0.0, -1.0,
        0.0, 0.0, -1.0
    ]);
    
    var colors = new Float32Array([
        1.0, 0.0, 0.0,
        1.0, 1.0, 0.0,
        0.0, 0.0, 1.0,
        
        1.0, 1.0, 0.0,
        1.0, 1.0, 1.0,
        0.0, 0.0, 1.0
    ]);
    
    // function disposeArray() { this.array = null; }
    
    fieldGeometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
    fieldGeometry.addAttribute('color', new THREE.BufferAttribute( colors, 3 ));
    
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
    light1.position.set( 1, 1, 1 );
	scene.add( light1 );
	
	var light2 = new THREE.DirectionalLight( 0xffffff, 1.5 );
	light2.position.set( 0, -1, 0 );
	scene.add( light2 );
    
    var angle = keyEventDatas.angle;
    var r = keyEventDatas.r;
                
    camera.position.x = r * Math.sin(angle);
    camera.position.y = 4;
    camera.position.z = r * Math.cos(angle);
    camera.lookAt(origo);
    
    scene.add(addAxisCubeGeometry({x:1000, y:0.1, z: 0.1, color:"rgba(0,255,0)"}));
    scene.add(addAxisCubeGeometry({x:0.1, y:1000, z: 0.1, color:"rgba(255,0,0)"}));
    scene.add(addAxisCubeGeometry({x:0.1, y:0.1, z: 1000, color:"rgba(0,0,255)"}));

    generateFieldTable();
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
    //     fieldElements[i].rotation.z += 0.05;
    // }
};

window.onload = function(){
    keyLogic();
}