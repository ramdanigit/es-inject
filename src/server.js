const express = require("express");
const formData = require('express-form-data');
const elasticsearch = require('elasticsearch');

const app = express();
app.use(express.json({ extended: false }))
app.use(express.urlencoded({ extended: true }));
app.use(formData.parse())

const port = 3000;
app.get("/", (req, res) => {
  // let a: number = 1;
  var buffer = new Buffer.alloc(12, "asd");
  var bufferBase64 = buffer.toString("base64");
  res.send(bufferBase64);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
  //   database();
});
