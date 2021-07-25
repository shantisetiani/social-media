import React, { useState, useEffect, useContext } from "react";
import { Container } from "react-bootstrap";
import { Api } from "../api";
import useApiCall from "../customHooks/useApiCall";
import { storeUsers, storePosts } from "../redux";
import { LoginContext } from "../App";
import { CardPost, CardPostInput } from "../component";

function AllPost() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const loginContext = useContext(LoginContext);

  const postResult = useApiCall({
    ApiCall: Api.getAllPost,
    store: storePosts,
    storageName: "posts",
  });
  const userResult = useApiCall({
    ApiCall: Api.getAllUser,
    store: storeUsers,
    storageName: "users",
  });

  /* Put Data into local state - START */
  useEffect(() => {
    if (postResult.response !== null) {
      setPosts(postResult.response);
    }
  }, [postResult.response]);
  useEffect(() => {
    if (userResult.response !== null) {
      setUsers(userResult.response);
    }
  }, [userResult.response]);
  /* Put Data into local state - END */

  const submitForm = (inputData) => {
    const data = {
      ...inputData,
      userId: loginContext.loginInfo.id,
    };
    Api.createPost(data)
      .then((response) => {
        if (response.status === 201) {
          // dispatch(addPost(response.data));
          alert("Success");
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <Container className="container-pages">
      {loginContext.isLogin && <CardPostInput onSubmit={submitForm} />}
      <CardPost data={posts} users={users} />
    </Container>
  );
}

export default AllPost;
