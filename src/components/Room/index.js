import React, { Component } from "react";
import httpService from "axios";

// httpService.post(ENDPOINT, { roomId: this.state.roomId }).then((res) => {
//   if (res.status >= 200 && res.status < 300)
//     return this.props.onSetRoom({ roomId: this.state.roomId });
//   alert("Invalid Room entry");
// });

import signIntoRoom from "../../core/__usecases__/sign-into-room";
import createRoom from "../../core/__usecases__/create-room";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const ENDPOINT = "http://localhost:5001/roomId";

class Room extends Component {
  state = {
    roomId: "",
  };
  setRoom = (roomId) => {
    // console.log(this.state);
    this.setState({ roomId });
  };

  joinRoom = async (e) => {
    const { username } = this.props;
    const { roomId } = this.state;
    e.preventDefault();

    try {
      const res = await signIntoRoom({ roomId, userId: username });
      // console.log("ROom rs", res);
      if (res.ok) {
        const roomInfo = { ...res.info.body };
        // console.log("roomInfo", roomInfo);
        this.props.onSuccess({ roomId, roomInfo });
      } else {
        alert(res.alert);
        this.setState({
          roomId: "",
        });
      }
    } catch (err) {
      alert(err.message);
      this.setState({
        roomId: "",
      });
    }
  };

  createRoom = async (e) => {
    const { username } = this.props;
    const { roomId } = this.state;
    e.preventDefault();

    try {
      const res = await createRoom({ title: roomId, admin: username });
      console.log("create room res", res.info.data);
      if (res.ok) {
        this.props.onSuccess({ roomId, roomInfo: { ...res.info.data } });
      } else {
        alert(res.alert);
        this.setState({
          roomId: "",
        });
      }
    } catch (err) {
      alert(err.message);
      this.setState({
        roomId: "",
      });
    }
  };

  render() {
    return (
      <Container
        fluid
        className="background-light text-dark"
        style={{
          height: "100%",
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
              <h5 style={{ textAlign: "center" }}>Push into Room</h5>

              <Form.Group>
                <Form.Control
                  placeholder="Room"
                  type="text"
                  value={this.state.roomId}
                  onChange={(event) => this.setRoom(event.target.value)}
                />
              </Form.Group>
              <Form.Group style={{ textAlign: "center" }}>
                <Button
                  variant="info"
                  onClick={async (e) => await this.joinRoom(e)}
                >
                  Push In
                </Button>
                <Button
                  variant="light"
                  style={{ marginLeft: "20px" }}
                  onClick={async (e) => await this.createRoom(e)}
                >
                  Create new?
                </Button>
              </Form.Group>
            </div>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    );
  }
}

export default Room;
