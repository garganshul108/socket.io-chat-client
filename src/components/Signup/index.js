import React, { Component } from "react";
import "./signup.css";
import httpService from "axios";
import signupUser from "../../core/__usecases__/signup-user";

const ENDPOINT = "http://localhost:5001";

class Signup extends Component {
  state = {
    username: "",
    password: "",
    confirmPassword: "",
  };

  setUsername = (v) => {
    this.setState({ username: v });
  };

  setConfirmPassword = (v) => {
    this.setState({ confirmPassword: v });
  };

  setPassword = (v) => {
    this.setState({ password: v });
  };

  signupAction = async (e) => {
    const { username, password, confirmPassword } = this.state;
    e.preventDefault();
    if (!username || !password) {
      return alert("Username and Password must be provided.");
    }

    // if (password !== confirmPassword) {
    //   return alert("Passwords donot match.");
    // }

    // httpService
    //   .post(`${ENDPOINT}/signup`, {
    //     username,
    //     password,
    //   })
    //   .then((res) => {
    //     if (res.status >= 200) {
    //       this.props.onSuccess({ username });
    //     }
    //   });

    try {
      const res = await signupUser({ username, password, confirmPassword });
      if (res.ok) {
        this.props.onSuccess({ username });
      } else {
        alert(res.alert);
        this.setState({
          username: "",
          password: "",
          confirmPassword: "",
        });
      }
    } catch (err) {
      alert(err.message);
      this.setState({
        username: "",
        password: "",
        confirmPassword: "",
      });
    }
  };

  setLoginAction = (e) => {
    e.preventDefault();
    this.props.onExisitingUser();
  };

  render() {
    return (
      <div className="joinOuterContainer">
        <div className="joinInnerContainer">
          <h1 className="heading">Sign Up for Free!</h1>
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
          <div>
            <input
              placeholder="Confirm Password"
              className="joinInput mt-20"
              type="password"
              value={this.state.confirmPassword}
              onChange={(event) => this.setConfirmPassword(event.target.value)}
            />
          </div>
          <a onClick={async (e) => await this.signupAction(e)}>
            <button className={"button mt-20"}>Sign Up</button>
          </a>
          <a
            className={"mt-20"}
            style={{ color: "white", cursor: "pointer" }}
            onClick={(e) => this.setLoginAction(e)}
          >
            Existing User?
          </a>
        </div>
      </div>
    );
  }
}

export default Signup;
