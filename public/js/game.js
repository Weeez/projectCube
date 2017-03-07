var socket = io();

var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;
var scrollerWidth = 5;

var container, stats;

var fieldTable = [];

//THREE.js stuffs
var scene = new THREE.Scene();
// var camera = new THREE.PerspectiveCamera(1, window.innerWidth / window.innerHeight, 10, 100);
var camera = new THREE.PerspectiveCamera( 27, window.innerWidth / window.innerHeight, 0.1, 1000 );
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

// document.addEventListener('keyup', function(e){
    
// });
// document.addEventListener('keydown', function(e){
//     if(e.keyCode == 38){
//         camera.position.y =  5*Math.sin(3.14/10);
//         camera.position.z =  5*Math.cos(3.14/10);
//         /*
//             kamera x koordinátája: kocka x pozíciója + sugár * sin ( fordulás szöge)
//             kamera z koordinátája: kocka z pozíciója + sugár * cos ( fordulás szöge)
//         */
//     }
// });
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
            // scene.add(createFieldGeometry(fieldTable[i][j]));
        }
    }
    
    console.log(counter);
}

function addAxisCubeGeometry(obj){
    var geometry = new BoxGeometry(obj.x, obj.y, obj.z);
    var material = new Material({color: obj.color, transparent: true, opacity: 0.2});
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
        fragmentShader: fragmentShader
    });
    
    var vertices = new Float32Array([
        0.0, 0.0, 0.0,
        1.0, 0.0, 0.0,
        0.0, 0.0, -1.0,
        
        1.0, 0.0, 0.0,
        1.0, 0.0, -1.0,
        0.0, 0.0, -1.0
    ]);
    
    fieldGeometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
    
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
}

socket.on('joined', function(obj){//TODO: error code 503 can be a pain in my ass
    fieldTable = obj.fieldTable;
    socket.emit('joined', {socketId: socket.id});
    
    init();
    
    camera.position.z = 5;
    // camera.position.y = 5;
    camera.position.y = 20;
    camera.position.x = -1;
    camera.lookAt(new Vector3(0,0,0));

    scene.add(addAxisCubeGeometry({x:1000, y:0.1, z: 0.1, color:"rgba(0,255,0)"}));
    scene.add(addAxisCubeGeometry({x:0.1, y:1000, z: 0.1, color:"rgba(255,0,0)"}));
    scene.add(addAxisCubeGeometry({x:0.1, y:0.1, z: 1000, color:"rgba(0,0,255)"}));

    generateFieldTable();
    
    // shaderWtf();
    
    render();
});

var render = function () {
    requestAnimationFrame(render);

    renderer.render(scene, camera);
    stats.update();
};

		