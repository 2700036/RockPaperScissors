import React, { useEffect, useRef, useState } from 'react';
import Rock from './icons/Rock';
import Paper from './icons/Paper';
import Scissors from './icons/Scissors';
import Hammer from './icons/Hammer';
import './App.css';

const choices = [
  { id: 1, name: 'rock', component: Rock, lossesTo: 2 },
  { id: 2, name: 'paper', component: Paper, lossesTo: 3 },
  { id: 3, name: 'scissors', component: Scissors, lossesTo: 1 },
  { id: 4, name: 'hammer', component: Hammer, lossesTo: 4 },
];
const popupTitles = {
  win: 'Да!',
  lose: 'Эх!',
  draw: 'Ничья',
  hammer: 'Ауч!!',
};

export default function App() {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState({});
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [hammered, setHammered] = useState(null);
  
  const [isNoPointer, setIsNoPointer] = useState(false);
  const [gameState, setGameState] = useState(null);

  const handleChoice = (choice) => {
    setIsNoPointer(true)
    const chosenChoice = choices.find(({ id }) => id === choice);
    setUserChoice(chosenChoice);
    setTimeout(() => {
      if (chosenChoice.lossesTo === computerChoice.id) {
        setLosses((losses) => ++losses);
        setGameState('lose');        
      } else if (computerChoice.lossesTo === chosenChoice.id) {
        setWins((wins) => ++wins);
        setGameState('win');        
      } else if (chosenChoice.lossesTo === computerChoice.lossesTo) {
        setGameState('draw');        
      } else {             
        setGameState('hammer');
      }
      setIsNoPointer(false);
    }, 1000)
    
    
  };
  const renderComponent = (choice) => {
    const Component = choice?.component;
    return <Component />;
  };

  const restartGame = () => {
    setHammered(null);
    if(gameState == 'hammer')setHammered(userChoice.id);
    setUserChoice(null)
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    setComputerChoice(randomChoice);    
    setGameState(null);
     
  };

 

  useEffect(() => {
    restartGame();
  }, []);

  return (
    <div className="app">
      <div className="info">
        <h2>Камень&nbsp;&nbsp;Ножницы&nbsp;&nbsp;Бумага</h2>

        
      </div>

      {gameState && (
        <div className={`game-state ${gameState}`} onClick={restartGame}>
          
            <div className="game-state-content">
              <p>{renderComponent(userChoice)}</p>
              <p>{popupTitles[gameState]}</p>
              <p className="computer-choice">{renderComponent(computerChoice)}</p>
            </div>
          
        </div>
      )}

      <div className="choices">
        {/* choices captions */}
        

        {/* buttons for my choice */}
        <div className={`users-buttons ${isNoPointer ? 'no-pointer' : ''}`}>
          {hammered != 1 ? (<button className="user-choice" onClick={() => handleChoice(1)}>
            <Rock />
          </button>) : null}
          {hammered != 3 ? (<button className="user-choice" onClick={() => handleChoice(3)}>
            <Scissors />
          </button>) : null}
          {hammered != 2 ? (<button className="user-choice" onClick={() => handleChoice(2)}>
            <Paper /> 
          </button>) : null}
        </div>

        <div className="vs">vs</div>

        {/* show the computer's choice */}
        <div>
      <button className="computer-choice">{userChoice ? renderComponent(computerChoice) : <Rock />}</button>
        </div>
      </div>
      <div className="wins-losses">
          <div className="wins">
            <span className="number">{wins}</span>
          </div>

          <div className="losses">
            <span className="number">{losses}</span>
          </div>
        </div>
    </div>
  );
}
