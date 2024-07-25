import React from 'react';
import Spinner from './spinner';
import HorizontalSpacer from './horizontalSpacer';

const CustomButton = ({ label = 'button', isLoading, type }) => {
    return (
        <button disabled={isLoading} className={`custom_btn ${isLoading ? 'disabled' : 'primary'}`} type={type}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                {isLoading && <Spinner spinnerColor={'white'} width='15px' borderWidth={'3px'} />}
                {(isLoading && label.length > 1) && <HorizontalSpacer width='10px' />}
                {label}
            </div>
        </button>
    )
}

export default CustomButton