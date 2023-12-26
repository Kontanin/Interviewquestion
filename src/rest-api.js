const express = require('express');

module.exports = (stepService) => {
  const app=express()
  const REST_PORT = 8080; 
  const listener=  app.listen(REST_PORT, () => {
      console.log(`Rest Api on port ${REST_PORT}`)
    })

  // * TODO: Write the GET endpoint, using `stepService` for data access
  // * TODO: Return object containing `close()` method for shutting down the server
  app.get('/users/:username/steps', (req, res) => {
    const data=stepService.get(req.params.username)
    if(data){
      res.status(200).json( data )
    }else{
      res.status(404).json( { "error":"User doesn't exist"});
    }
  })

  stepService.close=function() {
    listener.close()
  }
  return stepService
};


