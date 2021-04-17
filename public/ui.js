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
    this.urlInput.addEventListener('keyup', this.openUrl.bind(this));
    this.msgInput.addEventListener('keyup', this.sendMessage.bind(this));
    this.create.addEventListener('click', this.createChannel.bind(this));
  }

  openUrl(event) {
    if (event.key === 'Enter') {
      this.urlInput.style.display = 'none';
      this.create.style.display = 'none';
      console.log("OpenUrl: ", event.target.value);
      //const [host, channel] = e.target.value.split("?");

      //const url = `${e.target.value}&login=${loginInput.value}&channel=${channel}`;
      // openWebsocket();
    }
  }

  sendMessage(event) {
    console.log("MessageSent: ", event);
    if (event.key === 'Enter') {
      console.log("SendMessage: ", event.target.value);

      this.emit("sendMessage", {text: this.msg });
      event.target.value = '';
    }
  }

  createChannel(event) {
    this.create.style.display = 'none';
    this.urlInput.style.display = 'none';
    console.log("Create: ");
    // isMaster = true;
    //openWebsocket();
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
}
