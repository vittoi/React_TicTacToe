import React, { useState } from "react";

import './jogoDaVelha.css'

function Game(props){
    
    const [board, setBoard] = useState({
        squares: Array(9),
        xNext: true,
        final:false,
    });
    const [game,setGame] = useState({
            history :[board],
            placar:Array(2).fill(0), //0 e pro X e 1 pro O
    });

    let historyArray =[];
    
    historyArray = game.history;
    
    let current = historyArray[historyArray.length -1];

    function render(){
        let winner = calculateWinner(current.squares);//retorna quem ocupa a casa das possiveis condicoes de vitoria, ou seja o vencedor
        let gameStatus;
        let newPlacar = game.placar;

        if(!winner && game.history.length === 10 && !board.final){
            newPlacar[0]++;
            newPlacar[1]++;
            winner = "e";
            setGame(previousGame =>{
                return {...previousGame, placar: newPlacar,}
            });
            setBoard({
                squares: Array(9),
                xNext: true,
                final:true
            })

        }else if(winner && !board.final){
            gameStatus = "O Vencedor foi " + (winner==='X'?props.names[0] : props.names[1]);

            newPlacar[current.xNext ? 1 : 0] += 1;//Ta passando duas vezes por aqui
            setGame(previousGame =>{
                return {...previousGame, placar: newPlacar,}
            });
            setBoard({
                squares: Array(9),
                xNext: true,
                final:true
            })

        }else{
            gameStatus = "O próximo Jogador é " + (current.xNext ? props.names[0] : props.names[1])
        }

        
        return( 
                <div className="game">
                    <div className = "info">
                        <div className = "status">
                            {gameStatus}
                        </div>
                        <div className = "placar">
                            <button className ="placarButton" onClick = {resetGame}>Zerar Placar</button>
                        </div>
                        <div className = "placarText">
                            {props.names[0] +"   " + game.placar[0] + "       vs       " + game.placar[1] + "   " + props.names[1]}
                        </div>
                        <div className = "placarReset">
                            {board.final ? <button className ="placarButton" onClick = {newMatch}>Vai mais uma?</button>: ''}
                        </div>
                    </div>
                    <div className="gameBoard">
                        <Board board = {current} handleClick = {handleClick} />
                        <ol className= "historyList">
                            {!board.final ? historyArray.map((step,move) => {
                                let text = move>0 ? "Volte para o movimento - " + move : "Recomeçar o jogo";
                                let jump = () =>{jumpTo(move)}
                                if(move < game.history.length -1)
                                    return(
                                        <li>
                                            <button className="historyButton" onClick = {jump}>
                                                {text}
                                            </button>
                                        </li>
                                    );
                                else
                                    return null;
                            }) : 
                                <li key={0}>
                                    <button className="historyButton" onClick = {newMatch}>
                                        {"Recomeçar o jogo"}
                                    </button>
                                </li>
                                
                            }
                        </ol> 
                            
                        
                    </div>
                </div>
        );
    }
    function handleClick(i){
        const squaresOnClick = current.squares.slice();
        
        if(calculateWinner(squaresOnClick) || squaresOnClick[i]){
            return; //nao deixa passar a vez em caso de vitoria ou casa ocupada
        }
        
        squaresOnClick[i] = current.xNext ? "X" : "O";
        let newBoard ={
            squares: squaresOnClick,
            xNext: !current.xNext,
            final:false,
        
        }
        setBoard(newBoard);

        modifyGame(newBoard) 
    };

    function modifyGame(newBoard){
        let newArrayPlusBoard = game.history;
        newArrayPlusBoard.push(newBoard);
        setGame(previousGame =>{
            return {...previousGame, history: newArrayPlusBoard,}
        })
    }

    function jumpTo(state){
        setBoard(game.history[state]);

        setGame(previousGame =>{
            return {...previousGame, history: game.history.slice(0, state+1)}
        })
    }

    function resetGame(){
        setGame( previousGame =>{
            return {...previousGame, placar:Array(2).fill(0)}
            }
        )
        newMatch();
    }
    function newMatch(){
        
        
        setGame( previousGame =>{
            return {...previousGame, history:[board],}
            }
        )
        resetBoard();
    }
    function resetBoard(){
        setBoard({
            squares: Array(9),
            xNext: true,
            final:false
        })
    }
    return render();
}


function Board (props){//extends React.Component{
    /* constructor(props){
        super(props);
        this.state = {
            squares: Array(9),
            xNext: true,
        };
    } */
    let squares = props.board.squares;

    function renderSquare (i){
        return(
            <Square 
                value = {squares[i]}
                onClick={()=> props.handleClick(i)}
            />
        );
    };

    function render(){
        return (
            <div className = "board">
                <div className = "row">
                    {renderSquare(0)}
                    {renderSquare(1)}
                    {renderSquare(2)}
                </div>
                <div className= 'row'>
                    {renderSquare(3)}
                    {renderSquare(4)}
                    {renderSquare(5)}
                </div>
                <div className= 'row'>
                    {renderSquare(6)}
                    {renderSquare(7)}
                    {renderSquare(8)}
                </div>
            </div>
            
        );
    }
    return render();
}
function calculateWinner(squares){
    let lines =[
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],  
    ];
    for(let i=0; i< lines.length; i++){
        let [a,b,c] = lines[i]
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
            return squares[a];
        }
    }
    return null;
}

function Square (props){
    return(
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
    
}

export default Game;