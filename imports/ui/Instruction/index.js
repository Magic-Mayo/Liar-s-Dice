import React from 'react';
import {Link} from 'react-router-dom';

const Instruction = () => 
    <section className='instructions'>
        <Link to='/'>
            <button>Back to Menu</button>
        </Link>
        <p>
            On each turn you will roll your remaining dice.
        </p>
    </section>;

export default Instruction;