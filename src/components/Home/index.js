import React, { Component } from "react";
import Login from "../Login";
import Room from "../Room";
import Signup from "../Signup";
import Chat from "../Chat";
import { Container, Row, Col } from "react-bootstrap";

class Home extends Component {
  state = {
    screen: "chat",
    username: "",
    roomId: "",
    roomInfo: {},
  };

  onLoginSuccess = ({ username }) => {
    this.setState({ screen: "setRoom", username });
  };

  onSignupSuccess = ({ username }) => {
    this.setState({ screen: "setRoom", username });
  };

  onSetRoomSuccess = ({ roomId, roomInfo }) => {
    console.log("Home setRoom ", roomInfo);
    this.setState({ roomId, roomInfo }, () => {
      this.setState({ screen: "chat" });
    });
  };

  setSignupScreen = () => {
    this.setState({ username: "", roomId: "", screen: "signup" });
  };

  setLoginScreen = () => {
    this.setState({ username: "", roomId: "", screen: "login" });
  };

  setSetRoomScreen = () => {
    this.setState({ screen: "setRoom" });
  };

  getScreen = (screen) => {
    switch (screen) {
      case "setRoom":
        return (
          <Room
            username={this.state.username}
            onSuccess={this.onSetRoomSuccess}
          />
        );
      case "signup":
        return (
          <Signup
            onSuccess={this.onSignupSuccess}
            onExisitingUser={this.setLoginScreen}
          />
        );
      case "chat":
        return (
          <Chat
            onReturnToRoom={this.setSetRoomScreen}
            onLogout={this.setLoginScreen}
            roomId={this.state.roomId}
            username={this.state.username}
            roomInfo={this.state.roomInfo}
          />
        );
      default:
        return (
          <>
            <Login
              onSuccess={this.onLoginSuccess}
              onNewUser={this.setSignupScreen}
            />
            <Signup
              onSuccess={this.onSignupSuccess}
              onExisitingUser={this.setLoginScreen}
            />
          </>
        );
    }
  };

  render() {
    return (
      <Container style={{ background: "white", height: "100vh" }}>
        <Row style={{ height: "100%" }}>
          <Col style={{ padding: 0 }}>{this.getScreen(this.state.screen)}</Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
