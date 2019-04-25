var express = require("express");
var dal = require("../dal/userDal");
var router = express.Router();

router.get("/", function(req, res) {
    dal.findAll().then(result => {
        res.json(JSON.stringify(result));
    });
});

router.post("/", function(req, res) {
    dal.findAll().then(result => {
        res.json(JSON.stringify(result));
    });
});

module.exports = router;
