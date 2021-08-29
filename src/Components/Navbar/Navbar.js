import React, { Component } from "react";
import AuthService from "../../Services/AuthService";
import './Navbar.css';

class Navbar extends Component {

    render() {

        return (
            <React.Fragment>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/">XYZ Company</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavDropdown">
                            <ul className="navbar-nav">

                                {
                                    (this.props.logged_in) ? (
                                        <React.Fragment>
                                            <li className="nav-item" >
                                                <a className="nav-link active" aria-current="page" href="/forum" >My Forum</a>
                                            </li>
                                           
                                            <li className="nav-item" >  
                                                <a className="nav-link btn btn-default" style={{marginTop:'5px',marginLeft:'1100px'}} aria-current="page" onClick={this.props.logout} > (<b style={{textTransform:'uppercase'}} >{this.props.user.name}</b>) - LOGOUT </a>
                                            </li>
                                        </React.Fragment>
                                    ) : (
                                        <React.Fragment>
                                            <li className="nav-item float-right">
                                                <a className="nav-link active" aria-current="page" href="/login">Login</a>
                                            </li>
                                            <li className="nav-item float-right">
                                                <a className="nav-link active" aria-current="page" href="/register">Register</a>
                                            </li>
                                        </React.Fragment>
                                    )
                                }


                            </ul>
                        </div>
                    </div>
                </nav>
            </React.Fragment >
        );
    }
}

export default Navbar;