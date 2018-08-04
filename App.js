import React, { Component } from 'react';
import './App.css';
import Home from "./compoments/home"
import Login from "./compoments/LoginForm"
import { Route, Redirect } from "react-router-dom";
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {

    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <div style={{ height: "100%" }}>
        <Route path="/home" component={Home} />
        <Route  path="/login" component={Login} />
        {
          !localStorage.getItem("access_token") && window.location.href.indexOf("/login")===-1&& < Redirect to="/login" />
        }
        {

          localStorage.getItem("access_token") && < Redirect to="/home/employeeMangment" />
        }
      </div>
    );
  }
}

export default App;
