const WebSocketServer = require('ws').Server;
const CheckFormat=require('./CheckFormat');

module.exports = (stepService) => {
  const WEBSOCKET_PORT = 8081;
  const wsServer = new WebSocketServer({ port: WEBSOCKET_PORT },()=>{
    console.log(`ws Socket sserver runimg on port : ${WEBSOCKET_PORT}`)
  });

  wsServer.on('connection',wsServer=>{
    console.log('new clint is connected')
    wsServer.on('close', () => {console.log('client has Disconnected')});
    wsServer.on('message', data => {
      console.log(`client has sent us : ${data}`);

    if (CheckFormat(data,wsServer)){
      const { update_id, username, ts, newSteps } = JSON.parse(data);
      if(stepService.get(username)){
        console.log(newSteps,"newwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww")
        stepService.add(username,ts,newSteps)
      }
     else{
      wsServer.send(JSON.stringify({ status: 'error', message: 'do n\'t found user' }));
     }

    }else{
      stepService.get(username)
    }
   });


  })


  return wsServer;
}


