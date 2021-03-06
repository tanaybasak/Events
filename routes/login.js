const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const mongojs = require('mongojs');
var db = mongojs('mongodb://tanay02:ibanez01@ds161426.mlab.com:61426/event',['users']);


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
    db.users.find({}, function (err, log) {

        if (err) {
            res.send(err);
        }

      
        if ( log.length == 0) {
           
            db.users.save({ "firstname": req.body.firstname, "lastname": req.body.lastname, "id": req.body.email }, function (err, log) {

                if (err) {

                    res.json({ "error": err });
                }

                return res.json(JSON.stringify({ "status": "saved in database" }));
            });


        }

        else {
            
                    for(i=0;i<log.length;i++)
                    {
                        
                if (log[i]["id"].toString() !== (req.body.email)) {

                    console.log(log[i]["id"].toString());
                    found=1;
                }
                else {
                    res.json({ "status": "user exists" });
                }
             
            }
        if(found == 1)
        {
               db.users.save({ "firstname": req.body.firstname, "lastname": req.body.lastname, "id": req.body.email }, function (err, log) {

        if (err) {  res.send(err);   }
                       return res.json(JSON.stringify({ "status": "saved in database" }));

                    });
        }
        }
    })

});



module.exports = router;