import React, {useState} from 'react';

const CPUTurn = props => {
    const [cpuBet, setCpuBet] = useState();

    useEffect(()=>{
        props.setTurn(props.turn+1);
    },[])

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
                {" "}bets {cpuBet}
            </span>
            <button type='button' onClick={()=>props.cpuBetOrCall(setCpuBet)}>Next</button>
        </div>
    )
}

export default CPUTurn;