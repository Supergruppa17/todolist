var pgp = require('pg-promise')();

//db connect string
var db = pgp('postgres://postgres:tt@localhost:5432/liste');

var conn = process.env.DATABASE_URL || 'postgres://postgres:tt@localhost:5432/liste';
var db = pgp(conn);


//export module
module.exports = db;
