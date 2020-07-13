import React from "react";

import closeIcon from "../../icons/closeIcon.png";
import roomDP from "../../icons/room-dp.png";

import { Container, Image, Row, Col, Button } from "react-bootstrap";

const InfoBar = ({ room, onClose }) => (
  <Container fluid>
    <Row className="background-light">
      <Col>
        <Image
          src={roomDP}
          style={{ padding: "5px", height: "60px", width: "60px" }}
          alt="Room Display Picture"
          roundedCircle
        />
      </Col>
      <Col>
        <h3 style={{ paddingTop: "10px" }} className="text-dark">
          {room}
        </h3>
      </Col>
      <Col style={{ display: "contents" }}>
        <Button
          style={{ margin: "10px" }}
          variant="info"
          className="text-dark"
          onClick={onClose}
        >
          <img src={closeIcon} alt="close icon" />
        </Button>
      </Col>
    </Row>
  </Container>
);

export default InfoBar;
