import React from 'react';
import {Link} from 'react-router-dom';

export const Parameters = props => {
    return (
        <div className='parameters-container'>
            <div className='parameters'>
                <fieldset>
                    <label htmlFor='CPU'>How many CPU players?</label>
                    <select value={props.players} onChange={e => props.setPlayers(parseInt(e.target.value))}>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select>
                </fieldset>

                <fieldset>
                    <label>How many dice would you like to start with?</label>
                    <select value={props.dice} onChange={e => props.setDice(parseInt(e.target.value))}>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                        <option value={8}>8</option>
                        <option value={9}>9</option>
                        <option value={10}>10</option>
                    </select>
                </fieldset>

            </div>
            <button className='btn-start' onClick={() => props.setGameStart(true)}>Start Game!</button>
        <Link to='/' className='btn-menu'>
            <button>Main Menu</button>
        </Link>
    </div>
    )
}

export default Parameters;