document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const resetButton = document.querySelector('button');

    const ROWS = 6;
    const COLS = 7;
    let currentPlayer = 'red';
    let gameBoard = createBoard();

    function createBoard() {
        const boardArray = new Array(ROWS).fill(null).map(() => new Array(COLS).fill('empty'));
        return boardArray;
    }

    function renderBoard() {
        board.innerHTML = '';
        gameBoard.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                const cellDiv = document.createElement('div');
                cellDiv.classList.add('cell', cell);
                cellDiv.dataset.row = rowIndex;
                cellDiv.dataset.col = colIndex;
                cellDiv.addEventListener('click', handleCellClick);
                board.appendChild(cellDiv);
            });
        });
    }

    function handleCellClick(event) {
        const clickedRow = parseInt(event.target.dataset.row);
        const clickedCol = parseInt(event.target.dataset.col);

        // Check if the column is full
        if (gameBoard[0][clickedCol] !== 'empty') {
            alert('Column is full. Choose another column.');
            return;
        }

        // Find the lowest available row in the clicked column
        for (let row = ROWS - 1; row >= 0; row--) {
            if (gameBoard[row][clickedCol] === 'empty') {
                gameBoard[row][clickedCol] = currentPlayer;
                break;
            }
        }

        // Check for a win
        if (checkForWin()) {
            alert(`Player ${currentPlayer} wins!`);
            resetGame();
        } else {
            // Switch player
            currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
            renderBoard();
        }
    }

    function checkForWin() {
        // Check horizontally
        for (let row = 0; row < ROWS; row++) {
            for (let col = 0; col < COLS - 3; col++) {
                if (
                    gameBoard[row][col] !== 'empty' &&
                    gameBoard[row][col] === gameBoard[row][col + 1] &&
                    gameBoard[row][col] === gameBoard[row][col + 2] &&
                    gameBoard[row][col] === gameBoard[row][col + 3]
                ) {
                    return true;
                }
            }
        }

        // Check vertically
        for (let row = 0; row < ROWS - 3; row++) {
            for (let col = 0; col < COLS; col++) {
                if (
                    gameBoard[row][col] !== 'empty' &&
                    gameBoard[row][col] === gameBoard[row + 1][col] &&
                    gameBoard[row][col] === gameBoard[row + 2][col] &&
                    gameBoard[row][col] === gameBoard[row + 3][col]
                ) {
                    return true;
                }
            }
        }

        // Check diagonally (top-left to bottom-right)
        for (let row = 0; row < ROWS - 3; row++) {
            for (let col = 0; col < COLS - 3; col++) {
                if (
                    gameBoard[row][col] !== 'empty' &&
                    gameBoard[row][col] === gameBoard[row + 1][col + 1] &&
                    gameBoard[row][col] === gameBoard[row + 2][col + 2] &&
                    gameBoard[row][col] === gameBoard[row + 3][col + 3]
                ) {
                    return true;
                }
            }
        }

        // Check diagonally (bottom-left to top-right)
        for (let row = 3; row < ROWS; row++) {
            for (let col = 0; col < COLS - 3; col++) {
                if (
                    gameBoard[row][col] !== 'empty' &&
                    gameBoard[row][col] === gameBoard[row - 1][col + 1] &&
                    gameBoard[row][col] === gameBoard[row - 2][col + 2] &&
                    gameBoard[row][col] === gameBoard[row - 3][col + 3]
                ) {
                    return true;
                }
            }
        }

        return false;
    }

    function resetGame() {
        currentPlayer = 'red';
        gameBoard = createBoard();
        renderBoard();
    }

    renderBoard();
    resetButton.addEventListener('click', resetGame);
});
