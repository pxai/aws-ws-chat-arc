const arc = require('@architect/functions')

exports.handler = async function ws(event) {

  console.log('ws-default called with', event);

  const timestamp = new Date().toISOString();
  const connectionId = event.requestContext.connectionId;
  const {channel, text, login} = JSON.parse(event.body);
  const message = { timestamp, text, who: { connectionId, login } };

  if (msg.text === "givePeers") {
    console.log("REQUESTING PEERS!!", channel, text, login);
    await arc.ws.send({
      id: channel,
      payload: {message}
    });
  }

  await arc.ws.send({
    id: connectionId,
    payload: {message}
  });
  console.log("Server, sent> ", message);

  return {statusCode: 200};
}
