var socket = io();

var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;
var scrollerWidth = 17;

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();

var Mesh = THREE.Mesh;
var Material = THREE.MeshBasicMaterial;
var Vector3 = THREE.Vector3;
var Vector2 = THREE.Vector2;
var Geometry = THREE.Geometry;
var Face3 = THREE.Face3;
var BoxGeometry = THREE.BoxGeometry;

document.addEventListener('keyup', function(e){
    
});
document.addEventListener('keydown', function(e){
    
});

function createFieldGeometry(){
    var fieldTexture = new THREE.TextureLoader().load("pics/asd.jpg");
    
    var fieldGeometry = new Geometry();
    
    fieldGeometry.vertices.push(new Vector3(0,0,0));
    fieldGeometry.vertices.push(new Vector3(1,0,0));
    fieldGeometry.vertices.push(new Vector3(1,1,0));
    fieldGeometry.vertices.push(new Vector3(0,1,0));
    
    fieldGeometry.faces.push(new Face3(0,1,3));
    fieldGeometry.faces.push(new Face3(1,2,3));
    
    var fieldUvs = [];
    fieldUvs.push(new Vector2(0.0, 0.0));
    fieldUvs.push(new Vector2(1.0, 0.0));
    fieldUvs.push(new Vector2(1.0, 1.0));
    fieldUvs.push(new Vector2(0.0, 1.0));
    fieldGeometry.faceVertexUvs[0].push([fieldUvs[0], fieldUvs[1], fieldUvs[3]]);
    fieldGeometry.faceVertexUvs[0].push([fieldUvs[1], fieldUvs[2], fieldUvs[3]]);
    
    var fieldMaterial = new Material({map: fieldTexture});
    
    return new Mesh(fieldGeometry, fieldMaterial);
}

function addCubeGeometry(){
    var geometry = new BoxGeometry(1, 1, 1);
    var material = new Material({color: 0x00ff00});
    var cube = new Mesh(geometry, material);
    return cube;
}

var tmp = createFieldGeometry();

socket.on('joined', function(obj){//TODO: error code 503 can be a pain in my ass
    socket.emit('joined', {socketId: socket.id});
    
    camera.position.z = 5;

    renderer.setSize(window.innerWidth - scrollerWidth, window.innerHeight - scrollerWidth);
    document.body.appendChild(renderer.domElement);


    scene.add(tmp);
    // scene.add(addCubeGeometry());
});

var render = function () {
    requestAnimationFrame(render);

    renderer.render(scene, camera);
};

render();
		