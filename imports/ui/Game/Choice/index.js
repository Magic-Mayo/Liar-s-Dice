import React, { useState } from 'react';
import Dice from '../../Dice';

const Choice = props => {
    const [error, setError] = useState(false);

    const userMakeBet = () => {
        props.setLastDie(props.userDieChoice);
        props.setLastNum(props.numChoice);
        props.cpuBetOrCall();
    }

    return (
        <div className='game-choice'>
            <form onSubmit={userMakeBet}>
                <label htmlFor='number'>
                    {error ?
                        'Your bet needs to be higher!' : 'Make your selection:'}</label>
                <span
                className='game-bet'
                name='number'
                value={props.numChoice}
                onChange={(e)=>props.setNumChoice(e.target.value)}
                >
                    {props.numChoice}
                    <span className='game-bet-down' onClick={props.numChoice > props.lastNum ? ()=>props.setNumChoice(props.numChoice-1) : null}>&lt;</span>
                    <span className='game-bet-up' onClick={props.numChoice < props.totalDice ? ()=>{setError(false); props.setNumChoice(props.numChoice+1)} : null}>&lt;</span>
                </span>
                <div className='game-bet-dice'>
                    <Dice numChoice={props.numChoice} lastNum={props.lastNum} setError={setError} lastDie={props.lastDie} selectDie={props.setUserDieChoice} selection={props.userDieChoice} number={1} dice={2} pip={2}/>
                    <Dice numChoice={props.numChoice} lastNum={props.lastNum} setError={setError} lastDie={props.lastDie} selectDie={props.setUserDieChoice} selection={props.userDieChoice} number={2} dice={2} pip={2}/>
                    <Dice numChoice={props.numChoice} lastNum={props.lastNum} setError={setError} lastDie={props.lastDie} selectDie={props.setUserDieChoice} selection={props.userDieChoice} number={3} dice={2} pip={2}/>
                    <Dice numChoice={props.numChoice} lastNum={props.lastNum} setError={setError} lastDie={props.lastDie} selectDie={props.setUserDieChoice} selection={props.userDieChoice} number={4} dice={2} pip={2}/>
                    <Dice numChoice={props.numChoice} lastNum={props.lastNum} setError={setError} lastDie={props.lastDie} selectDie={props.setUserDieChoice} selection={props.userDieChoice} number={5} dice={2} pip={2}/>
                    <Dice numChoice={props.numChoice} lastNum={props.lastNum} setError={setError} lastDie={props.lastDie} selectDie={props.setUserDieChoice} selection={props.userDieChoice} number={6} dice={2} pip={2}/>
                </div>
                <button type='button' className='game-bet-btn' onClick={userMakeBet}>Choose</button>
                {props.lastNum > 1 &&
                    <button type='button' className='game-call-btn' onClick={()=>props.callBet(props.turn, props.players)}>Call Last Bet</button>
                }
            </form>
            
        </div>
    )
}

export default Choice;