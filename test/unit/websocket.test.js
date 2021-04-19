import Websocket from "../../public/websocket";
import { WebSocket } from 'mock-socket';

describe("Websocket", () => {
  let websocket, mockServer;
  beforeEach(()=> {
    global.WebSocket = WebSocket;
    websocket = new Websocket("ws://localhost");
  });

  it("exists", () => {
    expect(Websocket).toBeDefined();
  });

  it("has a valid constructor", () => {
    expect(websocket).toBeDefined();
    expect(typeof websocket).toBe("object");
  });

  it("channel is null at the beginning", () => {
    expect(websocket.channel).toBe(null);
  });

  describe("createChannel", () => {
    it("emits ws-open channel", () => {
      const login = "Master";
      const spy = jest.fn();
      websocket.once("ws-open", spy);

      websocket.emit("createChannel", login);

      expect(spy).toHaveBeenCalledWith(login)
    })
  });

  describe("joinChannel", () => {
    it("emits ws-open channel", () => {
      const login = "Master";
      const channel = "wH4t3v3r";
      const spy = jest.fn();
      websocket.once("ws-open", spy);

      websocket.emit("joinChannel", login, channel);

      expect(spy).toHaveBeenCalledWith(login, channel)
    })
  });

  describe("sendMessage", () => {
    it("emits ws-send channel", () => {
      const login = "Master";
      const channel = "wH4t3v3r";
      const text = "Hello";
      const spy = jest.fn();
      websocket.once("ws-send", spy);
      websocket.emit("createChannel", login);
      websocket.emit("sendMessage", login, channel, text);

      expect(spy).toHaveBeenCalledWith(login, channel, text)
    })
  });

  describe("close", () => {
    it("emits ws-close", () => {
      const login = "Master";
      const channel = "wH4t3v3r";
      const text = "Hello";
      const spy = jest.fn();
      websocket.once("ws-close", spy);
      websocket.emit("createChannel", login);
      websocket.emit("close", login);

      expect(spy).toHaveBeenCalledWith(login);
    })
  });
});
