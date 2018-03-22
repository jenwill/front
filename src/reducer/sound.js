export default (state = null, action) => {
  let { type, payload } = action;

  switch (type) {
  case 'TOGGLE_SOUND': 
    return {
      ...state,
      backgroundSound: !state.backgroundSound,
    };
  case 'SET_SOUND': 
    return {
      ...state,
      backgroundSound: true,
    };
  default: return state;
  }
};