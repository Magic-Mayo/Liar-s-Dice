import React from 'react';

const Icon = props => {

    return (
        <>
        {props.icon === 'settings' &&
            <img
            src='/wheel.PNG'
            alt='settings'
            className='settings-icon'
            onClick={()=>props.setSettings(true)}></img>
        }
        </>
    )
}

export default Icon;