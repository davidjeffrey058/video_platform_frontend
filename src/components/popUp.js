import React from 'react'

const PopUp = ({ title, message, action, hidden = true, backgroundClose }) => {
    return (
        <div>
            <div id="overlay" onClick={backgroundClose} class={`overlay ${hidden ? 'hidden' : ''}`}></div>
            <div id="popup" class={`popup ${hidden ? 'hidden' : ''}`}>
                {/* <i style={{ position: 'absolute', right: '5px', top: '0' }}>close</i> */}
                <h2>{title || 'Title'}</h2>
                <p>{message}</p>
                {action}
            </div>
        </div>
    )
}

export default PopUp