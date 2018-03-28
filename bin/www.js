var express = require('express')
    ,   app = express()
    ,   server = require('http').createServer(app)
    // ,   io = require('socket.io').listen(server)
    ,   conf = require('./config.json');

server.listen(conf.port);

app.use(express.static(__dirname + '/../public'));

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/../public/index.html');
});

app.get('/1/', function(req, res){
    res.send("leeererStriiing");
});

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function (err, db) {
    if(err) throw err;
    var dbo = db.db("mydb");
    dbo.createCollection("mentors", function (err, res) {
        if(err)throw err;
        console.log("Collection created!");
        db.close();
    })

});

MongoClient.connect(url, function (err, db) {
    if(err) throw err;
    var dbo = db.db("mydb");
    var myobj = obj;
    dbo.collection("mentors").insertOne(myobj, function(err,res){
        if(err) throw err;
        console.log("Element added!");
        db.close();
    })

});



// Websocket
// io.sockets.on('connection', function (socket) {
//     // der Client ist verbunden
//     socket.emit('chat', { zeit: new Date(), text: 'Du bist nun mit dem Server verbunden!' });
//     // wenn ein Benutzer einen Text senden
//     socket.on('chat', function (data) {
//         // so wird dieser Text an alle anderen Benutzer gesendet
//         io.sockets.emit('chat', { zeit: new Date(), name: data.name || 'Anonym', text: data.text });
//     });
// });

console.log('Der Server läuft nun unter http://127.0.0.1:' + conf.port + '/');