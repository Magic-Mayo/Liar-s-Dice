import React, { useState } from 'react';

const rollDice = () => {

}

const Game = () => {
    const [gameStart, setGameStart] = useState(false);
    const [players, setPlayers] = useState(2);
    const [dice, setDice] = useState(5);

    const selectDice = e => setDice(parseInt(e.target.value));
    const selectPlayers = e => setPlayers(parseInt(e.target.value));

    return (
        <>
            {gameStart ?
                <button type='button' className='roll-dice' onClick={rollDice}>Roll the dice!</button>
                :
                <div className='parameters'>
                    <fieldset>
                        <label htmlFor='CPU'>How many CPU players?</label>
                        <select value={players} onChange={selectPlayers}>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                    </fieldset>

                    <fieldset>
                        <label>How many dice would you like to start with?</label>
                        <select value={dice} onChange={selectDice}>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                            <option value={9}>9</option>
                            <option value={10}>10</option>
                        </select>
                    </fieldset>
                    <button type='button' onClick={() => setGameStart(true)} className='btn-start'>Start Game!</button>
                </div>
            }
        </>
    )
}

export default Game;