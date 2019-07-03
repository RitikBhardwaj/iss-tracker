const express = require("express");

const app = express();
app.use(express.static("Public"));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.render("index");
});

const port = 8000 || process.env.PORT;

app.listen(port, function() {
  console.log(`[+]Server started at port ${port}`);
});
