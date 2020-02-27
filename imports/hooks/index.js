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


const useCPU = (currentDice, num) => {
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
    const [CPU1, CPU1Dice, CPU1Name, CPU1Roll, CPU1SetDice, CPU1SetNumDice, CPU1SetRoll] = useCPU(numDice, 0);
    const [CPU2, CPU2Dice, CPU2Name, CPU2Roll, CPU2SetDice, CPU2SetNumDice, CPU2SetRoll] = useCPU(numDice, 1);
    const [CPU3, CPU3Dice, CPU3Name, CPU3Roll, CPU3SetDice, CPU3SetNumDice, CPU3SetRoll] = useCPU(numDice, 2);
    const [CPU4, CPU4Dice, CPU4Name, CPU4Roll, CPU4SetDice, CPU4SetNumDice, CPU4SetRoll] = useCPU(numDice, 3);
    const [CPU5, CPU5Dice, CPU5Name, CPU5Roll, CPU5SetDice, CPU5SetNumDice, CPU5SetRoll] = useCPU(numDice, 4);
    
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

    return {dice, roll, setRoll, setNumDice, setCpuPlayers, CPU1Name, CPU2Name, CPU3Name, CPU4Name, CPU5Name, CPU1, CPU2, CPU3, CPU4, CPU5, allPlayersDice};
}

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// ----------------------------------------------------------------------------------
// Send as context

export const useTimer = pageNum => {
    const [time, setTime] = useState();
    const [page, setPage] = useState(pageNum);
    const [instructionNum, setInstructionNum] = useState(1);
    const [arrow, setArrow] = useState('left');
    const [instructionDie, setInstructionDie] = useState(1);

    const timer = async (countUpOrDown = true, i = 0) => {
        console.log(i, page, instructionNum, instructionDie, countUpOrDown)
        if(instructionDie === 6 || instructionNum < 1) return;
        await new Promise(res => {
            setTimeout(()=>{
                let fn;
                
                if(page === 3 && i < 2) fn = setInstructionNum;
                else if(i === 2 && page === 3) fn = setArrow;
                else if(i > 3 && page === 3) fn = setInstructionNum;
                else if(page === 4) fn = setInstructionDie;
                console.log(fn)
                if(countUpOrDown) fn(prevState=>prevState+1);
                else if(countUpOrDown === false) fn(prevState=>prevState-1);
                else if(countUpOrDown === undefined) fn(val);

                return res();
            }, 500)
        })

        if(i < 1 || page === 4) return timer(true, i + 1);
        else if(page === 3 && i === 1) return timer(undefined, i + 1);
        else if(page === 3 && i > 4) return timer(false, i + 1);
    }
        
    useEffect(()=>{
        if(page === 3){
            setTime([1500,500,750,750,500]);
            timer();
            // timer(setInstructionNum, 2000, instructionNum, 'plus');
            // timer(setArrow, 2750, 'right');
            // timer(setInstructionNum, 3500, instructionNum, 'minus');
            // timer(setInstructionNum, 4000, instructionNum, 'minus');
        } else if(page === 4){
            setTime([1500,500,500,500,500,500]);
            setArrow('dice');
            timer();
            // timer(setInstructionDie, 1500, 1);
            // timer(setInstructionDie, 2000, instructionDie, 'plus');
            // timer(setInstructionDie, 2500, instructionDie, 'plus');
            // timer(setInstructionDie, 3000, instructionDie, 'plus');
            // timer(setInstructionDie, 3500, instructionDie, 'plus');
            // timer(setInstructionDie, 4000, instructionDie, 'plus');
        }
    
        return ()=>{
            // timer();
            setArrow('left');
            setInstructionDie();
            setInstructionNum(1);
        }
    },[page])

    return [arrow, instructionDie, instructionNum, setPage];
}

export default {useDice, useTimer};