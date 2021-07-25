import React from "react";
import { useHistory } from "react-router";
import { Row, Col, Card } from "react-bootstrap";
import { Text, Break } from "./index";
import "./style.css";

function CardPost(props) {
  const { data, users } = props;
  const history = useHistory();

  const getUser = (userId) => {
    return users.find((item) => (item.id = userId));
  };

  return (
    <Row>
      {data?.map((item, idx) => (
        <Col xs="12" lg="6" key={idx}>
          <Card className="card-post">
            <Card.Body onClick={() => history.push(`/post/${item.id}`)}>
              <Card.Title>{item.title}</Card.Title>
              <Text size={14}>{item.body}</Text>
              <Break height={10} />
              {users && (
                <Text size={12} color="#333">
                  By <b>{getUser(item.userId)?.name}</b>
                </Text>
              )}
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default CardPost;