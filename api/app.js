const express = require('express');
const app = express();

const {mongoose} = require('./mongoose');

const bodyParser = require('body-parser');
const cors = require('cors');
//Load in the mongoose models
Task = require('./models/todoListModel')

// Load middleware
app.use(bodyParser.json());

//CORS HEADERS MIDDLEWARE
app.use(cors({origin : 'http://localhost:4200'}));
/* Route Handlers */
app.get('/tasks', (req,res) =>{
    //we want to return an array of all the tasks in the database
    Task.find({}).then((tasks) => {
        res.send(tasks);
    }) 
});

app.post('/tasks', (req,res) =>{
    //We want to create a new task and return the new task document back to the user (wich includes the id) 
    // The list information (fields) will be passed in via the JSON request body

    let newTask = new Task(req.body);
    newTask.save().then((taskDoc) =>{
        //The full task document is returned (incl. id)
        res.send(taskDoc);
    })
});

/**
 * PATH /tasks/:id
 * Purpose: Edit a specified task
 */
 app.patch('/tasks/:id', (req,res) =>{
    //We want to update the specified list (list document with id in the URL) with the new values specified in the JSON body of the request
    Task.findOneAndUpdate({ _id:req.params.id }, {
        $set: req.body
    }).then(()=>{
        res.send({ message: 'Update successfully!'});
    });
});

/**
 * DELETE /tasks/:id
 * Purpose: Delete a task
 */
 app.delete('/tasks/:id', (req,res) =>{
    //We want to delete specified task    
    Task.findOneAndDelete( {
        _id:req.params.id
    }).then((removedTaskDoc) => {
        res.send(removedTaskDoc);
    })
});
  
app.listen(3000, () => {
    console.log("Server is listening on port 3000")
})