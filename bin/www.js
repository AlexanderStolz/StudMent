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

app.get('/mentors/get', function(req, res){
    require('./DBAccess').getMentors(function (dbres) {
        res.send(JSON.stringify(dbres));
    });
});

app.get('/mentor/get', function (req, res) {
    require('./DBAccess').getMentorById(req.query._id, function (dbres) {
        res.send(JSON.stringify(dbres));
    });
});

app.get('/mentor/put',function (req, res) {
    var newmentor = {name:req.query.name,prename:req.query.prename,postcode:req.query.postcode,city:req.query.city,email:req.query.email,subject:[]};
    require('./DBAccess').insertMentor(newmentor,function (id) {
        res.send(id);
    })
});

app.get('/applicant/put',function (req, res) {
    var newmentor = {name:req.query.name,prename:req.query.prename,postcode:req.query.postcode,city:req.query.city,email:req.query.email,subject:[]};
    require('./DBAccess').insertApplication(newmentor,function (id) {
        console.log("resending ig " + id);
        res.send(id);
    })
});

app.get('/mentor/put/subject',function (req, res) {
    var newsubject = {title:req.query.title};
    require('./DBAccess').insertSubjectForMentor(req.query._id,newsubject,function () {
        res.send("ok");
    })
});

app.get('/applicant/put/subject',function (req, res) {
    var newsubject = {title:req.query.title};
    console.log("title: "+req.query.title);
    require('./DBAccess').insertSubjectForApplicant(req.query._id,newsubject,function(){
        res.send("ok");
    });
});

app.get('/login', function (req, res) {
    require('./DBAccess').checkUser(req.query.name,req.query.password,function (bool) {
        if(bool) res.send("true");
        else res.send("false");
    });
});

console.log('Der Server läuft nun unter http://127.0.0.1:' + conf.port + '/');