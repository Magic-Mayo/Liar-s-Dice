import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import Instruction from './Instruction';
import Game from './Game';
import Header from './Header';
import Dice from './Dice';
import Settings from './Settings';
import Icon from './Icon';

const songOne = new Audio('/game.mp3');

const App = () => {
    const [settings, setSettings] = useState(false);
    const [sound, setSound] = useState(false);
    const [music, setMusic] = useState(false);
    
    useEffect(()=>{
        if(music){
            songOne.loop = true;
            songOne.play();
        } else {
            songOne.pause();
            songOne.currentTime = 0;
        }
    },[music]);

    return (
        <Router>
            <Header />
            <div className='container'>
                <Route exact path='/'>
                    <div className='splash'>
                        <Dice number={2}/>
                        <Dice number={3}/>
                        <Dice number={4}/>
                        <Dice number={5}/>
                        <Dice number={6}/>
                    </div>
                    <Link to='/instruction' className='instructions-button'>
                        <button>How to Play</button>
                    </Link>
                    <Link to='/game' className='start'>
                        <button>Play!</button>
                    </Link>
                </Route>
                <Route exact path='/settings'>
                    <Settings
                    setSettings={setSettings}
                    setSound={setSound}
                    setMusic={setMusic}
                    sound={sound}
                    music={music}
                    />
                </Route>
                <Switch>
                    <Route exact path='/instruction'>
                        <Instruction />
                    </Route>
                    <Route path='/game'>
                        <Game
                        sound={sound}
                        music={music} />
                    </Route>
                </Switch>
                <Link to='/settings'>
                    <Icon
                    icon='settings'
                    settings={settings}
                    setSettings={setSettings} />
                </Link>
            </div>
        </Router>
    );
}

export default App;