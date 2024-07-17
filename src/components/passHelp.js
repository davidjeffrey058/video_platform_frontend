import React from 'react'

const PassHelp = ({ show, password }) => {
    const options = [
        'Contains a capital letter',
        'Contains a number',
        'Contains a special character',
        '8 characters long'
    ]

    const validated = (index, password) => {
        switch (index) {
            case 0:
                return false;
            case 1:
                return false;
            case 2:
                return false;
            case 3:
                return password.length >= 8;
            default:
                return false;
        }
    }

    return (
        <div style={{
            marginTop: '10px',
            height: `${!show ? '0' : '100%'}`,
            overflowY: 'hidden',
            transition: 'all 0.5s ease-in'
        }}>

            {options.map((value, index) => (
                <div key={index} style={{
                    color: `${validated(index, password) ? 'green' : 'red'}`
                }} className='verify_pass flex'>
                    <img src={`./assets/${validated(index, password) ? 'tick-mark.png' : 'close.png'}`}
                        width={validated(index, password) ? 16 : 12} height={validated(index, password) ? 16 : 12} alt='check' />
                    <p>{value}</p>
                </div>
            ))}
        </div>
    )
}

export default PassHelp