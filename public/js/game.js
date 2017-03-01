var socket = io();

var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;
var scrollerWidth = 17;

var fieldTableSize= 11;
var fieldTable = [];

//THREE.js stuffs
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
    if(e.keyCode == 38){
        camera.position.y =  5*Math.sin(3.14/10);
        camera.position.z =  5*Math.cos(3.14/10);
        /*
            kamera x koordinátája: kocka x pozíciója + sugár * sin ( fordulás szöge)
            kamera z koordinátája: kocka z pozíciója + sugár * cos ( fordulás szöge)
        */
    }
});

function createFieldGeometry(){
    var fieldTexture = new THREE.TextureLoader().load("pics/border.png");
    
    var fieldGeometry = new Geometry();
    
    fieldGeometry.vertices.push(new Vector3(0,0,0));
    fieldGeometry.vertices.push(new Vector3(1,0,0));
    fieldGeometry.vertices.push(new Vector3(1,0,-1));
    fieldGeometry.vertices.push(new Vector3(0,0,-1));
    
    fieldGeometry.faces.push(new Face3(0,1,3));
    fieldGeometry.faces.push(new Face3(1,2,3));
    
    var fieldUvs = [];
    fieldUvs.push(new Vector2(0.0, 0.0));
    fieldUvs.push(new Vector2(1.0, 0.0));
    fieldUvs.push(new Vector2(1.0, 1.0));
    fieldUvs.push(new Vector2(0.0, 1.0));
    fieldGeometry.faceVertexUvs[0].push([fieldUvs[0], fieldUvs[1], fieldUvs[3]]);
    fieldGeometry.faceVertexUvs[0].push([fieldUvs[1], fieldUvs[2], fieldUvs[3]]);
    
    var fieldMaterial = new Material({color: "gray" , map: fieldTexture});
    
    return new Mesh(fieldGeometry, fieldMaterial);
}

function generateFieldTable(){
    var posX = (-1*(Math.floor(fieldTableSize/2)))-0.5;
    var posZ = (-1*(Math.floor(fieldTableSize/2)))+0.5;
    for(var i = 0; i < fieldTableSize; i++){
        var row = [];
        for(var j = 0; j < fieldTableSize; j++){
            var field = createFieldGeometry();
            field.position.x = posX+i;
            field.position.z = posZ+j;
            row.push(field);
        }
        fieldTable.push(row);
    }
    
    for(var i = 0; i < fieldTable.length; i++){
        for(var j = 0; j < fieldTable[i].length; j++){
            scene.add(fieldTable[i][j]);
        }
    }
}

function addCubeGeometry(obj){
    var geometry = new BoxGeometry(obj.x, obj.y, obj.z);
    var material = new Material({color: obj.color, transparent: true, opacity: 0.2});
    var cube = new Mesh(geometry, material);
    return cube;
}

socket.on('joined', function(obj){//TODO: error code 503 can be a pain in my ass
    socket.emit('joined', {socketId: socket.id});
    
    camera.position.z = 5;
    camera.position.y = 5;
    camera.lookAt(new Vector3(0,0,0));

    renderer.setSize(window.innerWidth - scrollerWidth, window.innerHeight - scrollerWidth);
    document.body.appendChild(renderer.domElement);

    scene.add(addCubeGeometry({x:1000, y:0.1, z: 0.1, color:"rgba(0,255,0)"}));
    scene.add(addCubeGeometry({x:0.1, y:1000, z: 0.1, color:"rgba(255,0,0)"}));
    scene.add(addCubeGeometry({x:0.1, y:0.1, z: 1000, color:"rgba(0,0,255)"}));

    generateFieldTable();
    // scene.add(addCubeGeometry());
});

var render = function () {
    requestAnimationFrame(render);

    renderer.render(scene, camera);
};

render();
		