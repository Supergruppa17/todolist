var express = require('express');
var router = express.Router();
var db = require('./dbconnect'); //database
var bodyParser = require('body-parser').text();


//endpoint: GET travels -----------------------------
router.get('/', function (req, res) {

    var listid = req.query.listid;


    var sql = `SELECT * FROM item WHERE list_id=${listid}`;

    db.any(sql).then(function(data) {

        res.status(200).json(data); //success – send the data as JSON!

    }).catch(function(err) {

        res.status(500).json(err);

    });
});

router.post('/', bodyParser, function (req, res) {

    var upload = JSON.parse(req.body);



    var sql = `PREPARE insert_items (int, text, int, text) AS
                INSERT INTO item VALUES(DEFAULT, $2, $3, $4); EXECUTE insert_items
                (0, '${upload.item_name}', '${upload.list_id}', '${upload.list_name}')`;

    console.log(sql);
    db.any(sql).then(function(data) {

	db.any("DEALLOCATE insert_items");
	res.status(200).json({msg: "insert ok"}); //success!

    }).catch(function(err) {

        	res.status(500).json(err);

    });
});

router.delete('/', function (req, res) {

    var upload = req.query.item_id; //uploaded data should be sanitized

    var sql = `PREPARE delete_items (int) AS
            DELETE FROM item WHERE item_id=$1 RETURNING *;
            EXECUTE delete_items('${upload}')`;

    db.any(sql).then(function(data) {

        db.any("DEALLOCATE delete_items");

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
