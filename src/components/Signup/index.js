import React, { Component } from "react";
import signupUser from "../../core/__usecases__/signup-user";

import { Row, Col, Container, Form, Button, Spinner } from "react-bootstrap";

class Signup extends Component {
  state = {
    username: "",
    password: "",
    confirmPassword: "",
    loading: false,
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

    this.setState({ loading: true });

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
          loading: false,
        });
      }
    } catch (err) {
      alert(err.message);
      this.setState({
        username: "",
        password: "",
        confirmPassword: "",
        loading: false,
      });
    }
  };

  setLoginAction = (e) => {
    e.preventDefault();
    this.props.onExisitingUser();
  };

  render() {
    return (
      <Container
        fluid
        className="background-dark text-light"
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
              <h5 style={{ textAlign: "center" }}>Sign Up for Free!</h5>
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
                    className="joinInput mt-20"
                    type="password"
                    value={this.state.password}
                    onChange={(event) => this.setPassword(event.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    placeholder="Confirm Password"
                    className="joinInput mt-20"
                    type="password"
                    value={this.state.confirmPassword}
                    onChange={(event) =>
                      this.setConfirmPassword(event.target.value)
                    }
                  />
                </Form.Group>
                <Form.Group style={{ textAlign: "center" }}>
                  <Button
                    variant="info"
                    onClick={async (e) => await this.signupAction(e)}
                  >
                    {this.state.loading ? (
                      <Spinner animation="border" variant="light" />
                    ) : (
                      "Sign Up"
                    )}
                  </Button>
                  {/* <Button
                    variant="light"
                    style={{ marginLeft: "20px" }}
                    onClick={(e) => this.setLoginAction(e)}
                  >
                    Existing User?
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

export default Signup;
