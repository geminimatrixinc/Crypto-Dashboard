import React from 'react';
import { Link } from 'react-router-dom';

// Example image from Unsplash, you can download and host locally if preferred
const heroImg = "https://robots.net/wp-content/uploads/2023/09/how-does-crypto-currency-work-1694631182.jpg";

const Landing = () => {
    return (
        <div className="container-fluid bg-light d-flex flex-column justify-content-center align-items-center">
            <div className="row w-100 justify-content-center align-items-center mt-5">
                <div className="col-md-6 text-center">
                    <img
                        src={heroImg}
                        alt="Crypto Portfolio"
                        className="img-fluid rounded shadow mb-4"
                        style={{ maxHeight: 320 }}
                    />
                    <h1 className="display-4 fw-bold mb-3">
                        <i className="fa-solid fa-coins text-warning me-2"></i>
                        Crypto Currency Tracker
                    </h1>
                    <p className="lead mb-4">
                        Track your favorite cryptocurrencies, monitor your portfolio, and stay ahead in the fast-moving crypto market.
                        <br />
                        <span className="text-success fw-semibold">Join now</span> and start building your own crypto dashboard!
                    </p>
                    <div className="d-flex justify-content-center gap-3">
                        <Link to="/register" className="btn btn-success btn-lg">
                            <i className="fa-solid fa-user-plus me-2"></i>
                            Register
                        </Link>
                        <Link to="/login" className="btn btn-primary btn-lg">
                            <i className="fa-solid fa-right-to-bracket me-2"></i>
                            Login
                        </Link>
                    </div>
                </div>
            </div>
            <div className="row w-100 justify-content-center mt-5">
                <div className="col-md-8 text-center">
                    <h2 className="mb-3">
                        <i className="fa-solid fa-chart-line text-info me-2"></i>
                        Why Choose Us?
                    </h2>
                    <ul className="list-unstyled fs-5">
                        <li className="mb-2">
                            <i className="fa-solid fa-check-circle text-success me-2"></i>
                            Real-time crypto prices and market data
                        </li>
                        <li className="mb-2">
                            <i className="fa-solid fa-check-circle text-success me-2"></i>
                            Personalized watchlist and alerts
                        </li>
                        <li className="mb-2">
                            <i className="fa-solid fa-check-circle text-success me-2"></i>
                            Secure portfolio management
                        </li>
                        <li className="mb-2">
                            <i className="fa-solid fa-check-circle text-success me-2"></i>
                            Easy-to-use dashboard
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Landing;