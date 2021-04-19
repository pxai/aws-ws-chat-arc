import User from "./user.js";
import Messages from "./messages.js";
import EventEmitter from "./events.js";

export default class Websocket extends EventEmitter {
  constructor(host=window.WS_URL) {
    super();
    this._host = host;
    this.channel = null;
    this._initListeners();
  }

  _initConnection(host) {
    this.ws = new WebSocket(host);

    this.ws.onopen = this.open;
    this.ws.onclose = this.close;
    this.ws.onmessage = this.message;
    this.ws.onerror = console.log;
  }

  _initListeners() {
    this.on("createChannel", this.create.bind(this));
    this.on("joinChannel", this.open.bind(this));
    this.on("sendMessage", this.message.bind(this));
    this.on("close", this.close.bind(this))
  }

  create(login) {
    console.log("WS> Lets create: ", login);
    this._initConnection(this._host);

    this.emit("ws-open", login);
  }

   open(login, channel) {
    this._initConnection(this._host + "/?" + channel);
    const text = channel === "" ? "giveChannel" : "updatePeers";
    // this.ws.send(JSON.stringify({login, channel, text}));
    // this.emit("ws-open", login, channel);
  }

  message(login, channel, text) {
    this.emit("ws-send", login, channel, text);
  }

  close(login) {
    this.emit("ws-close", login);
  }

}
