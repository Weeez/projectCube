var socket = io();

var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;
var scrollerWidth = 17;

var fieldTable = [];

//THREE.js stuffs
var scene = new THREE.Scene();
// var camera = new THREE.PerspectiveCamera(1, window.innerWidth / window.innerHeight, 10, 100);
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.setClearColor(0x99bffc);
renderer.setSize(windowWidth, windowHeight);
//     renderer.gammaInput = true;
// 	renderer.gammaOutput = true;

var Mesh = THREE.Mesh;
var Material = THREE.MeshBasicMaterial;
var Vector3 = THREE.Vector3;
var Vector2 = THREE.Vector2;
var Geometry = THREE.Geometry;
var Face3 = THREE.Face3;
var BoxGeometry = THREE.BoxGeometry;
var BufferGeometry = THREE.BufferGeometry;

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

// function createFieldGeometry(obj){
//     var fieldTexture = new THREE.TextureLoader().load("pics/border.png");
    
//     var fieldGeometry = new Geometry();
    
//     fieldGeometry.vertices.push(new Vector3(0,0,0));
//     fieldGeometry.vertices.push(new Vector3(1,0,0));
//     fieldGeometry.vertices.push(new Vector3(1,0,-1));
//     fieldGeometry.vertices.push(new Vector3(0,0,-1));
    
//     fieldGeometry.faces.push(new Face3(0,1,3));
//     fieldGeometry.faces.push(new Face3(1,2,3));
    
//     var fieldUvs = [];
//     fieldUvs.push(new Vector2(0.0, 0.0));
//     fieldUvs.push(new Vector2(1.0, 0.0));
//     fieldUvs.push(new Vector2(1.0, 1.0));
//     fieldUvs.push(new Vector2(0.0, 1.0));
//     fieldGeometry.faceVertexUvs[0].push([fieldUvs[0], fieldUvs[1], fieldUvs[3]]);
//     fieldGeometry.faceVertexUvs[0].push([fieldUvs[1], fieldUvs[2], fieldUvs[3]]);
    
//     var fieldMaterial = new Material({color: "gray" , map: fieldTexture});
    
//     var fieldMesh = new Mesh(fieldGeometry, fieldMaterial);
    
//     fieldMesh.position.x = obj.x;
//     fieldMesh.position.z = obj.z;
    
//     return fieldMesh;
// }

function createFieldGeometry(obj){
    // var fieldTexture = new THREE.TextureLoader().load("pics/border.png");
    var fieldTexture = new THREE.ImageUtils.loadTexture("pics/border.png");
    
    var fieldGeometry = new BufferGeometry();
    
    // fieldGeometry.vertices.push(new Vector3(0,0,0));
    // fieldGeometry.vertices.push(new Vector3(1,0,0));
    // fieldGeometry.vertices.push(new Vector3(1,0,-1));
    // fieldGeometry.vertices.push(new Vector3(0,0,-1));
    var vertices = new Float32Array([
        0.0, 0.0, 0.0,
        1.0, 0.0, 0.0,
        0.0, 0.0, -1.0,
        
        1.0, 0.0, 0.0,
        1.0, 0.0, -1.0,
        0.0, 0.0, -1.0
    ]);
    
    var uvs = new Float32Array([
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0
    ]);
    
    // fieldGeometry.faces.push(new Face3(0,1,3));
    // fieldGeometry.faces.push(new Face3(1,2,3));
    
    // var fieldUvs = [];
    // fieldUvs.push(new Vector2(0.0, 0.0));
    // fieldUvs.push(new Vector2(1.0, 0.0));
    // fieldUvs.push(new Vector2(1.0, 1.0));
    // fieldUvs.push(new Vector2(0.0, 1.0));
    // fieldGeometry.faceVertexUvs[0].push([fieldUvs[0], fieldUvs[1], fieldUvs[3]]);
    // fieldGeometry.faceVertexUvs[0].push([fieldUvs[1], fieldUvs[2], fieldUvs[3]]);
    
    // var colors = []
    
    fieldGeometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
    fieldGeometry.addAttribute('uv', new THREE.BufferAttribute(uvs, 3));
    
    var fieldMaterial = new THREE.MeshPhongMaterial({color: 0xd3d3d3 /*, map: fieldTexture*/});
    
    var fieldMesh = new Mesh(fieldGeometry, fieldMaterial);
    
    fieldMesh.position.x = obj.x;
    fieldMesh.position.z = obj.z;
    
    return fieldMesh;
}

function generateFieldTable(){
    for(var i = 0; i < fieldTable.length; i++){
        for(var j = 0; j < fieldTable[i].length; j++){
            scene.add(createFieldGeometry(fieldTable[i][j]));
        }
    }
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
        fragmentShader: fragmentShader
    });
    
    var geometry = new BufferGeometry();
    
    var vertices = new Float32Array([
        0.0, 0.0, 0.0,
        1.0, 0.0, 0.0,
        0.5, 1.0, 0.0,
    ]);
    
    geometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
    
    var mesh = new THREE.Mesh(geometry,material);
    // mesh.position.z = -200;
    // mesh.position.y = -100;
    mesh.position.z = 0;
    mesh.position.y = 0;
    
    scene.add(mesh);
}

socket.on('joined', function(obj){//TODO: error code 503 can be a pain in my ass
    fieldTable = obj.fieldTable;
    socket.emit('joined', {socketId: socket.id});
    
    camera.position.z = 5;
    camera.position.y = 5;
    camera.position.x = -1;
    camera.lookAt(new Vector3(0,0,0));

    // renderer.setSize(window.innerWidth - scrollerWidth, window.innerHeight - scrollerWidth);

    document.body.appendChild(renderer.domElement);

    scene.add(addAxisCubeGeometry({x:1000, y:0.1, z: 0.1, color:"rgba(0,255,0)"}));
    scene.add(addAxisCubeGeometry({x:0.1, y:1000, z: 0.1, color:"rgba(255,0,0)"}));
    scene.add(addAxisCubeGeometry({x:0.1, y:0.1, z: 1000, color:"rgba(0,0,255)"}));

    // generateFieldTable();
    // scene.add(addCubeGeometry());
    
    
    // scene.add(shaderTest());
    
    shaderWtf();
    
    render();
});

var render = function () {
    requestAnimationFrame(render);

    // tmp.rotation.x += 10;

    renderer.render(scene, camera);
};


		