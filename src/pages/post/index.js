import React, { useState, useContext } from "react";
import { Row, Alert } from "react-bootstrap";
import { PostApi } from "../../api";
import { LoginContext } from "../../App";

import { Break, CardPost, CardPostInput } from "../../components";
import "./style.css";

function Post(props) {
  const { data, user } = props;
  const [alertProps, setAlertProps] = useState({});
  const loginContext = useContext(LoginContext);

  const submitForm = (inputData) => {
    const params = {
      ...inputData,
      userId: user.id,
    };
    PostApi.createPost(params)
      .then((response) => {
        if (response.status === 201) {
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
      <CardPost data={data} />
    </Row>
  );
}

export default Post;
