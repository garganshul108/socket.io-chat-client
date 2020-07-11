import React, { Component } from "react";
import io from "socket.io-client";
import TextContainer from "../TextContainer/TextContainer";
import Messages from "../Messages/Messages";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";

import "./chat.css";

let socket;
const ENDPOINT = "http://localhost:5001";

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
  setMessages = (messages) => {
    this.setState({ messages });
  };

  componentWillMount() {
    const { username, roomId } = this.props;
    socket = io(ENDPOINT);

    this.setState({ username, roomId });

    // socket.emit('join', { username, roomId }, (error) => {
    //   if(error) {
    //     alert(error);
    //   }
    // });
    socket.on("message", (message) => {
      this.setMessages((messages) => [...messages, message]);
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
      socket.emit("message", { username: username, roomId, message }, () =>
        this.setMessage("")
      );
    }
  };

  render() {
    console.log(this.state);
    const { username, roomId, messages, message } = this.state;
    return (
      <div className="outerContainer">
        <div className="container">
          <InfoBar room={roomId} onClose={this.props.onReturnToRoom} />
          <Messages messages={messages} username={username} />
          <Input
            message={message}
            setMessage={this.setMessage}
            sendMessage={this.sendMessage}
          />
        </div>
      </div>
    );
  }
}

export default Chat;
