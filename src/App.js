import React from 'react';
// Import useState and useEffect from React
import { useState, useEffect } from 'react';
// Import faTrash from the fontawesome library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faEraser } from '@fortawesome/free-solid-svg-icons';
import './index.css';

function App() {
    // Create an array of players with useState
    const [players, setPlayers] = useState([]);

    // Create a function to add a player
    const addPlayer = (name) => {
        setPlayers([...players, { name, score: 0 }]);
    };

    return (
        <div className="App">
            <header className="App-header">
                <img src='https://cdn.glitch.global/70e69a05-6a7a-4c87-9b66-1dba2116bfdf/Flip%207.png?v=1734414305773' alt='Flip 7 logo' />
            </header>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    // Don't add a player if the input is empty
                    if (!e.target.player.value) return;
                    addPlayer(e.target.player.value);
                    e.target.player.value = '';
                }}
            >
                <input name="player" />
                <button id="add-player" type="submit">ADD PLAYER</button>
            </form>

            <div id="players">
                {players.map((player, index) => (
                    <div key={index} className='player'>
                        <div className='delete-player' onClick={() => {
                            const newPlayers = [...players];
                            newPlayers.splice(index, 1);
                            setPlayers(newPlayers);
                        }}>
                            <FontAwesomeIcon icon={faTrash} color='white' />
                        </div>
                        <div className='player-name'>
                            {player.name}
                        </div>
                        <div className='player-score'>
                            {player.score}
                        </div>
                        <input className='point-input' name="points" type="number" />
                        <button
                            className='add-points'
                            onClick={() => {
                                const points = parseInt(
                                    document.getElementsByName('points')[index].value
                                );

                                if (isNaN(points)) return;
                                
                                const newPlayers = [...players];
                                newPlayers[index].score += points;
                                setPlayers(newPlayers);
                                // Set input value to empty string
                                document.getElementsByName('points')[index].value = '';
                            }}
                        >
                            <FontAwesomeIcon icon={faPlus} color='white' />
                        </button>
                    </div>
                ))}
            </div>
            <button 
                style={{ display: players.length ? 'block' : 'none' }}
                id='clear-all-scores'
                onClick={() => {
                    const newPlayers = players.map(player => ({ ...player, score: 0 }));
                    setPlayers(newPlayers);
                }}
            >
                <FontAwesomeIcon icon={faEraser} />
            </button>
            <button 
                style={{ display: players.length ? 'block' : 'none' }}
                id='remove-all-players'
                onClick={() => {
                    setPlayers([]);
                }}
            > 
                <FontAwesomeIcon icon={faTrash} />
            </button>
        </div>
    );
}

export default App;