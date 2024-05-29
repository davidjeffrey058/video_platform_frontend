import { useEffect, useState } from 'react';
import comm from '../images/communications.png';
import errorImg from '../images/error.png';
import { Link, useParams } from 'react-router-dom';
import { url } from '../methods/urls';

const Verify = () => {
    const { id, token } = useParams();
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [run, setRun] = useState(0);

    useEffect(() => {
        const verify = async () => {
            // setData(null)
            setError(null);
            setRun(run + 1);
            try {
                const response = await fetch(`${url}/api/users/${id}/verify/${token}`);

                const json = await response.json();

                if (response.ok) {
                    setIsLoading(false);
                    setData(json);
                } else {
                    setIsLoading(false);
                    throw Error(json.error);
                }
            } catch (error) {
                console.log(error)
                setIsLoading(false)
                setError(error.message)
            }
        }

        if (run <= 1) verify();

    })
    // console.log(params);
    // const { error, isLoading, data } = useFetch(`api/users/${params.id}/verify/${params.token}`);


    return (
        <div className='center'>
            {isLoading && <p>Loading...</p>}
            <div style={{ textAlign: 'center' }}>
                {data && <img src={comm} alt="ok" width={150} />}
                {data && <h2>{data.message}</h2>}
                {error && <img src={errorImg} alt='error' width={150} />}
                {error && <h2>{error}</h2>}
                {data && <Link to={'/home'}>
                    <button className="custom_btn primary">To Home</button>
                </Link>}
            </div>
        </div>
    )
}

export default Verify
