import {useEffect, useState} from 'react';

const setRandNum = () => Math.floor(Math.random() * 6) + 1;

const pickName = () => {
    const names = [
        "Wylie 'The Blue Fox' Yelland",
        "Errol 'Jolly Roger' Seamen",
        "Jake 'Salty Dog' Ninnies",
        "Gordon 'Shiny Buckles' Horn",
        "Nelson 'Gold Fiend' Docherty",
        "Samuel 'Tall Story' Scott",
        "Jacob 'Sly Dog' Craggs",
        "Tobias 'Saucy Devil' Dogg",
        "Samson 'Bonny Baby' Pigg",
        "Wade 'Loud Limey' Locke",
        'Esme "One-Eyed" Goodwin',
        'Gail "Silver Tooth" Yelland',
        'Bella "Ugly Mug" Vague',
        'Pearl "Black Beard" Shakes',
        'Peggy "Red Locks" Ripper',
        `Stella "Rum Drunk" Rugged`,
        'Harriet "Black Beard" Raw',
        'Pearl "Rum Drunk" Raw',
        'Lil "Coconut Crazy" Locke',
        'Carrie "Dead Man" Brown'
    ]

    return names[Math.floor(Math.random()*19)+1];
}

export const CPU = (numDice, rolling) => {
    const [dice, setDice] = useState();
    const [name, setName] = useState();

    useEffect(()=>{
        setDice([]);
        for(let i=0; i<numDice; i++){
        setDice(prevState=>[...prevState, setRandNum()])
        }
    },[rolling])

    useEffect(()=>{
        setName(pickName());
    },[name])

    return [dice, name];
}

export default CPU;