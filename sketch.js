var balloon,balloonimg1,balloonimg2,database,height,bg
function preload(){
  bg=loadImage("cityImage.png")
  balloonimg1=loadAnimation("HotAirBallon-01.png")
  balloonimg2=loadAnimation("HotAirBallon-01.png","HotAirBallon-01.png","HotAirBallon-02.png","HotAirBallon-02.png","HotAirBallon-03.png","HotAirBallon-03.png")
}

function setup() {
  createCanvas(1500,700);
  database=firebase.database()
   balloon=createSprite(250, 650, 150, 150);
   balloon.addAnimation("hotairballoon",balloonimg1)
   balloon.scale=0.5
var balloonHeight=database.ref("Balloon/Height")
balloonHeight.on("value",readHeight,showError)
  }

function draw() {
  background(bg);  
  if(keyDown(LEFT_ARROW)){
    updateHeight(-10,0)
    balloon.addAnimation("hotairballoon",balloonimg2)
  }
   else if(keyDown(RIGHT_ARROW)){
    updateHeight(+10,0)
    balloon.addAnimation("hotairballoon",balloonimg2)
  }
   else if(keyDown(UP_ARROW)){
    updateHeight(0,-10)
    balloon.addAnimation("hotairballoon",balloonimg2)
  balloon.scale=balloon.scale-0.005
  }
   else if(keyDown(DOWN_ARROW)){
    updateHeight(0,+10)
    balloon.addAnimation("hotairballoon",balloonimg2)
    balloon.scale=balloon.scale+0.005
  }
  drawSprites();
  textSize(25)
  text("Use The Arrow Keys To Move The Hot Air Balloon",40,40)
}
function readHeight(data){
  height=data.val()
  balloon.x=height.x
  balloon.y=height.y
}
function showError(){
  console.log("error in reading database")
}
function updateHeight(x,y){
  database.ref('Balloon/Height').set({
    'x':height.x+x,
    'y':height.y+y
  })
}