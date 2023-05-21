var board = [];
var size = 4;

// Function to initialize the game board
function initializeBoard() {
  board = [];
  for (var i = 0; i < size; i++) {
    var row = [];
    for (var j = 0; j < size; j++) {
      row.push(0);
    }
    board.push(row);
  }
  addRandomTile();
  addRandomTile();
}

// Function to add a random tile (2 or 4) to the board
function addRandomTile() {
  var emptyCells = [];
  for (var i = 0; i < size; i++) {
    for (var j = 0; j < size; j++) {
      if (board[i][j] === 0) {
        emptyCells.push({ row: i, col: j });
      }
    }
  }
  if (emptyCells.length > 0) {
    var randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    var newValue = Math.random() < 0.9 ? 2 : 4;
    board[randomCell.row][randomCell.col] = newValue;
  }
}

// Function to check if the game is over (no more valid moves)
function isGameOver() {
  for (var i = 0; i < size; i++) {
    for (var j = 0; j < size; j++) {
      if (board[i][j] === 0) {
        return false;
      }
      if (i > 0 && board[i][j] === board[i - 1][j]) {
        return false;
      }
      if (i < size - 1 && board[i][j] === board[i + 1][j]) {
        return false;
      }
      if (j > 0 && board[i][j] === board[i][j - 1]) {
        return false;
      }
      if (j < size - 1 && board[i][j] === board[i][j + 1]) {
        return false;
      }
    }
  }
  return true;
}

// Function to perform a move (left, right, up, down)
function performMove(move) {
  var moved = false;
  switch (move) {
    case 'left':
      moved = moveLeft();
      break;
    case 'right':
      moved = moveRight();
      break;
    case 'up':
      moved = moveUp();
      break;
    case 'down':
      moved = moveDown();
      break;
  }
  return moved;
}

// Function to move the tiles to the left
function moveLeft() {
  var moved = false;
  for (var i = 0; i < size; i++) {
    for (var j = 1; j < size; j++) {
      if (board[i][j] !== 0) {
        for (var k = j; k > 0; k--) {
          if (board[i][k - 1] === 0) {
            board[i][k - 1] = board[i][k];
            board[i][k] = 0;
            moved = true;
          } else if (board[i][k - 1] === board[i][k]) {
            board[i][k - 1] *= 2;
            board[i][k] = 0;
            moved = true;
            break;
          }
        }
      }
    }
  }
  return moved;
}

// Function to move the tiles to the right
function moveRight() {
  var moved = false;
  for (var i = 0; i < size; i++) {
    for (var j = size - 2; j >= 0; j--) {
      if (board[i][j] !== 0) {
        for (var k = j; k < size - 1; k++) {
          if (board[i][k + 1] === 0) {
            board[i][k + 1] = board[i][k];
            board[i][k] = 0;
            moved = true;
          } else if (board[i][k + 1] === board[i][k]) {
            board[i][k + 1] *= 2;
            board[i][k] = 0;
            moved = true;
            break;
          }
        }
      }
    }
  }
  return moved;
}

// Function to move the tiles up
function moveUp() {
  var moved = false;
  for (var j = 0; j < size; j++) {
    for (var i = 1; i < size; i++) {
      if (board[i][j] !== 0) {
        for (var k = i; k > 0; k--) {
          if (board[k - 1][j] === 0) {
            board[k - 1][j] = board[k][j];
            board[k][j] = 0;
            moved = true;
          } else if (board[k - 1][j] === board[k][j]) {
            board[k - 1][j] *= 2;
            board[k][j] = 0;
            moved = true;
            break;
          }
        }
      }
    }
  }
  return moved;
}

// Function to move the tiles down
function moveDown() {
  var moved = false;
  for (var j = 0; j < size; j++) {
    for (var i = size - 2; i >= 0; i--) {
      if (board[i][j] !== 0) {
        for (var k = i; k < size - 1; k++) {
          if (board[k + 1][j] === 0) {
            board[k + 1][j] = board[k][j];
            board[k][j] = 0;
            moved = true;
          } else if (board[k + 1][j] === board[k][j]) {
            board[k + 1][j] *= 2;
            board[k][j] = 0;
            moved = true;
            break;
          }
        }
      }
    }
  }
  return moved;
}

// Function to evaluate the heuristic value of the current board state
function evaluate() {
  var score = 0;
  for (var i = 0; i < size; i++) {
    for (var j = 0; j < size; j++) {
      score += board[i][j];
    }
  }
  return score;
}