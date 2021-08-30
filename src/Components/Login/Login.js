import React, { Component } from 'react';
import './Login.css';
import AuthService from '../../Services/AuthService';

class Login extends Component {

    state = { email:'', password:'', login: false }

    async login(event, props) {

        event.preventDefault();

        const Credentials = {
            email: this.state.email,
            password: this.state.password
        }

        const response = await AuthService.login(Credentials);

        if (response) {

            const success = await AuthService.handleLoginSuccess(response);

            if (success) {
                this.props.update_login();
                window.location.href = "/forum";
            }

        } else {
            alert("Invalid Login info");
        }

    }

    render() {

        const { email, password } = this.state;

        return (
            <div className="container w-50" >
                <div className="row" >
                    <div className="col-md-12" >
                        <div className="card">
                            <div className="card-body">
                                <form onSubmit={event => this.login(event, this.props)} >

                                    <p>Forum User Login</p>

                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Email address</label>
                                        <input value={email} onChange={event => this.setState({ email: event.target.value })} type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="" required />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1">Password</label>
                                        <input value={password} onChange={event => this.setState({ password: event.target.value })} type="password" className="form-control" id="password" placeholder="" required />
                                    </div>

                                    <button type="submit" className="btn btn-primary" >Login</button>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;