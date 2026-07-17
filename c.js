document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const statusText = document.getElementById('status-text');
    const resetBtn = document.getElementById('reset-btn');
    const scoreXElement = document.getElementById('score-x');
    const scoreOElement = document.getElementById('score-o');
    const playerXCard = document.querySelector('.player-x');
    const playerOCard = document.querySelector('.player-o');
    const winModal = document.getElementById('win-modal');
    const playAgainBtn = document.getElementById('play-again-btn');
    const modalTitle = document.getElementById('modal-title');
    const modalIcon = document.getElementById('modal-icon');

    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let gameActive = true;
    let scores = { X: 0, O: 0 };

    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    const initializeGame = () => {
        cells.forEach(cell => {
            cell.addEventListener('click', cellClicked);
        });
        resetBtn.addEventListener('click', resetBoard);
        playAgainBtn.addEventListener('click', resetBoard);
        updateStatus();
    };

    const cellClicked = (e) => {
        const cell = e.target;
        const cellIndex = cell.getAttribute('data-index');

        if (board[cellIndex] !== '' || !gameActive) {
            return;
        }

        updateCell(cell, cellIndex);
        checkWin();
    };

    const updateCell = (cell, index) => {
        board[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer.toLowerCase());
        cell.classList.add('occupied');

        // Add a micro-interaction pulse
        cell.style.transform = 'scale(0.9)';
        setTimeout(() => {
            cell.style.transform = 'scale(1)';
        }, 100);
    };

    const changePlayer = () => {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateStatus();
        updateActiveCard();
    };

    const updateStatus = () => {
        statusText.textContent = `Player ${currentPlayer}'s Turn`;
        statusText.style.color = currentPlayer === 'X' ? 'var(--x-color)' : 'var(--o-color)';
    };

    const updateActiveCard = () => {
        if (currentPlayer === 'X') {
            playerXCard.classList.add('active-player');
            playerOCard.classList.remove('active-player');
        } else {
            playerOCard.classList.add('active-player');
            playerXCard.classList.remove('active-player');
        }
    };

    const checkWin = () => {
        let roundWon = false;
        let winningCells = [];

        for (let i = 0; i < winConditions.length; i++) {
            const [a, b, c] = winConditions[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                roundWon = true;
                winningCells = [a, b, c];
                break;
            }
        }

        if (roundWon) {
            statusText.textContent = `Player ${currentPlayer} Wins!`;
            gameActive = false;
            highlightWinningCells(winningCells);
            updateScore();
            setTimeout(() => showModal(`Player ${currentPlayer} Wins!`, true), 800);
            return;
        }

        if (!board.includes('')) {
            statusText.textContent = `It's a Draw!`;
            statusText.style.color = 'var(--text-color)';
            gameActive = false;
            setTimeout(() => showModal("It's a Draw!", false), 800);
            return;
        }

        changePlayer();
    };

    const highlightWinningCells = (winningCells) => {
        winningCells.forEach(index => {
            cells[index].classList.add('win-cell');
        });
    };

    const updateScore = () => {
        scores[currentPlayer]++;
        if (currentPlayer === 'X') {
            scoreXElement.textContent = scores.X;
        } else {
            scoreOElement.textContent = scores.O;
        }
    };

    const showModal = (message, isWin) => {
        modalTitle.textContent = message;

        if (isWin) {
            modalTitle.style.color = currentPlayer === 'X' ? 'var(--x-color)' : 'var(--o-color)';
            modalIcon.innerHTML = '<i class="fa-solid fa-trophy"></i>';
            modalIcon.style.color = '#fbbf24';
        } else {
            modalTitle.style.color = 'var(--text-color)';
            modalIcon.innerHTML = '<i class="fa-solid fa-handshake"></i>';
            modalIcon.style.color = 'var(--text-muted)';
        }

        winModal.classList.add('show');
    };

    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        gameActive = true;

        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o', 'occupied', 'win-cell');
        });

        winModal.classList.remove('show');
        updateStatus();
        updateActiveCard();
    };

    initializeGame();
});
