import React, { createRef } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { Break } from "./index";

function CardPostInput(props) {
  const inputTitleRef = createRef();
  const inputCommentRef = createRef();

  const submitForm = () => {
    const data = {
      title: inputTitleRef.current.value,
      body: inputCommentRef.current.value,
    };
    props.onSubmit(data);
    inputTitleRef.current.value = "";
    inputCommentRef.current.value = "";
  };

  return (
    <Row>
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
    </Row>
  );
}

export default CardPostInput;
