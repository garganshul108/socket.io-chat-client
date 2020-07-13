import React, { Component } from "react";
import io from "socket.io-client";
import Members from "../Members";
import Messages from "../Messages/Messages";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import config from "../../config/default.json";

import { Container, Row, Col, Button, Form, InputGroup } from "react-bootstrap";

let socket;
let index = "api-base-url";
if (process.env.NODE_ENV === "production") {
  index = `${index}-prod`;
}
console.log(config["index"]);
const ENDPOINT = config[index];

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
    // console.log(this.props.roomInfo);
    const { admins, members, messages } = this.props.roomInfo;
    socket = io(ENDPOINT);

    this.setState({ username, roomId, admins, members, messages });
    // const { username, roomId } = this.state;

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
      <Container fluid style={{ padding: 0, height: "100%" }}>
        <Row noGutters style={{ height: "100%" }}>
          <Col
            sm={4}
            className="background-dark text-light"
            style={{ padding: "5px", paddingTop: "20px" }}
          >
            <Form inline>
              <Form.Control
                placeholder="Enter Username"
                style={{
                  width: "calc(80% - 10px)",
                }}
                value={this.state.newMember}
                onChange={(e) => this.setState({ newMember: e.target.value })}
              />

              <Button
                className="ml-2"
                variant="info"
                style={{
                  width: "calc(20% - 10px)",
                }}
                onClick={(e) => this.addMemberAction(e)}
              >
                Add
              </Button>
            </Form>
            <Members members={this.state.members} admins={this.state.admins} />
          </Col>
          <Col>
            <InfoBar room={roomId} onClose={this.props.onReturnToRoom} />

            <Messages messageList={messages} username={username} />
            <Input
              message={message}
              value={this.state.message}
              setMessage={this.setMessage}
              sendMessage={this.sendMessage}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Chat;
