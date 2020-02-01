import React from 'react';

const CPUTurn = props => {

    return (
        <div className='CPU-container'>
            <span className='CPU-choice'>
                {
                props.turn === 1 ? props.CPU1Name :
                props.turn === 2 ? props.CPU2Name :
                props.turn === 3 ? props.CPU3Name :
                props.turn === 4 ? props.CPU4Name :
                props.CPU5Name
                }
                {" "}bets {/* code for what CPU bets goes here */}
            </span>
            <button type='button' onClick={props.cpuBetOrCall}>Next</button>
        </div>
    )
}

export default CPUTurn;