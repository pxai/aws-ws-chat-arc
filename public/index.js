import User from "./user.js";
import UI from "./ui.js";
import Websocket from "./websocket.js";

const websocket = new Websocket(window.WS_URL);
const ui = new UI(window.document, websocket);
