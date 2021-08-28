import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './Components/Home/Home';
import Login from "./Components/Login/Login";
import Register from './Components/Register/Register';
import Navbar from './Components/Navbar/Navbar';

ReactDOM.render(
  <React.StrictMode>
    <Navbar />
    <Router>
      <Switch>
        <Route path="/" exact component={Home} ></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/register" component={Register}></Route>
        <Route>404 Not Found!</Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
