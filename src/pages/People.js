import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Api } from "../api";
import useApiCall from "../customHooks/useApiCall";
import { storeUsers } from "../redux";
import { MENU } from "../config";

import { Loader } from "../component";
import BlankProfilePicture from "../assets/images/blank-profile-picture.png";

function People() {
  const [users, setUsers] = useState([]);
  const [alertProps, setAlertProps] = useState({});

  const userResult = useApiCall({
    ApiCall: Api.getAllUser,
    store: storeUsers,
    storageName: "users",
  });

  useEffect(() => {
    if (userResult.response !== null) {
      setUsers(userResult.response);
    }
  }, [userResult.response]);

  //Handle error call Api
  useEffect(() => {
    if (userResult.error) {
      setAlertProps({
        props: { show: true, variant: "danger" },
        content: "Error occured. Please try again later.",
      });
      setTimeout(() => {
        dismissAlert();
      }, 3000);
    }
  }, [userResult.error]);

  const dismissAlert = () => {
    setAlertProps({
      props: { show: false, variant: "" },
      content: "",
    });
  };

  return (
    <Container className="container-pages">
      {userResult.loading ? (
        <Loader />
      ) : (
        <>
          <Alert {...alertProps.props}>{alertProps.content}</Alert>
          <Row>
            {users?.map((item, idx) => (
              <Col xs="6" lg="3" key={idx}>
                <Card>
                  <Card.Img variant="top" src={BlankProfilePicture} />
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>
                      <div>Phone: {item.phone}</div>
                      <div>Email: {item.email}</div>
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <Link to={`people/${item.id}/profile`}>
                      {"See Profile >>"}
                    </Link>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}
    </Container>
  );
}

export default People;
