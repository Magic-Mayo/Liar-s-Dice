import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import Choice from '../Game/Choice';

const Instruction = () => {
    const [page, setPage] = useState(1);

    return (
        <section className='instructions'>
            {page < 2 ?
                <Link to='/' className='instructions-menu'>
                    &lt;
                </Link>
            :
                <span className='instructions-menu' onClick={()=>setPage(page-1)}>&lt;</span>
            }
            {page === 1 ?
                <>

                    <p>The object of the game is to be the last person with any dice.  To accomplish this you must make wagers on how many of a particular die you think there is in total.</p>

                    <p>
                        Each round consists of everyone rolling their own dice and then placing their bet in turn until someone calls a bet.  Each turn you will have a chance to either make a bet or call the last person's bet, 
                        unless you are first in the order.  In which case you will only be able to place a bet.  
                    </p>

                </>

            : page === 2 ?
                <>
                    <p>
                        After setting the game parameters, you will then begin by clicking the button to roll the dice.  After rolling, you will see what you rolled and also see your options for selecting your bet that will look like below.
                    </p>
                    <div className='border'>
                        <Choice
                        numChoice={1}
                        instruction={true}
                        />
                    </div>
                </>
            :
                <>

                </>
            }
                
            <button className='instructions-next' type='button' onClick={()=>setPage(page+1)}>Next Page</button>
        </section>
    )
}

export default Instruction;