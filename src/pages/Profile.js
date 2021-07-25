import React, { useState, useEffect } from "react";
import { Container, Row, Col, Nav, Card, Image, Alert } from "react-bootstrap";
import { Api } from "../api";
import useApiCall from "../customHooks/useApiCall";

import { Break } from "../component";
import BlankProfilePicture from "../assets/images/blank-profile-picture.png";

import Post from "./post";
import Album from "./album";

function Profile() {
  const [userDetail, setUserDetail] = useState({});
  const [posts, setPosts] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [currentTab, setCurrentTab] = useState("1");

  const splittedUrl = window.location.pathname.split("/");
  const userId = splittedUrl[splittedUrl.length - 2];

  const userResult = useApiCall({
    ApiCall: Api.getUser,
    params: { id: userId },
  });
  const postResult = useApiCall({
    ApiCall: Api.getPost,
    params: { userId: userId },
  });
  const albumResult = useApiCall({
    ApiCall: Api.getAlbum,
    params: { userId: userId },
  });

  /* Put Data into local state - START */
  useEffect(() => {
    if (userResult.response !== null) {
      setUserDetail(userResult.response[0]);
    }
  }, [userResult.response]);

  useEffect(() => {
    if (postResult.response !== null) {
      setPosts(postResult.response);
    }
  }, [postResult.response]);

  useEffect(() => {
    if (albumResult.response !== null) {
      setAlbums(albumResult.response);
    }
  }, [albumResult.response]);
  /* Put Data into local state - END */

  const handleSelectTab = (eventKey) => setCurrentTab(eventKey);

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
      <Break height={20} />
      <div>
        <Nav
          justify
          variant="tabs"
          defaultActiveKey="1"
          onSelect={handleSelectTab}
        >
          <Nav.Item>
            <Nav.Link eventKey="1">Posts</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="2">Albums</Nav.Link>
          </Nav.Item>
        </Nav>
        <Break height={10} />
        {currentTab === "1" ? (
          <Post data={posts} user={userDetail} />
        ) : (
          <Album data={albums} />
        )}
      </div>
    </Container>
  );
}

export default Profile;
