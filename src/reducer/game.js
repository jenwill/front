export default (state = [], action) => {
  let { type, payload } = action;

  switch (type) {
  case 'GAME_SET': return [payload, ...state];
  case 'GAME_DELETE': return [];
  default: return state;
  }
};