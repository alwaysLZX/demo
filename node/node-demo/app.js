var express = require('express');
var app = express();
var host = 'localhost';
var port = 3000;

app.get('/', function (req, res) {
    res.send('Hello World!');
})

app.use(express.static('static'));

var server = app.listen(port, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)
})

console.log(__dirname);