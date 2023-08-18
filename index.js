import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongoose, { modelNames } from "mongoose";
import assert from "assert";
import { error, log } from "console";


const app = express();
const port = 3000;
mongoose.connect('mongodb://127.0.0.1:27017/todolistDB');

const todolist_schema = new mongoose.Schema({
    task : String
})

const Tasks = mongoose.model('Tasks',todolist_schema)

const task1 = new Tasks({
    task : "Hi this is my todolist Webapp"
})



app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static("public"))
const work  = []
const today = []

app.get("/",(req,res)=>{
    if(today.length===0){
        Tasks.insertMany([task1])
    .then(()=>{ 
        console.log ("Successfully updated");
    })  
    .catch((error)=>{   
        console.error(error.message)
    })
        Tasks.find({})
        .then((results)=>{
            results.forEach((document)=>{
            today.push(document.task)
            console.log(req.url);
            console.log(document.task);
        })
        res.render("today.ejs",{task:today,array_len:today.length})
    })
    }
    else{
        res.render("today.ejs",{task:today,array_len:today.length})
    }
})




app.get("/today",(req,res)=>{
    if(today.length===0){
        Tasks.insertMany([task1])
        .then(()=>{
            console.log("Successfully updated");
        })
        .catch((error)=>{
            console.error(error.message)
        })
        Tasks.find({})
        .then((results)=>{
            results.forEach((document)=>{
            today.push(document.task)
            console.log(req.url);
            console.log(document.task);
        })
        res.render("today.ejs",{task:today,array_len:today.length})
    })
    }
    else{
        res.render("today.ejs",{task:today,array_len:today.length})
    }
})

app.get("/work",(req,res)=>{
    if(work.length===0){
        Tasks.find({})
        .then((results)=>{
            results.forEach((document)=>{
            work.push(document.task)
            console.log(document.task);
        })
        res.render("work.ejs",{task:work,array_len:work.length})
    })
    }
    else{
        res.render("work.ejs",{task:work,array_len:work.length})
    }
})






app.post("/work",(req,res)=>{
    if(req.url == "/work"){
        var task = req.body["input_text"]
        work.push(task)
        res.render("work.ejs",{task:work,array_len:work.length})
    }
    console.log(req.url)
    console.log(work);
})

app.post("/today",(req,res)=>{
    if(req.url==="/today"){
        var task = req.body["input_text"]
        today.push(task)
        res.render("today.ejs",{task:today,array_len:today.length})
    }
    console.log(req.url);
    console.log(today)
})

app.listen(port,()=>{
    console.log(`Server is listening to the port ${port}`);
})


