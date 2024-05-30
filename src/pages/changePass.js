import HorizontalSpacer from "../components/horizontalSpacer";
import { useState } from "react";
import { url } from "../methods/urls";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Spinner from "../components/spinner";

const ChangePass = () => {
    const [password, setPassword] = useState();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { uid, token } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setData(null);
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `${url}/api/users/change-pass/${uid}/${token}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password })
            }
            );

            const json = await response.json();
            console.log(json);
            if (response.ok) {
                setIsLoading(false);
                setData(json);
            } else {
                setIsLoading(false);
                setError(json.error);
            }
        } catch (error) {
            setIsLoading(false);
            setError(error.message);
        }

    }

    return (
        <div className='center'>
            <form onSubmit={isLoading ? () => { } : handleSubmit} className="card " style={{ padding: '20px', alignItems: 'center' }}>
                <h2 style={{ margin: '0 0 20px 0' }}>Change Your Password</h2>
                <div className="flex">
                    <input className="input_field reset_field" type="password"
                        required placeholder='Enter new password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <HorizontalSpacer />
                    <button className={`custom_btn ${isLoading ? 'disabled' : 'primary'} `}>change</button>
                </div>
                <br />
                <div className="flex spc_btw">
                    {data && <div className="success">{data.message}</div>}
                    {error && <div className="error">{error}</div>}
                    {isLoading && <div style={{ textAlign: 'center' }}><Spinner width={'70px'} /></div>}
                    {data && <Link to={'/login'}><button className="custom_btn share_btn">Login</button></Link>}
                </div>
            </form>
        </div>
    )
}

export default ChangePass