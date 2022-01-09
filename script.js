const mainElement = document.getElementById('main');

const gameBoard = (function() {
    // Create X_element SVG and O_element SVG
    const X_element = document.createElement('div')
    X_element.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="140.45916231588228" height="140.45916231588222" viewBox="170.42513368983953 141.78950078572205 140.45916231588228 140.45916231588222" xml:space="preserve"><desc>Created with Fabric.js 4.6.0</desc><defs></defs><g transform="matrix(1 0 0 1 240.65 212.02)" id="AhQKQKUupYhYvED0h-Xs-"  ><path style="stroke: rgb(255,0,0); stroke-width: 2; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(255,255,255); fill-opacity: 0; fill-rule: nonzero; opacity: 1;" vector-effect="non-scaling-stroke"  transform=" translate(0, 0)" d="M -68.72958 68.72958 L 68.72958 -68.72958" stroke-linecap="round" /></g><g transform="matrix(1 0 0 1 240.65 212.02)" id="ltkaWMDqQoqTdZz9wcfDe"  ><path style="stroke: rgb(255,0,0); stroke-width: 2; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(255,255,255); fill-opacity: 0; fill-rule: nonzero; opacity: 1;" vector-effect="non-scaling-stroke"  transform=" translate(0, 0)" d="M -69.22958 -69.22958 L 69.22958 69.22958" stroke-linecap="round" /></g></svg>'

    const O_element = document.createElement('div')
    O_element.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="161.35827469028308" height="161.35828207723884" viewBox="169.32086265485844 276.4557498647521 161.35827469028308 161.35828207723884" xml:space="preserve"><desc>Created with Fabric.js 4.6.0</desc><defs></defs><g transform="matrix(1 0 0 1 250 357.13)" id="YXGmPvA7PRz2U5a0nOFMu"  ><path style="stroke: rgb(92,216,110); stroke-width: 2; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: none; fill-rule: nonzero; opacity: 1;" vector-effect="non-scaling-stroke"  transform=" translate(-79.68, -79.68)" d="M 79.67914 0 C 123.66203 0 159.35828 35.69626 159.35828 79.67914 C 159.35828 123.66203 123.66202000000001 159.35828 79.67914 159.35828 C 35.696250000000006 159.35828 0 123.66202000000001 0 79.67914 C 0 35.696250000000006 35.69626 0 79.67914 0 z" stroke-linecap="round" /></g></svg>'

    // Create the gameBoard array
    let gameBoard

    // Create variable to keep track of current player
    let currentPlayer

    // Create variable to keep track of if someone won
    let someoneWon

    // Create variable to keep track of if draw
    let draw

    //Create computer variables
    let computerPlaying
    let computerSymbol
    let amountOfRandom

    const createGameBoard = function() {
        //Returns empty gameBoard object
        let obj = {};

        for (let x = 1; x <= 3; x++) {
            for (let y = 1; y <= 3; y++) {
                obj[x.toString() + ',' + y.toString()] = null;
            }
        }
        return obj
    }

    const switchCurrentPlayer = function(input) {
        //Returns 'O' if input = 'X'. And vice versa.
        let output

        if (input === 'X') {
            output = 'O'
        } else {
            output = 'X'
        }
        return output
    }

    const isSquareEmpty = function(squareID, board) {
        //Returns true if input square is empty, else returns false.
        if (board[squareID]) {
            return false
        } else {
            return true
        };
    };

    const playMove = function(squareID) {
        //add value to square in gameboard object if its a legal move
        if (isSquareEmpty(squareID, gameBoard)) {
            gameBoard[squareID] = currentPlayer
            someoneWon = hasSomeoneWon(gameBoard)
            draw = isDraw(gameBoard)
            _render()
            currentPlayer = switchCurrentPlayer(currentPlayer)
        }

        // If computerPlayer is on and game hasnt finished, play move for computer.
        if (computerPlaying && computerSymbol === currentPlayer && !someoneWon && !draw) {
            playMove(computerPlayer.getMove(gameBoard, currentPlayer, amountOfRandom))
        }
    }

    const hasSomeoneWon = function(board) {
        // Returns true if someone won, false otherwise
        const winningCombs = [
            ['1,1', '1,2', '1,3'],
            ['2,1', '2,2', '2,3'],
            ['3,1', '3,2', '3,3'],
            ['1,1', '2,1', '3,1'],
            ['1,2', '2,2', '3,2'],
            ['1,3', '2,3', '3,3'],
            ['1,1', '2,2', '3,3'],
            ['1,3', '2,2', '3,1'],
        ];

        let output = false

        winningCombs.forEach(comb => {
            if (comb.every(square => board[square] === 'X') || comb.every(square => board[square] === 'O')) {
                output = true
            };
        });
        return output
    };

    const isDraw = function(board) {
        //Returns true if draw. False otherwise.
        for (const square in board) {
            if (board[square] === null) {
                return false
            };
        };
        return true
    }

    const initializeGame = function(computer, difficulty) {
        // Reset gameboard object
        gameBoard = createGameBoard()

        // Remove endgame screen and add empty gameboard
        mainElement.innerHTML = '<div id="grid"><div class="grid-square" id="1,1"></div><div class="grid-square" id="2,1"></div><div class="grid-square" id="3,1"></div><div class="grid-square" id="1,2"></div><div class="grid-square" id="2,2"></div><div class="grid-square" id="3,2"></div><div class="grid-square" id="1,3"></div><div class="grid-square" id="2,3"></div><div class="grid-square" id="3,3"></div> </div>';

        //Add event listeners to gameboard
        const squaresElements = document.querySelectorAll('.grid-square')

        squaresElements.forEach(function(element) {
            element.addEventListener('click', function() {
                playMove(this.id)
            })
        })

        //Reset variables
        someoneWon = false;
        draw = false;
        currentPlayer = 'X';
        computerPlaying = computer;
        computerSymbol = computerPlayer.chooseRandomSymbol();
        amountOfRandom = difficulty;

        //Play move for computer if it should start
        if (computerPlaying && computerSymbol === currentPlayer) {
            playMove(computerPlayer.getMove(gameBoard, currentPlayer, amountOfRandom));
        };
    };

    const replayGame = function() {
        //Replays game with same settings
        initializeGame(computerPlaying, amountOfRandom);
    }

    const _render = function() {
        // --- Render board ---
        for (const square in gameBoard) {

            squareNode = document.getElementById(square);

            if (gameBoard[square] != null && squareNode.childElementCount == 0) {
                switch (gameBoard[square]) {
                    case 'X':
                        squareNode.appendChild(X_element.cloneNode(true));
                        break;
                    case 'O':
                        squareNode.appendChild(O_element.cloneNode(true));
                        break;
                }
            }


        }
        // --- Render 'End of game' screen ---
        if (someoneWon || draw) {
            gameEndedMenu.initialize(someoneWon, draw, currentPlayer);
        }
    }


    return {
        switchCurrentPlayer,
        hasSomeoneWon,
        isDraw,
        initializeGame,
        isSquareEmpty,
        createGameBoard,
        replayGame,
    }
})();

