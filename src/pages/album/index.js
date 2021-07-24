import React from "react";
import { Row, Col, Card } from "react-bootstrap";

function Album(props) {
  return (
    <Row>
      {props.data?.map((item, idx) => (
        <Col xs="6" md="4" lg="3" key={idx}>
          <Card style={{ height: "250px" }}>
            <Card.Body
              style={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Card.Title>{item.title}</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default Album;
