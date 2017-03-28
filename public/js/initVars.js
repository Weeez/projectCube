var socket = io();

var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;
var scrollerWidth = 5;

var container, stats;
var thisSocket = undefined;
var playerCubes = {};
var playerPos = {};

var fieldTableSize = 0;
var fieldElements = [];
var lastPressedKey = undefined;

//THREE.js stuffs
var scene = new THREE.Scene();
// var camera = new THREE.PerspectiveCamera(1, window.innerWidth / window.innerHeight, 10, 100);
var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 100 );
var renderer = new THREE.WebGLRenderer({
    antialias: true
});

var Mesh = THREE.Mesh;
var Material = THREE.MeshBasicMaterial;
var Vector3 = THREE.Vector3;
var Vector2 = THREE.Vector2;
var Geometry = THREE.Geometry;
var Face3 = THREE.Face3;
var BoxGeometry = THREE.BoxGeometry;
var BufferGeometry = THREE.BufferGeometry;
var ShaderMaterial = THREE.ShaderMaterial;
var BufferAttribute = THREE.BufferAttribute;
var AmbientLight = THREE.AmbientLight;
var DirectionalLight = THREE.DirectionalLight;

var keyPressed = {};
var keyEventDatas = {
    r: 17,
    horizontalAngle: (Math.PI / 2),
    // newHorizontalAngle: (Math.PI / 500),
    verticalAngle: -1 * (Math.PI / 17),
    // newVerticalAngle: (Math.PI / 500),
}

var origo = new Vector3(0, 0, 0);