const arc = require('@architect/functions')

exports.handler = async function ws(event) {

  console.log('ws-default called with', event);

  const timestamp = new Date().toISOString();
  const connectionId = event.requestContext.connectionId;
  const {channel, text, who, peers} = JSON.parse(event.body);
  who.connectionId = connectionId;
  const message = { timestamp, text, who };

  if (text === "updatePeers") {
    console.log("REQUESTING PEERS!!", channel, text, who.login);
    await arc.ws.send({
      id: channel,
      payload: {message}
    });
  }

  if (text === "updateFromServer") {
    console.log("Server sends update", channel, text, who.login, peers);
  }

  await arc.ws.send({
    id: connectionId,
    payload: {message}
  });
  console.log("Server, sent> ", message, event.body);

  return {statusCode: 200};
}
