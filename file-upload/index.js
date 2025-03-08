const express = require("express");
const multer = require('multer')
const app = new express();
const port = 3000;
const fs = require("fs");

const path = require("path");

app.use(express.static("public"));
app.use("uploads",express.static("/uploads"));
app.get("/",(req,res)=>{
    res.sendFile( process.cwd() + "/public/index.html" )
})
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now()+ path.extname(file.originalname) )
    }
})

const upload = multer({ storage: storage, limits:{
    fileSize : 1024*1024*1
} });

app.post("/upload",upload.single("image"),(req,res)=>{
    if(!req.file){
        return res.status(404).json({
            status:"fail",
            msg : "Image not found"
        })
    }
    return res.status(201).json({
        status:"success",
        file : req.file.filename
    })
});


app.delete("/file-delete/:fileName",(req,res)=>{
    const filePath = path.join(process.cwd(),"/uploads", req.params.fileName );
    fs.unlink(filePath,(err)=>{
        if(err) return res.status(500).json({
            status : "fail",
            msg : "File delete fail"
        })
        res.status(200).json({
            status:"success",
            msg : "File delete successfully"
        })
    })
})






app.listen(port, () => {
    console.log(`Server run successfully at ${port} `)
})




