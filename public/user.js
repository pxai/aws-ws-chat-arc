export default class User {
  constructor(login, connectionId, master=false) {
      this.login = login;
      this.connectionId = connectionId;
      this.master = master;
      this._peers = new Set([]);
  }

  enableMaster() {
    this.master = true;
  }

  get channel() {
    return this._channel;
  }

  set channel(channel) {
    this._channel = channel;
  }

  get peers () {
    return Array.from(this._peers);
  }

  set peers(peers) {
    this._peers = new Set(peers);
  }

  get peers () {
    return Array.from(this._peers);
  }
}
