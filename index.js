const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
env = "dev";
const config = require("config").get(env);
const database = require("./database.js");


var app = express();
app.use(cors());
app.use(bodyParser.json());

database.createConnection(function( err ){
    if(err){
       console.log(err);
    }
    else{
        const setRoutes = require("./routes.js");
        setRoutes(app);
        app.listen(config.port, function(){
            console.log("Listening...");
        });
}
});




