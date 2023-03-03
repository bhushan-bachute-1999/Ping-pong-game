//Query selector
let gameState = 'Start';
let rod1 = document.querySelector("#r1");
let rod2 = document.querySelector("#r2");
let ball = document.querySelector(".ball");
let box = document.querySelector(".board");
let btn = document.querySelector(".startGame");
let result = document.querySelector(".result");
let initialBall = document.querySelector(".ball");
let ps1 = document.querySelector(".score1");
let ps2 = document.querySelector(".score2");

//Co-odinates
let ballCoordinate = ball.getBoundingClientRect();
let initialBallCoord = ball.getBoundingClientRect();
let rod1Coordinate = rod1.getBoundingClientRect();
let rod2Coordinate = rod2.getBoundingClientRect();
let boxCoordinate = box.getBoundingClientRect();

let dx = Math.floor(Math.random() * 4) + 2;
let dy = Math.floor(Math.random() * 4) + 2;
let dxd = Math.floor(Math.random() * 2);
let dyd = Math.floor(Math.random() * 2);

let stop = true;
function start(event) {
    if (stop && gameState === 'Start') {
        stop = false;
        gameState = 'Play';
        btn.innerHTML = 'Stop';
        requestAnimationFrame(() => {
            console.log("Move");
            moveBall(dx, dy, dxd, dyd);
        });

    }
    else if (gameState === 'Play') {
        gameState = 'Start';
        stop = true;
        btn.innerHTML = 'Resume';
        ball.style.top = ballCoordinate.top + "px";
        ball.style.left = ballCoordinate.left + "px";
    }

}

document.addEventListener('keydown', function (e) {
    if (gameState == 'Play') {
        if (e.key == 'w' || e.key == 'W') {
            rod1.style.top = Math.max(boxCoordinate.top + 10,
                rod1Coordinate.top - window.innerHeight * 0.06) + 'px';
            rod1Coordinate = rod1.getBoundingClientRect();
        }
        if (e.key == 's' || e.key == 'S') {
            rod1.style.top = Math.min(boxCoordinate.bottom - rod1Coordinate.height - 20,
                rod1Coordinate.top + window.innerHeight * 0.06) + 'px';
            rod1Coordinate = rod1.getBoundingClientRect();
        }
        if (e.key == 'ArrowUp') {
            rod2.style.top = Math.max(boxCoordinate.top + 10,
                rod2Coordinate.top - window.innerHeight * 0.06) + 'px';
            rod2Coordinate = rod2.getBoundingClientRect();
        }
        if (e.key == 'ArrowDown') {
            rod2.style.top = Math.min(boxCoordinate.bottom - rod2Coordinate.height - 20,
                rod2Coordinate.top + window.innerHeight * 0.06) + 'px';
            rod2Coordinate = rod2.getBoundingClientRect();
        }
    }
})
//40 down and 38 up
function moveBall(dx, dy, dxd, dyd) {
    if (ps2.innerHTML == 10) {
        result.classList.add('displayResult');
        result.innerHTML = 'Player 2 wins !!!';
        ballCoordinate = initialBallCoord;
        ball.style = initialBall.style;
        gameState = 'Start';
        return;
    }

    if (ps1.innerHTML == 10) {
        result.classList.add('displayResult');
        result.innerHTML = 'Player 1 wins !!!';
        ballCoordinate = initialBallCoord;
        ball.style = initialBall.style;
        gameState = 'Start';
        return;
    }
    if (stop == false) {
        if (ballCoordinate.top <= boxCoordinate.top) {
            dyd = 1;
        }

        if (ballCoordinate.bottom >= boxCoordinate.bottom) {
            dyd = 0;
        }

        if (ballCoordinate.bottom >= rod1Coordinate.top &&
            ballCoordinate.top <= rod1Coordinate.bottom &&
            ballCoordinate.left <= rod1Coordinate.right) {
            dxd = 1;
            dx = Math.floor(Math.random() * 4) + 3;
            dy = Math.floor(Math.random() * 4) + 3;
        }

        if (ballCoordinate.bottom >= rod2Coordinate.top &&
            ballCoordinate.top <= rod2Coordinate.bottom &&
            ballCoordinate.right >= rod2Coordinate.left) {
            dxd = 0;
            dx = Math.floor(Math.random() * 4) + 3;
            dy = Math.floor(Math.random() * 4) + 3;
        }

        if (ballCoordinate.left <= boxCoordinate.left || ballCoordinate.right >= boxCoordinate.right) {

            if (ballCoordinate.left <= boxCoordinate.left) {
                ps2.innerHTML = +ps2.innerHTML + 1;
                dxd = 1;
                dx = Math.floor(Math.random() * 4) + 3;
                dy = Math.floor(Math.random() * 4) + 3;
            }
            if (ballCoordinate.right >= boxCoordinate.right) {
                ps1.innerHTML = +ps1.innerHTML + 1;
                dxd = 0;
                dx = Math.floor(Math.random() * 4) + 3;
                dy = Math.floor(Math.random() * 4) + 3;              
            }
        }

        ball.style.top = ballCoordinate.top + dy * (dyd == 1 ? 1 : -1) + 'px';
        ball.style.left = ballCoordinate.left + dx * (dxd == 1 ? 1 : -1) + 'px';
        ballCoordinate = ball.getBoundingClientRect();
        requestAnimationFrame(() => {
            moveBall(dx, dy, dxd, dyd);
        });
    }
}