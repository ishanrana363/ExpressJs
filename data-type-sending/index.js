const express = require("express");
const path = require("path");

const app = new express();

app.get("/api/user",(req,res)=>{
    const user  = {
        id : 1,
        name : "Ishan",
        age : 21,
        home : "Dinajpur"
    };
    res.json(user)
});

app.get("/html",(req,res)=>{
    res.send("<h1>Hello programmer</h1>")
});


app.get("/html-file",(req,res)=>{
    const filePath = path.join(process.cwd(),"public", "example.html");
    res.send(filePath)
})








app.listen(3000,()=>{
    console.log(`Server running successfully on 3000 port`);
});