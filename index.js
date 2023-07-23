import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static("public"))

app.get("/",(req,res)=>{
    res.render("today.ejs")
    
    
})

app.get("/today",(req,res)=>{
    res.render("today.ejs")

})
app.get("/work",(req,res)=>{
    res.render("work.ejs")
})
const work  = []

app.post("/work",(req,res)=>{
    if(req.url == "/work"){
        var task = req.body["input_text"]
        work.push(task)
        res.render("work.ejs",{task:work,array_len:work.length})
    }
    console.log(req.url)
})
const today = []
app.post("/today",(req,res)=>{
    if(req.url==="/today"){
        var task = req.body["input_text"]
        today.push(task)
        res.render("today.ejs",{task:today,array_len:today.length})
    }
    console.log(today)
})

app.listen(port,()=>{
    console.log(`Server is listening to the port ${port}`);
})


