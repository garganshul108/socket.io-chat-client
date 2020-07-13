import React from "react";

import "./member.css";
import { Container, Row, Col, Image } from "react-bootstrap";

import dp from "../../../icons/dp.png";

const Member = ({ member }) => {
  return (
    <Container fluid>
      <Row>
        <Col>
          <Row>
            <Col sm={2}>
              <Image
                src={dp}
                style={{ height: "30px", width: "30px" }}
                alt="Room Display Picture"
                roundedCircle
              />
            </Col>
            <Col>
              <span className="member-text">{member}</span>
            </Col>
          </Row>
          <hr />
        </Col>
      </Row>
    </Container>
  );
};

export default Member;
