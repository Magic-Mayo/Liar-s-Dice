import {useEffect, useState} from 'react';

const setRandNum = () => Math.floor(Math.random() * 6) + 1;

export const CPU = numDice => {
    const [dice, setDice] = useState();

    useEffect(()=>{
        setDice([]);
        for(let i=0; i<numDice; i++){
        setDice(prevState=>[...prevState, setRandNum()])
        }
    },[numDice])

    return [dice];
}

export default CPU;