import React, { Component } from "react";
import io from "socket.io-client";
import Members from "../Members";
import Messages from "../Messages/Messages";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import config from "../../config/default.json";

import {
  Container,
  Row,
  Col,
  Button,
  FormControl,
  InputGroup,
} from "react-bootstrap";

import "./chat.css";

let socket;
let index = "api-base-url";
if (process.env === "production") {
  index = `${index}-prod`;
}
const ENDPOINT = config["index"];

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

  componentDidMount() {
    const { username, roomId } = this.props;
    console.log(this.props.roomInfo);
    const { admins, members, messages } = this.props.roomInfo;
    socket = io(ENDPOINT);

    this.setState({ username, roomId, admins, members, messages });

    socket.emit("joining-room", { username, roomId }, (error) => {
      if (error) {
        alert(error);
      }
    });

    socket.on("message", (message) => {
      // console.log("recived", message);

      this.setState({
        messages: [...this.state.messages, { ...message, type: "normal" }],
      });
    });

    socket.on("alert", (message) => {
      // console.log("recieved alert", message);
      this.setState(
        { messages: [...this.state.messages, { ...message, type: "alert" }] },
        () => {
          // console.log("Messages of the room", this.state.messages);
        }
      );
    });
  }

  sendMessage = (event) => {
    const { username, roomId, message } = this.state;
    event.preventDefault();

    if (message) {
      // console.log("The message is delivered.", message);
      const messageToSend = message;
      this.setState({ message: "" });
      socket.emit("message", {
        username: username,
        roomId,
        text: messageToSend,
      });
    }
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

      this.setState({
        members: [...this.state.members, newMember],
      });
    } else {
      alert("Input some value.");
    }

    this.setState({ newMember: "" });
  };

  render() {
    const { username, roomId, messages, message } = this.state;
    return (
      <Container fluid style={{ paddingLeft: 5, paddingRight: 5 }}>
        <Row noGutters>
          <Col>
            <InfoBar room={roomId} onClose={this.props.onReturnToRoom} />
            <Row noGutters>
              <Col sm={3}>
                <div className="option-box">
                  {/* <p>Admins</p>
                  {this.state.admins.map((admin) => (
                    <p key={admin}>{admin}</p>
                  ))}
                  <p>Members</p>
                  {this.state.members.map((member) => (
                    <p key={member}>{member}</p>
                  ))} */}
                  <Members
                    members={this.state.members}
                    admins={this.state.admins}
                  />
                  <Row noGutters>
                    <Col>
                      <InputGroup className="mb-3">
                        <FormControl
                          placeholder="Enter Username"
                          value={this.state.newMember}
                          onChange={(e) =>
                            this.setState({ newMember: e.target.value })
                          }
                        />
                      </InputGroup>
                    </Col>
                    <Col sm={2}>
                      <Button
                        style={{ fontSize: "large" }}
                        onClick={(e) => this.addMemberAction(e)}
                      >
                        +
                      </Button>
                    </Col>
                  </Row>

                  {/* <button>Add Admin</button> */}
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
