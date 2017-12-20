const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const mongojs = require('mongojs');
var db = mongojs('mongodb://tanay02:ibanez01@ds161426.mlab.com:61426/event',['users']);



//global header







//retrieving data

router.get('/login', function (req, res, next) {
    var param1 = req.query.id;
    
    db.users.find({}, function (err, log) {
               
        var lengthofarray = log.length;
        if (err) {
            return res.send(err);
        }
        else {
            if (lengthofarray > 0) {
                var fullname = [];
                for (i = 0; i < lengthofarray; i++) {
                    var first = log[i]["firstname"].toString();
                    var last = log[i]["lastname"].toString();
                    fullname.push(first + ' ' + last);

                    if (param1 === log[i]["id"].toString()) {
                        return res.json({ "status": "Welcome","fullname":fullname[i] });
                    }
                }
                return res.json({ "status": "Enter correctly" });
            }
            else {
                return res.json({ "status": "No data in database" });
            }
        }
    })
});





//add data

router.post('/register', function (req, res, next) {

 
    var i = 0;

    db.users.find({}, function (err, log) {


        if (err) {
            res.send(err);
        }

        var array = log;
        var lengthofarray = array.length;
        if (lengthofarray == 0) {

            console.log("HELLO");
            db.users.save({ "firstname": req.body.firstname, "lastname": req.body.lastname,"id": req.body.email }, function (err, log) {

                if (err) {

                    res.json({ "error": err });
                }

                res.send(JSON.stringify({ "status": "saved in database" }));
            });

            lengthofarray++;
        }

        else {

            if (i < lengthofarray) {

                if (array[i]["id"].toString() !== req.body.email) {

                    console.log(array[i]["id"].toString());

                    //save

                    db.users.save({ "firstname": req.body.firstname, "lastname": req.body.lastname, "id": req.body.email }, function (err, log) {

                        if (err) {

                            res.send(err);

                            return;
                        }
                        lengthofarray++;

                        res.send(JSON.stringify({ "status": "saved in database" }));

                    });
                }
                else {
                    res.json({ "status": "user exists" });
                }
                i++;
            }
        }


    })

});



module.exports = router;