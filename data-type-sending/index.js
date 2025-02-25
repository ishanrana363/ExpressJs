const express = require("express");

const app = new express();

app.get("/api/user",(req,res)=>{
    const user  = {
        id : 1,
        name : "Ishan",
        age : 21,
        home : "Dinajpur"
    };
    res.json(user)
})








app.listen(3000,()=>{
    console.log(`Server running successfully on 3000 port`);
});