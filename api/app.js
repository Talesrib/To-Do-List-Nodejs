const express = require('express');
const session = require('express-session');
const  passport  =  require('passport');
const  LocalStrategy  =  require('passport-local').Strategy;
const app = new express();

const {mongoose} = require('./mongoose');

const bodyParser = require('body-parser');
const cors = require('cors');
const flash = require('connect-flash');

Task = require('./models/todoListModel')
User = require('./models/user');
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'bla bla bla' 
  }));
app.use(flash());


  
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(cors({origin : 'http://localhost:4200'}));

passport.use(new LocalStrategy(
    function(username, password, done) {
        if(username === "admin" && password === "admin"){
            return done(null, username);
        } else {
            return done("unauthorized access", false);
        }
    }
    ));
    
passport.serializeUser(function(user, done) {
    if(user) done(null, user);
});
    
passport.deserializeUser(function(id, done) {
    done(null, id);
});
    
app.use(passport.initialize());
app.use(passport.session());
const auth = () => {
    return (req, res, next) => {
        passport.authenticate('local', (error, user, info) => {
            if(error) res.status(400).json({"statusCode" : 200 ,"message" : error});
            req.login(user, function(error) {
                if (error) return next(error);
                next();
            });
        })(req, res, next);
    }
}

const isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        return next()
    }
    return res.status(400).json({"statusCode" : 400, "message" : "not authenticated"})
}

app.post('/authenticate', auth() , (req, res) => {
    res.status(200).json({"statusCode" : 200 ,"message" : "hello"});
});

app.get('/tasks', (req,res) =>{
    
    Task.find({}).then((tasks) => {
        res.send(tasks);
    }) 
});

app.post('/tasks', (req,res) =>{

    let newTask = new Task(req.body);
    newTask.save().then((taskDoc) =>{
        
        res.send(taskDoc);
    })
});


 app.patch('/tasks/:id', (req,res) =>{
    
    Task.findOneAndUpdate({ _id:req.params.id }, {
        $set: req.body
    }).then(()=>{
        res.send({ message: 'Update successfully!'});
    });
});


 app.delete('/tasks/:id', (req,res) =>{
      
    Task.findOneAndDelete( {
        _id:req.params.id
    }).then((removedTaskDoc) => {
        res.send(removedTaskDoc);
    })
});

app.post('/register', (req, res) => {
    User.findOne({email: req.body.email}).then((user) => {
        if(user){
            console.log("Already exists this user in the system");
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }).save().then((userDoc) =>{
        
                res.send(userDoc);
            })
        }
    }).catch((err) => {
        console.log("An error has ocurred");
    })
})
  
app.listen(3000, () => {
    console.log("Server is listening on port 3000")
})