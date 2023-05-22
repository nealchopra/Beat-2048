// Function to send a message to the content script
function sendMessageToContentScript(message, callback) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, message, callback);
    });
  }
  
  // Function to handle the "Get Best Move" button click
  function handleGetBestMove() {
    // Send a message to the content script to get the current game state
    sendMessageToContentScript({ action: 'getGameState' }, function (
      response
    ) {
      var gameState = response.gameState;
  
      // Call the minimax algorithm to get the best move
      var bestMove = minimaxAlgo(gameState);
  
      // Display the best move on the popup interface
      var bestMoveText = document.getElementById('best-move-text');
      bestMoveText.textContent = 'Best Move: ' + bestMove;
    });
  }
  
  // Add event listener to the "Get Best Move" button
  var bestMoveBtn = document.getElementById('best-move-btn');
  bestMoveBtn.addEventListener('click', handleGetBestMove);  