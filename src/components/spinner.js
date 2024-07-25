import React from 'react'

const Spinner = ({ width = '50px', borderWidth, spinnerColor, backgroundColor }) => {
    return (
        // <img src="./assets/spinner.gif" alt="" width={width} />
        <div style={{
            width: width,
            height: width,
            borderWidth: borderWidth,
            borderColor: backgroundColor,
            borderTopColor: spinnerColor
        }} className='spinner'>
        </div>
    )
}

export default Spinner