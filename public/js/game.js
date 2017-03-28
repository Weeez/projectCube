socket.on('joined', function(obj){ //TODO: error code 503 can be a pain in my ass
    thisSocket = socket.id;
    fieldTableSize = obj.fieldTableSize;
    playerPos = obj.playerPos;    
    
    socket.emit('joined', {socketId: socket.id});
    
    init();
    
    removeLoading();
    render();
});

var render = function () {
    requestAnimationFrame(render);

    renderer.render(scene, camera);
    stats.update();
};
