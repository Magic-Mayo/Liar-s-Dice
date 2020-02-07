import {useState, useEffect} from 'react';

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

    return names[Math.floor(Math.random()*20)];
}




export const useDice = (currentDice, cpu) => {
    const [dice, setDice] = useState();
    const [numDice, setNumDice] = useState(currentDice)
    const [roll, setRoll] = useState(false);
    const [cpuPlayers, setCpuPlayers] = useState(cpu);
    const [allPlayersDice, setAllPlayersDice] = useState();
    
    const CPU = (numDice) => {
        const [dice, setDice] = useState();
        const [name, setName] = useState();
    
        useEffect(()=>{
            setDice([]);
            setDice(()=>{
                const nums =[];
                for(let i=0; i<numDice; i++) nums.push(setRandNum())
                return nums;
            })
        },[roll])
    
        useEffect(()=>{
            setName(pickName());
        },[])
    
        return [dice, name, setDice];
    }
    
    const [CPU1, CPU1Name, CPU1SetDice] = CPU(numDice);
    const [CPU2, CPU2Name, CPU2SetDice] = CPU(numDice);
    const [CPU3, CPU3Name, CPU3SetDice] = CPU(numDice);
    const [CPU4, CPU4Name, CPU4SetDice] = CPU(numDice);
    const [CPU5, CPU5Name, CPU5SetDice] = CPU(numDice);
    
    useEffect(()=>{
        setDice([]);
        setDice(()=>{
            const nums =[];
            for(let i=0; i<numDice; i++) nums.push(setRandNum())
            return nums;
        })
    },[roll])

    useEffect(()=>{
        setAllPlayersDice(()=>{
            switch(cpuPlayers){
                case 2: return {player: dice, CPU1: CPU1, CPU2: CPU2};
                case 3: return {player: dice, CPU1: CPU1, CPU2: CPU2, CPU3: CPU3};
                case 4: return {player: dice, CPU1: CPU1, CPU2: CPU2, CPU3: CPU3, CPU4: CPU4};
                case 5: return {player: dice, CPU1: CPU1, CPU2: CPU2, CPU3: CPU3, CPU4: CPU4, CPU5: CPU5};
            }
        });
    },[dice, CPU1, CPU2, CPU3, CPU4, CPU5])

    return [dice, roll, setDice, setRoll, setNumDice, setCpuPlayers, CPU1Name, CPU2Name, CPU3Name, CPU4Name, CPU5Name];
}

export default useDice;