import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import Dice from '../Dice';
import CPU from '../CPU';
import Parameters from '../Parameters';
import Choice from './Choice';

const setRandNum = () => Math.floor(Math.random() * 6) + 1;
const odds = () => Math.floor(Math.random()*100)+1;

const Game = props => {
    const [players, setPlayers] = useState(2);
    const [dice, setDice] = useState(5);
    const [startDice, setStartDice] = useState([0,1,2,3,4]);
    const [rolling, setRolling] = useState(false);
    const [numChoice, setNumChoice] = useState(1);
    const [numArr, setNumArr] = useState([]);
    const [lastNum, setLastNum] = useState(0);
    const [lastDie, setLastDie] = useState(0);
    const [userDieChoice, setUserDieChoice] = useState(true);
    const [totalDice, setTotalDice] = useState(players*dice);
    const [allPlayersDice, setAllPlayersDice] = useState();
    const [playerCalls, setPlayerCalls] = useState(false);
    const [whosTurn, setWhosTurn] = useState('player');
    const [CPU1, CPU1Name] = CPU(dice, rolling);
    const [CPU2, CPU2Name] = CPU(dice, rolling);
    const [CPU3, CPU3Name] = CPU(dice, rolling);
    const [CPU4, CPU4Name] = CPU(dice, rolling);
    const [CPU5, CPU5Name] = CPU(dice, rolling);

    const startGame = e => {
        e.preventDefault();
        setStartDice([]);
        for(let i=0; i<dice; i++) setStartDice(prevState => [...prevState, i]);
        props.setGameStart(true);
        setAllPlayersDice(()=>{
            switch(players){
                case 2: return {player: numArr, CPU1: CPU1, CPU2: CPU2};
                case 3: return {player: numArr, CPU1: CPU1, CPU2: CPU2, CPU3: CPU3};
                case 4: return {player: numArr, CPU1: CPU1, CPU2: CPU2, CPU3: CPU3, CPU4: CPU4};
                case 5: return {player: numArr, CPU1: CPU1, CPU2: CPU2, CPU3: CPU3, CPU4: CPU4, CPU5: CPU5};
            }
        });
    }


    const setPlayerDice = (player, correctCall) => {
        setAllPlayersDice(prevState => {
            []
        })
    }
    
    const rollDice = sound => {
        setRolling(true);
        if(sound){
            const diceSound = new Audio('/dicehand.m4a');
            diceSound.play();
            return setTimeout(()=>setRolling(true),2325);
        }
    }
    
    const callBet = (playerBetting, playerCalling) => {
        const bet = 0;
        const allDice = [];
        setPlayerCalls(true);
        for(let key in allPlayersDice){
            allDice.push(...allPlayersDice[key]);
        }

        allDice.forEach(val=>{
            if(val === lastDie) bet++;
        });

        if(bet >= lastNum) return setPlayerDice(playerCalling, false);
        return setPlayerDice(playerBetting, false);
    }

    const cpuBetOrCall = () => {
        console.log(players)
        if(whosTurn === `CPU${players}`) return setWhosTurn('player');
        setWhosTurn(`CPU${whosTurn+1}`);
        if(lastNum > totalDice*.75 && odds() > 10){
            callBet(whosTurn, whosTurn-1);
        }
        
        // allPlayersDice[whosTurn]
        
    }
    
    useEffect(()=>{
        if(whosTurn !== 'player') cpuBetOrCall();
    },[whosTurn]);

    const whoCalled = () => {
        let playerCalling;
        let playerCalled;
        switch(whosTurn){
            case 0: playerCalling = 'You'; break;
            case 1: playerCalling = CPU1Name; break;
            case 2: playerCalling = CPU2Name; break;
            case 3: playerCalling = CPU3Name; break;
            case 4: playerCalling = CPU4Name; break;
            case 5: playerCalling = CPU5Name; break;
            case 6: playerCalling = CPU6Name; break;
        }

        switch(whosTurn-1){
            case 5: playerCalled = 'You'; break;
            case 0: playerCalled = CPU1Name; break;
            case 1: playerCalled = CPU2Name; break;
            case 2: playerCalled = CPU3Name; break;
            case 3: playerCalled = CPU4Name; break;
            case 4: playerCalled = CPU5Name; break;
            case -1: playerCalled = CPU6Name; break;
        }

        return (
            <span>{playerCalling} called {playerCalled}!  Show your hand!</span>
        )
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
                        {!rolling &&
                            <button type='button' className='roll-dice' onClick={() => rollDice(props.sound)}>Roll the dice!</button>
                        }
                    </div>
                    {rolling && whosTurn === 'player' &&
                        <Choice
                        setLastDie={setLastDie}
                        setLastNum={setLastNum}
                        numChoice={numChoice}
                        cpuBetOrCall={cpuBetOrCall}
                        setNumChoice={setNumChoice}
                        lastNum={lastNum}
                        totalDice={totalDice}
                        userDieChoice={userDieChoice}
                        setUserDieChoice={setUserDieChoice}
                        callBet={callBet} />
                    }
                    {playerCalls && 
                        <div className='game-bet-called'>
                            <span>
                                {whoCalled()}
                            </span>
                        </div>
                    }
                </>
                :
                <Parameters
                setDice={setDice}
                setPlayers={setPlayers}
                startGame={startGame}
                dice={dice}
                players={players}
                />
            }
        </>
    )
}

export default Game;