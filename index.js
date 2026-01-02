const express = require("express");
const app= express();
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const port = 8080;
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
app.set("view engine","ejs");
app.set('views',path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
let posts = [
  {
    id: uuidv4(),
    username:"mohitpooniya",
    content:"learning full stack is difficult but possible"
  },
  {
    id: uuidv4(),
    username:"kashishkumar",
    content:"Genral Secretary is a tough job"
  },
  {
    id: uuidv4(),
    username:"rahulshendaliya",
    content:"lithi chokha is better then dal bati"
  },
];
app.get("/posts",(req,res)=>{
  res.render("index.ejs",{posts});
})

app.get("/posts/new",(req,res)=>{
  res.render("new.ejs");
})

app.get("/posts/:id",(req,res)=>{
  let {id} = req.params;
  let post = posts.find((a)=>id===a.id);
  console.log(post);
  res.render("show.ejs",{post});
})

app.post("/posts",(req,res)=>{
  let id =uuidv4();
  let {username,content}=req.body;
  posts.push({username,content,id});
  res.redirect("/posts");
})
app.get("/posts/:id/edit",(req,res)=>{
  let { id } = req.params;
  console.log("Requested ID:", id);
  console.log("Available IDs:", posts.map(p => p.id));
  let post = posts.find((a)=>id===a.id);
  res.render("edit.ejs", { post });
})

app.patch("/posts/:id/edit",(req,res)=>{
  let data = req.body.content;
  let { id } = req.params;
  let post = posts.find((a)=>id===a.id);
  post.content=data;
  res.redirect("/posts");
})

app.delete("/posts/:id",(req,res)=>{
  let { id } = req.params;
  posts = posts.filter((a)=>id!==a.id);
  res.redirect("/posts");
})

app.listen(port,()=>{
  console.log(`listening to port ${port}`);
})