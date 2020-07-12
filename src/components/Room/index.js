import React, { Component } from "react";
import httpService from "axios";

// httpService.post(ENDPOINT, { roomId: this.state.roomId }).then((res) => {
//   if (res.status >= 200 && res.status < 300)
//     return this.props.onSetRoom({ roomId: this.state.roomId });
//   alert("Invalid Room entry");
// });

import signIntoRoom from "../../core/__usecases__/sign-into-room";
import createRoom from "../../core/__usecases__/create-room";

const ENDPOINT = "http://localhost:5001/roomId";

class Room extends Component {
  state = {
    roomId: "",
  };
  setRoom = (roomId) => {
    console.log(this.state);
    this.setState({ roomId });
  };

  joinRoom = async (e) => {
    const { username } = this.props;
    const { roomId } = this.state;
    e.preventDefault();

    try {
      const res = await signIntoRoom({ roomId, userId: username });
      if (res.ok) {
        const roomInfo = { ...res.info.body };
        console.log("roomInfo", roomInfo);
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
      if (res.ok) {
        this.props.onSuccess({ roomId });
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
      <div className="joinOuterContainer">
        <div className="joinInnerContainer">
          <h1 className="heading">Room</h1>
          <div>
            <input
              placeholder="Room"
              className="joinInput"
              type="text"
              value={this.state.roomId}
              onChange={(event) => this.setRoom(event.target.value)}
            />
          </div>
          <a onClick={async (e) => await this.joinRoom(e)}>
            <button className={"button mt-20"}>Push in</button>
          </a>
          <a onClick={async (e) => await this.createRoom(e)}>
            <button className={"button mt-20"}>Create</button>
          </a>
        </div>
      </div>
    );
  }
}

export default Room;
