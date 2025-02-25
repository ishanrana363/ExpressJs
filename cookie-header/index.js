const express = require("express")
const cookieParser = require("cookie-parser");
const app = new express();
app.use(cookieParser()); // Middleware to parse cookies


app.get("/set-header", (req, res) => {
    res.set("headers-2", "header 2 value")
    res.send("header send successfully");
});

app.get("/set-cookies", (req, res) => {
    res.cookie("token", "ishan", {
        httpOnly: true,
        secure: true,
        expires: new Date(Date.now() + 1_296_000),
    })
    res.send("cookie set successfully");
})


app.get("/find-cookie", (req, res) => {
    const token = req.cookies.token; // Correct way to access cookies

    if (!token) {
        return res.send("You are not authorized");
    }

    res.send("Welcome to the dashboard");
});


app.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.send("logout successfully")
})









app.listen(3000, () => {
    console.log(`Server run successfully`);
});