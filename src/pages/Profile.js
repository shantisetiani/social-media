import React, { useState, useEffect } from "react";
import { Container, Row, Col, Nav, Card, Image, Alert } from "react-bootstrap";
import { Api } from "../api";
import useApiCall from "../customHooks/useApiCall";

import { Break } from "../component";
import BlankProfilePicture from "../assets/images/blank-profile-picture.png";

function Profile() {
  const [userDetail, setUserDetail] = useState({});
  const splittedUrl = window.location.pathname.split("/");
  const userId = splittedUrl[splittedUrl.length - 2];

  const userResult = useApiCall({
    ApiCall: Api.getUser,
    params: { id: userId },
  });

  useEffect(() => {
    if (userResult.response !== null) {
      setUserDetail(userResult.response[0]);
    }
  }, [userResult.response]);

  return (
    <Container className="container-pages">
      <Row className="justify-content-center">
        <Col xs="9" sm="4" lg="3">
          <Image src={BlankProfilePicture} rounded style={{ width: "100%" }} />
        </Col>
        <Col xs="9" sm="8" lg="9">
          <Row>
            <Col>
              <h3>{userDetail.name}</h3>
            </Col>
          </Row>
          <Row>
            <Col xs="4" lg="2">
              Phone
            </Col>
            <Col>: {userDetail.phone}</Col>
          </Row>
          <Row>
            <Col xs="4" lg="2">
              Email
            </Col>
            <Col>: {userDetail.email}</Col>
          </Row>
          <Row>
            <Col xs="4" lg="2">
              Address
            </Col>
            <Col>
              : {userDetail.address?.suite}, {userDetail.address?.street},{" "}
              {userDetail.address?.city}, {userDetail.address?.zipcode}
            </Col>
          </Row>
        </Col>
      </Row>
      <Break height="20px" />
      <div>
        <Nav justify variant="tabs" defaultActiveKey="tab-posts">
          <Nav.Item>
            <Nav.Link eventKey="tab-posts">Posts</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="tab-albums">Albums</Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
    </Container>
  );
}

export default Profile;
