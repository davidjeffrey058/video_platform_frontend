import { useState } from 'react';
import Title from '../components/title';
import { useSignup } from '../hooks/useSignup';
import { Link, } from 'react-router-dom';
import Spinner from '../components/spinner';
import { setTitle } from '../methods/title';
import PassHelp from '../components/passHelp';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullname, setFullname] = useState('');
    const { signup, isLoading, error, message } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(fullname, email, password);
    }

    setTitle('Signup');


    return (
        <div className='auth_cont'>
            <Title />
            <div className='flex'>
                <div className='auth_first'>
                    <h1>Create a new Account</h1>
                    <form onSubmit={handleSubmit}>
                        {/* Fullname field */}
                        <input type="text" className='input_field' placeholder='Full Name'
                            required value={fullname} onChange={(e) => { setFullname(e.target.value) }} /><br />

                        {/* email field */}
                        <input type="email" className='input_field' placeholder='Email'
                            required value={email} onChange={(e) => { setEmail(e.target.value) }} /><br />

                        {/* passwor field */}
                        <input type="password" className='input_field' placeholder='Password' required
                            minLength={8} value={password} onChange={(e) => { setPassword(e.target.value) }} />

                        <PassHelp show={password.length > 0} password={password} />

                        <br /><br />

                        <input disabled={isLoading} className={`custom_btn ${isLoading ? 'disabled' : 'primary'}`} type="submit"
                            value="Sign up" style={{
                                width: '200px',
                            }} />
                    </form>

                    {isLoading && <Spinner width={'80px'} />}
                    <br />
                    {error && <div className='error'>{error}</div>}
                    {message && <div className="success">{message}</div>}

                    <div className="mobile_alt">
                        <p>Already have an account</p>
                        <Link to={'/login'}>
                            <button className='custom_btn outline' style={{ width: '200px' }}>Login</button>
                        </Link>
                    </div>
                </div>

                <div className='auth_second'>
                    <h1>Already Have An Account?</h1>
                    <p>Login to your account to continue with the great experience</p>
                    <Link to={'/login'}>
                        <button className="custom_btn light" style={{ width: '200px', }}>Login</button>
                    </Link>

                </div>
            </div>
        </div>
    )
}

export default Signup