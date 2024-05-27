import React from 'react'

const HorizontalSpacer = ({ width = 20, className = '' }) => {
    return (
        <span className={className} style={{
            display: 'inline-block',
            width: width
        }}></span>
    )
}

export default HorizontalSpacer