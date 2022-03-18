import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Game from'./jogoDaVelha'
import Home from './home'

//import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Navigate, Routes, Route} from "react-router-dom"

function App(){
  const[names, setNames] = useState(["X","O"]);
  const[toChange,setToChange] = useState(false);
  
  function redirectGame(){
    setToChange(!toChange)
  }   

  return(
    <BrowserRouter>
      <Routes>
        <Route index element={<Home redirectGame = {redirectGame} names = {names} setNames ={setNames} toChange ={toChange}/>}/>
        <Route path = "/game" element = 
          {<div className= "main">
            <header className= "gameHeader">
              Jogo da Velha
            </header>
            <Game names = {names}/>
          </div>
          }/>
        <Route render={() => <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

ReactDOM.render(
  /*{ <React.StrictMode>
    <App />
  </React.StrictMode>, }*/
  <App/>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
