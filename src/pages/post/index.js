import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Alert } from "react-bootstrap";
import { PostApi } from "../../api";
import { LoginContext } from "../../App";
import { addPost } from "../../redux";

import { Break, CardPost, CardPostInput } from "../../components";
import "./style.css";

function Post(props) {
  const { data, user } = props;
  const [posts, setPosts] = useState(data);
  const [alertProps, setAlertProps] = useState({});
  const loginContext = useContext(LoginContext);

  const dispatch = useDispatch();
  const postStorage = useSelector((state) => state.posts);

  useEffect(() => {
    if (user.id === 99) {
      let superAdminPosts = [];
      postStorage.forEach((item) => {
        if (item.userId === 99) {
          superAdminPosts.push(item);
        }
      });
      setPosts(superAdminPosts);
    }
  }, [user.id, postStorage]);

  const submitForm = (inputData) => {
    const params = {
      ...inputData,
      userId: user.id,
    };
    PostApi.createPost(params)
      .then((response) => {
        if (response.status === 201) {
          if (user.id === 99) {
            dispatch(addPost(params));
          }
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
    <Row>
      <Alert {...alertProps.props}>{alertProps.content}</Alert>
      <Break height={10} />
      {loginContext.isLogin && <CardPostInput onSubmit={submitForm} />}
      <CardPost data={posts} />
    </Row>
  );
}

export default Post;
