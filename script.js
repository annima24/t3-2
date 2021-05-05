

const GAMEBOARD = (function() {
    let player1 = playerFactory('Player 1');
    let player2 = playerFactory('Player 2');
    let gameArr = ['','','','','','','','','',];
    let turn = player1;
    let marker = 'x';
    let isPlaying = true;
    let tiles = document.querySelectorAll('.square')
    let resetGameBtn = document.querySelector('.resetGameBtn')
    let p1Card = document.querySelector('.p1card')
    let p2Card = document.querySelector('.p2card')
    let p1CardScore = document.querySelector('.p1CardScore')
    let p2CardScore = document.querySelector('.p2CardScore')
    let winningTiles = [];
    let theGame = document.querySelector('.gameContainer')
    let roundWinnerMessage = document.querySelector('.roundWinnerMessage');
    let hiddenMessage = document.querySelector('.hiddenMessageContainer');
    let nextRoundButton = document.querySelector('.nextRoundButton');
    let newGameButton = document.querySelector('.newGameButton');
    let turnCount= 0;

    const displayScores = (function() {
            const display = () => {
                p1CardScore.innerText = `Score: 
                ${player1.getPoints()}/5`;
                p2CardScore.innerText = `Score:
                ${player2.getPoints()}/5`;       
            }

        return { display };
    })();

    const displayTurn = () => {
        if (turn === player1)   {
            p1Card.style.border = '2px solid white';
            p1Card.style.boxShadow ='5px 5px 15px -1px white';
            p2Card.style.border = '2px solid black';
            p2Card.style.boxShadow ='5px 5px 15px -1px black';
        }  else if (turn === player2)   {
            p1Card.style.border = '2px solid black';
            p1Card.style.boxShadow ='5px 5px 15px -1px black';
            p2Card.style.border = '2px solid white';
            p2Card.style.boxShadow ='5px 5px 15px -1px white';
        }
    }

    const play = () =>  {
        displayTurn();
        tiles.forEach((tile,i) => {
            tile.addEventListener('click', function(e)  {
                if(e.target.innerText === 'x' || e.target.innerText === 'o')    {
                    return;
                  } else if (isPlaying === false) {
                        return;   
                    
                }   else    {
                    e.target.innerText = marker;
                    gameArr[i] = marker;
                    if (checkWinner() === true) {
                        isPlaying = false;
                        turn.addPoint();
                        if (gameOver() === true)    {
                            alertGameOver()
                        }else alertWinner()       
                    }   else if (checkDraw()=== true)   {
                       alertDraw();
                    }   else (switchMarker(), switchPlayer(),displayTurn(), console.log(turnCount), turnCount++)
                }        
            });
        })    
    }
    
    const checkWinner = () =>   {
        switch(true)    {
            case (gameArr[0] === marker && gameArr [1] === marker && gameArr [2] === marker):
                showWinningTiles(0,1,2);
                return true;
                break;
            case (gameArr[3] === marker && gameArr [4] === marker && gameArr [5] === marker):
                showWinningTiles(3,4,5);
                return true;
                break;
            case (gameArr[6] === marker && gameArr [7] === marker && gameArr [8] === marker):
                showWinningTiles(6,7,8);
                return true;
                break;
            case (gameArr[0] === marker && gameArr [3] === marker && gameArr [6] === marker):
                showWinningTiles(0,3,6);
                return true;
                break;
            case (gameArr[1] === marker && gameArr [4] === marker && gameArr [7] === marker):
                showWinningTiles(1,4,7);
                return true;
                break;
            case (gameArr[2] === marker && gameArr [5] === marker && gameArr [8] === marker):
                showWinningTiles(2,5,8);
                return true;
                break;
            case (gameArr[0] === marker && gameArr [4] === marker && gameArr [8] === marker):
                showWinningTiles(0,4,8);
                return true;
                break;
            case (gameArr[2] === marker && gameArr [4] === marker && gameArr [6] === marker):
                showWinningTiles(2,4,6);
                return true;
                break;
            
        }
    }

    const checkDraw = () => {
        if (turnCount === 8)    {           
               return true;
        }
    }

    const switchMarker = ()  =>  {
        if (marker === 'x') {
            marker = 'o';           
        }   else marker = 'x';              
    }

    const switchPlayer = () =>  {
       
        if (turn === player1)   {
            turn = player2
        }   else turn = player1
    }

    const gameOver = () => {
        if(turn.getPoints() === 5)    {
            turn = player1;
            return true;
        }
    }

    const showWinningTiles = (a, b, c) =>   {
        tiles[a].style.background = 'rgba(95, 250, 250, 0.3)';
        tiles[a].style.border= '2px solid white';
        tiles[b].style.background = 'rgba(95, 250, 250, 0.3)';
        tiles[b].style.border= '2px solid white';
        tiles[c].style.background = 'rgba(95, 250, 250, 0.3)';
        tiles[c].style.border= '2px solid white';
        winningTiles.push(a,b,c)

    }

    const resetWinningTiles = ([a,b,c]) =>  {
        
        if (a === undefined)    {
            return;
        }else
        tiles[a].style.background = 'rgba(95, 250, 250, 0.986)';
        tiles[a].style.border= '1px solid black';
        tiles[b].style.background = 'rgba(95, 250, 250, 0.986)';
        tiles[b].style.border= '1px solid black';
        tiles[c].style.background = 'rgba(95, 250, 250, 0.986)';
        tiles[c].style.border= '1px solid black';
    }    

    const resetBoard = () =>    {
            gameArr = ['','','','','','','','','',];
            tiles.forEach(tile => tile.innerText = '');
            isPlaying = true;
            resetWinningTiles(winningTiles);
            winningTiles = [];
            turnCount = 0;
            theGame.style.visibility = 'visible'; 
            hiddenMessage.style.visibility = 'hidden';
            hiddenMessage.style.maxHeight= '0'
            newGameButton.style.visibility = 'hidden';
            nextRoundButton.style.visibility = 'hidden';           
            if (player1.getPoints() > 0 ||player2.getPoints() > 0)  {
                displayScores.display();
            } else return;
    }

    const resetGame = () => {
        resetBoard();
        player1.resetPoints()
        player2.resetPoints();
        displayScores.display();

    }

    const alertWinner = () => {
     setTimeout(function()  {
         theGame.style.visibility= 'hidden';
         hiddenMessage.style.visibility = 'visible';
         hiddenMessage.style.maxHeight= '100%'
         nextRoundButton.style.visibility = 'visible'
         newGameButton.style.visibility = 'hidden';
         roundWinnerMessage.innerText = `${turn.getName()} has won this round!`
        }, 750);
    }

    const alertDraw = () => {
        setTimeout(function()  {
            theGame.style.visibility= 'hidden';
            hiddenMessage.style.visibility = 'visible';
            hiddenMessage.style.maxHeight= '100%'
            nextRoundButton.style.visibility = 'visible'
            newGameButton.style.visibility = 'hidden';
            roundWinnerMessage.innerText = `This round is a draw`
           }, 750);
    }

    const alertGameOver = () => {
        setTimeout(function()  {
            theGame.style.visibility= 'hidden';
            hiddenMessage.style.visibility = 'visible';
            hiddenMessage.style.maxHeight= '100%'
            nextRoundButton.style.visibility = 'hidden'
            newGameButton.style.visibility = 'visible';
            roundWinnerMessage.innerText = `${turn.getName()} has won 5 Rounds!
            Congrats, Champ! `
           }, 750);
    }

    displayScores.display();
    resetGameBtn.addEventListener('click',resetGame)
    nextRoundButton.addEventListener('click', resetBoard)
    newGameButton.addEventListener('click', resetGame)
    return  {play}

})();

function playerFactory(name)  {
    let playerName = name;
    let score = 0;

    const setName = (name)  =>  {
        playerName = name
    }

    const getName = ()  =>  {
        return playerName;
    }

    const addPoint = () => {
        return score++;
    }

    const getPoints = () =>   {
        return score;
    }

    const resetPoints = () => {
        score = 0;
    }
    return  {setName, getName, addPoint, getPoints, resetPoints}
}

GAMEBOARD.play();