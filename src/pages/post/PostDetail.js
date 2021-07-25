import React, { useState, useEffect, createRef, useContext } from "react";
import { Container, Button } from "react-bootstrap";
import { Api } from "../../api";
import useApiCall from "../../customHooks/useApiCall";
import { storeUsers } from "../../redux";
import { LoginContext } from "../../App";

import { Text, Loader, Break } from "../../component";
import "./style.css";

function PostDetail() {
  const [postDetail, setPostDetail] = useState({});
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState({});
  const inputCommentRef = createRef();
  const loginContext = useContext(LoginContext);

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
          alert("Success");
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

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

  const getUser = (userId) => {
    return users.length > 0 && users.find((item) => (item.id = userId));
  };

  return (
    <Container className="container-pages">
      {postResult.loading ? (
        <Loader />
      ) : (
        <>
          <h2>{postDetail.title}</h2>
          <Break height={20} />
          <Text size={16}>{postDetail.body}</Text>
          <Break height={20} />
          <Text size={12} color="#333">
            By <b>{getUser(postDetail.userId).name}</b>
          </Text>
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
        </>
      )}
    </Container>
  );
}

export default PostDetail;
