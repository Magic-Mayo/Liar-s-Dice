import React from 'react';

const setRandNum = () => Math.floor(Math.random() * 6) + 1;

const Dice = props => {
    const randNum = setRandNum();

    return (
        <div className={`die die-${randNum}`}>
            {randNum > 0 && <span className='pip'></span>}
            {randNum > 1 && <span className='pip'></span>}
            {randNum > 2 && <span className='pip'></span>}
            {randNum > 3 && <span className='pip'></span>}
            {randNum > 4 && <span className='pip'></span>}
            {randNum > 5 && <span className='pip'></span>}
        </div>
    )
}

export default Dice;