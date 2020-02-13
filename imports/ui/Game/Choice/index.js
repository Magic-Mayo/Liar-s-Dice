import React, { useState, useEffect } from 'react';
import Dice from '../../Dice';
import {FontAwesomeIcon as FAIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeft, faArrowRight} from '@fortawesome/free-solid-svg-icons';

const Choice = props => {
    const [error, setError] = useState(false);
    const [instructionNum, setInstructionNum] = useState(1);
    const [arrow, setArrow] = useState('left');
    const [instructionDie, setInstructionDie] = useState();
    
    
    const userMakeBet = () => {
        props.setLastDie(props.userDieChoice);
        props.setLastNum(props.numChoice);
        props.cpuBetOrCall();
    }
    
    useEffect(()=>{
        const timer = (fn, time, val, state) => {
            setTimeout(()=>{
                if(state === 'plus') fn(prevState=>prevState+1);
                else if(state === 'minus') fn(prevState=>prevState-1);
                else fn(val)
            }, time)
        }

        if(props.page === 3){
            timer(setInstructionNum, 1500, instructionNum, 'plus');
            timer(setInstructionNum, 2000, instructionNum, 'plus');
            timer(setArrow, 2750, 'right');
            timer(setInstructionNum, 3500, instructionNum, 'minus');
            timer(setInstructionNum, 4000, instructionNum, 'minus');
        } else if(props.page === 4){
            timer(setArrow, 4750, 'dice');
            timer(setInstructionDie, 1500, 1);
            timer(setInstructionDie, 2000, instructionDie, 'plus');
            timer(setInstructionDie, 2500, instructionDie, 'plus');
            timer(setInstructionDie, 3000, instructionDie, 'plus');
            timer(setInstructionDie, 3500, instructionDie, 'plus');
            timer(setInstructionDie, 4000, instructionDie, 'plus');
        }

        return ()=>{
            clearTimeout(timer);
            setArrow('left');
            setInstructionDie();
            setInstructionNum(1);
        }
    },[props.page])

    return (
        <div className={`game-choice ${props.instruction ? 'border' : ''}`} style={props.instruction ? {position: 'relative', padding: '20px'} : {}}>
            {props.page === 3 && arrow !== 'dice' &&
                <FAIcon
                icon={arrow !== 'right' ? faArrowLeft : faArrowRight}
                size='2x'
                className={`instructions-arrow-${arrow}`}
                />
            }

            <form onSubmit={userMakeBet}>
                <label htmlFor='number'>
                    {props.instruction ?
                        'Make your selection:'
                    : error ?
                        'Your bet needs to be higher!'
                    :
                        'Make your selection:'
                    }
                </label>
                <span
                className='game-bet'
                name='number'
                value={props.instruction && props.page === 3 ? instructionNum : props.numChoice}
                onChange={(e)=>props.setNumChoice(e.target.value)}
                >
                    {props.instruction ? instructionNum : props.numChoice}
                    <span className='game-bet-down' onClick={props.numChoice > props.lastNum ? ()=>props.setNumChoice(props.numChoice-1) : null}>&lt;</span>
                    <span className='game-bet-up' onClick={props.numChoice < props.totalDice ? ()=>{setError(false); props.setNumChoice(props.numChoice+1)} : null}>&lt;</span>
                </span>
                <div className='game-bet-dice'>
                    {[1,2,3,4,5,6].map(val=>(
                        <Dice
                        key={val}
                        numChoice={props.numChoice}
                        lastNum={props.lastNum}
                        setError={setError}
                        lastDie={props.lastDie}
                        selectDie={props.setUserDieChoice}
                        selection={props.userDieChoice || instructionDie}
                        number={val}
                        dice={2}
                        pip={2}/>
                    ))}
                </div>
                <button type='button' className='game-bet-btn' onClick={userMakeBet}>Choose</button>
                {props.lastNum > 1 &&
                    <button type='button' className='game-call-btn' onClick={!props.instruction ? ()=>props.callBet(props.turn, props.players) : null}>Call Last Bet</button>
                }
            </form>
            
        </div>
    )
}

export default Choice;