const gameEndedMenu = (function() {

    const initialize = function(someoneWon, draw, currentPlayer) {
        // Remove game board and add end of game screen
        mainElement.innerHTML = '<div id="menu-circle" class="background-shape"><div id="menu-text">Menu</div></div><div id="middle-circle" class="background-shape"></div><div id="right-circle" class="background-shape"></div><div id="someone-won-text">X wins!</div><div id="play-again-circle" class="background-shape"><div id="play-again-text">Play again?</div></div>';

        // Change text according to situation
        const gameEndTextNode = document.getElementById('someone-won-text');
        if (someoneWon) {
            gameEndTextNode.textContent = `${currentPlayer} Wins!`
        }
        if (draw && !someoneWon) {
            gameEndTextNode.textContent = `Draw!`
        }

        //Add event listeners to play again button
        const playAgainButton = document.getElementById('play-again-circle');
        const startMenuButton = document.getElementById('menu-circle');

        playAgainButton.addEventListener('click', function() {
            gameBoard.replayGame();
        });
        startMenuButton.addEventListener('click', () => {
            startMenu.initialize();
        });
    }
    return {
        initialize
    }
})();

const startMenu = (function() {

    const initialize = function() {
        //Change DOM to startMenu
        mainElement.innerHTML = '<div class="menu-background-shape" id="shape-1"></div><div class="menu-background-shape" id="shape-2"></div><div id="menu-x"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="140.45916231588228" height="140.45916231588222" viewBox="170.42513368983953 141.78950078572205 140.45916231588228 140.45916231588222" xml:space="preserve"><desc>Created with Fabric.js 4.6.0</desc><defs></defs><g transform="matrix(1 0 0 1 240.65 212.02)" id="AhQKQKUupYhYvED0h-Xs-"  ><path style="stroke: rgb(255,0,0); stroke-width: 2; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(255,255,255); fill-opacity: 0; fill-rule: nonzero; opacity: 1;" vector-effect="non-scaling-stroke"  transform=" translate(0, 0)" d="M -68.72958 68.72958 L 68.72958 -68.72958" stroke-linecap="round" /></g><g transform="matrix(1 0 0 1 240.65 212.02)" id="ltkaWMDqQoqTdZz9wcfDe"  ><path style="stroke: rgb(255,0,0); stroke-width: 2; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(255,255,255); fill-opacity: 0; fill-rule: nonzero; opacity: 1;" vector-effect="non-scaling-stroke"  transform=" translate(0, 0)" d="M -69.22958 -69.22958 L 69.22958 69.22958" stroke-linecap="round" /></g></svg></div><div id="menu-o"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="161.35827469028308" height="161.35828207723884" viewBox="169.32086265485844 276.4557498647521 161.35827469028308 161.35828207723884" xml:space="preserve"><desc>Created with Fabric.js 4.6.0</desc><defs></defs><g transform="matrix(1 0 0 1 250 357.13)" id="YXGmPvA7PRz2U5a0nOFMu"  ><path style="stroke: rgb(92,216,110); stroke-width: 2; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: none; fill-rule: nonzero; opacity: 1;" vector-effect="non-scaling-stroke"  transform=" translate(-79.68, -79.68)" d="M 79.67914 0 C 123.66203 0 159.35828 35.69626 159.35828 79.67914 C 159.35828 123.66203 123.66202000000001 159.35828 79.67914 159.35828 C 35.696250000000006 159.35828 0 123.66202000000001 0 79.67914 C 0 35.696250000000006 35.69626 0 79.67914 0 z" stroke-linecap="round" /></g></svg></div><div id="title-box"><p class="title-text" id="red">TICK</p><p class="title-text" id="blue">TACK</p><p class="title-text" id="grey">TOE</p></div><div class="menu-button" id="one-player-button"><div class="button-text" id="one-player-text">1 PLAYER</div></div><div class="menu-button" id="two-players-button"><div class="button-text" id="two-players-text">2 PLAYERS</div></div>';

        //Add event listeners
        onePlayerButton = document.getElementById('one-player-button');
        twoPlayersButton = document.getElementById('two-players-button');

        onePlayerButton.addEventListener('click', () => {
            initialize_difficulty();
        })
        twoPlayersButton.addEventListener('click', () => {
            gameBoard.initializeGame(false, 0.0);
        });
    };
    const initialize_difficulty = function() {
        //Remove OnePlayerButton and twoPlayersButton
        document.getElementById('one-player-button').remove();
        document.getElementById('two-players-button').remove();

        //Create the four difficulty buttons
        buttons = ['easy', 'average', 'hard', 'impossible'];
        //Create the nodes and add to main
        buttons.forEach(button => {
            button_element = document.createElement('div');
            button_element.id = `${button}-button`;
            button_element.classList.add('difficulty-button');
            button_element.innerHTML = `<div class="difficulty-text" id="${button}-text">${button}</div>`;

            //Add event listener
            button_element.addEventListener('click', () => {
                switch (button) {
                    case 'easy':
                        gameBoard.initializeGame(true, 0.2);
                        break;
                    case 'average':
                        gameBoard.initializeGame(true, 0.1);
                        break;
                    case 'hard':
                        gameBoard.initializeGame(true, 0.05)
                        break;
                    case 'impossible':
                        gameBoard.initializeGame(true, 0);
                        break;
                }
            });
            //Add to end of <main>
            mainElement.appendChild(button_element);
        });
    }

    return {
        initialize,
    }

})();

