const loadNewMap = (mapToLoad, start) => {
    if(mapToLoad.id >= 0)
    {
        playerOnMap = mapToLoad;
        actualPlayerMap = mapToLoad.map;
        playerVector = getCoordWithTileCoord(start[0], start[1]);
        cameraVector = createVector(windowWidth/2, windowHeight/2);
        mapVector = createVector(0,0);
    }
}

const getTileCoordWithCoord = (x, y) => [x / tileSize, y / tileSize]

const getCoordWithTileCoord = (x, y) => createVector(x*tileSize, y*tileSize)
//This function takes maptoload and start because start can be different for 1 map (ex : map can have a start on the right and on the top)