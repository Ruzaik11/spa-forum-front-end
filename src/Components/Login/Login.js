import React, { Component } from 'react';
import './Login.css';
class Login extends Component {
    state = {}
    render() {
        return (

            <div className="container w-50" >
                <div className="row" >
                    <div className="col-md-12" >
                        <div class="card">
                            <div class="card-body">
                                <form>
                                    <p>Forum User Login</p>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Email address</label>
                                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1">Password</label>
                                        <input type="password" className="form-control" id="password" placeholder="" />
                                    </div>
                                    <button type="button" onClick="{Login}" className="btn btn-primary">Login</button>
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