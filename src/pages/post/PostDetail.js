import React, { useState, useEffect, createRef, useContext } from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { Container, Row, Col, Button, Alert, Modal } from "react-bootstrap";
import { Api } from "../../api";
import useApiCall from "../../customHooks/useApiCall";
import { storeUsers, addPost } from "../../redux";
import { LoginContext } from "../../App";

import { Text, Loader, Break } from "../../component";
import "./style.css";

function PostDetail() {
  const [postDetail, setPostDetail] = useState({});
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState({});
  const [alertProps, setAlertProps] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [showModal, setShowModal] = useState(false);

  const inputCommentRef = createRef();
  const loginContext = useContext(LoginContext);
  const dispatch = useDispatch();
  const history = useHistory();

  const splittedUrl = window.location.pathname.split("/");
  const postId = splittedUrl[splittedUrl.length - 1];

  const postResult = useApiCall({
    ApiCall: Api.getPostDetail,
    params: postId,
  });
  const commentResult = useApiCall({
    ApiCall: Api.getPostComments,
    params: postId,
  });
  const userResult = useApiCall({
    ApiCall: Api.getAllUser,
    store: storeUsers,
    storageName: "users",
  });

  /* Put Data into local state - START */
  useEffect(() => {
    if (postResult.response !== null) {
      setPostDetail(postResult.response);
    }
  }, [postResult.response]);

  useEffect(() => {
    if (commentResult.response !== null) {
      setComments(commentResult.response);
    }
  }, [commentResult.response]);

  useEffect(() => {
    if (userResult.response !== null) {
      setUsers(userResult.response);
    }
  }, [userResult.response]);
  /* Put Data into local state - END */

  //Handle error call Api
  useEffect(() => {
    if (postResult.error || commentResult.error || userResult.error) {
      setAlertProps({
        props: { show: true, variant: "danger" },
        content: "Error occured. Please try again later.",
      });
      setTimeout(() => {
        dismissAlert();
      }, 3000);
    }
  }, [postResult.error, commentResult.error, userResult.error]);

  const getUser = (userId) => {
    return users.length > 0 && users.find((item) => (item.id = userId));
  };

  const dismissAlert = () => {
    setAlertProps({
      props: { show: false, variant: "" },
      content: "",
    });
  };

  const showError = (error) => {
    setAlertProps({
      props: { show: true, variant: "danger" },
      content: error,
    });
    setTimeout(() => {
      dismissAlert();
    }, 3000);
  };

  const submitForm = () => {
    const data = {
      name: loginContext.loginInfo.name,
      email: loginContext.loginInfo.email,
      body: inputCommentRef.current.value,
      postId: postId,
    };

    Api.createComment(data)
      .then((response) => {
        if (response.status === 201) {
          inputCommentRef.current.value = "";
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
        showError(err);
      });
  };

  const editPost = () => {
    setIsEditMode(true);
    setPostTitle(postDetail.title);
    setPostBody(postDetail.body);
  };

  const submitEdit = () => {
    const data = {
      id: postId,
      title: postTitle,
      body: postBody,
      userId: getUser(postDetail.userId).id,
    };
    Api.updatePost(postId, data)
      .then((response) => {
        if (response.status === 200) {
          setAlertProps({
            props: { variant: "success" },
            content: "Success update post",
          });
          setTimeout(() => {
            dismissAlert();
          }, 3000);
        }
      })
      .catch((err) => {
        showError(err);
      })
      .finally(() => {
        setIsEditMode(false);
      });
  };

  const deletePost = () => {
    closeModal();
    Api.deletePost(postId)
      .then((response) => {
        if (response.status === 200) {
          setAlertProps({
            props: { show: true, variant: "success" },
            content: "Success delete post",
          });
          setTimeout(() => {
            history.goBack();
          }, 2000);
        }
      })
      .catch((err) => {
        showError(err);
      });
  };

  const closeModal = () => setShowModal(false);

  return (
    <Container className="container-pages">
      {postResult.loading || commentResult.loading || userResult.loading ? (
        <Loader />
      ) : (
        <Row className="post-detail">
          <Alert show={true} {...alertProps.props}>
            {alertProps.content}
          </Alert>
          <Col>
            {isEditMode ? (
              <input
                type="text"
                placeholder="Title"
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
              />
            ) : (
              <h2>{postDetail.title}</h2>
            )}
          </Col>
          {!isEditMode && (
            <Col xs="3" style={{ textAlign: "right" }}>
              <Button variant="warning" size="sm" onClick={editPost}>
                Edit
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => setShowModal(true)}
              >
                Delete
              </Button>
            </Col>
          )}
          <Break height={20} />
          <Col>
            {isEditMode ? (
              <textarea
                placeholder="Post Content"
                value={postBody}
                onChange={(e) => setPostBody(e.target.value)}
              />
            ) : (
              <Text size={16}>{postDetail.body}</Text>
            )}
          </Col>
          <Break height={20} />
          <Text size={12} color="#333">
            By <b>{getUser(postDetail.userId)?.name}</b>
          </Text>
          {isEditMode && (
            <Col style={{ textAlign: "right" }}>
              <Button variant="primary" size="sm" onClick={submitEdit}>
                Submit Changes
              </Button>
            </Col>
          )}
          <Break height={40} />
          <h5>Comments</h5>
          {comments?.map((item, idx) => (
            <div className="comment-bubble" key={idx}>
              <Text size={12} weight="bold">
                {item.name}
              </Text>
              <Text size={12} color="gray">
                {item.email}
              </Text>
              <Break height={10} />
              <Text size={14}>{item.body}</Text>
            </div>
          ))}
          {loginContext.isLogin && (
            <div className="comment-bubble">
              <form>
                <textarea
                  name="body"
                  placeholder="Write a comment..."
                  ref={inputCommentRef}
                ></textarea>
                <div style={{ textAlign: "right" }}>
                  <Button
                    variant="primary"
                    type="button"
                    size="sm"
                    onClick={submitForm}
                  >
                    Submit
                  </Button>
                </div>
              </form>
            </div>
          )}
          <Modal show={showModal} onHide={closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>Delete Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>Do you want to delete this post?</Modal.Body>
            <Modal.Footer>
              <Button variant="light" onClick={closeModal}>
                No
              </Button>
              <Button variant="danger" onClick={deletePost}>
                Yes
              </Button>
            </Modal.Footer>
          </Modal>
        </Row>
      )}
    </Container>
  );
}

export default PostDetail;
