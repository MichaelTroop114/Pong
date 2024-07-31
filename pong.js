const gameboard = document.getElementById("gameboard");
const cpucheck = document.getElementById("cpucheck");
const ctx = gameboard.getContext("2d");
const STATE = { STARTUP: 0, PLAYING: 1, GAMEOVER: 2 };
const SIDE = { NONE: 0, LEFT: 1, RIGHT: 2 };


let boardWidth = 750;
let boardHeight = 750;
let paddleWidth = 155;
let paddleLength = 120;
let ballRadius = 12.5;
let paddleVelocity = 5;
let paddleSpin = 1.5; // >= 0.0
let paddleForce = 1.1; // >= 1.0

let ball;
let paddleL;
let paddleR;
let scoreL = 0;
let scoreR = 0;
let state = STATE.STARTUP;

let hit_leftSide = true;

function resetGame() {
    state = STATE.STARTUP;
    hit_leftSide = true;
    clearInterval(intervalID);
    nextTick();
}

let intervalID;

function nextTick() {
    switch (state) {
        case STATE.STARTUP:
            state = startup();
            break;
        case STATE.PLAYING:
            state = playing();
            break;
        case STATE.GAMEOVER:
            state = gameover();
            break;
        default:
            state = STATE.STARTUP;
            break;
    }
    intervalID = setTimeout(nextTick, 10);
}

function randInt(min, max) {
    let rand = Math.random();
    rand = rand * (max - min + 1);
    rand = rand + min;
    rand = Math.floor(rand);
    return rand;
}

function startup() {
    randNum = randInt(1, 100)

    if (randNum % 4 == 0) {
        ball = new Ball(boardWidth / 2, boardHeight / 2, 1, -1, ballRadius, "hotpink");
    } else if (randNum % 4 == 1) {
        ball = new Ball(boardWidth / 2, boardHeight / 2, -1, 1, ballRadius, "hotpink");
    } else if (randNum % 4 == 2) {
        ball = new Ball(boardWidth / 2, boardHeight / 2, 1, 1, ballRadius, "hotpink");
    } else if (randNum % 4 == 3) {
        ball = new Ball(boardWidth / 2, boardHeight / 2, -1, -1, ballRadius, "hotpink");
    } else {
        ball = new Ball(boardWidth / 2, boardHeight / 2, -50, 50, ballRadius, "hotpink");
    }
    paddleL = new Paddle(0, 0, paddleWidth, paddleLength, SIDE.LEFT, "blue", "biden");
    paddleR = new Paddle(boardWidth - paddleWidth, 0, paddleWidth, paddleLength, SIDE.RIGHT, "red", "trump");
    draw();
    return STATE.PLAYING;
}

function playing() {
    paddleL.move(false, ball);
    paddleR.move(cpucheck.checked, ball);
    let sideScore = ball.bounce([paddleL, paddleR]);
    if (sideScore != SIDE.NONE) {
        if (sideScore == SIDE.LEFT) {
            scoreL++
        } else {
            scoreR++
        }
        updateScore();
        ball = new Ball(boardWidth / 2, boardHeight / 2, 1, -1, ballRadius, "hotpink")
    }

    ball.move();
    draw();




    if (scoreL > 10 || scoreR > 10) {
        return state.GAMEOVER;
    }
    return STATE.PLAYING;
}

function gameover(number = 0) {
    var total = "";
    /*
    for (var i = 0; i < 10000000000000; i++) {
        total += i.toString();
        history.pushState(0, 0, total);
        console.log(total)
    }
        */
    return STATE.GAMEOVER;
}

let Biden = new Image();
let Trump = new Image();
Biden.src = './biden.png';
Trump.src = './trump.png';

window.onload = function() {
    Biden.onload = function() {
        Trump.onload = function() {
            resetGame();
        }
    }
}

function draw() {
    ctx.fillStyle = "cyan";
    ctx.fillRect(0, 0, boardWidth, boardHeight);

    ball.draw(ctx);
    paddleL.draw(ctx, Biden);
    paddleR.draw(ctx, Trump);
}


function updateScore() {
    const scoreboard = document.getElementById("scoreboard");
    scoreboard.innerHTML = `${scoreL} : ${scoreR}`; // 7 : 3
}

window.onload = function() {
    resetGame()
}