import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import Dice from '../Dice';
import {useRollBtn} from '../../hooks';


const Game = props => {
    const [players, setPlayers] = useState(2);
    const [dice, setDice] = useState(5);
    const [startDice, setStartDice] = useState([0,1,2,3,4]);
    const [rolling, setRolling] = useState(false);
    const [numChoice, setNumChoice] = useState(1);
    
    const selectDice = e => setDice(parseInt(e.target.value))
    const selectPlayers = e => setPlayers(parseInt(e.target.value))
        
    const chooseDice = () => {
        setStartDice([]);
        for(let i=0; i<dice; i++){
            setStartDice(prevState => [...prevState, i]);
        }
    }
    
    const rollDice = sound => {
        if(sound){
            const diceSound = new Audio('/dicehand.m4a');
            diceSound.play();
        }
        setTimeout(()=>setRolling(true),2325);
    }

    useEffect(()=>{
        
    },[rolling])

    return (
        <>
            {props.gameStart ?
                <>
                    <div className='game-container'>
                        {startDice.map(die=>(
                            <Dice
                            key={die}
                            dice={dice < 7 ? 0 : 1}
                            pip={dice < 7 ? 0 : 1}
                            />
                        ))}
                    </div>
                    {!rolling ?
                        <button type='button' className='roll-dice' onClick={() => rollDice(props.sound)}>Roll the dice!</button>
                        :
                        <div className='game-choice'>
                            <label htmlFor='number'>Select number of dice:</label>
                            <input type='number' name='number' value={numChoice} onChange={(e)=>setNumChoice(e.target.value)}></input>
                        </div>
                    }

                </>
                :
                <div className='parameters-container'>
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
                            <select value={dice} onChange={selectDice} onBlur={chooseDice}>
                                <option value={5}>5</option>
                                <option value={6}>6</option>
                                <option value={7}>7</option>
                                <option value={8}>8</option>
                                <option value={9}>9</option>
                                <option value={10}>10</option>
                            </select>
                        </fieldset>

                    </div>
                    <button type='button' onClick={() => props.setGameStart(true)} className='btn-start'>Start Game!</button>
                    <Link to='/' className='btn-menu'>
                        <button>Main Menu</button>
                    </Link>
                </div>
            }
        </>
    )
}

export default Game;