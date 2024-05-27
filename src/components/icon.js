import React from 'react'

const Icon = ({ icon, size, color, className = '', title, onClick }) => {
    return (
        <div onClick={onClick} title={title} className={`icon ${className}`}>
            <div className='icon_hover'></div>
            <span class="material-symbols-outlined">
                {icon || 'more_vert'}
            </span>
        </div>
    )
}

export default Icon