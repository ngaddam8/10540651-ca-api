const express = require("express");
const Adverts = require("./models/adverts");
const Users = require("./models/users");
const router = express.Router();

module.exports = router;


router.get("/adverts", async (req, res)=>{
    const adverts = await Adverts.find();
    res.send(adverts);
});

router.get("/adverts/:id", async (req, res)=>{
    try{
        const advert = await Adverts.findOne({_id: req.params.id});
        res.send(advert);
    } catch {
        res.status(404);
        res.send({error: "The advert you're looking for doesn't exist!"});
    }
});

router.get("/myAdverts/:id", async (req, res)=>{
    try{
        const adverts = await Adverts.find({author: req.params.id});
        res.send(adverts);
    } catch {
        res.status(404);
        res.send({error: "The adverts you're looking for doesn't exist!"});
    }
});

router.post("/createAd", async(req, res)=>{
    const advert = new Adverts({
        id : req.body.id,
        title: req.body.title,
        description: req.body.description,
        author: req.body.author,
        lastUpdated: req.body.lastUpdated,
        dateCreated: req.body.dateCreated,
        featuredImage: req.body.featuredImage
    });

    await advert.save();
    res.send(advert);
});

router.get("/deleteAd/:id", async (req, res) => {
	try {
		await Adverts.deleteOne({ _id: req.params.id });
		res.status(200).send({message: "The advert has been deleted"});
	} catch {
		res.status(404);
		res.send({ error: "The advert you're looking for doesn't exist!" });
	}
});

router.get("/users", async (req, res)=>{
    const users = await Users.find();
    res.send(users);
});

router.post("/register", async(req, res)=>{
    const user = new Users({
        //id: req.body.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        lastUpdated: new Date,
        dateCreated: new Date(),
        avatar: req.body.avatar,
        lastLogin: null
    });

    await user.save();
    res.send({status: "success", "user": user});
});

router.post("/login", async(req, res)=>{
    var session = req.session;
    console.log(req.body);
    const user = await Users.findOne({email: req.body.email, password: req.body.password}, (err, result)=>{
        if(err){
            res.send({error: err});
        }
    });

    if(user){
        user.lastLogin = new Date();
        await user.save();
        session.user = user;
        session.logged_in = "true";
        res.send({status: "success", "user": user});
    } else {
        res.status(200);
        res.send({ error: "Couldn't log you in, please check your credentials and retry" });
    }
    
});

router.get("/isLoggedIn", async(req, res)=>{
    var session = req.session;
    console.log(session);
    if(session != undefined && session.logged_in != undefined && session.logged_in == 'true'){
        res.send("Logged In");
    } else {
        res.send("Logged Out");
    }
});

router.get("/loggedInUser", async(req, res)=>{
    var session = req.session;
    if(session != undefined && session.logged_in != undefined && session.logged_in == 'true'){
        res.send(session.user);
    } else {
        res.send("Logged Out");
    }
});

router.get("/logout", async(req, res)=>{
    var session = req.session;
    session.user = null;
    session.logged_in = "false";
    res.status(200);
    res.send("Logged Out");
});