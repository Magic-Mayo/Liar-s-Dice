import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import Dice from '../Dice';

const Game = props => {
    const [players, setPlayers] = useState(2);
    const [dice, setDice] = useState(5);
    const [startDice, setStartDice] = useState([0,1,2,3,4]);
    const [rolling, setRolling] = useState(false);
    const [numChoice, setNumChoice] = useState(1);
    const [numArr, setNumArr] = useState([]);
    const [lastNum, setLastNum] = useState(1);
    const [lastDie, setLastDie] = useState(0);
    const [rollBtn, setRollBtn] = useState(true);
    const [userDieChoice, setUserDieChoice] = useState(true);
    const [totalDice, setTotalDice] = useState(players*dice);
    const [allPlayersDice, setAllPlayersDice] = useState([[1,5,2,3,2],[2,5,6,1,3,4],[5,6,1,2,4,4,4]]);

    const selectDice = e => setDice(parseInt(e.target.value))
    const selectPlayers = e => setPlayers(parseInt(e.target.value))
    const setRandNum = () => Math.floor(Math.random() * 6) + 1;

    const setPlayerDice = (player, correctCall) => {
        setAllPlayersDice(prevState => {
            []
        })
    }

    const chooseDice = () => {
        setStartDice([]);
        for(let i=0; i<dice; i++){
            setStartDice(prevState => [...prevState, i]);
        }
    }
    
    const rollDice = sound => {
        setRollBtn(false);
        if(sound){
            const diceSound = new Audio('/dicehand.m4a');
            diceSound.play();
            return setTimeout(()=>setRolling(true),2325);
        }
        setRolling(true);
    }
    
    const callBet = (lastBet, lastDie, playerBetting, playerCalling) => {
        const bet = 0;
        totalDice.forEach(val=>{
            if(val === lastDie) bet++;
        })
        if(bet >= lastBet) return setPlayerDice(playerCalling, false);
        return setPlayerDice(playerBetting, false);
    }

    const cpuBet = () => {

    }

    const userMakeBet = e => {
        e.preventDefault();
        setLastDie(userDieChoice);
        setLastNum(numChoice);
        // Have CPU make their bets here
        cpuBet();
    }

    useEffect(()=>{
        setNumArr([]);
        for(let i=0; i<startDice.length; i++){
            setNumArr(prevState=>[...prevState, setRandNum()])
        }
        
    },[rolling])

    return (
        <>
            {props.gameStart ?
                <>
                    <div className='game-container'>
                        {rolling && 
                            numArr.map((die, key)=>(
                                <Dice
                                key={key}
                                number={die}
                                dice={dice < 9 ? 0 : 1}
                                pip={dice < 9 ? 0 : 1}
                                />
                        ))}
                        {rollBtn &&
                            <button type='button' className='roll-dice' onClick={() => rollDice(props.sound)}>Roll the dice!</button>
                        }
                    </div>
                    {rolling &&
                        <div className='game-choice'>
                            <form onSubmit={userMakeBet}>
                                <label htmlFor='number'>Make&nbsp;your&nbsp;selection:</label>
                                <span
                                className='game-bet'
                                name='number'
                                value={numChoice}
                                onChange={(e)=>setNumChoice(e.target.value)}
                                >
                                    {numChoice}
                                    <span className='game-bet-down' onClick={()=>numChoice > lastNum ? setNumChoice(numChoice-1) : null}>&lt;</span>
                                    <span className='game-bet-up' onClick={()=>numChoice < totalDice ? setNumChoice(numChoice+1) : null}>&lt;</span>
                                </span>
                                <div className='game-bet-dice'>
                                    <Dice selectDie={setUserDieChoice} selection={userDieChoice} number={1} dice={2} pip={2}/>
                                    <Dice selectDie={setUserDieChoice} selection={userDieChoice} number={2} dice={2} pip={2}/>
                                    <Dice selectDie={setUserDieChoice} selection={userDieChoice} number={3} dice={2} pip={2}/>
                                    <Dice selectDie={setUserDieChoice} selection={userDieChoice} number={4} dice={2} pip={2}/>
                                    <Dice selectDie={setUserDieChoice} selection={userDieChoice} number={5} dice={2} pip={2}/>
                                    <Dice selectDie={setUserDieChoice} selection={userDieChoice} number={6} dice={2} pip={2}/>
                                </div>
                                <button className='game-bet-btn'>Choose</button>
                                <button type='button' className='game-call-btn' onClick={()=>callBet(lastBet, lastDie)}>Call</button>
                            </form>
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