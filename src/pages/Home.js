import React, { useState, useEffect } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { Api } from "../api";
import useApiCall from "../customHooks/useApiCall";
import { storeUsers, storePosts } from "../redux";

import { Loader, CardUser, CardPost } from "../component";

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
          <CardPost data={posts} users={users} />
          <Row>
            <Col>
              <h3>Suggestions</h3>
            </Col>
          </Row>
          <CardUser data={users} />
        </>
      )}
    </Container>
  );
}

export default Home;
