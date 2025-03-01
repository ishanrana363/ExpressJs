const express = require("express");
const multer = require('multer')
const app = new express();
const port = 3000;

const path = require("path");

app.use(express.static("public"));
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now()+ path.extname(file.originalname) )
    }
})

const upload = multer({ storage: storage });

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






app.listen(port, () => {
    console.log(`Server run successfully at ${port} `)
})




