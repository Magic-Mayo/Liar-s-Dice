import React, { useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import Choice from '../Game/Choice';

const Instruction = () => {
    const [page, setPage] = useState(3);

    let history = useHistory();

    return (
        <section className='instructions'>
            <span className='instructions-menu' onClick={page > 1 ? ()=>setPage(page-1) : history.goBack}>&lt;</span>
            
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
                </>
            : page === 3 ?
                <>
                    <p>
                        These buttons are how you increase and decrease the amount of dice you want to bet.
                    </p>
                </>
            : page === 4 ?
                <>
                    <p>
                        Clicking on one of the dice below that selects the die you want to bet.  So if you set the number to <span>4</span> and select the die with 
                        the number <span>3</span> you are betting <span>four 3's</span>
                    </p>
                
                </>
            : page === 5 ?
                <>
                
                </>
            :
            null
            }
            {page > 1 &&
                <Choice
                page={page}
                numChoice={1}
                instruction={true}
                />
            }

            <button
            className='instructions-next'
            type='button'
            onClick={page < 5 ? ()=>setPage(page+1) : page === 5 ? history.goBack : null}
            >
                {page < 5 ? 'Next Page' : 'Main Menu'}
            </button>
        </section>
    )
}

export default Instruction;