const gameBoard = (function() {
    // Create the gameBoard array
    let gameBoard = (() => {
        let obj = {};
        for (let x = 1; x <= 3; x++) {
            for (let y = 1; y <= 3; y++) {
                obj[x.toString() + ',' + y.toString()] = null;
            }
        }
        return obj
    })();

    const _isSquareEmpty = function(square) {
        // Check if square == null
    };

    const playMove = function(symbol) {
        //add value to square in array if its a legal move
    }

    const hasSomeoneWon = function() {
        // Check if someone won
    };

    const isDraw = function() {
        //check if game is a draw
    }

    const resetArray = function() {
        //Reset the array
    }

    const _render = function() {
        // Render the board state
    }

    return {
        playMove,
        hasSomeoneWon,
        isDraw,
        resetArray,
    }
})();