import { useEffect, useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { url } from '../methods/urls';

const useFetch = (uri, method = 'GET', body = null, statusOkMethod) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchData = async () => {
            setError(null);
            try {
                const options = {
                    method,
                    headers: {
                        'Authorization': `Bearer ${user.token}`,
                        'Content-Type': 'application/json'
                    },
                };

                if (body) {
                    options.body = JSON.stringify(body);
                }

                const response = await fetch(`${url}/${uri}`, options);
                const json = await response.json();

                if (response.ok) {
                    setData(json);
                } else {
                    throw new Error(json.error || 'Unknown error occurred');
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        if (user && user.token) {
            fetchData();
        }

    }, [uri, body, method, user, user.token]);

    return { data, error, isLoading };
};

export default useFetch;
