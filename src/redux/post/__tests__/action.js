import { storePosts, addPost } from "../action";

describe("Posts Actions", () => {
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

  it("Should call action to store posts", () => {
    const expectedAction = {
      type: "storePosts",
      data: posts,
    };
    expect(storePosts(posts)).toEqual(expectedAction);
  });

  it("Should call action to add new post", () => {
    const expectedAction = {
      type: "addPost",
      data: posts,
    };
    expect(addPost(posts)).toEqual(expectedAction);
  });
});
