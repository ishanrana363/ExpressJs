const express = require("express");
const port = 3000;
const app = new express();

const NodeCache = require("node-cache");
const myCache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

const catchMiddleware = (req, res, next) => {
    const key = req.originalUrl;
    const cacheData = myCache.get(key);
    if (cacheData) {
        console.log(`Data catche successfully`);
        return res.json(cacheData);
    }

    console.log(`First time request so data not cache.`);
    next();

};


app.get("/",(req,res)=>{
    res.send("Server run successfully")
});

app.get("/users",catchMiddleware,(req,res)=>{
    let user = {
        name:"Ishan",
        age:21,
        home:"Dinajpur"
    };
    myCache.set(req.originalUrl,user,1000)
    res.json(user)
});







app.listen(port, () => {
    console.log(`Server run successfull`)
})






