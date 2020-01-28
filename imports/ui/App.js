import React from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import Instruction from './Instruction';
import Game from './Game';

const App = () => (
    
    <Router>
        <Route exact path='/'>
            <h1>Welcome to Liar's Dice!</h1>
            <Link to='/instruction' className='instructions'>
                <button>How to Play</button>
            </Link>
            <Link to='/start' className='start'>
                <button>Start Game!</button>
            </Link>
        </Route>
        <Switch>
            <Route exact path='/instruction'>
                <Instruction />
            </Route>
            <Route exact path='/start'>
                <Game />
            </Route>
        </Switch>
    </Router>
);

export default App;