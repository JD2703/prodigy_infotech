let currentPlayer = 'X';  // Keeps track of current turn
let gameMode = '';  // 'player' or 'ai'
let player1 = '';  // Stores player 1's name
let player2 = '';  // Stores player 2's name or AI
let coins = 0;  // Coins earned by player
let hintsUsed = 0;  // Number of hints used
let player1Wins = 0;  // Player 1 win count
let player2Wins = 0;  // Player 2 or AI win count
let isGameOver = false;  // Flag for game state

// Function to choose game mode
function chooseMode(mode) {
    gameMode = mode;
    resetGame();

    if (mode === 'player') {
        player1 = prompt("Enter Player 1's name:");
        player2 = prompt("Enter Player 2's name:");
    } else if (mode === 'ai') {
        player1 = prompt("Enter your name:");
        player2 = 'AI';
    }

    document.getElementById('scoreboard').classList.remove('hidden');
    updateScoreboard();
    displayCurrentTurn();
}

// Function to update scoreboard with players' names and scores
function updateScoreboard() {
    document.getElementById('player1Name').innerText = player1;
    document.getElementById('player2Name').innerText = player2;
    document.getElementById('player1Wins').innerText = player1Wins;
    document.getElementById('player2Wins').innerText = player2Wins;
    document.getElementById('coins').innerText = Coins: ${coins};
}

// Function to switch turns
function switchTurn() {
    if (!isGameOver) {
        currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
        displayCurrentTurn();
        if (gameMode === 'ai' && currentPlayer === 'O') {
            setTimeout(aiMove, 1000); // AI makes move after 1 second
        }
    }
}

// Function to display the current turn
function displayCurrentTurn() {
    const turnDisplay = document.getElementById('currentTurn');
    if (currentPlayer === 'X') {
        turnDisplay.innerText = ${player1}'s turn (${currentPlayer});
    } else {
        turnDisplay.innerText = ${player2}'s turn (${currentPlayer});
    }
}

// Function to make a move on the grid
function makeMove(cell) {
    if (cell.innerHTML === '' && !isGameOver) {
        cell.innerHTML = currentPlayer;
        checkWinner();
        if (!isGameOver) {
            switchTurn();
        }
    }
}

// AI move function
function aiMove() {
    const emptyCells = [...document.querySelectorAll('.grid div')].filter(cell => cell.innerHTML === '');
    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    randomCell.innerHTML = currentPlayer;
    checkWinner();
    if (!isGameOver) {
        switchTurn();
    }
}

// Get hint function
function getHint() {
    if (hintsUsed < 3 && !isGameOver) {
        const hintMove = calculateBestMove(currentPlayer);
        if (hintMove) {
            const cell = document.getElementById(hintMove);
            cell.innerHTML = currentPlayer;
            hintsUsed++;
            switchTurn();
            checkWinner();
        }
    } else {
        alert("No more hints available!");
    }
}

// Buy hint function (costs coins)
function buyHint() {
    if (coins >= 150 && hintsUsed < 3 && !isGameOver) {
        coins -= 150;
        getHint();
        updateScoreboard();
    } else {
        alert("Not enough coins or hints!");
    }
}

// Function to calculate a move (dummy logic for hint)
function calculateBestMove(player) {
    const emptyCells = [...document.querySelectorAll('.grid div')].filter(cell => cell.innerHTML === '');
    return emptyCells.length ? emptyCells[Math.floor(Math.random() * emptyCells.length)].id : null;
}

// Function to check for a winner or draw
function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
        [0, 4, 8], [2, 4, 6]              // Diagonals
    ];

    const cells = [...document.querySelectorAll('.grid div')];

    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (cells[a].innerHTML && cells[a].innerHTML === cells[b].innerHTML && cells[a].innerHTML === cells[c].innerHTML) {
            highlightWinningCombination(cells, combination);
            updateScores(cells[a].innerHTML);
            return;
        }
    }

    // Check for a draw
    if (cells.every(cell => cell.innerHTML)) {
        alert("It's a draw!");
        isGameOver = true;
    }
}

// Function to highlight winning combination
function highlightWinningCombination(cells, combination) {
    combination.forEach(index => {
        cells[index].style.backgroundColor = 'green';
    });
    isGameOver = true;
}

// Function to update scores and add coins
function updateScores(winner) {
    if (winner === 'X') {
        player1Wins++;
        coins += 100;
    } else if (winner === 'O') {
        player2Wins++;
        coins += 100;
    }
    updateScoreboard();
    alert(${winner === 'X' ? player1 : player2} wins!);
}

// Reset game function
function resetGame() {
    const cells = document.querySelectorAll('.grid div');
    cells.forEach(cell => {
        cell.innerHTML = '';
        cell.style.backgroundColor = '';
    });
    currentPlayer = 'X';
    isGameOver = false;
    hintsUsed = 0;
    displayCurrentTurn();
}
