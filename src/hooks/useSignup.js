import { useState } from "react";
import { url } from "../methods/urls";

export const useSignup = () => {
    const [isLoading, setIsLoading] = useState(null);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null)
    // const { dispatch } = useAuthContext();

    const signup = async (fullname, email, password) => {
        setError(null);
        setIsLoading(true);
        setMessage(null);

        const response = await fetch(`${url}/api/users/signup`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fullname, email, password })
            }
        );

        const json = await response.json();

        if (!response.ok) {
            setIsLoading(false);
            json.error && setError(json.error);
        }

        if (response.ok) {
            // if (response.status === 201) {
            //     setMessage(json.message);
            // }
            // // save the user to local storage
            // localStorage.setItem('user', JSON.stringify(json));

            // // update the auth context
            // dispatch({ type: 'LOGIN', payload: json });
            setMessage(json.message);

            setIsLoading(false);
        }

    }
    return { signup, isLoading, error, message };
}