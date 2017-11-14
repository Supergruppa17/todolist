var express = require('express');
var router = express.Router();
var db = require('./dbconnect'); //database

//endpoint: GET travels -----------------------------
router.get('/', function (req, res) {

    var sql = 'SELECT * FROM list';
    db.any(sql).then(function(data) {

        res.status(200).json(data); //success – send the data as JSON!

    }).catch(function(err) {

        res.status(500).json(err);

    });
});

//export module -------------------------------------
module.exports = router;
