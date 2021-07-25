import React, { useState, useEffect } from "react";
import { Container, Alert } from "react-bootstrap";
import { UserApi } from "../api";
import useApiCall from "../customHooks/useApiCall";
import { storeUsers } from "../redux";

import { Loader, CardUser } from "../component";

function People() {
  const [users, setUsers] = useState([]);
  const [alertProps, setAlertProps] = useState({});

  const userResult = useApiCall({
    ApiCall: UserApi.getAllUser,
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
          <CardUser data={users} />
        </>
      )}
    </Container>
  );
}

export default People;
