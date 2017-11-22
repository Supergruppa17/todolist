var pgp = require('pg-promise')();
//pgp.pg.defaults.ssl = true;

//db connect string
//var db = pgp('postgres://postgres:tt@localhost:5432/liste');

var conn = process.env.DATABASE_URL || 'postgres://postgres:tt@localhost:5432/todolist';
var db = pgp(conn);


//export module
module.exports = db;
