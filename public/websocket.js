import User from "./user.js";
import Messages from "./messages.js";
import EventEmitter from "./events.js";

export default class Websocket extends EventEmitter {
  constructor(host=window.WS_URL) {
    super();
    this._host = host;
    this.channel = null;
    this.peers = new Map();
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

   open(login, channel = "") {
    //this._initConnection(this._host + "/?" + channel);
    const text = channel === "" ? "giveChannel" : "updatePeers";
    console.log("WS> Open!!! ", this._host, login, channel, text);
    this.channel = channel;
    this.ws.send(JSON.stringify({login, channel, text}));
    // this.emit("ws-open", login, channel);
  }

  onMessage(event) {
    const msg = JSON.parse(event.data);
    const {timestamp, text, who} = msg.message;
    console.log("WS > message received: ", who, text);
    let formattedMsg = "";

    if (text === "giveChannel") {
      this.me = who;
      this.channel = who.connectionId;
      this.peers.set(who.connectionId, who);
      console.log("WS> Give Channel ", who, this.peers);
      formattedMsg = `<p><b><code>${timestamp}:${text}- announce channel: ${this.channel}</code></b></p>`;
      this.emit("ws-msg", {login: who.login, channel: this.channel, text: formattedMsg})
    } else if (text === "updatePeers") {
      this.peers.set(who.connectionId, who);
      console.log("WS> Update peers ", who, this.peers);
      this.ws.send(JSON.stringify({login: who, channel: this.channel, peers: this.peers.entries(), text: "updateFromServer"}));
      formattedMsg = `<p><b>${who.login}&gt;</b> <code>${text}</code></p>`;
      this.emit("ws-msg", {login: "sample", channel: this.channel, text: formattedMsg})
    } else {
      formattedMsg = `<p><b>${who.login}&gt;</b> <code>${text}</code></p>`;
      this.emit("ws-msg", {login: who.login, channel: this.channel, text: formattedMsg })
    }
  }

  sendMessage(login, channel, text) {
    this.ws.send(JSON.stringify({login, channel, text}));
  }

  close(login) {
    console.log("WS> Close!!! ", this._host, login);
    // this.emit("ws-close", login);
  }

}
