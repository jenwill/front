export default (state = null, action) => {
  let { type, payload } = action;

  switch (type) {
  case 'GAME_SET': return payload;
  case 'GAME_DELETE': return null;
  default: return state;
  }
};