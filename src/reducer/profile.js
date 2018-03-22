export default (state = [], {type, payload}) => {
  switch(type){
  case 'PROFILE_FETCH':
    return payload;

  default:
    return state;
  }
};
