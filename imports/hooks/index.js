import {useState, useEffect} from 'react';

export const useRollBtn = roll => {
    // const [rolling, setRolling] = useState(false);
    const [rollBtn, setRollBtn] = useState(true);

    useEffect(()=>{
        
    },[roll])

    return [rollBtn, setRollBtn]
}

// export default {useRollBtn};