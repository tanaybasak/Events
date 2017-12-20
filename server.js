var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
 var index = require('./routes/index');
 var login = require('./routes/login');
 var cors = require('cors');
 var app = express();


//set port 
app.set('port',(process.env.PORT || 4200))


 //View Engine

app.set('views' ,path.join(__dirname,'views'));
app.set('view engine','ejs');
app.engine('html',require('ejs').renderFile);

//Set Static Folder(angular stuffs)

app.use(express.static(path.join(__dirname,'client')));

//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
//cors
//app.use(cors.permission);





//routes
app.use('/',index);
app.use('/api',login);


//cors

//app.use(cors());
//server
app.listen(app.get('port'),function(){
    console.log("Node app is running on port", app.get('port'));
});
