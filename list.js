var express = require('express');
var router = express.Router();
var db = require('./dbconnect'); //database
var bodyParser = require('body-parser').text();
var jwt = require("jsonwebtoken");

var secret = "frenchfriestastegood!"; //used to check the token
var logindata; //logindata from the token

//Authorize all travel-endpoints --------------------
router.use(function (req, res, next) {

    //get the token from the URL-variable named 'token'
    var token = req.query['token'];

    if (!token) {
        res.status(403).json({msg: "No token received"}); //send
        return; //quit
    }
    else {
        try {
          logindata = jwt.verify(token, secret); //check the token
        }
        catch(err) {
          res.status(403).json({msg: "The token is not valid!"}); //send
          return; //quit
        }
    }

    next(); //we have a valid token - go to the requested endpoint
});



//endpoint: GET travels -----------------------------
router.get('/', function (req, res) {

    var sql = `PREPARE get_lists (text) AS
            SELECT * FROM list WHERE login_name=$1;
            EXECUTE get_lists('${logindata.login_name}')`;


    db.any(sql).then(function(data) {

        res.status(200).json(data); //success – send the data as JSON!

    }).catch(function(err) {

        res.status(500).json(err);

    });
});

//endpoint: POST travels ----------------------------
router.post('/', bodyParser, function (req, res) {

    var upload = JSON.parse(req.body);


    var sql = `PREPARE insert_lists (int, text, date, text) AS
                INSERT INTO list VALUES(DEFAULT, $2, $3, $4); EXECUTE insert_lists
                (0, '${upload.list_name}', '${upload.due_date}', '${upload.login_name}')`;



    db.any(sql).then(function(data) {

	db.any("DEALLOCATE insert_lists");
	res.status(200).json({msg: "insert ok"}); //success!

    }).catch(function(err) {

        	res.status(500).json(err);

    });
});
router.delete('/', function (req, res) {

    var upload = req.query.list_id; //uploaded data should be sanitized

    var sql = `PREPARE delete_lists (int, text) AS
            DELETE FROM list WHERE list_id=$1 AND login_name=$2 RETURNING *;
            EXECUTE delete_lists('${upload}','${logindata.login_name}')`;

     console.log(sql);

    db.any(sql).then(function(data) {

        db.any("DEALLOCATE delete_lists");

        if (data.length > 0) {
            res.status(200).json({msg: "delete ok"}); //success!
        }
        else {
            res.status(200).json({msg: "can't delete"});
        }

    }).catch(function(err) {
        res.status(500).json(err);
    });
});



//export module -------------------------------------
module.exports = router;
