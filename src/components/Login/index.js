import React, { Component } from "react";
import { Button, Container, Row, Col, Form, Spinner } from "react-bootstrap";

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
    loading: false,
  };

  setPassword = (v) => {
    this.setState({ password: v });
  };
  setUsername = (v) => {
    this.setState({ username: v });
  };

  loginAction = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const { username, password } = this.state;
    if (!username || !password) {
      this.setState({ loading: false });
      return alert("Username and Password must be provided.");
    }

    const res = await loginUser({ username, password });
    if (res.ok) {
      this.props.onSuccess({ username });
    } else {
      alert(res.alert);
      this.setState({
        username: "",
        password: "",
        loading: false,
      });
    }
  };

  setSignupAction = (e) => {
    e.preventDefault();
    this.props.onNewUser();
  };

  render() {
    return (
      <Container
        fluid
        className="background-light text-dark"
        style={{
          height: "50%",
        }}
      >
        <Row>
          <Col></Col>
          <Col sm={5}>
            <div
              style={{
                padding: "60px 40px",
              }}
            >
              <h5 style={{ textAlign: "center" }}>Login</h5>
              <Form>
                <Form.Group>
                  <Form.Control
                    placeholder="Username"
                    type="text"
                    value={this.state.username}
                    onChange={(event) => this.setUsername(event.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    placeholder="Password"
                    type="password"
                    value={this.state.password}
                    onChange={(event) => this.setPassword(event.target.value)}
                  />
                </Form.Group>
                <Form.Group style={{ textAlign: "center" }}>
                  <Button
                    variant="info"
                    onClick={async (e) => await this.loginAction(e)}
                  >
                    {this.state.loading ? (
                      <Spinner animation="border" variant="light" />
                    ) : (
                      "Sign In"
                    )}
                  </Button>

                  {/* <Button
                    variant="light"
                    style={{ marginLeft: "20px" }}
                    onClick={(e) => this.setSignupAction(e)}
                  >
                    New User?
                  </Button> */}
                </Form.Group>
              </Form>
            </div>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    );
  }
}

export default Login;
