import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Title from '../components/title';
import { useLogin } from '../hooks/useLogin';
import { useAuthContext } from '../hooks/useAuthContext';
import { setTitle } from '../methods/title';
import CustomButton from '../components/customButton';

const Login = () => {
    const { user } = useAuthContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, isLoading, error } = useLogin();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);
    }

    useEffect(() => {
        setTitle('Login');
        if (user) navigate('/home');
    }, [user, navigate]);

    return (
        <div>
            <div className='auth_cont'>
                <Title />
                <div className='flex'>
                    <div className='auth_first'>
                        <h1>Login to Your Account</h1>
                        <form onSubmit={handleSubmit}>

                            {/* email field */}
                            <input type="email" className='input_field' placeholder='Email'
                                required value={email} onChange={(e) => { setEmail(e.target.value) }} /><br />

                            {/* password field */}
                            <input type="password" className='input_field' placeholder='Password'
                                required minLength={8} value={password} onChange={(e) => { setPassword(e.target.value) }} />

                            <Link className='link' to={'/resetpass'}>
                                <p>Forgot Password?</p>
                            </Link>

                            {/* Login button */}
                            {/* <input disabled={isLoading} className={`custom_btn ${isLoading ? 'disabled' : 'primary'}`} type="submit"
                            value="Login" style={{
                                width: '200px',
                            }} /> */}

                            <CustomButton label='Login' type={'submit'} isLoading={isLoading} />

                        </form>


                        <br />
                        {error && <div className='error'>{error}</div>}

                        <div className="mobile_alt">
                            <p>If you don't have an account</p>

                            <Link to={'/signup'}>

                                <button className='custom_btn outline' style={{ width: '200px' }}>
                                    Sign Up
                                </button>
                            </Link>

                        </div>

                    </div>

                    <div className='auth_second'>
                        <h1>New Here?</h1>
                        <p>Sign up and discover a great amount of new experience</p>
                        <Link to={'/signup'}>
                            <button className="custom_btn light" style={{ width: '200px' }}>Sign Up</button>
                        </Link>

                    </div>
                </div>
            </div>

            {/* Sample admin login credentials */}
            <div className="sample">

                <p>Sample Admin Credentials</p>
                <p><b>Username: </b>example@admin.com</p>
                <p><b>Password: </b>@Test123</p>
                <span title='close' onClick={() => {
                    const sample = document.querySelector('.sample');
                    sample.style.bottom = "-100px";
                }} className="material-symbols-outlined icon">close</span>
            </div>
        </div>

    )
}

export default Login;
