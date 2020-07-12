import React, { Component } from "react";
import Login from "../Login";
import Room from "../Room";
import Signup from "../Signup";
import Chat from "../Chat";

class Home extends Component {
  state = {
    screen: "login",
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
          <Login
            onSuccess={this.onLoginSuccess}
            onNewUser={this.setSignupScreen}
          />
        );
    }
  };

  render() {
    return <>{this.getScreen(this.state.screen)}</>;
  }
}

export default Home;
