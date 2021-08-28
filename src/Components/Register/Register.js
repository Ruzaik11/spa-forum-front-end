import React, { Component } from 'react';
import './Register.css';
class Register extends Component {
    state = {  }
    render() { 
        return (    <div className="container w-50" >
        <div className="row" >
            <div className="col-md-12" >
                <div class="card">
                    <div class="card-body">
                        <form>
                            <p>Forum User Register</p>

                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" className="form-control" id="name" aria-describedby="name" placeholder="" />
                            </div>


                            <div className="form-group">
                                <label htmlFor="email">Email address</label>
                                <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" id="password" placeholder="" />
                            </div>
                            <button type="button" className="btn btn-primary">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div> );
    }
}
 
export default Register;