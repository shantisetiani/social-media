import React from "react";
import { useHistory } from "react-router";
import { Row, Col, Card } from "react-bootstrap";

function Post(props) {
  const history = useHistory();

  return (
    <Row>
      {props.data?.map((item, idx) => (
        <Col
          xs="6"
          lg="3"
          key={idx}
          onClick={() => history.push(`/post/${item.id}`)}
        >
          <Card>
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
