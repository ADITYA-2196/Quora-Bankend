const express=require("express");
const app=express();
const port=8080;
const path=require("path");
//Package that create new/unique id 
const{v4 : uuidv4}= require("uuid");
const methodOverride=require("method-override");


app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

//EJS-templating in views folder
app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));

//static file-public folder
app.use(express.static("public"));
app.use(express.static(path.join(__dirname,"public"))); 

let posts=[
    {
        id:uuidv4(),
        username: "apnacollege",
        content: "I love Coding",
    },
    {
        id:uuidv4(),      
        username: "aditya_7355",
        content: "Igris",
    },
    {
        id:uuidv4(),        
        username: "Solo levling",
        content: "Exchange",
    },

];



 //API 1-All post-Index Route
app.get("/posts",(req,res)=>{
    res.render("index.ejs" , {posts});
});

//API 2-Form for writing new posts
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});

//API 3-We get form data as well as create new post that reflect on index.js
app.post("/posts",(req,res)=>{
    let{username , content}=req.body;
    let id=uuidv4();//new id for new post
    posts.push({id,username,content});
    res.redirect("/posts");
});

//API 4-for getting id
app.get("/posts/:id",(req,res)=>{
    let{id}=req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs" ,{post});
});

//API 5- update data
app.patch("/posts/:id",(req,res)=>{
    let{id}=req.params;
    let newContent=req.body.content;
    let post=posts.find((p)=> id === p.id);
    post.content=newContent;
    console.log(post);
    res.redirect("/posts");
});

app.get("/posts/:id/edit",(req,res)=>{
    let {id} =req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs",{post});
});

//Delete Api-
app.delete("/posts/:id",(req,res)=>{
    let{id}=req.params;
     posts=posts.filter((p)=> id!==p.id);
    res.redirect("/posts");
})

app.listen(port , ()=>{
    console.log("listning to port : 8080");
});