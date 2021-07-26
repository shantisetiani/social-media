import postReducer from "../reducer";

describe("Post Reducer", () => {
  const posts = [
    {
      userId: 2,
      id: 11,
      title: "et ea vero quia laudantium autem",
      body: "delectus reiciendis molestiae occaecati non minima eveniet qui voluptatibus\naccusamus in eum beatae sit\nvel qui neque voluptates ut commodi qui incidunt\nut animi commodi",
    },
    {
      userId: 2,
      id: 12,
      title: "in quibusdam tempore odit est dolorem",
      body: "itaque id aut magnam\npraesentium quia et ea odit et ea voluptas et\nsapiente quia nihil amet occaecati quia id voluptatem\nincidunt ea est distinctio odio",
    },
    {
      userId: 9,
      id: 82,
      title: "laudantium voluptate suscipit sunt enim enim",
      body: "ut libero sit aut totam inventore sunt\nporro sint qui sunt molestiae\nconsequatur cupiditate qui iste ducimus adipisci\ndolor enim assumenda soluta laboriosam amet iste delectus hic",
    },
  ];

  // Test with the undefined state
  it("Should return the initial state", () => {
    const initialState = [];
    expect(postReducer(undefined, {})).toEqual(initialState);
  });

  // Test with the state only
  it("Should return the state in the parameter", () => {
    expect(postReducer(posts, {})).toEqual(posts);
  });

  it("If the action type is storePosts should return the new state", () => {
    const newPost = {
      userId: 99,
      id: 101,
      title: "Post Title",
      body: "This is the content of the post.",
    };

    // Test with the action only
    expect(
      postReducer(undefined, {
        type: "storePosts",
        data: newPost,
      })
    ).toEqual(newPost);

    // Test with the state and action
    expect(
      postReducer(posts, {
        type: "storePosts",
        data: newPost,
      })
    ).toEqual(newPost);
  });

  it("If the action type is addPost should return the old and new state", () => {
    const newPost = {
      userId: 99,
      id: 101,
      title: "Post Title",
      body: "This is the content of the post.",
    };

    // Test with the action only
    expect(
      postReducer(undefined, {
        type: "addPost",
        data: newPost,
      })
    ).toEqual([newPost]);

    // Test with the state and action
    expect(
      postReducer(posts, {
        type: "addPost",
        data: newPost,
      })
    ).toEqual([...posts, newPost]);
  });
});
