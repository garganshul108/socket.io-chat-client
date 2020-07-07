import React, { Component } from "react";
import Login from "./login";

import { Button, Form, Container, Row, Col } from "react-bootstrap";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      error: "",
    };

    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dismissError = this.dismissError.bind(this);
  }

  dismissError() {
    this.setState({ error: "" });
  }

  handleSubmit(evt) {
    evt.preventDefault();

    if (!this.state.username) {
      return this.setState({ error: "Username is required" });
    }

    if (!this.state.password) {
      return this.setState({ error: "Password is required" });
    }

    return this.setState({ error: "" });
  }

  handleUserChange(evt) {
    this.setState({
      username: evt.target.value,
    });
  }

  handlePassChange(evt) {
    this.setState({
      password: evt.target.value,
    });
  }

  render() {
    return (
      <>
        <Login></Login>
        {/* <Container>
          <Row></Row>
          <Row>
            <Col></Col>
            <Col>
              <Form>
                <Form.Label>
                  <h1>Welcome Back!</h1>
                </Form.Label>
                <Form.Group controlId="username">
                  <Form.Control type="text" placeholder="Username *" />
                </Form.Group>

                <Form.Group controlId="password">
                  <Form.Control type="password" placeholder="Password *" />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Remember me" />
                </Form.Group>
                <Button variant="light" type="submit">
                  Submit
                </Button>
              </Form>
            </Col>
            <Col></Col>
          </Row>
        </Container> */}
      </>
    );
  }
}

export default Home;
