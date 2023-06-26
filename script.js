const cellElements = document.querySelectorAll('[data-cell]'); //selecionando um atributo
const board = document.querySelector('[data-board]');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const winningMessage = document.querySelector('[data-winning-message]');
const restartButton = document.querySelector('[data-restartButton]');

let isCircleTurn;

const positions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// iniciar colocando o hover de x ou circle
const startGame = () => {
    isCircleTurn = false;

    for (const cell of cellElements) {
        cell.classList.remove('circle');
        cell.classList.remove('x');
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    }

    setBoardHoverClass();
    winningMessage.classList.remove('show-winning-message'); //tira mensagem de vitoria
};

//fim de jogo
const endGame = empate => {
    if (empate) {
        winningMessageTextElement.innerHTML = 'Empate!';
    } else {
        winningMessageTextElement.innerHTML = isCircleTurn ? 'O Venceu!' : 'X Venceu!';
    }

    winningMessage.classList.add('show-winning-message');
};

const checkForDraw = () => {
    return [...cellElements].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('circle');
    });
};

// checar vitoria
const checkForWin = currentPlayer => {
    return positions.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentPlayer);
        });
    });
};

const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd);
};

// verificar o turno no jogador
const setBoardHoverClass = () => {
    board.classList.remove('circle');
    board.classList.remove('x');

    if (isCircleTurn) {
        board.classList.add('circle');
    } else {
        board.classList.add('x');
    }
};

// mudar o turno do jogador
const swapTurns = () => {
    isCircleTurn = !isCircleTurn;
    setBoardHoverClass();
};

const handleClick = e => {
    //colocar a marca (X ou Circulo)
    const cell = e.target;
    const classToAdd = isCircleTurn ? 'circle' : 'x';

    placeMark(cell, classToAdd);

    //verificar por vitoria
    const isWin = checkForWin(classToAdd);
    //verificar por empate
    const isDraw = checkForDraw();

    if (isWin) {
        endGame(false);
    } else if (isDraw) {
        endGame(true);
    } else {
        //mudar o simbolo de X ou circolo
        swapTurns();
    }
};

startGame();

// reiniciar jogo
restartButton.addEventListener('click', startGame);
