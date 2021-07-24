import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Api } from "../api";
import useApiCall from "../customHooks/useApiCall";
import { storeUsers, storePosts } from "../redux";
import { MENU } from "../config";

import { Loader } from "../component";
import BlankProfilePicture from "../assets/images/blank-profile-picture.png";

function Home() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [alertProps, setAlertProps] = useState({});

  const userResult = useApiCall({
    ApiCall: Api.getAllUser,
    store: storeUsers,
    storageName: "users",
  });
  const postResult = useApiCall({
    ApiCall: Api.getAllPost,
    store: storePosts,
    storageName: "posts",
  });

  useEffect(() => {
    if (userResult.response !== null) {
      let selectedUsers = [];
      for (let i = 0; i < 4; i++) {
        selectedUsers.push(userResult.response[i]);
      }
      setUsers(selectedUsers);
    }
  }, [userResult.response]);

  useEffect(() => {
    if (postResult.response !== null) {
      let selectedPosts = [];
      for (let i = 0; i < 4; i++) {
        selectedPosts.push(postResult.response[i]);
      }
      setPosts(selectedPosts);
    }
  }, [postResult.response]);

  //Handle error call Api
  useEffect(() => {
    if (userResult.error || postResult.error) {
      setAlertProps({
        props: { show: true, variant: "danger" },
        content: "Error occured. Please try again later.",
      });
      setTimeout(() => {
        dismissAlert();
      }, 3000);
    }
  }, [userResult.error, postResult.error]);

  /* useEffect(() => {
    Api.getAllUser()
      .then((response) => {
        let selecteUsers = [];
        for (let i = 0; i < 4; i++) {
          selecteUsers.push(response.data[i]);
        }
        setUsers(selecteUsers);
        setAlertProps({
          props: { show: true, variant: "success" },
          content: "Success.",
        });
        setTimeout(() => {
          dismissAlert();
        }, 3000);
      })
      .catch((err) => {
        setAlertProps({
          props: { show: true, variant: "danger" },
          content: "Error occured. Please try again later.",
        });
        setTimeout(() => {
          dismissAlert();
        }, 3000);
      });
  }, []); */

  const getUser = (userId) => {
    return users.find((item) => (item.id = userId));
  };

  const dismissAlert = () => {
    setAlertProps({
      props: { show: false, variant: "" },
      content: "",
    });
  };

  return (
    <Container className="container-pages">
      {userResult.loading ? (
        <Loader />
      ) : (
        <>
          <Alert {...alertProps.props}>{alertProps.content}</Alert>
          <Row>
            <Col>
              <h3>Popular Posts</h3>
            </Col>
          </Row>
          <Row>
            {posts?.map((item, idx) => (
              <Col xs="6" lg="3" key={idx}>
                <Card>
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>{item.body}</Card.Text>
                    <Card.Subtitle>{getUser(item.userId)?.name}</Card.Subtitle>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <Row>
            <Col>
              <h3>Suggestions</h3>
            </Col>
          </Row>
          <Row>
            {users?.map((item, idx) => (
              <Col xs="6" lg="3" key={idx}>
                <Card>
                  <Card.Img variant="top" src={BlankProfilePicture} />
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>
                      <div>Phone: {item.phone}</div>
                      <div>Email: {item.email}</div>
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <Link to={`people/${item.id}/profile`}>
                      {"See Profile >>"}
                    </Link>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}
    </Container>
  );
}

export default Home;
