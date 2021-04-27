const arc = require('@architect/functions');
/**
 * notes:
 * - verify event.headers.Origin to enforce same-origin
 * - non 200 response will disconnect the client socket
 */
exports.handler = async function ws(event) {
  console.log('ws-connect called with', event);
  const connectionId = event.requestContext.connectionId;
  console.log("new connection: ", connectionId, event.queryStringParameters, event?.queryStringParameters?.login);
  const login = connectionId;
  const timestamp = new Date().toISOString();
  const message = { timestamp, text: "connect", who: { connectionId, login } };
  const channel = event?.queryStringParameters?.channel || connectionId;

  return {statusCode: 200, connectionId, msg: "connected"};
}
