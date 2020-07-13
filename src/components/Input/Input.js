import React from "react";

import "./Input.css";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const Input = ({ setMessage, sendMessage, message }) => (
  <Container fluid>
    <Row>
      <Col>
        <Form inline>
          <Form.Control
            style={{
              width: "90%",
            }}
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={({ target: { value } }) => setMessage(value)}
            onKeyPress={(event) =>
              event.key === "Enter" ? sendMessage(event) : null
            }
          />
          <Button
            style={{
              width: "10%",
            }}
            variant="info"
            onClick={(e) => sendMessage(e)}
          >
            Send
          </Button>
        </Form>
      </Col>
    </Row>
  </Container>
);

export default Input;
