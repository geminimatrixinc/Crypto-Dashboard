import { Link } from 'react-router-dom'

const Navigation = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid justify-content-center">
                <Link
                    className="navbar-brand mx-auto fs-2 text-white"
                    to="/"
                    style={{ fontWeight: 'bold' }}
                >
                    Crypto Currency Tracker
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end mr-5" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link active fs-4 text-light" aria-current="page" to="/dashboard">
                                Dashboard
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fs-4 text-light" to="/watchlist">
                                Watchlist
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fs-4 text-light" to="/login">
                                Login
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;