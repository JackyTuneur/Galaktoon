
function preload() {
  loadAssets(ressourceToLoad);
}


function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  noSmooth();
  frameRate(fps);
  textFont(pixelFont)
}

function draw() {
    cursor('auto') // Resetting the cursor to auto
    if(ressourceIsLoaded === true){
        switch(actualEngine){
            case EngineOne :
                // Code executing if actualEngine is the first one (in this case it's the 2D Top down Engine)
                runEngineOne()
                break;
            case EngineTwo :
                // Code executing if actualEngine is the second one
                runEngineTwo()
                break;
            default :
                throw new Error("Actual Engine isnt set");
                break;
        }
        runInputManager();
    }
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}