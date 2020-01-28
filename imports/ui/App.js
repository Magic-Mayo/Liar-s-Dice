import React from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import Instruction from './Instruction';
import Game from './Game';
import Header from './Header';
import Dice from './Dice';
import Settings from './Settings';
import {useSettings, useSound, useMusic} from '../hooks';

const App = () => {
    const [settings, setSettings] = useSettings();
    const [sound, setSound] = useSound();
    const [music, setMusic] = useMusic();
    
    return (
        <Router>
            <Header />
            <Route exact path='/'>
                <div className='splash'>
                    <Dice />
                    <Dice />
                    <Dice />
                    <Dice />
                    <Dice />
                </div>
                <Link to='/instruction' className='instructions'>
                    <button>How to Play</button>
                </Link>
                <Link to='/game' className='start'>
                    <button>Start Game!</button>
                </Link>
            </Route>
            {settings && 
                <Settings
                setSettings={setSettings}
                setSound={setSound}
                setMusic={setMusic}
                sound={sound}
                music={music}
                />
            }
            <Switch>
                <Route exact path='/instruction'>
                    <Instruction />
                </Route>
                <Route path='/game'>
                    <Game />
                </Route>
            </Switch>
            <img
            src='/wheel.PNG'
            alt='settings'
            className='settings-icon'
            onClick={()=>setSettings(true)}></img>
        </Router>
    );
}

export default App;