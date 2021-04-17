import User from "./user.js";
import Messages from "./messages.js";
import EventEmitter from "events";

export default class UI extends EventEmitter {
  constructor (document) {
    super();
    this.main = document.getElementsByTagName('main')[0];
    this.loginInput = document.getElementById('login');
    this.urlInput = document.getElementById('url');
    this.msgInput = document.getElementById('message');
    this.create = document.getElementById('create');
    this._init();
  }

  _init() {
    this.urlInput.addEventListener('keyup', this.joinChannel.bind(this));
    this.msgInput.addEventListener('keyup', this.sendMessage.bind(this));
    this.create.addEventListener('click', this.createChannel.bind(this));
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

      this.emit("joinChannel", {channel: this.url });
    }
  }

  sendMessage(event) {
    if (event.key === 'Enter') {
      this.emit("sendMessage", {text: this.msg });
      event.target.value = '';
    }
  }

  createChannel(event) {
    this.create.style.display = 'none';
    this.urlInput.style.display = 'none';

    this.emit("createChannel", {channel: this.login });
  }
}