const computerPlayer = (function() {
    const chooseRandomSymbol = function() {
        //Returns either 'X' or 'O' at random.
        if (Math.random() < 0.5) {
            return 'X'
        } else {
            return 'O'
        }
    };

    const _getRandomMove = function(board) {
        //Returns a randomly chosen empty square.
        while (true) {
            // Choose a random square.
            x = Math.ceil(Math.random() * 3);
            y = Math.ceil(Math.random() * 3);
            square = x.toString() + ',' + y.toString();

            // if random square is empty. Return square.
            if (gameBoard.isSquareEmpty(square, board)) {
                return square
            }
        }
    };

    const _getBestMove = function(board, currentPlayer) {
        // Returns the best move given the board and the symbol its playing as

        // Create array of square coordinates
        let squaresArray = [];

        for (let x = 1; x <= 3; x++) {
            for (let y = 1; y <= 3; y++) {
                squaresArray.push(x.toString() + ',' + y.toString());
            }
        }

        // Create object to store values of squares
        let valuesOfSquares = gameBoard.createGameBoard();

        //Function to create copy of board and add symbol to square
        const _copyBoardAndAddSymbol = function(board, square, currentPlayer) {
            let board_copy = Object.assign({}, board);
            board_copy[square] = currentPlayer;

            return board_copy
        }

        //Function to calculate value of square
        const _getValueOfSquare = function(board, currentPlayer, maximizingPlayer) {
            //Returns either -1, 0, or 1. This symbolises the outcome of current board state assuming both players play the best moves.
            //Uses the minmax algorithm.

            //Basecase, someone won or draw:
            if (gameBoard.hasSomeoneWon(board)) {
                if (maximizingPlayer) { //Maximizing player lost
                    return -1
                } else { //Maximizing player won
                    return 1
                }
            };

            if (gameBoard.isDraw(board)) {
                return 0
            }

            //Recursive case, the game is in progress:
            if (maximizingPlayer) {
                let maxEval = -Infinity

                squaresArray.forEach(square => {
                    if (board[square] === null) {
                        let board_copy = _copyBoardAndAddSymbol(board, square, currentPlayer);
                        let eval = _getValueOfSquare(board_copy, gameBoard.switchCurrentPlayer(currentPlayer), false);
                        maxEval = Math.max(maxEval, eval);
                    }
                })
                return maxEval

            } else {
                let minEval = Infinity

                squaresArray.forEach(square => {
                    if (gameBoard.isSquareEmpty(square, board)) {
                        let board_copy = _copyBoardAndAddSymbol(board, square, currentPlayer);
                        let eval = _getValueOfSquare(board_copy, gameBoard.switchCurrentPlayer(currentPlayer), true);
                        minEval = Math.min(minEval, eval);
                    }
                })
                return minEval
            }
        };

        // Calculate best value of each square
        let board_copy

        for (const square in valuesOfSquares) {
            if (gameBoard.isSquareEmpty(square, board)) {
                board_copy = _copyBoardAndAddSymbol(board, square, currentPlayer);
                value = _getValueOfSquare(board_copy, gameBoard.switchCurrentPlayer(currentPlayer), false);
                valuesOfSquares[square] = value
            }
        };

        // Find square with best value and return it
        let bestValue = -Infinity;
        let bestSquare = null;

        for (const square in valuesOfSquares) {
            if (valuesOfSquares[square] === null) {
                continue
            }
            if (valuesOfSquares[square] > bestValue) {
                bestValue = valuesOfSquares[square];
                bestSquare = square;
            }

        }

        return bestSquare

    };

    const getMove = function(board, currentPlayer, amountOfRandom) {
        //Returns either a random move or best move at random. With chance amountOfRandom to play random move
        // amountOfRandom: A number between 0 and 1
        if (Math.random() > amountOfRandom) {
            return _getBestMove(board, currentPlayer)
        } else {
            return _getRandomMove(board)
        }
    }



    return {
        getMove,
        chooseRandomSymbol
    }

})();

startMenu.initialize()