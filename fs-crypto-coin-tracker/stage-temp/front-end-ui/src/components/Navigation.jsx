
import { Link } from 'react-router-dom'

const Navigation = () => {

    return <>
        <div className="login-container">
            <Link to="/login">Login</Link>
        </div>
        <nav className="navigation-container">
            <ul>
                <li>
                    <Link to="/">Dashboard</Link>
                </li>
                <li>
                    <Link to="/watchlist">Watchlist</Link>
                </li>
            </ul>
        </nav>
    </>
}

export default Navigation;