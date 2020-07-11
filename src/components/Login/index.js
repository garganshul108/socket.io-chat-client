import React, { Component } from "react";
import httpService from "axios";

import "./login.css";
import loginUser from "../../core/__usecases__/login-user";
const ENDPOINT = "http://localhost:5001";

const breakdown = (object) => {
  for (let nt in object) {
    console.log(`${nt}:\t${object[nt]}:\t${typeof object[nt]}`);
  }
};

class Login extends Component {
  state = {
    username: "",
    password: "",
  };

  setPassword = (v) => {
    this.setState({ password: v });
  };
  setUsername = (v) => {
    this.setState({ username: v });
  };

  loginAction = async (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    if (!username || !password) {
      return alert("Username and Password must be provided.");
    }
    // httpService
    //   .post(`${ENDPOINT}/login`, { username, password })
    //   .then((res) => {
    //     console.log("Response is recieved");
    //     if (res.status >= 200) {
    //       this.props.onSuccess({ username });
    //     }
    //   });

    const res = await loginUser({ username, password });
    if (res.ok) {
      this.props.onSuccess({ username });
    } else {
      alert(res.alert);
      this.setState({
        username: "",
        password: "",
      });
    }
  };

  setSignupAction = (e) => {
    e.preventDefault();
    this.props.onNewUser();
  };

  render() {
    return (
      <div className="joinOuterContainer">
        <div className="joinInnerContainer">
          <h1 className="heading">Already a user? Login</h1>
          <div>
            <input
              placeholder="Username"
              className="joinInput"
              type="text"
              value={this.state.username}
              onChange={(event) => this.setUsername(event.target.value)}
            />
          </div>
          <div>
            <input
              placeholder="Password"
              className="joinInput mt-20"
              type="password"
              value={this.state.password}
              onChange={(event) => this.setPassword(event.target.value)}
            />
          </div>
          <a onClick={async (e) => await this.loginAction(e)}>
            <button className={"button mt-20"}>Sign In</button>
          </a>
          <a
            className={"mt-20"}
            style={{ color: "white", cursor: "pointer" }}
            onClick={(e) => this.setSignupAction(e)}
          >
            New User?
          </a>
        </div>
      </div>
    );
  }
}

export default Login;
