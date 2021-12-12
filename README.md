# TickTackToe-JS
##A Browser based Tick Tack Toe game

Website should:
    - First, select between 1-player mode and 2-players mode.
    
    - 1-player mode:
        Let a user play against an AI
    
    - 2-player mode:
        Let a user play against another user

    - Show who won

    - Have a reset button that gets back to the 1-player or 2-players choice

Code structure:
    Modules:
        menu, gameboard, game, currentPlayer, computerPlayer

    Factory modules:
        player
    
    menu:
        - Function that initializes a game between a player and the computer
        - Function that initializes a game between 2 players
        - Function that resets game

    gameboard:
        - Array showing the value of each square: X, O, Or Null (private)
        - Function to add value to square in array if its a legal move (public)
        - Function to check if square is empty (private)
        - Function to check if someone won (public)
        - Function to check if draw (public)
        - Function to reset array (public)
        - function to render gameboard on screen (private)

    game:
        - function that executes once game ended
        - function that lets computer play if its its turn
        - function that resets game

    currentPlayer:
        - variable currentPlayer that is either X or O
        - function that tries to play a turn of player clicked
        - function that plays a turn for computer
        - function to return currentPlayer
        - function to switch between X and O

    computerPlayer:
        - function that assigns either X or O to the computer
        - function that selects the best legal move, and then plays it

    
    
