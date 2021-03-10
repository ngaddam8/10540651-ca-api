const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const routes = require("./routes");

mongoose.connect("mongodb://localhost:27017/ca-db", {useNewUrlParser: true}).then(()=>{
    const app = express();
    app.use(session({
        secret : "caAPISecret",
        saveUninitialized: false,
        resave: false
    }));
    app.use(express.json());
    app.use("/api", routes);
    
    app.listen(3000, ()=>{
        console.log("CA API started on port 3000, test using http://localhost:3000");
    });
});

