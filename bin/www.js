var express = require('express')
    ,   app = express()
    ,   server = require('http').createServer(app)
    // ,   io = require('socket.io').listen(server)
    ,   conf = require('./config.json');

server.listen(conf.port);

require('./DBAccess').initDB();

app.use(express.static(__dirname + '/../public'));

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/../public/index.html');
});

app.get('/mentors', function(req, res){
    require('./DBAccess').getMentors(function (dbres) {
        res.send(JSON.stringify(dbres));
    });
});

app.get('/mentor', function (req, res) {
    require('./DBAccess').getMentorById(req.query._id, function (dbres) {
        res.send(JSON.stringify(dbres));
    });
});

app.get('/login', function (req, res) {
    require('./DBAccess').checkUser(req.query.name,req.query.password,function () {
        res.sendFile(require('path').resolve(__dirname + '/../private/adminPage.html'));
    })
});

//require('./DBAccess').insertMentor({name:"ich", email:"hoho@ho.ho"});
console.log('Der Server läuft nun unter http://127.0.0.1:' + conf.port + '/');