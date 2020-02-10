import React from 'react';

const Dice = props => {
    const dieSize = [10, 8, 6];
    const pipSize = [2, 1.7, 1.3];
    
    return (
        <div
        className={`die die-${props.number} ${props.selection ? 'die-hover' : ''}`}
        style={
            props.selection === props.number ? 
                {boxShadow: '#222 -12px 18px 10px', width: `${dieSize[props.dice]}vh`, height: `${dieSize[props.dice]}vh`, backgroundColor: 'black'}
            
            :

            props.number < props.lastDie && props.numChoice === props.lastNum ?
                {width: `${dieSize[props.dice]}vh`, height: `${dieSize[props.dice]}vh`, opacity: '.5'}
            
            :
                
                {width: `${dieSize[props.dice]}vh`, height: `${dieSize[props.dice]}vh`}}
        onClick={
            props.selectDie && props.number > props.lastDie || props.numChoice > props.lastNum ?
            ()=>{
                props.setError(false);
                props.selectDie(props.number);
            }

            :

            props.setError ? 
            ()=>{
                props.setError(true)
                setTimeout(()=>props.setError(false), 2000)
            }
            
            :
            
            null}>
            
            {props.number > 0 &&
            <span
            className='pip'
            style={props.selection === props.number ?
                {width: `${pipSize[props.pip]}vh`, height: `${pipSize[props.pip]}vh`, backgroundColor: 'beige'} :
                {width: `${pipSize[props.pip]}vh`, height: `${pipSize[props.pip]}vh`}}></span>}

            {props.number > 1 &&
            <span className='pip'
            style={props.selection === props.number ?
                {width: `${pipSize[props.pip]}vh`, height: `${pipSize[props.pip]}vh`, backgroundColor: 'beige'} :
                {width: `${pipSize[props.pip]}vh`, height: `${pipSize[props.pip]}vh`}}></span>}

            {props.number > 2 &&
            <span className='pip'
            style={props.selection === props.number ?
                {width: `${pipSize[props.pip]}vh`, height: `${pipSize[props.pip]}vh`, backgroundColor: 'beige'} :
                {width: `${pipSize[props.pip]}vh`, height: `${pipSize[props.pip]}vh`}}></span>}

            {props.number > 3 &&
            <span className='pip'
            style={props.selection === props.number ?
                {width: `${pipSize[props.pip]}vh`, height: `${pipSize[props.pip]}vh`, backgroundColor: 'beige'} :
                {width: `${pipSize[props.pip]}vh`, height: `${pipSize[props.pip]}vh`}}></span>}

            {props.number > 4 &&
            <span className='pip'
            style={props.selection === props.number ?
                {width: `${pipSize[props.pip]}vh`, height: `${pipSize[props.pip]}vh`, backgroundColor: 'beige'} :
                {width: `${pipSize[props.pip]}vh`, height: `${pipSize[props.pip]}vh`}}></span>}

            {props.number > 5 &&
            <span className='pip'
            style={props.selection === props.number ?
                {width: `${pipSize[props.pip]}vh`, height: `${pipSize[props.pip]}vh`, backgroundColor: 'beige'} :
                {width: `${pipSize[props.pip]}vh`, height: `${pipSize[props.pip]}vh`}}></span>}

        </div>
    )
}

export default Dice;