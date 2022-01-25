// Sound, Speed and Score 
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const movementSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
let Direction = {x: 0, y: 0}; 
let speed = 15;
let score = 0;
let lastPaintTime = 0;
let snakeArray = [
    {x: 13, y: 15}
];
food = {x: 6, y: 7};


// Snake game functions
function main(ctime) {
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollision(snake) {
    // When snake collides with itself
    for (let i = 1; i < snakeArray.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // When snake collides with the wall
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
    return false;
}

function gameEngine(){
    // Snake array & Food
    if(isCollision(snakeArray)){
        gameOverSound.play();
        musicSound.pause();
        Direction =  {x: 0, y: 0}; 
        alert("GAME OVER. Press any key to play again!!");
        snakeArray = [{x: 13, y: 15}];
        musicSound.play();
        score = 0; 
    }

    // Score and food regeneration
    if(snakeArray[0].y === food.y && snakeArray[0].x ===food.x){
        foodSound.play();
        score += 1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "Hi-Score: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArray.unshift({x: snakeArray[0].x + Direction.x, y: snakeArray[0].y + Direction.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }

    //Snake movement
    for (let i = snakeArray.length - 2; i>=0; i--) { 
        snakeArray[i+1] = {...snakeArray[i]};
    }

    snakeArray[0].x += Direction.x;
    snakeArray[0].y += Direction.y;

    // Snake Diplay
    snakeBoard.innerHTML = "";
    snakeArray.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        snakeBoard.appendChild(snakeElement);
    });

    //Food Display
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    snakeBoard.appendChild(foodElement);


}


// Game Logic
musicSound.play();
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "Hi-Score: " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    Direction = {x: 0, y: 1} // Start the game
    movementSound.play();
    switch (e.key) {
        case "ArrowUp":
            Direction.x = 0;
            Direction.y = -1;
            break;

        case "ArrowDown":
            Direction.x = 0;
            Direction.y = 1;
            break;

        case "ArrowLeft":
            Direction.x = -1;
            Direction.y = 0;
            break;

        case "ArrowRight":
            Direction.x = 1;
            Direction.y = 0;
            break;
        default:
            break;
    }

});