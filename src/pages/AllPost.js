import React, { useState, useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { Container, Alert } from "react-bootstrap";
import { UserApi, PostApi } from "../api";
import useApiCall from "../customHooks/useApiCall";
import { storeUsers, storePosts, addPost } from "../redux";
import { LoginContext } from "../App";
import { CardPost, CardPostInput } from "../components";

function AllPost() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [alertProps, setAlertProps] = useState({});
  const loginContext = useContext(LoginContext);
  const dispatch = useDispatch();

  /* Get data using custom hooks - START */
  const postResult = useApiCall({
    ApiCall: PostApi.getAllPost,
    store: storePosts,
    storageName: "posts",
  });
  const userResult = useApiCall({
    ApiCall: UserApi.getAllUser,
    store: storeUsers,
    storageName: "users",
  });
  /* Get data using custom hooks - END */

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

  // Handle error call Api
  useEffect(() => {
    if (postResult.error || userResult.error) {
      setAlertProps({
        props: { show: true, variant: "danger" },
        content: "Error occured. Please try again later.",
      });
      setTimeout(() => {
        dismissAlert();
      }, 3000);
    }
  }, [postResult.error, userResult.error]);

  const submitForm = (inputData) => {
    const data = {
      ...inputData,
      userId: loginContext.loginInfo.id,
    };
    PostApi.createPost(data)
      .then((response) => {
        if (response.status === 201) {
          dispatch(addPost(data));
          setAlertProps({
            props: { show: true, variant: "success" },
            content: "Success create comment",
          });
          setTimeout(() => {
            dismissAlert();
          }, 3000);
        }
      })
      .catch((err) => {
        setAlertProps({
          props: { show: true, variant: "danger" },
          content: err,
        });
        setTimeout(() => {
          dismissAlert();
        }, 3000);
      });
  };

  const dismissAlert = () => {
    setAlertProps({
      props: { show: false, variant: "" },
      content: "",
    });
  };

  return (
    <Container className="container-pages">
      <Alert {...alertProps.props}>{alertProps.content}</Alert>
      {loginContext.isLogin && <CardPostInput onSubmit={submitForm} />}
      <CardPost data={posts} users={users} />
    </Container>
  );
}

export default AllPost;
