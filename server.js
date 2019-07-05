const express = require("express");
const app = express();
//Serve static contents on the server
app.use(express.static("Public"));
app.set("view engine", "ejs");

//GET route
app.get("/", function(req, res) {
  res.render("index");
});

const port = process.env.PORT; //process.env.PORT;

//listen on the given port
app.listen(port, function() {
  console.log(`[+]Server started at port ${port}`);
});
