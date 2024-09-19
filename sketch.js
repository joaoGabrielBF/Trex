    var trex
    var trexImagens
    var ground, groundImage;
    var grupoObstaculos, obstaculos, obstaculo1, obstaculo2, obstaculo3, obstaculo4,obstaculo5,obstaculo6;
    var invisibleGround
    var PLAY = 1
    var END = 0
    var gameState = PLAY
    var trexColisao
    var restart, restartImg
    var gameOver, gameOverImg

//função para carregar imagens
function preload(){
    trexImagens = loadAnimation("trex1.png", "trex2.png", "trex3.png", "trex1.png", "trex2.png", "trex3.png" )

    groundImage = loadImage('ground.png')
   
    obstaculo1 = loadImage('obstacle1.png');
    obstaculo2 = loadImage('obstacle2.png');
    obstaculo3 = loadImage('obstacle3.png');
    obstaculo4 = loadImage('obstacle4.png');
    obstaculo5 = loadImage('obstacle5.png');
    obstaculo6 = loadImage('obstacle6.png');

    trexColisao = loadImage('trex_collided.png')

    restartImg = loadImage('restart.png')
    gameOverImg = loadImage('gameOver.png')
}

// serve para criar objetos
function setup(){
    createCanvas(windowWidth, windowHeight)
    
    trex = createSprite(100, height - 100,20,50);
    trex.scale = 1;
    trex.addAnimation("trex_normal",trexImagens) 
    trex.addAnimation('trexColisao', trexColisao)
    // criando sprite do chão
    ground = createSprite(100, height - 50, width, 20)
    ground.addImage("ground", groundImage);
    ground.x = width/2;

    invisibleGround = createSprite(0, height - 30, width, 20)
    invisibleGround.visible = false

    grupoObstaculos = createGroup()

    gameOver = createSprite(width/2, height/2 - 100)
    gameOver.addImage(gameOverImg)
    gameOver.scale = 1
    gameOver.visible = false

    restart = createSprite(width/2, height/2)
    restart.addImage(restartImg)
    restart.scale = 1
    restart.visible = false

    score = 0
}

function draw(){
    background("white")
   
    textSize(50)
    fill("black")
    text('pontuação: '+ score, width/2 -50, height/2 -400)

    trex.velocityY = trex.velocityY + 0.8 
    trex.collide(invisibleGround)

    if(gameState === PLAY){
      
        score = score + Math.round(getFrameRate()/ 60)
        if(keyDown("space") && trex.y >= height -180){
            trex.velocityY = -12
           }
        
           ground.velocityX = -(6 * score/100)
           if(ground.x < 0){
            ground.x = width/2;
           }
        
           spawnObstacle()
    
        if(trex.isTouching(grupoObstaculos)){
                gameState = END
        }

    }
    //FIM DO ESTADO DE JOGO PLAY

    else if(gameState === END){
        grupoObstaculos.setVelocityXEach(0)
        ground.velocityX = 0;

        score = 0

        grupoObstaculos.setLifetimeEach(-1)

        trex.changeAnimation("trexColisao",trexColisao)

        restart.visible = true
        gameOver.visible = true

        if(mousePressedOver(restart)){
            reset()
        }


    }
    drawSprites();
}

function spawnObstacle(){
   if(frameCount % 60 === 0){
        obstaculos = createSprite(width, height -70, 10, 40)
        obstaculos.scale = 0.7

        obstaculos.velocityX = -6

        var rand = Math.round(random(1,6))
    
        switch(rand){
            case 1: obstaculos.addImage(obstaculo1)
            break

            case 2: obstaculos.addImage(obstaculo2)
            break

            case 3: obstaculos.addImage(obstaculo3)
            break

            case 4: obstaculos.addImage(obstaculo4)
            break

            case 5: obstaculos.addImage(obstaculo5)
            break

            case 6: obstaculos.addImage(obstaculo6)
            break

            default:break
        }
    obstaculos.lifetime = 600    
    grupoObstaculos.add(obstaculos)
    }
}
function reset(){
    gameState = PLAY
    gameOver.visible = false
    restart.visible = false
    grupoObstaculos.destroyEach()
    trex.changeAnimation('trex_normal', trexImagens)
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight)
}