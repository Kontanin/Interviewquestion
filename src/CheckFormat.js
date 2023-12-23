

module.exports =function CheckFormat(message,wsServer) {
  try {
    const { update_id, username, ts, newSteps } = JSON.parse(message);

    // Check if all required fields exist and newSteps is not undefined
    if (update_id && username && ts && newSteps) {
      // Process the message data
      return true
    } else {
      // Handle the case when the message format is incorrect or fields are missing
      wsServer.send(JSON.stringify({ status: 'error', message: 'Invalid message format or missing fields' }));
      return false
    }
  } catch (error) {
    // Handle JSON parsing errors
    wsServer.send(JSON.stringify({ status: 'error', message: 'Invalid message format or missing fields' }));
    return false
  }
}

