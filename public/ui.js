import User from "./user.js";
import Messages from "./messages.js";
import EventEmitter from "./events.js";

export default class UI extends EventEmitter {
  constructor (document, websocket) {
    super();
    this.main = document.getElementsByTagName('main')[0];
    this.loginInput = document.getElementById('login');
    this.urlInput = document.getElementById('url');
    this.msgInput = document.getElementById('message');
    this.create = document.getElementById('create');
    this.websocket = websocket;
    this._init();
  }

  _init() {
    this.urlInput.addEventListener('keyup', this.joinChannel.bind(this));
    this.msgInput.addEventListener('keyup', this.sendMessage.bind(this));
    this.create.addEventListener('click', this.createChannel.bind(this));
    this.websocket.on('ws-msg', this.showMessage.bind(this));
  }

  get login() {
    return this.loginInput.value;
  }

  get url() {
    return this.urlInput.value;
  }

  get msg() {
    return this.msgInput.value;
  }

  joinChannel(event) {
    if (event.key === 'Enter') {
      this.create.style.display = 'none';
      this.urlInput.style.display = 'none';

      // this.websocket.emit("joinChannel", {channel: this.url });
    }
  }

  sendMessage(event) {
    if (event.key === 'Enter') {
      this.websocket.sendMessage(login,null, this.msg);
      event.target.value = '';
    }
  }

  createChannel(event) {
    this.create.style.display = 'none';
    this.urlInput.style.display = 'none';
    this.websocket.create(this.login);
  }

  showMessage({login, channel, text}) {
    console.log("Message received: ", login, channel, text);
    this.main.innerHTML += text;
  }
}
