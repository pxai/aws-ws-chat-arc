import User from "./user.js";
import Messages from "./messages.js";
import EventEmitter from "./events.js";

export default class Websocket extends EventEmitter {
  constructor(host=window.WS_URL) {
    super();
    this._host = host;
    this.channel = null;
  }

  _initConnection(host) {
    this.ws = new WebSocket(host);

    this.ws.onopen = this.open.bind(this);
    this.ws.onclose = this.close.bind(this);
    this.ws.onmessage = this.onMessage.bind(this);
    this.ws.onerror = console.log;
  }

  create(login) {
    console.log("WS> Lets create: ", login, this._host);
    this._initConnection(this._host);

    // this.emit("ws-open", login);
  }

   open(login, channel) {
     console.log("WS> Open!!! ", this._host, login, channel);
    //this._initConnection(this._host + "/?" + channel);
    const text = channel === "" ? "giveChannel" : "updatePeers";
    this.ws.send(JSON.stringify({login, channel, text}));
    // this.emit("ws-open", login, channel);
  }

  onMessage(event) {
    console.log("WS > message received: ", event, event.data);
    const msg = JSON.parse(event.data);
    this.emit("ws-msg", {login: "sample", channel: "CHAN", text: msg})
  }

  sendMessage(login, channel, text) {
    this.ws.send(JSON.stringify({login, channel, text}));
  }

  close(login) {
    console.log("WS> Close!!! ", this._host, login);
    // this.emit("ws-close", login);
  }

}
