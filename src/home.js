
import {Navigate} from "react-router-dom"
import './jogoDaVelha.css'
import './home.css'

export default function home(props){
    if(props.toChange){
        props.redirectGame();
        return <Navigate to = "/game"/>
    }
    return(
    <div>
        <header className= "gameHeader">
              Jogo da Velha
        </header>
        <form className= "names">
            <div className="inputs">
                    <label className="inputText">Nome do Jogador 1:    
                        <input className="inputText"
                            type="text" 
                            value = {props.names[0]}
                            onChange={(e)=> props.setNames([e.target.value, props.names[1]])}
                            />
                    </label>
                    
                    <label className="inputText">Nome do Jogador 2:   
                        <input className="inputText"
                            type="text" 
                            value = {props.names[1]}
                            onChange={(e)=> props.setNames([props.names[0], e.target.value])}
                        />
                    </label>
            </div>
        </form>
        <button className = "jogar" onClick={props.redirectGame}>
            Jogar
        </button>
    </div>
    )
}