var ObjectId = require('mongodb').ObjectID;
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var dbname = "mydb";
var mentorcoll = "mentors";
var admincoll = "admins";

function initDB() {
    MongoClient.connect(url + dbname, function (err, db) {
        if (err) throw err;
        console.log("Database created!");
        db.close();
    });

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(dbname);
        dbo.createCollection(mentorcoll, function (err, res) {
            if (err) throw err;
            console.log("Collection created! " + mentorcoll);
        });
        dbo.createCollection(admincoll, function (err, res) {
            if (err) throw err;
            console.log("Collection created! " + admincoll);
            db.close();
        })
        dbo.collection(admincoll).findOne({name: "root"}, function (err, res) {
            if (err) throw err;
            if (!res) {
                var root = {name: "root", password: "root"};
                dbo.collection(admincoll).insertOne(root, function (err, res) {
                    if (err) throw err;
                    console.log("new root inserted");
                })
            }
            db.close();
        })
    });
}

function insertMentor(mentor) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(dbname);
        dbo.collection(mentorcoll).insertOne(mentor, function (err, res) {
            if (err) throw err;
            console.log("Element added! " + mentor.name);
            //console.log(res);
            //console.log(JSON.stringify(res));
            db.close();
        })

    });
}

function insertSubject(id, subject) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(dbname);
        var myquery = {_id: new ObjectId(id)}
        var newvalues = {$push: {subject: subject}};
        dbo.collection(mentorcoll).updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("1 document updated " + res + subject);
            db.close();
        })

    })
}

function getMentorById(id, callback) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(dbname);
        dbo.collection(mentorcoll).findOne({_id: new ObjectId(id)}, function (err, res) {
            if (err) throw err;
            console.log("get mentor: " + res.name);
            db.close();
            callback(res);
        });
    })
}

function getMentors(callback) {
    MongoClient.connect(url, function (err, db) {
        if(err)throw err;
        var dbo = db.db(dbname);
        dbo.collection(mentorcoll).find({}).toArray(function (err, res) {
            if(err)throw err;
            console.log("get Mentors");
            db.close();
            callback(res);
        })
    })
}

function checkUser(name,password,callback) {
    MongoClient.connect(url, function (err, db) {
        if(err)throw err;
        var dbo = db.db(dbname);
        dbo.collection(admincoll).findOne({name:name},function (err, res) {
            if(err)throw err;
            if(res.password === password){
                console.log("userCheck success");
                callback();
            }db.close();
        })
    })
}

module.exports.initDB = initDB;
module.exports.insertMentor = insertMentor;
module.exports.insertSubject = insertSubject;
module.exports.getMentorById = getMentorById;
module.exports.getMentors = getMentors;
module.exports.checkUser = checkUser;