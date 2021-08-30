import React, { Component } from 'react';
import AuthService from '../../Services/AuthService';
import './Register.css';
class Register extends Component {

    state = { name: '', email: '', password: '' }

    async register(event) {
        
        event.preventDefault();

        const response = await AuthService.register(this.state);

        if (response) {
            
            const success = await AuthService.handleLoginSuccess(response);

            if(success){
                window.location.href = "/forum";
            }

        }
    }

    render() {
        return (
            <div className="container w-50" >
                <div className="row" >
                    <div className="col-md-12" >
                        <div className="card">
                            <div className="card-body">
                                <form onSubmit={event => this.register(event)} >
                                    <p>Forum User Register</p>

                                    <div className="form-group">
                                        <label htmlFor="name">Name</label>
                                        <input type="text" value={this.state.name} onChange={event => this.setState({ name: event.target.value })} className="form-control" id="name" aria-describedby="name" placeholder="" required />
                                    </div>


                                    <div className="form-group">
                                        <label htmlFor="email">Email address</label>
                                        <input type="email" value={this.state.email} onChange={event => this.setState({ email: event.target.value })} className="form-control" id="email" aria-describedby="emailHelp" placeholder="" required />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" value={this.state.password} onChange={event => this.setState({ password: event.target.value })} className="form-control" id="password" placeholder="" required />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Register</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>);
    }
}

export default Register;