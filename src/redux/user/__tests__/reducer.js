import userReducer from "../reducer";

describe("User Reducer", () => {
  const users = [
    {
      id: 1,
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
      address: {
        street: "Kulas Light",
        suite: "Apt. 556",
        city: "Gwenborough",
        zipcode: "92998-3874",
        geo: {
          lat: "-37.3159",
          lng: "81.1496",
        },
      },
      phone: "1-770-736-8031 x56442",
      website: "hildegard.org",
      company: {
        name: "Romaguera-Crona",
        catchPhrase: "Multi-layered client-server neural-net",
        bs: "harness real-time e-markets",
      },
    },
    {
      id: 2,
      name: "Ervin Howell",
      username: "Antonette",
      email: "Shanna@melissa.tv",
      address: {
        street: "Victor Plains",
        suite: "Suite 879",
        city: "Wisokyburgh",
        zipcode: "90566-7771",
        geo: {
          lat: "-43.9509",
          lng: "-34.4618",
        },
      },
      phone: "010-692-6593 x09125",
      website: "anastasia.net",
      company: {
        name: "Deckow-Crist",
        catchPhrase: "Proactive didactic contingency",
        bs: "synergize scalable supply-chains",
      },
    },
  ];

  // Test with the undefined state
  it("Should return the initial state", () => {
    const initialState = [];
    expect(userReducer(undefined, {})).toEqual(initialState);
  });

  // Test with the state only
  it("Should return the state in the parameter", () => {
    expect(userReducer(users, {})).toEqual(users);
  });

  it("Should return the new state", () => {
    const newState = {
      id: 99,
      name: "Super Admin",
      username: "Bret",
      email: "Sincere@april.biz",
      address: {
        street: "Jl. Raya",
        suite: "Apt. 112",
        city: "Jakarta",
        zipcode: "17353",
        geo: {
          lat: "-37.3159",
          lng: "81.1496",
        },
      },
      phone: "0879345945454",
      website: "sally.org",
      company: {
        name: "Kumparan",
        catchPhrase: "Some catch phrase",
        bs: "-",
      },
    };

    // Test with the action only
    expect(
      userReducer(undefined, {
        type: "storeUsers",
        data: newState,
      })
    ).toEqual(newState);

    // Test with the state and action
    expect(
      userReducer(users, {
        type: "storeUsers",
        data: newState,
      })
    ).toEqual(newState);
  });
});
