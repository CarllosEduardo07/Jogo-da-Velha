const cellElements = document.querySelectorAll('[data-cell]'); //selecionando um atributo
const board = document.querySelector('[data-board]');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const winningMessage = document.querySelector('[data-winning-message]');

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
    for (const cell of cellElements) {
        cell.addEventListener('click', handleClick, { once: true });
    }

    isCircleTurn = false;

    board.classList.add('x');
};

//fim de jogo
const endGame = empate => {
    if (empate) {
        winningMessageTextElement.innerHTML = 'Empate!';
    } else {
        winningMessageTextElement.innerHTML = isCircleTurn ? 'Círculo Venceu!' : 'X Venceu!';
    }
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

// mudar o turno do jogador
const swapTurns = () => {
    isCircleTurn = !isCircleTurn;
    board.classList.remove('circle');
    board.classList.remove('x');

    if (isCircleTurn) {
        board.classList.add('circle');
    } else {
        board.classList.add('x');
    }
};

const handleClick = e => {
    //colocar a marca (X ou Circulo)
    const cell = e.target;
    const classToAdd = isCircleTurn ? 'circle' : 'x';

    placeMark(cell, classToAdd);

    //verificar por vitoria
    const isWin = checkForWin(classToAdd);
    if (isWin) {
        endGame(true);
    }
    //verificar por empate

    //mudar o simbolo de X ou circolo
    swapTurns();
};

startGame();
