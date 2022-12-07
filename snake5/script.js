let nrSquares = 256;
let boardSize = 16;
let game = document.createElement('div');
let currentSnake = [2, 1, 0];
let bateSquare;
let snakeSpeed = 1;
let direction = 1;
let lg = 3;
let bate = -1;
let score = 0;
let startInterval = 1000;
let interval = 0;

function createGameboard(){
  let boardElement = document.createElement('div');
  boardElement.classList = "game-board";
  boardElement.id = "gameBoard";
  return boardElement;
}
  
function newSquare(x){
  let cell = document.createElement('div');
  cell.classList.add("square");
  cell.id = x;
  return cell;
}

function generateBatePosition(nrSquares){
  
  let bateSquare = Math.floor(Math.random() * nrSquares);
  for(let i = 0; i <= 2; ++i){
    if(bateSquare === currentSnake[i]){
       bateSquare = Math.floor(Math.random() * nrSquares);
    }
  }
  document.getElementById(bateSquare).classList.add('bate');
  return bateSquare;
}

function moveSnake(direction){
    
  currentSnake.unshift(currentSnake[0] + direction);
  document.getElementById(currentSnake[0]).classList.add('snakeHead');
  document.getElementById(currentSnake[1]).classList.remove('snakeHead');
  document.getElementById(currentSnake[1]).classList.add('snake');
      
  if(checkBate(bate) === 0){
    document.getElementById(currentSnake.pop()).classList.remove('snake'); 
    clearInterval(interval); 
    startInterval = startInterval * snakeSpeed;
    interval = setInterval(moveStatus,startInterval);
    } else {
      ++score;
      ++lg;
      document.getElementById(currentSnake.pop()).classList.remove('snake');
      document.getElementById("score").innerText = score ;
      currentSnake.push(currentSnake[lg-score-1]);
      document.getElementById(currentSnake[lg-1-score]).classList.add('snake');
      document.getElementById(bate).classList.remove('bate');
      ++lg;
      clearInterval(interval); 
      startInterval = startInterval * snakeSpeed;
      interval = setInterval(moveStatus,startInterval);
      bate = generateBatePosition(nrSquares);
    }
}

function checkGameOver(direction){
  
  if(direction === 1 && (currentSnake[0] % boardSize) === boardSize - 1){
    return 1;
  }
  if(currentSnake[0]  % boardSize === 0 && direction === -1){
    return 1;
  }
  if(direction ===  -16 && currentSnake[0] % boardSize === currentSnake[0] ){
    return 1;
  }
  if( direction === 16 && (currentSnake[0] % nrSquares)  === currentSnake[0] && currentSnake[0] >= boardSize * (boardSize - 1)){
    return 1;
  }
  if(document.getElementById(currentSnake[0]).classList.contains('snake')){
    return 1;
  }
  return 0;
}

function moveStatus(){
  
  if(checkGameOver(direction) === 1){
    document.getElementById("score").innerText = "YOU LOST";
    return clearInterval(interval);
  }else{
    moveSnake(direction);
  }
}

function drawSnake(lg){
  
  for(let i = 0; i < lg; ++i){
    if(i === 0){
      document.getElementById(currentSnake[i]).classList.add('snakeHead');
    }else{
      document.getElementById(currentSnake[i]).classList.add('snake');
    }
  }
}

function checkBate(bate){
  
  if(currentSnake[0] === bate){
    return 1;
  }
  return 0;
}
  
function newGame(){
  
  game = document.createElement('div');
  document.getElementById("score").innerText = "0";
  currentSnake = [2, 1, 0];
  bateSquare;
  snakeSpeed = 1;
  direction = 1;
  lg = 3;
  bate = -1;
  score = 0;
  startInterval = 1000;
  interval = 0;

  game = createGameboard();
  for (let i = 0; i < nrSquares; i++) {
    game.appendChild(newSquare(i));
  }
  document.body.appendChild(game);
  bate = generateBatePosition(nrSquares);
  drawSnake(lg);
  moveSnake(direction);
  document.addEventListener("keydown", event =>{
    switch(event.key){
      case 'ArrowUp' :
        if(direction !== 16){
          direction = -16;
          break;
        } 
      case 'ArrowDown' :
        if(direction !== -16){
          direction = 16;
          break;
        } 
      case 'ArrowRight' :
        if(direction !== -1){
          direction = 1;
          break;
        } 
      case 'ArrowLeft' :
        if(direction !== 1){
          direction = -1;
          break;
        }     
    }
  })
}

function clearBoard(){
  document.body.removeChild(game);
}