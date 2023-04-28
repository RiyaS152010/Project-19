var skyImg, sky
var fairy, fairyImg
var flower1, flowerImg1
var gameState = "play"
var score=0


function preload(){
skyImg = loadImage("sky.jpg")
flowerImg1 = loadImage("flower1.png")
fairyImg = loadImage("fairy.png")
}

function setup() {
 createCanvas(600,600)

 sky = createSprite(300,300)
 sky.addImage("sky", skyImg)
 fairy = createSprite (200,370,50,50)
 fairy.scale = 0.03
 fairy.addImage("fairy", fairyImg)
 flowersGroup = new Group()
 fairy.setCollider("circle")
 fairy.collider.scale = 0.6
}

function draw() {
background(0)

drawSprites()
fill("red")
stroke("red")
textSize(20)
text("Score: "+ score,450,70);

if (gameState === "play"){

    sky.velocityY= 1
    score= score + Math.round(getFrameRate()/50)
    if(keyDown("left_arrow"))
    fairy.x = fairy.x - 3
    
    if (keyDown("right_arrow"))
    fairy.x = fairy.x + 3

    if (keyDown("up_arrow"))
    fairy.velocityY = -10
    
    spawnFlowers()

 }

fairy.velocityY = fairy.velocityY + 0.8
 
if (sky.y > 400 ){
sky.y = height/2
}

if (fairy.y > 600 || fairy.isTouching(flowersGroup)){
    fairy.destroy()
    gameState = "end"
}


if (gameState === "end"){
    stroke("red")
    fill("red")
    textSize(40)
    text("GAME OVER! YOU DIED!", 50, 250)
    score = 0
}

}






function spawnFlowers(){
    if (World.frameCount % 100 == 0){
        var flower= createSprite(Math.round(random(20,600)))
        flower.addImage(flowerImg1)
        flower.scale= 0.07
        flower.velocityY= 3
        flower.setLifetime = 100
        flowersGroup.add (flower)
    }
}

