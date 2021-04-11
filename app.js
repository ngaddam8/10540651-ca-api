const express = require("express");
const cors = require('cors');
const session = require("express-session");
const mongoose = require("mongoose");
const routes = require("./routes");

console.log(process.argv);
//Using mongdbargv variable to use dymamically 
var mongdbargv=process.argv[4];
mongoose.connect(mongdbargv, {useNewUrlParser: true}).then(()=>{
    // Replacing below mongodb connection as above to using command line arguments 
    //mongoose.connect("mongodb://localhost:27017/ca-db", {useNewUrlParser: true}).then(()=>{
    const app = express();
    app.use(session({
        secret : "caAPISecret",
        saveUninitialized: false,
        resave: false
    }));
    app.use(express.json());
    //argv[2] as http://localhost:4200 Whitelist 4200 port 
    //arv[3] as http://localhost:9876  for Unit testing port 

    app.use(cors({credentials: true, origin: [process.argv[2],process.argv[3]]}));
    //Replace below statement as above to work dynamically using command line arguments
    // app.use(cors({credentials: true, origin: process.argv[2]}));
    app.use("/api", routes);
    
    app.listen(3000, ()=>{
        console.log("CA API started on port 3000, test using http://localhost:3000");
    });
    // run below command to run locally 
   // node app.js http://localhost:4200 http://localhost:9876 mongodb://localhost:27017/ca-db
});

