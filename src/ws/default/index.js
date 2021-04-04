const arc = require('@architect/functions')

exports.handler = async function ws(event) {

  console.log('ws-default called with', event);

  const timestamp = new Date().toISOString();
  const connectionId = event.requestContext.connectionId;
  const {text, peers} = JSON.parse(event.body);
  const message = { timestamp, text, who: connectionId };

  await arc.ws.send({
    id: connectionId,
    payload: {message}
  });
  console.log("Server, sent> ", message);

  return {statusCode: 200};
}
