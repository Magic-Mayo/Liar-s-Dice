import React from 'react';

const setRandNum = () => Math.floor(Math.random() * 6) + 1;

const Dice = props => {
    const randNum = setRandNum();
    const dieSize = [100, 75, 50];
    const pipSize = [15, 10, 5];

    return (
        <div
        className={`die die-${randNum}`}
        style={{width: `${dieSize[props.dice]}px`, height: `${dieSize[props.dice]}px`}}>
            {randNum > 0 && <span className='pip' style={{width: `${pipSize[props.pip]}px`, height: `${pipSize[props.pip]}px`}}></span>}
            {randNum > 1 && <span className='pip' style={{width: `${pipSize[props.pip]}px`, height: `${pipSize[props.pip]}px`}}></span>}
            {randNum > 2 && <span className='pip' style={{width: `${pipSize[props.pip]}px`, height: `${pipSize[props.pip]}px`}}></span>}
            {randNum > 3 && <span className='pip' style={{width: `${pipSize[props.pip]}px`, height: `${pipSize[props.pip]}px`}}></span>}
            {randNum > 4 && <span className='pip' style={{width: `${pipSize[props.pip]}px`, height: `${pipSize[props.pip]}px`}}></span>}
            {randNum > 5 && <span className='pip' style={{width: `${pipSize[props.pip]}px`, height: `${pipSize[props.pip]}px`}}></span>}
        </div>
    )
}

export default Dice;