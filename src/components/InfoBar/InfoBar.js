import React from "react";

import closeIcon from "../../icons/closeIcon.png";
import roomDP from "../../icons/room-dp.png";

import { Container, Image, Row, Col, Button } from "react-bootstrap";

const InfoBar = ({ room, onClose }) => (
  <Container fluid>
    <Row className="background-light text-dark">
      <Col>
        <Image
          src={roomDP}
          style={{ height: "60px", width: "60px" }}
          alt="Room Display Picture"
          roundedCircle
        />
      </Col>
      <Col>
        <h3>{room}</h3>
      </Col>
      <Col>
        <Button variant="info" onClick={onClose}>
          <img src={closeIcon} alt="close icon" />
        </Button>
      </Col>
    </Row>
  </Container>
);

export default InfoBar;
