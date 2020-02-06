import React, { useState, useEffect } from 'react';
import useDice from '../../hooks';
import Dice from '../Dice';
import CPU from '../CPU';
import Parameters from '../Parameters';
import Choice from './Choice';
import CPUTurn from './CPUTurn';

const odds = () => Math.floor(Math.random()*100)+1;

const Game = props => {
    const [gameStart, setGameStart] = useState(false);
    const [players, setPlayers] = useState(2);
    const [currentDice, setCurrentDice] = useState(5);
    const [numChoice, setNumChoice] = useState(1);
    const [numArr, setNumArr] = useState([]);
    const [lastNum, setLastNum] = useState(0);
    const [lastDie, setLastDie] = useState(0);
    const [userDieChoice, setUserDieChoice] = useState(true);
    const [totalDice, setTotalDice] = useState(players*currentDice);
    const [playerCalls, setPlayerCalls] = useState(false);
    const [turn, setTurn] = useState(0);
    const [
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
        CPU5Name
    ] = useDice(currentDice, players);
    
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
        setPlayerDice(playerBetting, false);
        return setRoll(false);
    }

    const whoCalled = () => {
        let playerCalling;
        let playerCalled;
        switch(turn){
            case 0: playerCalling = 'You'; playerCalled = CPU6Name; break;
            case 1: playerCalling = CPU1Name; playerCalled = 'You'; break;
            case 2: playerCalling = CPU2Name; playerCalled = CPU1Name; break;
            case 3: playerCalling = CPU3Name; playerCalled = CPU2Name; break;
            case 4: playerCalling = CPU4Name; playerCalled = CPU3Name; break;
            case 5: playerCalling = CPU5Name; playerCalled = CPU4Name; break;
            case 6: playerCalling = CPU6Name; playerCalled = CPU5Name; break;
        }

        return (
            <span>{playerCalling} called {playerCalled}!  Show your hand!</span>
        )
    }
    
    const cpuBetOrCall = setBet => {
        const num = {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0
        };

        setTurn(()=>{
            if(turn > players) return 0;
            return turn+1;
        });
        if(lastNum > totalDice*.75 && odds() > 10) return callBet(turn, turn-1);

        // allPlayersDice[`CPU${turn}`].map(val=>{
        //     num[val] = num[val]++
        // })

    }
    
    return (
        <>
        {console.log(dice)}
            {gameStart ?
                <>
                    <div className='game-container'>
                        {roll &&
                            dice.map((die, key)=>(
                                <Dice
                                key={key}
                                number={die}
                                currentDice={currentDice < 9 ? 0 : 1}
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
                        numChoice={numChoice}
                        cpuBetOrCall={cpuBetOrCall}
                        setNumChoice={setNumChoice}
                        lastNum={lastNum}
                        totalDice={totalDice}
                        userDieChoice={userDieChoice}
                        setUserDieChoice={setUserDieChoice}
                        callBet={callBet} 
                        />
                    }
                    {turn !== 0 &&
                        <CPUTurn
                        players={players}
                        turn={turn}
                        totalDice={totalDice}
                        lastNum={lastNum}
                        playerCalls={playerCalls}
                        cpuBetOrCall={cpuBetOrCall}
                        turn={turn}
                        setTurn={setTurn}
                        CPU1Name={CPU1Name}
                        CPU2Name={CPU2Name}
                        CPU3Name={CPU3Name}
                        CPU4Name={CPU4Name}
                        CPU5Name={CPU5Name}
                        />
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