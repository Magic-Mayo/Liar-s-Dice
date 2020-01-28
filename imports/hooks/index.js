import React, {useState, useEffect} from 'react';

export const useSound = props => {
    const [sound, setSound] = useState(true);

    return [sound, setSound];
}

export const useMusic = props => {
    const [music, setMusic] = useState(true);

    useEffect(()=>{
        setMusic(props);
    }, [props]);
    
    return [music, setMusic];
}

export const useSettings = props => {
    const [settings, setSettings] = useState(false);

    useEffect(()=>{
        setSettings(props);
    },[props])

    return [settings, setSettings];
}

export default {useSound, useSettings, useMusic};