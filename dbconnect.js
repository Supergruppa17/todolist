var pgp = require('pg-promise')();
//pgp.pg.defaults.ssl = true;

//db connect string
//var db = pgp('postgres://postgres:tt@localhost:5432/liste');

var conn = process.env.DATABASE_URL || 'postgres://postgres:tt@localhost:5432/todolist';
//var conn = 'postgres://bzarmlazazuvoa:fe8261510ee05288a4aeedd16cf06b9104e30d90a90fd25bdad3b662f9bec38d@ec2-46-137-174-67.eu-west-1.compute.amazonaws.com:5432/dj6os3bfusl4p';
var db = pgp(conn);


//export module
module.exports = db;
