import User from "../../public/user";

describe("User", () => {
  it("exists", () => {
    expect(User).toBeDefined();
  });

  it("has a valid constructor", () => {
    const user = new User();

    expect(user).toBeDefined();
    expect(typeof user).toBe("object");
  });

  it("sets login", () => {
    const user = new User("master", "666");

    expect(user.login).toBe("master");
  });

  it("sets connectionId", () => {
    const user = new User("master", "666");

    expect(user.connectionId).toBe("666");
  });

  it("sets master to false", () => {
    const user = new User("master", "666");

    expect(user.master).toBe(false);
  });

  it("sets master to given value", () => {
    const user1 = new User("master", "666", true);
    expect(user1.master).toBe(true);

    const user2 = new User("master", "666", false);
    expect(user2.master).toBe(false);
  });

  it("sets channel to undefined", () => {
    const user = new User("master", "666");

    expect(user.channel).toBe(undefined);
  });

  it("sets channel to given value", () => {
    const user = new User("master", "666");
    user.channel = "747";

    expect(user.channel).toBe("747");
  });

  it("sets empty list of peers", () => {
    const user = new User("master", "666");

    expect(user.peers).toEqual([]);
  });

  it("sets peers to given values", () => {
    const user = new User("master", "666");
    const peers = ["aa", "bb", "cc"]
    user.peers = peers;

    expect(user.peers).toEqual(peers);
  });
});
