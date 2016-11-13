var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var marcador = {local:0, visitante:0};

app.use('/public', express.static('public'));

app.get('/', function(req, res){
    res.sendfile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    io.emit('marcador-actual', marcador);
    socket.on('marcador-visitante', function(){
        marcador.visitante++;
        io.emit('marcador-actual', marcador);
    });
    socket.on('marcador-local', function(){
        marcador.local++;
        io.emit('marcador-actual', marcador);
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});