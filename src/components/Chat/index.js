import React, { Component } from "react";
import io from "socket.io-client";
import TextContainer from "../TextContainer/TextContainer";
import Messages from "../Messages/Messages";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";

import { Container, Row, Col } from "react-bootstrap";

import "./chat.css";

let socket;
const ENDPOINT = "http://localhost:5000";

class Chat extends Component {
  state = {
    username: "",
    roomId: "",
    users: [],
    message: "",
    messages: [],
  };
  setUsername = (username) => {
    this.setState({ username });
  };
  setRoom = (roomId) => {
    this.setState({ roomId });
  };
  setUsers = (users) => {
    this.setState({ users });
  };
  setMessage = (message) => {
    this.setState({ message });
  };

  componentDidMount() {
    const { username, roomId } = this.props;
    socket = io(ENDPOINT);

    this.setState({ username, roomId });

    socket.emit("joining-room", { username, roomId }, (error) => {
      if (error) {
        alert(error);
      }
    });

    socket.on("message", (message) => {
      console.log("recived", message);

      this.setState({
        messages: [...this.state.messages, message],
      });
    });

    socket.on("alert", (message) => {
      console.log("recieved alert", message);
    });

    // socket.on("roomData", ({ users }) => {
    //   setUsers(users);
    // });
  }

  sendMessage = (event) => {
    const { username, roomId, message } = this.state;
    event.preventDefault();

    if (message) {
      console.log("The message is delivered.", message);
      const messageToSend = message;
      this.setState({ message: "" });
      socket.emit("message", {
        username: username,
        roomId,
        text: messageToSend,
      });
    }
  };

  render() {
    const { username, roomId, messages, message } = this.state;
    return (
      <Container fluid>
        <Row noGutters>
          <Col>
            <InfoBar room={roomId} onClose={this.props.onReturnToRoom} />
            <Row noGutters>
              <Col sm={3}>
                <div classNames="option-box"> options</div>
              </Col>
              <Col>
                <div className="chat-box">
                  <Messages messageList={messages} username={username} />
                  <Input
                    message={message}
                    value={this.state.message}
                    setMessage={this.setMessage}
                    sendMessage={this.sendMessage}
                  />
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Chat;
