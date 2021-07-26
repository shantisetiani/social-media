import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import BlankProfilePicture from "../assets/images/blank-profile-picture.png";

function CardUser(props) {
  const { data } = props;

  return (
    <Row>
      {data.length > 0 &&
        data.map((item, idx) => (
          <Col xs="6" lg="3" key={idx}>
            <Card className="card-user">
              <Card.Img variant="top" src={BlankProfilePicture} />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <div>Phone: {item.phone}</div>
                <div>Email: {item.email}</div>
              </Card.Body>
              <Card.Footer>
                <Link to={`people/${item.id}/profile`}>{"See Profile >>"}</Link>
              </Card.Footer>
            </Card>
          </Col>
        ))}
    </Row>
  );
}

export default CardUser;
