import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Components/Login/Login";
import Register from './Components/Register/Register';
import AuthService from './Services/AuthService';
import Forum from './Components/Forum/Forum';
import Navbar from './Components/Navbar/Navbar';
import Post from './Components/Forum/Post/Post';
import Single from './Components/Forum/Single/Single';

class App extends Component {

  state = { user: {}, logged_in: false }

  constructor() {
    super();
    console.log('App - Constructor');
  }

  componentDidMount() {
    this.setState({ user: AuthService.getUser() });
    this.setState({ logged_in: AuthService.authenticated() });
  }

  updateLogin = () => {
    this.setState({ user: AuthService.getUser() });
    this.setState({ logged_in: AuthService.authenticated() });
  }

  logout = () => {
    AuthService.logout();
    this.updateLogin();
    window.location.href = "/login";
  }

  render() {
    console.log(this.state.logged_in)
    return (
      <React.Fragment>
        <Navbar logout={this.logout} update_login={this.updateLogin} logged_in={this.state.logged_in} user={this.state.user} ></Navbar>
        <Router>
          <Switch>

            {
              (this.state.logged_in) ? (
                <React.Fragment>
                  <Route path="/forum"  >
                    <Forum></Forum>
                  </Route>
                  <Route path="/post" >
                    <Post></Post>
                  </Route>
                  <Route path="/view/:postID" component={Single} />

                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Route exact path="/">
                    <Login update_login={this.updateLogin} logged_in={this.state.logged_in} ></Login>
                  </Route>
                  <Route path="/login">
                    <Login update_login={this.updateLogin} logged_in={this.state.logged_in} ></Login>
                  </Route>
                  <Route path="/register" >
                    <Register></Register>
                  </Route>
                </React.Fragment>
              )
            }

            <Route>404 Not Found!</Route>

          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;