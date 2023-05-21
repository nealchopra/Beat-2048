// Function to find the best move based on the game state
function NotSoAIAlgorithm(gameState) {
    var moves = ['left', 'right', 'up', 'down'];
    var bestMove = null;
    var bestScore = -Infinity;
  
    for (var i = 0; i < moves.length; i++) {
      var move = moves[i];
  
      // Make a copy of the game state
      var copiedGameState = JSON.parse(JSON.stringify(gameState));
  
      // Perform the move on the copied game state
      var moved = performMoveOnGameState(move, copiedGameState);
  
      if (moved) {
        // Evaluate the resulting game state
        var score = evaluateGameState(copiedGameState);
  
        // Update the best move if the current score is higher
        if (score > bestScore) {
          bestMove = move;
          bestScore = score;
        }
      }
    }
  
    return bestMove;
  }
  
  // Function to perform a move on the game state
  function performMoveOnGameState(move, gameState) {
    // Get the size of the game board
    var size = gameState.length;
  
    // Perform the move based on the selected direction
    switch (move) {
      case 'left':
        return moveLeftOnGameState(gameState, size);
      case 'right':
        return moveRightOnGameState(gameState, size);
      case 'up':
        return moveUpOnGameState(gameState, size);
      case 'down':
        return moveDownOnGameState(gameState, size);
      default:
        return false;
    }
  }
  
  // Function to evaluate the heuristic value of the game state
  function evaluateGameState(gameState) {
    var score = 0;
    for (var i = 0; i < gameState.length; i++) {
      for (var j = 0; j < gameState[i].length; j++) {
        score += gameState[i][j];
      }
    }
    return score;
  }
  
  // Function to move the tiles to the left on the game state
  function moveLeftOnGameState(gameState, size) {
    var moved = false;
    for (var i = 0; i < size; i++) {
      for (var j = 1; j < size; j++) {
        if (gameState[i][j] !== 0) {
          for (var k = j; k > 0; k--) {
            if (gameState[i][k - 1] === 0) {
              gameState[i][k - 1] = gameState[i][k];
              gameState[i][k] = 0;
              moved = true;
            } else if (gameState[i][k - 1] === gameState[i][k]) {
              gameState[i][k - 1] *= 2;
              gameState[i][k] = 0;
              moved = true;
              break;
            }
          }
        }
      }
    }
    return moved;
  }
  
  // Function to move the tiles to the right on the game state
  function moveRightOnGameState(gameState, size) {
    var moved = false;
    for (var i = 0; i < size; i++) {
      for (var j = size - 2; j >= 0; j--) {
        if (gameState[i][j] !== 0) {
          for (var k = j; k < size - 1; k++) {
            if (gameState[i][k + 1] === 0) {
              gameState[i][k + 1] = gameState[i][k];
              gameState[i][k] = 0;
              moved = true;
            } else if (gameState[i][k + 1] === gameState[i][k]) {
              gameState[i][k + 1] *= 2;
              gameState[i][k] = 0;
              moved = true;
              break;
            }
          }
        }
      }
    }
    return moved;
  }
  
  // Function to move the tiles up on the game state
  function moveUpOnGameState(gameState, size) {
    var moved = false;
    for (var j = 0; j < size; j++) {
      for (var i = 1; i < size; i++) {
        if (gameState[i][j] !== 0) {
          for (var k = i; k > 0; k--) {
            if (gameState[k - 1][j] === 0) {
              gameState[k - 1][j] = gameState[k][j];
              gameState[k][j] = 0;
              moved = true;
            } else if (gameState[k - 1][j] === gameState[k][j]) {
              gameState[k - 1][j] *= 2;
              gameState[k][j] = 0;
              moved = true;
              break;
            }
          }
        }
      }
    }
    return moved;
  }
  
  // Function to move the tiles down on the game state
  function moveDownOnGameState(gameState, size) {
    var moved = false;
    for (var j = 0; j < size; j++) {
      for (var i = size - 2; i >= 0; i--) {
        if (gameState[i][j] !== 0) {
          for (var k = i; k < size - 1; k++) {
            if (gameState[k + 1][j] === 0) {
              gameState[k + 1][j] = gameState[k][j];
              gameState[k][j] = 0;
              moved = true;
            } else if (gameState[k + 1][j] === gameState[k][j]) {
              gameState[k + 1][j] *= 2;
              gameState[k][j] = 0;
              moved = true;
              break;
            }
          }
        }
      }
    }
    return moved;
  }  