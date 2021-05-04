

const GAMEBOARD = (function() {
    let player1 = playerFactory('bill');
    let player2 = playerFactory('steve');
    let gameArr = ['','','','','','','','','',];
    let turn = player1;
    let marker = 'x';
    let isPlaying = true;
    let tiles = document.querySelectorAll('.square')
    let resetGameBtn = document.querySelector('.resetGameBtn')
    
    const displayScores = (function()  {
        let scoreBoard = document.querySelector('.scoreBoard');
                
        const display = ()  =>  {
            scoreBoard.innerText = `${player1.getName()} your score is ${player1.getPoints()} and ${player2.getName()} your score is ${player2.getPoints()}
            ${turn.getName()}, you won the last round, so you'll start this round`;
        }
        
        const clearDisplay = () => {
            scoreBoard.innerText = '';
        }
        return {display, clearDisplay};       
    })();


    const play = () =>  {
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
                        alertWinner()
                        startNextRound();                
                    }   else (switchMarker(), switchPlayer())
                }        
            });
        })    
    }
    
    const checkWinner = () =>   {
        if  (
            gameArr[0] === marker && gameArr [1] === marker && gameArr [2] === marker ||
            gameArr[3] === marker && gameArr [4] === marker && gameArr [5] === marker ||
            gameArr[6] === marker && gameArr [7] === marker && gameArr [8] === marker ||
            gameArr[0] === marker && gameArr [3] === marker && gameArr [6] === marker ||
            gameArr[1] === marker && gameArr [4] === marker && gameArr [7] === marker ||
            gameArr[2] === marker && gameArr [5] === marker && gameArr [8] === marker ||
            gameArr[0] === marker && gameArr [4] === marker && gameArr [8] === marker ||
            gameArr[2] === marker && gameArr [4] === marker && gameArr [6] === marker             
        ) return true
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
        alert(`${turn.getName()} has won 5 rounds`)
    }
    
    const startNextRound = () =>  {
        turn.addPoint();
        if (turn.getPoints() === 5) {
            gameOver();
        } else  
        setTimeout(resetBoard,501);
    }

    const resetBoard = () =>    {

            gameArr = ['','','','','','','','','',];
            tiles.forEach(tile => tile.innerText = '');
            isPlaying = true;
            if (player1.getPoints() > 0 ||player1.getPoints() > 0)  {
                displayScores.display();
            } else return;
            
 
    }

    const resetGame = () => {
        resetBoard();
        player1.resetPoints()
        player2.resetPoints();
        displayScores.clearDisplay();
    }

    const alertWinner = () => {
     setTimeout(function()  {
         alert(`${turn.getName()} has won this round`)       
        }, 500);

    }

    resetGameBtn.addEventListener('click',resetGame)
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