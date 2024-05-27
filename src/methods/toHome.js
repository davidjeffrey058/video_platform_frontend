import { useEffect } from 'react'
import { Navigate } from 'react-router'

const ToHome = () => {
    const toHome = () => Navigate('/home');
    useEffect(() => {
        toHome();
    });
}

export default ToHome