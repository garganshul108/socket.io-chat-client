import React from "react";

import Member from "./Member";
import { Container, Row, Col } from "react-bootstrap";

const Members = ({ members }) => {
  return (
    <Container fluid style={{ marginTop: "30px" }}>
      <Row>
        <Col>
          {members.map((member, i) => {
            return <Member member={member} key={i} />;
          })}
        </Col>
      </Row>
    </Container>
  );
};

export default Members;
