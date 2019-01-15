var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var userService = require('./user/userService');

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  userService.addUser(socket.id);
  const username = userService.getUserNick(socket.id);
  socket.emit('set nickname', username);
  console.log(`User connected as ${username}`);
  io.emit('chat message', `User connected as ${username}`);
  socket.on('disconnect', function(){
    const username = userService.getUserNick(socket.id);
    console.log(`${username} disconnected`);
    userService.removeUser(socket.id);
    io.emit('chat message', username + ' disconnected');
  });

  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});