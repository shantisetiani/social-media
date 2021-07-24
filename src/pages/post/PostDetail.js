import React, { useState, useEffect, createRef } from "react";
import { Container, Button } from "react-bootstrap";
import { Api } from "../../api";
import useApiCall from "../../customHooks/useApiCall";
import { storeUsers } from "../../redux";

import { Text, Loader, Break } from "../../component";
import "./style.css";

function PostDetail() {
  const [postDetail, setPostDetail] = useState({});
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState({});
  const inputTitleRef = createRef();
  const inputCommentRef = createRef();

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
    console.log(inputTitleRef.current.value);

    const data = {
      title: inputTitleRef.current.value,
      body: inputCommentRef.current.value,
      userId: 1,
    };
    Api.createPost(data);
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
    return users.find((item) => (item.id = userId));
  };

  return (
    <Container className="container-pages">
      {postResult.loading ? (
        <Loader />
      ) : (
        <>
          <h2>{postDetail.title}</h2>
          <div>By {getUser(postDetail.userId).name}</div>
          <Break height={20} />
          <div>{postDetail.body}</div>
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
          <div className="comment-bubble">
            <form onSubmit={submitForm}>
              <input
                name="title"
                placeholder="Title"
                ref={inputTitleRef}
              ></input>
              <input
                name="body"
                placeholder="Write a comment..."
                ref={inputCommentRef}
              ></input>
              <div style={{ textAlign: "right" }}>
                <Button variant="primary" type="submit" size="sm">
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </>
      )}
    </Container>
  );
}

export default PostDetail;
