import { Link } from "react-router-dom"

const Title = () => {
    return (
        <Link className="link" to={'/home'}>
            <h2 className='web_title lobster-regular'>Watchwave</h2>
        </Link>
    )
}

export default Title