import { useState } from "react"
// import HorizontalSpacer from "../components/horizontalSpacer";
import { url } from "../methods/urls";
import Title from "../components/title";
import { useNavigate } from "react-router-dom";
import { setTitle } from "../methods/title";
import CustomButton from "../components/customButton";

const Resetpass = () => {
    const [email, setEmail] = useState();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    setTitle('Reset Password');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setData(null);
        setIsLoading(true);
        setError(null);


        try {
            const response = await fetch(
                `${url}/api/users/password-reset`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
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
            <div className="title_cont">
                <Title />
                <br />
                <button onClick={() => navigate(-1)} className="custom_btn primary">Back</button>
            </div>
            <form onSubmit={isLoading ? () => { } : handleSubmit} className="card" style={{ padding: '20px', alignItems: 'center' }}>
                <h2 style={{ margin: '0 0 20px 0' }}>Reset Your Password</h2>
                <div className="flex spc_btw">
                    <input className="input_field reset_field" type="email"
                        required placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    {/* <HorizontalSpacer /> */}
                    {/* <button className={`custom_btn ${isLoading ? 'disabled' : 'primary'} `}>Get Link</button> */}
                    <CustomButton label={`${isLoading ? "" : 'Get Link'}`} type={'submit'} isLoading={isLoading} />
                </div>
                <br />

                {data && <div className="success">{data.message}</div>}
                {error && <div className="error">{error}</div>}
                {/* {isLoading && <div style={{ textAlign: 'center' }}><Spinner width={'80px'} /></div>} */}

            </form>
        </div>
    )
}

export default Resetpass