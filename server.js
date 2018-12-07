const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack-dev.js');
const express = require('express');
const http = require('http');

const app = new(express)();

const port = 3002;

const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}))

app.use(webpackHotMiddleware(compiler));


app.get("/", function(req, res) {
    res.sendFile(__dirname + '/index.html')
})

const server = http.createServer(app);

server.listen(port, function() {
    console.log("Listening on %j", server.address());
});