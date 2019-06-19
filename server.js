const express = require('express');

const app = express();
app.use(express.static("Public"));
app.set("view engine", "ejs");


app.get("/", function (req, res) {
    res.render('index');
})

app.listen(8000, function () {
    console.log("[+]Server started!");
});