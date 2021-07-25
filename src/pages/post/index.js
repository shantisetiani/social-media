import React, { createRef } from "react";
import { useHistory } from "react-router";
import { Row, Col, Card, Button } from "react-bootstrap";
import { Api } from "../../api";

import { Break } from "../../component";
import "./style.css";

function Post(props) {
  const history = useHistory();
  const inputTitleRef = createRef();
  const inputCommentRef = createRef();

  const submitForm = () => {
    const data = {
      title: inputTitleRef.current.value,
      body: inputCommentRef.current.value,
      userId: props.user.id,
    };
    Api.createPost(data)
      .then((response) => {
        if (response.status === 201) {
          inputTitleRef.current.value = "";
          inputCommentRef.current.value = "";
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
      <Col xs="12" lg="6">
        <Card className="card-post-input">
          <Card.Body>
            <form>
              <input
                name="title"
                placeholder="Title"
                ref={inputTitleRef}
              ></input>
              <Break height={10} />
              <textarea
                name="body"
                placeholder="Write a post..."
                ref={inputCommentRef}
              ></textarea>
              <div style={{ textAlign: "right" }}>
                <Button
                  variant="primary"
                  type="button"
                  size="sm"
                  onClick={submitForm}
                >
                  Post
                </Button>
              </div>
            </form>
          </Card.Body>
        </Card>
      </Col>
      {props.data?.map((item, idx) => (
        <Col
          xs="12"
          lg="6"
          key={idx}
          onClick={() => history.push(`/post/${item.id}`)}
        >
          <Card className="card-post">
            <Card.Body>
              <Card.Title>{item.title}</Card.Title>
              <Card.Text>{item.body}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default Post;
