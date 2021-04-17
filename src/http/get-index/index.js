let arc = require("@architect/functions");
let static = arc.http.helpers.static;
let getURL = require("./get-web-socket-url");

/**
 * renders the html app chrome
 */
exports.handler = async function http(req) {
  return {
    statusCode: 200,
    headers: { "content-type": "text/html; charset=utf8" },
    body: `<!doctype html>
<html>
<body>
<h1>Web sockets echo server demo</h1>
<main>Loading...</main>
<input id=login type=text placeholder="Login" autofocus><br />
<input id=create type=button value="Create game"><br />
<input id=url type=text placeholder="Enter given code and press enter"><br />
<input id=message type=text placeholder="Enter message"><br />
<script>
window.WS_URL = '${getURL()}'
</script>
<script type=module src=${static("/index.js")}></script>
</body>
</html>`,
  };
};
