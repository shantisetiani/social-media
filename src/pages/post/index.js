import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { Row } from "react-bootstrap";
import { PostApi } from "../../api";
import { addPost } from "../../redux";
import { LoginContext } from "../../App";

import { Break, CardPost, CardPostInput } from "../../components";
import "./style.css";

function Post(props) {
  const { data, user } = props;
  const loginContext = useContext(LoginContext);
  const dispatch = useDispatch();

  const submitForm = (inputData) => {
    const data = {
      ...inputData,
      userId: user.id,
    };
    PostApi.createPost(data)
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
    <Row>
      <Break height={10} />
      {loginContext.isLogin && <CardPostInput onSubmit={submitForm} />}
      <CardPost data={data} />
    </Row>
  );
}

export default Post;
