import React, { useState, useEffect, createRef, useContext } from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { Container, Row, Col, Button, Alert, Modal } from "react-bootstrap";
import { UserApi, PostApi } from "../../api";
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
  const [modalInfo, setModalInfo] = useState({});

  const [editedCommentId, setEditedCommentId] = useState(-1);
  const [editedComment, setEditedComment] = useState({});

  const inputCommentRef = createRef();
  const loginContext = useContext(LoginContext);
  const dispatch = useDispatch();
  const history = useHistory();

  const splittedUrl = window.location.pathname.split("/");
  const postId = splittedUrl[splittedUrl.length - 1];

  const postResult = useApiCall({
    ApiCall: PostApi.getPostDetail,
    params: postId,
  });
  const commentResult = useApiCall({
    ApiCall: PostApi.getPostComments,
    params: postId,
  });
  const userResult = useApiCall({
    ApiCall: UserApi.getAllUser,
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

    PostApi.createComment(data)
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
    PostApi.updatePost(postId, data)
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
    PostApi.deletePost(postId)
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

  const openModalDeletePost = () => {
    setShowModal(true);
    setModalInfo({
      type: "post",
      onSubmit: deletePost,
    });
  };

  const editComment = (commentId) => {
    const comment = comments.find((item) => item.id == commentId);
    setEditedCommentId(commentId);
    setEditedComment({
      name: comment.name,
      email: comment.email,
      body: comment.body,
    });
  };

  const deleteComment = (commentId) => {
    closeModal();
    PostApi.deleteComment(commentId)
      .then((response) => {
        if (response.status === 200) {
          setAlertProps({
            props: { show: true, variant: "success" },
            content: "Success delete comment",
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

  const openModalDeleteComment = (commentId) => {
    setShowModal(true);
    setModalInfo({
      type: "comment",
      onSubmit: () => deleteComment(commentId),
    });
  };

  const submitComment = (commentId) => {
    const data = {
      postId: postId,
      id: commentId,
      name: editedComment.name,
      email: editedComment.email,
      body: editedComment.body,
    };
    PostApi.updateComment(commentId, data)
      .then((response) => {
        if (response.status === 200) {
          setAlertProps({
            props: { variant: "success" },
            content: "Success update comment",
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
        setEditedCommentId(-1);
      });
  };

  const closeModal = () => setShowModal(false);

  return (
    <Container className="container-pages">
      {postResult.loading || commentResult.loading || userResult.loading ? (
        <Loader />
      ) : (
        <Row className="post-detail">
          <Alert {...alertProps.props}>{alertProps.content}</Alert>
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
          {loginContext.isLogin && !isEditMode && (
            <Col xs="3" style={{ textAlign: "right" }}>
              <Button
                variant="warning"
                size="sm"
                onClick={editPost}
                style={{ marginRight: "5px" }}
              >
                Edit
              </Button>
              <Button variant="danger" size="sm" onClick={openModalDeletePost}>
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
            <div key={idx}>
              {editedCommentId == item.id ? (
                <div className="comment-bubble-input" key={idx}>
                  <input
                    type="text"
                    placeholder="Name"
                    value={editedComment.name}
                    onChange={(e) =>
                      setEditedComment({
                        ...editedComment,
                        name: e.target.value,
                      })
                    }
                  />
                  <Break height={10} />
                  <input
                    type="text"
                    placeholder="Email"
                    value={editedComment.email}
                    onChange={(e) =>
                      setEditedComment({
                        ...editedComment,
                        email: e.target.value,
                      })
                    }
                  />
                  <Break height={10} />
                  <textarea
                    placeholder="Comment..."
                    value={editedComment.body}
                    onChange={(e) =>
                      setEditedComment({
                        ...editedComment,
                        body: e.target.value,
                      })
                    }
                  />
                  <Break height={10} />
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => submitComment(item.id)}
                  >
                    Submit Changes
                  </Button>
                </div>
              ) : (
                <div className="comment-bubble" key={idx}>
                  <Text size={12} weight="bold">
                    {item.name}
                  </Text>
                  <Text size={12} color="gray">
                    {item.email}
                  </Text>
                  <Break height={10} />
                  <Text size={14}>{item.body}</Text>
                  <Break height={10} />
                  {loginContext.isLogin && (
                    <>
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={() => editComment(item.id)}
                        style={{ marginRight: "10px" }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => openModalDeleteComment(item.id)}
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </div>
              )}
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
            <Modal.Body>
              Do you want to delete this {modalInfo.type}?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="light" onClick={closeModal}>
                No
              </Button>
              <Button variant="danger" onClick={modalInfo.onSubmit}>
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
