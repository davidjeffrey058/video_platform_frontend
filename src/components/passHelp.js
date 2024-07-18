import checked from '../images/tick-mark.png';
import close from '../images/close.png';

const PassHelp = ({ show, password }) => {
    const options = [
        'Contains a capital letter',
        'Contains a number',
        'Contains a special character',
        '8 characters long'
    ]

    const validated = (index, password) => {
        switch (index) {
            case 0:
                const regex = /[A-Z]/;
                return regex.test(password);
            case 1:
                const numRegex = /[0-9]/;
                return numRegex.test(password);
            case 2:
                const charRegex = /[!@#$%^&*(),.?":{}|<>]/;
                return charRegex.test(password);
            case 3:
                return password.length >= 8;
            default:
                return false;
        }
    }

    return (
        <div style={{
            marginTop: '10px',
            height: `${!show ? '0' : '100%'}`,
            overflowY: 'hidden',
            transition: 'all 0.5s ease-in'
        }}>

            {options.map((value, index) => (
                <div key={index} style={{
                    color: `${validated(index, password) ? 'green' : 'red'}`,
                }} className='verify_pass'>
                    <img src={`${validated(index, password) ? checked : close}`}
                        width={validated(index, password) ? 16 : 12} height={validated(index, password) ? 16 : 12} alt='check' />
                    <p>{value}</p>
                </div>
            ))}
        </div>
    )
}

export default PassHelp