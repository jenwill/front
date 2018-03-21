export const gameSet = game => ({
  type: 'GAME_SET',
  payload: game,
});

export const gameDelete = () => {
  return {
    type: 'GAME_DELETE',
  };
};