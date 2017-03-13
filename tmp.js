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

/*
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
        
        0.0, -1.0, 0.0,
        1.0, -1.0, 0.0,
        1.0, 0.0, 0.0,
        0.0, 0.0, 0.0,
*/

/*
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
        
        0.0, 0.0, //0
        1.0, 0.0, //1
        1.0, 1.0, //2
        0.0, 1.0, //3
*/
/*
        0, 1, 2,
        2, 3, 0,
        
        4, 5, 6,
        6, 7, 4,

        8, 9, 10,
        10, 11, 8,
        
        12, 13, 14,
        14, 15, 12
*/