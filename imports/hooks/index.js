import {useState, useEffect} from 'react';

// Send these hooks as context later
// ----------------------------------------------
// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv

const setRandNum = max => Math.floor(Math.random() * max) + 1;

const nameArray = [];

while(nameArray.length < 5){
    const num = setRandNum(19);
    if(nameArray.length === 0 || !nameArray.includes(num)){
        nameArray.push(num);
    }
}


const CPU = (currentDice, num) => {
    const [dice, setDice] = useState();
    const [name, setName] = useState();
    const [numDice, setNumDice] = useState(currentDice);
    const [roll, setRoll] = useState(false);
    
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
            "Esme 'One-Eyed' Goodwin",
            "Gail 'Silver Tooth' Yelland",
            "Bella 'Ugly Mug' Vague",
            "Pearl 'Black Beard' Shakes",
            "Peggy 'Red Locks' Ripper",
            "Stella 'Rum Drunk' Rugged",
            "Harriet 'Black Beard' Raw",
            "Pearl 'Rum Drunk' Essence",
            "Lil 'Coconut Crazy' Locke",
            "Carrie 'Dead Man' Brown"
        ]
    
        return names[nameArray[num]];
    }

    useEffect(()=>{
        setDice(()=>{
            const nums = [];
            for(let i=0; i<numDice; i++) nums.push(setRandNum(numDice))
            return nums;
        })
    },[roll])

    useEffect(()=>{
        setName(pickName());
    },[])

    return [dice, numDice, name, roll, setDice, setNumDice, setRoll];
}

export const useDice = (currentDice, cpu) => {
    const [dice, setDice] = useState();
    const [numDice, setNumDice] = useState(currentDice)
    const [roll, setRoll] = useState(false);
    const [cpuPlayers, setCpuPlayers] = useState(cpu);
    const [allPlayersDice, setAllPlayersDice] = useState();
    const [CPUArray, setCPUArray] = useState();
    const [CPU1, CPU1Dice, CPU1Name, CPU1Roll, CPU1SetDice, CPU1SetNumDice, CPU1SetRoll] = CPU(numDice, 0);
    const [CPU2, CPU2Dice, CPU2Name, CPU2Roll, CPU2SetDice, CPU2SetNumDice, CPU2SetRoll] = CPU(numDice, 1);
    const [CPU3, CPU3Dice, CPU3Name, CPU3Roll, CPU3SetDice, CPU3SetNumDice, CPU3SetRoll] = CPU(numDice, 2);
    const [CPU4, CPU4Dice, CPU4Name, CPU4Roll, CPU4SetDice, CPU4SetNumDice, CPU4SetRoll] = CPU(numDice, 3);
    const [CPU5, CPU5Dice, CPU5Name, CPU5Roll, CPU5SetDice, CPU5SetNumDice, CPU5SetRoll] = CPU(numDice, 4);
    
    useEffect(()=>{
        setDice(()=>{
            const nums =[];
            for(let i=0; i<numDice; i++) nums.push(setRandNum(numDice))
            return nums;
        });
        CPU1SetRoll(!CPU1Roll);
        CPU2SetRoll(!CPU2Roll);
        CPU3SetRoll(!CPU3Roll);
        CPU4SetRoll(!CPU4Roll);
        CPU5SetRoll(!CPU5Roll);
        setAllPlayersDice(()=>{
            switch(cpuPlayers){
                case 2: return {player: dice, CPU1: CPU1, CPU2: CPU2};
                case 3: return {player: dice, CPU1: CPU1, CPU2: CPU2, CPU3: CPU3};
                case 4: return {player: dice, CPU1: CPU1, CPU2: CPU2, CPU3: CPU3, CPU4: CPU4};
                case 5: return {player: dice, CPU1: CPU1, CPU2: CPU2, CPU3: CPU3, CPU4: CPU4, CPU5: CPU5};
            }
        });
        setCPUArray(()=>{

        })
    },[roll])

    return {dice, roll, setDice, setRoll, setNumDice, setCpuPlayers, CPU1Name, CPU2Name, CPU3Name, CPU4Name, CPU5Name, CPU1, CPU2, CPU3, CPU4, CPU5, allPlayersDice};
}

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// ----------------------------------------------------------------------------------
// Send as context

export default useDice;