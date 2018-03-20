export const roomSet = room => ({
  type: 'ROOM_SET',
  payload: room,
});

export const roomDelete = () => {
  delete localStorage.room;
  return {
    type: 'ROOM_DELETE',
  };
};