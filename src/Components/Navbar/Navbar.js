
const Navbar = () => {
    return (
        <div className="container w-75" >
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        XYZ Company
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item"><a class="nav-link" href="/login">Login</a></li>
                            <li className="nav-item"><a class="nav-link" href="/register">Register</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
