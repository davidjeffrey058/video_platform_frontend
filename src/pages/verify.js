import { useEffect, useState } from 'react';
import comm from '../images/communications.png';
import errorImg from '../images/error.png';
import { Link, useParams } from 'react-router-dom';
import { url } from '../methods/urls';
import Spinner from '../components/spinner';

const Verify = () => {
    const { id, token } = useParams();
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const verify = async () => {
            setError(null);
            try {
                const response = await fetch(`${url}/api/users/${id}/verify/${token}`);
                const json = await response.json();

                if (response.ok) {
                    setMessage(json.message);
                } else {
                    setError(json.error);
                }

            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        verify();
    }, [id, token]);



    return (
        <div className='center'>
            {isLoading && <Spinner width={'100px'} />}
            <div style={{ textAlign: 'center' }}>
                {message && <img src={comm} alt="ok" width={150} />}
                {message && <h2>{message}</h2>}
                {error && !message && <img src={errorImg} alt='error' width={150} />}
                {error && !message && <h2>{error}</h2>}
                {message && (
                    <Link to={'/home'}>
                        <button className="custom_btn primary">To Home</button>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Verify;
