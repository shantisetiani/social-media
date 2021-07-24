import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Api } from "../api";
import BlankProfilePicture from "../assets/images/blank-profile-picture.png";

function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    Api.getAllUser().then((response) => {
      console.log(response);
      setUsers(response.data);
    });
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <h3>Suggestions</h3>
        </Col>
      </Row>
      <Row>
        {users.map((user) => (
          <Col xs="6" md="4" lg="3">
            <Card>
              <Card.Img variant="top" src={BlankProfilePicture} />
              <Card.Body>
                <Card.Title>{user.name}</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <Link to="">{"See Profile >>"}</Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Row>
        <Col>
          <h3>Popular Posts</h3>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
