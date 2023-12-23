// * TODO: Implement function for updating user's step data in store
// * TODO: Function for getting user's step data may need some adjustments
module.exports = function stepService(store) {
  const service = {};



  service.get = (username) => {
    if(typeof store[username] !=='object'){
      return undefined
    }
    return store[username]
  };

  service.add = (username, ts, newSteps) => {
    if(store[username]){
      store[username].cumulativeSteps=store[username].cumulativeSteps+newSteps
      store[username].ts=ts
    }
    else{
      store[username]={"ts":ts,"cumulativeSteps":newSteps}
      
    }
  };

  return service;
};

