import React from "react";
import { useHistory } from "react-router";
import { Row, Col, Card } from "react-bootstrap";

import "./style.css";

function Album(props) {
  const { data } = props;
  const history = useHistory();

  return (
    <Row>
      {data.length === 0 ? (
        <div style={{ textAlign: "center" }}>No Album</div>
      ) : (
        data?.map((item, idx) => (
          <Col xs="6" sm="4" lg="3" key={idx}>
            <Card
              className="card-albums"
              onClick={() => history.push(`/album/${item.id}`)}
            >
              <Card.Body
                style={{
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Card.Title>{item.title}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))
      )}
    </Row>
  );
}

export default Album;
