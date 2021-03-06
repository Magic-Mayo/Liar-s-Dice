import React, { useState, useEffect } from 'react';
import useDice from '../../hooks';
import Dice from '../Dice';
import Parameters from '../Parameters';
import Choice from './Choice';

const odds = () => Math.floor(Math.random()*100)+1;

const Game = props => {
    const [gameStart, setGameStart] = useState(false);
    const [players, setPlayers] = useState(2);
    const [currentDice, setCurrentDice] = useState(5);
    const [numChoice, setNumChoice] = useState(1);
    const [lastNum, setLastNum] = useState(0);
    const [lastDie, setLastDie] = useState(0);
    const [userDieChoice, setUserDieChoice] = useState(true);
    const [totalDice, setTotalDice] = useState(players*currentDice);
    const [playerCalls, setPlayerCalls] = useState(false);
    const [turn, setTurn] = useState(0);
    const [bet, setBet] = useState(0);
    const {
        dice,
        roll,
        setDice,
        setRoll,
        setNumDice,
        setCpuPlayers,
        CPU1Name,
        CPU2Name,
        CPU3Name,
        CPU4Name,
        CPU5Name,
        CPU1,
        CPU2,
        CPU3,
        CPU4,
        CPU5,
        allPlayersDice
    } = useDice(currentDice, players);
    
    const rollDice = sound => {
        setNumDice(currentDice);
        
        if(sound){
            const diceSound = new Audio('/dicehand.m4a');
            diceSound.play();
            return setTimeout(()=>setRollg(true),2325);
        }
        setRoll(true);
    }
    
    const callBet = (playerBetting, playerCalling) => {
        const allDice = [];
        setPlayerCalls(true);
        for(let key in allPlayersDice){
            allDice.push(...allPlayersDice[key]);
        }

        allDice.forEach(val=>{
            if(val === lastDie) setBet(bet + 1);
        });

    }

    const whoCalled = () => {
        let playerCalling;
        let playerCalled;
        switch(turn){
            case 0: playerCalling = 'You'; playerCalled = CPU5Name; break;
            case 1: playerCalling = CPU1Name; playerCalled = 'You'; break;
            case 2: playerCalling = CPU2Name; playerCalled = CPU1Name; break;
            case 3: playerCalling = CPU3Name; playerCalled = CPU2Name; break;
            case 4: playerCalling = CPU4Name; playerCalled = CPU3Name; break;
            case 5: playerCalling = CPU5Name; playerCalled = CPU4Name; break;
        }

        return (
            <>
                <span>{playerCalling} called {playerCalled}!  Show your hand!  {playerCalled} bet {lastNum} {lastDie}'s.  There {bet > 1 ? 'are' : 'is'} {bet} {lastDie}{bet > 1 ? "'s" : ""}!  {bet >= lastNum ? playerCalling : playerCalled} loses!</span>
                <button type='button'
                onClick={()=>{
                    setRoll(false);
                    setPlayerCalls(false);
                    setLastDie(0);
                    setLastNum(0);
                    setUserDieChoice(true)
                    setNumChoice(1)}}>Next Round!</button>
            </>
        )
    }
    
    const cpuBetOrCall = () => {
        let CPU;
        let highest = 0;
        const num = {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0
        };
        
        switch(turn){
            case 0: CPU = CPU1; break;
            case 1: CPU = CPU2; break;
            case 2: CPU = CPU3; break;
            case 3: CPU = CPU4; break;
            case 4: CPU = CPU5; break;
        }
        
        setTurn(()=>{
            if(turn === players) return 0;
            return turn+1;
        });

        CPU.map(val => num[val] = num[val] + 1);

        for(let key in num){
            if(num[key] > highest) highest = key
        }

        if(lastNum > totalDice*.75) return callBet(turn, turn-1);
        if(lastNum > totalDice*.65 && odds() > 10) return callBet(turn, turn-1);
        // if(lastNum )

        // allPlayersDice[`CPU${turn}`].map(val=>{
        //     num[val] = num[val]++
        // })

    }
    
    return (
        <>
            {gameStart ?
                <>
                    <div className='game-container'>
                        {roll &&
                            dice.map((die, key)=>(
                                <Dice
                                key={key}
                                number={die}
                                dice={currentDice < 9 ? 0 : 1}
                                pip={currentDice < 9 ? 0 : 1}
                                />
                        ))}
                    </div>
                    {!roll &&
                        <button type='button' className='roll-dice' onClick={() => rollDice(props.sound)}>Roll the Dice!</button>
                    }
                    {roll && turn === 0 &&
                        <Choice
                        setLastDie={setLastDie}
                        setLastNum={setLastNum}
                        lastNum={lastNum}
                        lastDie={lastDie}
                        numChoice={numChoice}
                        cpuBetOrCall={cpuBetOrCall}
                        setNumChoice={setNumChoice}
                        totalDice={totalDice}
                        userDieChoice={userDieChoice}
                        setUserDieChoice={setUserDieChoice}
                        callBet={callBet}
                        turn={turn}
                        />
                    }
                    {turn !== 0 &&
                        <div className='CPU-container'>
                            <span className='CPU-choice'>
                                {
                                turn === 1 ? CPU1Name :
                                turn === 2 ? CPU2Name :
                                turn === 3 ? CPU3Name :
                                turn === 4 ? CPU4Name :
                                CPU5Name
                                }
                                {" "}bets {}
                            </span>
                            <button type='button' onClick={cpuBetOrCall}>Next</button>
                        </div>
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
                setCurrentDice={setCurrentDice}
                setPlayers={setPlayers}
                setGameStart={setGameStart}
                currentDice={currentDice}
                players={players}
                />
            }
        </>
    )
}

export default Game;