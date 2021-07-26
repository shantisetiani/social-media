import React, { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col, Nav, Image, Alert } from "react-bootstrap";
import { UserApi, PostApi, AlbumApi } from "../api";
import useApiCall from "../customHooks/useApiCall";
import { LoginContext } from "../App";

import { Loader, Break } from "../components";
import BlankProfilePicture from "../assets/images/blank-profile-picture.png";

import Post from "./post";
import Album from "./album";

function Profile() {
  const [userDetail, setUserDetail] = useState({});
  const [posts, setPosts] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [currentTab, setCurrentTab] = useState("1");
  const [alertProps, setAlertProps] = useState({});
  const loginContext = useContext(LoginContext);

  const postStorage = useSelector((state) => state.posts);

  const splittedUrl = window.location.pathname.split("/");
  const userId = Number(splittedUrl[splittedUrl.length - 2]);

  /* Get data using custom hooks - START */
  const userResult = useApiCall({
    ApiCall: UserApi.getUser,
    params: { id: userId },
  });
  const postResult = useApiCall({
    ApiCall: PostApi.getPost,
    params: { userId: userId },
  });
  const albumResult = useApiCall({
    ApiCall: AlbumApi.getAlbum,
    params: { userId: userId },
  });
  /* Get data using custom hooks - END */

  /* Put Data into local state - START */
  useEffect(() => {
    if (userId === 99) {
      setUserDetail(loginContext.loginInfo);
    } else if (userResult.response !== null) {
      setUserDetail(userResult.response[0]);
    }
  }, [userId, loginContext.loginInfo, userResult.response]);

  useEffect(() => {
    if (userId === 99) {
      let superAdminPosts = [];
      postStorage.forEach((item) => {
        if (item.userId === 99) {
          superAdminPosts.push(item);
        }
      });
      setPosts(superAdminPosts);
    } else if (postResult.response !== null) {
      setPosts(postResult.response);
    }
    // eslint-disable-next-line
  }, [postResult.response]);

  useEffect(() => {
    if (albumResult.response !== null) {
      setAlbums(albumResult.response);
    }
  }, [albumResult.response]);
  /* Put Data into local state - END */

  // Handle error call Api
  useEffect(() => {
    if (userResult.error || postResult.error || albumResult.error) {
      setAlertProps({
        props: { show: true, variant: "danger" },
        content: "Error occured. Please try again later.",
      });
      setTimeout(() => {
        dismissAlert();
      }, 3000);
    }
  }, [userResult.error, postResult.error, albumResult.error]);

  const dismissAlert = () => {
    setAlertProps({
      props: { show: false, variant: "" },
      content: "",
    });
  };

  const handleSelectTab = (eventKey) => setCurrentTab(eventKey);

  return (
    <Container className="container-pages">
      {userResult.loading ||
      postResult.loading ||
      albumResult.loading ||
      !userDetail ? (
        <Loader />
      ) : (
        <>
          <Alert {...alertProps.props}>{alertProps.content}</Alert>
          <Row className="justify-content-center">
            <Col xs="9" sm="4" lg="3">
              <Image
                src={BlankProfilePicture}
                rounded
                style={{ width: "100%" }}
              />
            </Col>
            <Col xs="9" sm="8" lg="9">
              <Row>
                <Col>
                  <h3>{userDetail.name}</h3>
                </Col>
              </Row>
              <Row>
                <Col xs="4" lg="2">
                  Username
                </Col>
                <Col>: {userDetail.username}</Col>
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
              <Row>
                <Col xs="4" lg="2">
                  Website
                </Col>
                <Col>
                  :{" "}
                  <a
                    href={`https://${userDetail.website}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {userDetail.website}
                  </a>
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
        </>
      )}
    </Container>
  );
}

export default Profile;
