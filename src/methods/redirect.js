import { useEffect } from 'react'
import { useNavigate } from 'react-router'

const Redirect = ({ to }) => {
    const navigate = useNavigate();
    const toHome = () => navigate(to || '/home');
    useEffect(() => {
        toHome();
    });
}

export default Redirect