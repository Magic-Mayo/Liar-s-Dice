import React from 'react';

const Settings = props => {
    return (
        <div className='settings-modal'>
            <fieldset className='settings-audio'>
                <label>
                    Sound Effects
                    <input type='checkbox' checked={props.sound} onChange={()=>props.setSound(prevSetting => !prevSetting)}></input>
                    <span className='slider round'></span>
                </label>
                <label>
                    Music
                    <input type='checkbox' checked={props.music} onChange={()=>props.setMusic(prevSetting => !prevSetting)}></input>
                    <span className='slider round'></span>
                </label>
            </fieldset>
            <button className='btn-close' onClick={()=>props.setSettings(false)}>Close</button>
        </div>
    )
}

export default Settings;