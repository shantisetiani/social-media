import React, { useState, useEffect } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { UserApi, PostApi } from "../api";
import useApiCall from "../customHooks/useApiCall";
import { storeUsers, storePosts } from "../redux";

import { Loader, CardUser, CardPost } from "../component";

function Home() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [alertProps, setAlertProps] = useState({});

  /* Get data using custom hooks - START */
  const userResult = useApiCall({
    ApiCall: UserApi.getAllUser,
    store: storeUsers,
    storageName: "users",
  });
  const postResult = useApiCall({
    ApiCall: PostApi.getAllPost,
    store: storePosts,
    storageName: "posts",
  });
  /* Get data using custom hooks - END */

  /* Put Data into local state - START */
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
  /* Put Data into local state - END */

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
