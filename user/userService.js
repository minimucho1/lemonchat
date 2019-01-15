const availableNames = ['Alice', 'Bob', 'Cindy', 'Dakota', 'Ernie', 'Fed', 'Gerald'];
var users = new Map();

const nextAvailableName = () => {
  return availableNames.shift();
};

exports.addUser = (socketId) => {
  users.set(socketId, nextAvailableName());
};

exports.removeUser = (socketId) => {
  const userNick = users.get(socketId);
  availableNames.push(userNick);
  users.delete(socketId);
};

exports.getUserNick = (socketId) => {
  return users.get(socketId);
};