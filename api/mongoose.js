const express= require('express');
const mongoose = require('mongoose');

const username = "Tales"
const password = "Ngh7GL1KWsp1U6ec"
const cluster = "cluster0";
const dbname = "Log-monitoring";

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb+srv://${username}:${password}@${cluster}.tqupn3p.mongodb.net/${dbname}?retryWrites=true&w=majority`).then(() => {
    console.log("Connected to MongoDB successfully :)");
}).catch((e) => {
    console.log("Error while attempting to connect to MongoDB");
    console.log(e);
});

module.exports = {
    mongoose
}