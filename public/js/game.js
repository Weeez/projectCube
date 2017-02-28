var socket = io();

var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;
var scrollerWidth = 17;

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth - scrollerWidth, window.innerHeight - scrollerWidth);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

socket.on('joined', function(obj){
    console.log(obj.asd);
    
    socket.emit('joined', {szopki: "szopki"});
});

var render = function () {
    requestAnimationFrame(render);

    renderer.render(scene, camera);
};

render();
		