var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack-dev.js');
var express = require('express');
var http = require('http');

var app = new(express)();

var port = 3002;

var compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}))

app.use(webpackHotMiddleware(compiler));


app.get("/", function(req, res) {
    res.sendFile(__dirname + '/index.html')
})

var server = http.createServer(app);

server.listen(port, function() {
    console.log("Listening on %j", server.address());
});