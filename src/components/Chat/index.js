import React, { Component } from "react";
import io from "socket.io-client";
import TextContainer from "../TextContainer/TextContainer";
import Messages from "../Messages/Messages";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";

import { Container, Row, Col, ButtonToolbar } from "react-bootstrap";

import "./chat.css";

let socket;
const ENDPOINT = "http://localhost:5000";

class Chat extends Component {
  state = {
    username: "",
    roomId: "",
    members: [],
    admins: [],
    message: "",
    messages: [],
    newMember: "",
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

  addMemberAction = (e) => {
    e.preventDefault();
    const { newMember, username, roomId } = this.state;
    if (newMember) {
      socket.emit(
        "add-member",
        { admin: username, member: newMember, roomId },
        (err) => {
          alert(err);
        }
      );
    } else {
      alert("Input some value.");
    }

    this.setState({ newMember: "" });
  };

  componentDidMount() {
    const { username, roomId } = this.props;
    const { admins, members, messages } = this.props.roomInfo;
    socket = io(ENDPOINT);

    this.setState({ username, roomId });
    this.setState({ admins, members, messages });

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
                <div className="option-box">
                  <p>Admins</p>
                  {this.state.admins.map((admin) => (
                    <p key={admin}>{admin}</p>
                  ))}
                  <p>Members</p>
                  {this.state.members.map((member) => (
                    <p key={member}>{member}</p>
                  ))}

                  <input
                    value={this.state.newMember}
                    onChange={(e) =>
                      this.setState({ newMember: e.target.value })
                    }
                  />
                  <button onClick={(e) => this.addMemberAction(e)}>
                    Add Member
                  </button>
                  <button>Add Admin</button>
                </div>
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
